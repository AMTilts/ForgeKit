import Link from 'next/link';
    import { UserButton, auth } from "@clerk/nextjs";
    import { Button } from "@/components/ui/button";
    import { HeroSection } from '@/components/marketing/hero';
    import { HowItWorksSection } from '@/components/marketing/how-it-works';
    import { FeaturesSection } from '@/components/marketing/features';

    // This is now the Marketing Landing Page
    export default function MarketingPage() {
      const { userId } = auth();

      return (
        <div className="flex flex-col min-h-screen">
           {/* Header specific to marketing page, or keep it in root layout */}
           <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
             <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
               <Link href="/" className="mr-6 flex items-center space-x-2">
                 {/* Optional Logo */}
                 <span className="font-bold">ForgeKit</span>
               </Link>
               <nav className="flex items-center gap-4">
                 {userId ? (
                   <>
                     <Link href="/app">
                       <Button variant="outline" size="sm">Dashboard</Button>
                     </Link>
                     <UserButton afterSignOutUrl="/"/>
                   </>
                 ) : (
                   <>
                     <Link href="/sign-in">
                       <Button variant="ghost" size="sm">Sign In</Button>
                     </Link>
                     <Link href="/sign-up">
                       <Button size="sm">Sign Up</Button>
                     </Link>
                   </>
                 )}
               </nav>
             </div>
           </header>

           <main className="flex-1">
             <HeroSection />
             <HowItWorksSection />
             <FeaturesSection />
             {/* Add other sections like Pricing, Footer etc. */}
           </main>

           <footer className="py-6 md:px-8 md:py-0 border-t">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                 <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by YourName/Company. The source code is available on GitHub. {/* Replace */}
                 </p>
              </div>
           </footer>
        </div>
      );
    }
