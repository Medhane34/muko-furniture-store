"use client"
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { button as buttonClone } from "@/components/primitives"; // or "@/components/atoms/buttonVariants"

import { fadeInUp,  } from "@/lib/motion"; //motion variants 
import { motion } from "framer-motion";
import { ProductCard, HeroSection } from "@/components/molecules";


export default function Home() {
  return (
    <><HeroSection
      badgeText="THE LABOR DAY SALE"
      headline="Get the Best Prices of the Year"
      highlight="on Our Newest Styles and Best Sellers!"
      subheading="We design conversion-focused websites that don’t just look stunning—but are built to attract, engage, and convert your ideal customers."
      imageUrl="/homepage-hero.jpg"
      imageAlt="Children jumping on a sofa bed"
      ctaText="VIEW THE SALE"
      ctaHref="#sale"
      showArrow={true} />
      <ProductCard
          image="/homepage-hero.jpg"
          title="Leather Sectional Sofa"
          price={25000}
          ctaLink="/product/leather-sectional-sofa"
          ctaText="Inquire"
          badgeText="In Stock"
        />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>


        </div>

        <div className="flex gap-3">
          {/*     <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "none",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link> */}
        </div>
        <div className="p-6">
          {/*  <LinkStyle href="/about" size="lg" state="active">
       About Us
     </LinkStyle> */}

        </div>
        <div className="mt-8">
          {/* <Snippet hideCopyButton hideSymbol variant="bordered">
      <span>
        Get started by editing <Code color="primary">app/page.tsx</Code>
      </span>
    </Snippet> */}
          {/* <motion.button {...buttonHover}>Click Me</motion.button>  */}


        </div>
      </section></>
  );
}
