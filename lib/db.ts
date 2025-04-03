import { createClient } from './supabase/client'; // Use browser client for now

    // Define interfaces for type safety (optional but recommended)
    interface Template {
      id?: number; // Optional for creation
      user_id: string;
      name: string;
      description?: string;
      github_url: string;
      parsed_schema?: object; // Store the parsed .forgekit.yaml schema
      created_at?: string;
    }

    interface GenerationJob {
      id?: number; // Optional for creation
      user_id: string;
      template_id: number;
      status: 'pending' | 'processing' | 'completed' | 'failed';
      input_data: object;
      output_url?: string; // URL to generated output (e.g., file storage)
      error_message?: string;
      created_at?: string;
      updated_at?: string;
    }

    // Initialize Supabase client (consider server client for server-side actions)
    const supabase = createClient();

    // --- Template Functions ---

    export async function createTemplate(templateData: Omit<Template, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('templates')
        .insert([templateData])
        .select()
        .single(); // Return the created record

      if (error) {
        console.error('Error creating template:', error);
        throw error;
      }
      return data as Template;
    }

    export async function getTemplateById(templateId: number) {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: Row not found is okay
        console.error('Error fetching template by ID:', error);
        throw error;
      }
      return data as Template | null;
    }

     export async function getUserTemplates(userId: string) {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user templates:', error);
        throw error;
      }
      return data as Template[];
    }

     export async function updateTemplateSchema(templateId: number, schema: object) {
       const { data, error } = await supabase
         .from('templates')
         .update({ parsed_schema: schema })
         .eq('id', templateId)
         .select()
         .single();

       if (error) {
         console.error('Error updating template schema:', error);
         throw error;
       }
       return data as Template;
     }

     export async function deleteTemplate(templateId: number, userId: string) {
        // Optional: Add user_id check for security
       const { error } = await supabase
         .from('templates')
         .delete()
         .eq('id', templateId)
         .eq('user_id', userId); // Ensure user owns the template

       if (error) {
         console.error('Error deleting template:', error);
         throw error;
       }
       return true;
     }


    // --- Generation Job Functions ---

    export async function createGenerationJob(jobData: Omit<GenerationJob, 'id' | 'created_at' | 'updated_at' | 'status'>) {
       const initialJobData = {
           ...jobData,
           status: 'pending' as const, // Set initial status
       };
      const { data, error } = await supabase
        .from('generation_jobs')
        .insert([initialJobData])
        .select()
        .single();

      if (error) {
        console.error('Error creating generation job:', error);
        throw error;
      }
      return data as GenerationJob;
    }

     export async function getGenerationJobById(jobId: number) {
      const { data, error } = await supabase
        .from('generation_jobs')
        .select('*, templates(name, github_url)') // Example of joining with templates
        .eq('id', jobId)
        .single();

       if (error && error.code !== 'PGRST116') {
        console.error('Error fetching job by ID:', error);
        throw error;
      }
      return data as (GenerationJob & { templates: Pick<Template, 'name' | 'github_url'> | null }) | null;
    }

    export async function updateGenerationJobStatus(
        jobId: number,
        status: GenerationJob['status'],
        outputUrl?: string,
        errorMessage?: string
    ) {
       const updateData: Partial<GenerationJob> = {
           status,
           updated_at: new Date().toISOString(), // Update timestamp
       };
       if (outputUrl) updateData.output_url = outputUrl;
       if (errorMessage) updateData.error_message = errorMessage;
       if (status === 'completed') updateData.error_message = undefined; // Clear error on success

      const { data, error } = await supabase
        .from('generation_jobs')
        .update(updateData)
        .eq('id', jobId)
        .select()
        .single();

      if (error) {
        console.error('Error updating job status:', error);
        throw error;
      }
      return data as GenerationJob;
    }

     export async function getUserGenerationJobs(userId: string) {
      const { data, error } = await supabase
        .from('generation_jobs')
        .select('*, templates(name)') // Example join
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user jobs:', error);
        throw error;
      }
       // Adjust type based on actual join structure if needed
      return data as (GenerationJob & { templates: Pick<Template, 'name'> | null })[];
    }
