import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

    const isProtectedRoute = createRouteMatcher([
      '/app(.*)', // Protect all routes starting with /app
    ]);

    export default clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        auth().protect(); // Protect the route if it matches
      }
    });

    export const config = {
      matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
    };
