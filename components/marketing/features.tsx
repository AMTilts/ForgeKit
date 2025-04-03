"use client";

    import { motion } from "framer-motion";
    import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
    import { Zap, FileCode, Github, Settings2 } from "lucide-react"; // Example icons

    const features = [
      {
        icon: Github,
        title: "GitHub Integration",
        description: "Directly use templates from your public or private GitHub repositories.",
      },
      {
        icon: FileCode,
        title: "YAML Templates",
        description: "Define flexible and powerful generation templates using simple YAML syntax.",
      },
      {
        icon: Settings2,
        title: "Variable Inputs",
        description: "Easily provide dynamic data to customize your generated output.",
      },
      {
        icon: Zap,
        title: "Fast Generation",
        description: "Quickly generate code, config files, documentation, and more.",
      },
    ];

     const featureVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.1,
           duration: 0.4,
        },
      }),
    };


    export function FeaturesSection() {
      return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose ForgeKit?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leverage powerful features designed for efficient generation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
              {features.map((feature, index) => (
                 <motion.div
                  key={feature.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={featureVariants}
                >
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                       <feature.icon className="h-8 w-8 text-primary mt-1" />
                       <div className="grid gap-1">
                         <CardTitle>{feature.title}</CardTitle>
                         <CardDescription>{feature.description}</CardDescription>
                       </div>
                    </CardHeader>
                  </Card>
                 </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    }
