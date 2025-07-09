import React from "react";
import { Zap } from "lucide-react";

import PostsLoop from "@/components/about/posts-loop";
import { BlurFade } from "@/components/magicui/blur-fade";
import GradientCard from "@/components/gradient-card";
import { ClickableTechBadges } from "@/lib/tech-badge/utils";
import config from "@/config";

import { BlogPost } from "@/types/blog";

interface MyWritingsProps {
  count?: number;
  posts?: BlogPost[];
}

function MyWritings({ count, posts }: MyWritingsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto my-7 xl:px-0">
      <div className="flex flex-col items-start justify-start md:flex-row md:space-x-7">
        <PostsLoop count={count} posts={posts} />

        <div className="w-full mt-10 md:w-1/3 md:mt-0">
          {Object.entries(config.techStacks).map(([category, badges]) => (
            <BlurFade inView delay={0.4} direction="up" key={category}>
              <GradientCard className="mb-4">
                <div className="flex flex-wrap gap-2 shadow-feature-card dark:shadow-feature-card-dark rounded-xl">
                  <div className="relative flex items-center space-x-2">
                    <Zap className="flex-none text-white-1" size={18} />
                    <h2 className="flex text-sm font-semibold text-white-1">
                      {category}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 shadow-feature-card dark:shadow-feature-card-dark rounded-xl mt-4">
                    {badges.map((badgeKey) => (
                      <span key={badgeKey}>{ClickableTechBadges[badgeKey]}</span>
                    ))}
                  </div>
                </div>
              </GradientCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MyWritings };
export default MyWritings;
