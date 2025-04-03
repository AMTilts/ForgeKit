import { NextResponse } from 'next/server';
    import yaml from 'js-yaml';
    import { z } from 'zod';

    // Zod schema for input validation
    const RequestBodySchema = z.object({
      githubUrl: z.string().url("Invalid GitHub URL provided."),
    });

    // Helper function to parse GitHub URL
    function parseGitHubUrl(url: string): { owner: string; repo: string; error?: string } | { error: string } {
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname !== 'github.com') {
                return { error: 'URL must be a github.com URL.' };
            }
            const pathParts = parsedUrl.pathname.split('/').filter(part => part.length > 0);
            if (pathParts.length < 2) {
                return { error: 'Invalid GitHub repository URL format.' };
            }
            const [owner, repo] = pathParts;
            // Basic sanitization (more robust might be needed)
            const sanitizedOwner = owner.replace(/[^a-zA-Z0-9-]/g, '');
            const sanitizedRepo = repo.replace(/[^a-zA-Z0-9-_\.]/g, '').replace('.git', '');

            if (!sanitizedOwner || !sanitizedRepo) {
                 return { error: 'Could not extract valid owner and repo name.' };
            }

            return { owner: sanitizedOwner, repo: sanitizedRepo };
        } catch (e) {
            return { error: 'Invalid URL format.' };
        }
    }

    export async function POST(request: Request) {
      let body;
      try {
        body = await request.json();
      } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
      }

      // Validate input body
      const validationResult = RequestBodySchema.safeParse(body);
      if (!validationResult.success) {
        return NextResponse.json({ error: 'Invalid request body', details: validationResult.error.errors }, { status: 400 });
      }

      const { githubUrl } = validationResult.data;

      // Parse URL to get owner and repo
      const repoInfo = parseGitHubUrl(githubUrl);
      if (repoInfo.error) {
        return NextResponse.json({ error: repoInfo.error }, { status: 400 });
      }
      const { owner, repo } = repoInfo as { owner: string; repo: string };


      const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/.forgekit.yaml`;
      console.log(`Fetching: ${githubApiUrl}`); // Log the URL being fetched

      try {
        const response = await fetch(githubApiUrl, {
          headers: {
            // Add Authorization header if using a token for private repos/rate limits
            // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'ForgeKit-App' // GitHub requires a User-Agent
          },
          cache: 'no-store' // Avoid caching the file content
        });

        console.log(`GitHub API Response Status: ${response.status}`); // Log status

        if (!response.ok) {
          if (response.status === 404) {
            return NextResponse.json({ error: `.forgekit.yaml not found in the root of repository ${owner}/${repo}` }, { status: 404 });
          }
           const errorBody = await response.text();
           console.error(`GitHub API Error: ${errorBody}`); // Log error body
          return NextResponse.json({ error: `Failed to fetch file from GitHub (Status: ${response.status})` }, { status: response.status });
        }

        const fileData = await response.json();

        if (fileData.type !== 'file' || !fileData.content) {
          return NextResponse.json({ error: '.forgekit.yaml is not a file or content is missing' }, { status: 400 });
        }

        // Decode Base64 content
        const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');

        // Parse YAML
        try {
          const parsedYaml = yaml.load(fileContent);
          // Basic validation if the YAML is empty or not an object
          if (parsedYaml === null || typeof parsedYaml !== 'object') {
             return NextResponse.json({ error: 'Failed to parse YAML or YAML is empty/invalid' }, { status: 500 });
          }
          return NextResponse.json(parsedYaml, { status: 200 });
        } catch (yamlError: any) {
           console.error(`YAML Parsing Error: ${yamlError.message}`); // Log parsing error
          return NextResponse.json({ error: 'Failed to parse .forgekit.yaml file', details: yamlError.message }, { status: 500 });
        }

      } catch (error: any) {
        console.error(`Fetch/Processing Error: ${error.message}`); // Log general error
        return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 });
      }
    }
