import { BlurFade } from "@/components/magicui/blur-fade";

import { GitHubCalendar } from 'react-github-calendar';
import { cn } from "@/lib/utils";


import styles from "@/styles/md/github-map.module.css";

interface GitHubMapProps {
  username: string;
  year?: number | "last";
}

function GitHubMap({ year = "last", username = "1chooo" }: GitHubMapProps) {
  const yellowTheme = {
    light: ["#EBEBEB", "#FFDA6B"],
    dark: ["#383838", "#FFDA6B"],
  };

  return (
    <section
      id="github-calendar"
      className={cn(styles.section, "text-light-gray")}
    >
      <BlurFade inView delay={0.4} direction="down">
        <GitHubCalendar
          year={year}
          username={username}
          blockSize={12}
          blockMargin={4}
          colorScheme="dark"
          blockRadius={2}
          fontSize={14}
          style={{ fontWeight: "bold" }}
          theme={yellowTheme}
        />
      </BlurFade>
    </section>
  );
}

export { GitHubMap };
export default GitHubMap;
