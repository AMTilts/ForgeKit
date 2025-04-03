"use client";

    import Link from "next/link";
    import { motion } from "framer-motion";
    import { Button } from "@/components/ui/button";
    import { ArrowRight } from "lucide-react";

    export function HeroSection() {
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Replace with an actual image or illustration */}
              <div className="bg-muted rounded-lg flex items-center justify-center aspect-video lg:aspect-square">
                 <span className="text-muted-foreground">Illustration/Image Placeholder</span>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Generate Code & Content Instantly
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ForgeKit uses your YAML templates and GitHub repos to create
                    anything you need, from boilerplate code to documentation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                   <Link href="#how-it-works">
                     <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                       Learn More
                     </Button>
                   </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      );
    }
