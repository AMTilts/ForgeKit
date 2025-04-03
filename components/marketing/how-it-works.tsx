"use client";

    import { motion } from "framer-motion";
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
    import { GitBranchIcon, FileTextIcon, SettingsIcon, SparklesIcon } from "lucide-react";

    const steps = [
      {
        icon: GitBranchIcon,
        title: "Connect Repo",
        description: "Link your GitHub repository containing a `.forgekit.yaml` template file.",
      },
      {
        icon: FileTextIcon,
        title: "Define Template",
        description: "Create a simple YAML file defining variables and output structure.",
      },
       {
        icon: SettingsIcon,
        title: "Provide Inputs",
        description: "Fill in the variables defined in your template via our UI.",
      },
      {
        icon: SparklesIcon,
        title: "Generate",
        description: "ForgeKit processes the template and inputs to generate your desired output.",
      },
    ];

    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.15,
          duration: 0.5,
        },
      }),
    };

    export function HowItWorksSection() {
      return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple Steps to Generation Magic
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Go from template to generated output in just a few clicks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex justify-center">
                         <step.icon className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-center">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    }
