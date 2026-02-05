import IconBox from "@/components/icon-box";
import ResumeCard from "@/components/resume/resume-card";

import type { ResumePost } from "@/types/resume";

import { cn } from "@/lib/utils";


interface ResumeTimeLineProps {
  icon: string;
  title: string;
  resumePosts: ResumePost[];
}

import styles from "@/styles/resume/timeline.module.css";

/**
 * @todo update styles name to match lowercase pascal case convention and styles.styleName
 */
function ResumeTimeLine({ icon, title, resumePosts }: ResumeTimeLineProps) {
  return (
    <div className={cn(styles["timelines"])}>
      <div className="flex items-center gap-4 mb-6">
        <IconBox iconName={icon} />
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>

      <ol className={cn(styles["timeline"])}>
        {resumePosts.map((resumePost: ResumePost, index: number) => (
          <li
            className={cn(styles["timeline-cards"])}
            key={`${resumePost.slug}-${index}`}
          >
            <ResumeCard resumePost={resumePost} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResumeTimeLine;
export { ResumeTimeLine };
