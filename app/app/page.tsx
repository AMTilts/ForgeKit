// Keep existing content, it will now be wrapped by AppLayout
    import Link from "next/link";

    export default function AppDashboard() {
      return (
        <div className="container flex flex-col items-center justify-center flex-1 p-4">
          <h1 className="text-3xl font-bold mb-6">App Dashboard</h1>
          <p className="mb-4">Welcome to the main application area!</p>
          <p className="mb-4">This page is protected by Clerk authentication.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back home
          </Link>
          {/* Add Supabase data fetching/display here later */}
        </div>
      );
    }
