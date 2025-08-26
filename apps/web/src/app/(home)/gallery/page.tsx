import type { Metadata } from "next";
import Link from "next/link";
import { BlurFadeDemo } from "@/components/magicui/blur-fade-demo";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import PageTitle from "@/components/page-title";
import config from "@/config";
import { ChevronRight } from "lucide-react";
import { cn } from "@1chooo/ui/lib/utils";

const { title } = config;

export const metadata: Metadata = {
  title: `Gallery | ${title}`,
};

function Gallery() {
  return (
    <article>
      <PageTitle title="Gallery" />
      <BlurFadeDemo />
      <div className="z-10 flex items-center justify-center mt-5 mb-5">
        <Link
          href="https://magicui.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatedGradientText>
            📑 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Thanks for Magic UI!
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-white-1" />
          </AnimatedGradientText>
        </Link>
      </div>
    </article>
  );
}

export default Gallery;
