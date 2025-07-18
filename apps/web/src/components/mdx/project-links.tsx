import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import config from "@/config";
import { cn } from "@1chooo/ui/lib/utils";

import styles from "@/styles/project/project-links.module.css";

interface ProjectLinksProps {
  demo?: string;
  code?: string;
  docs?: string;
}

function ProjectLinks({ demo, code, docs }: ProjectLinksProps) {
  const repo = code?.split("/").pop();

  if (!demo && !code && !docs) {
    return null;
  }

  return (
    <div className={cn(styles.container)}>
      {demo && (
        <Link href={demo} className={cn(styles.link, styles.group)}>
          {"Demo"}
          <ArrowUpRightIcon className={cn(styles.icon, styles.iconHover)} />
        </Link>
      )}
      {code && (
        <Link href={code} className={cn(styles.link, styles.group)}>
          {`${config.about.githubUsername}/${repo}`}
          <ArrowUpRightIcon className={cn(styles.icon, styles.iconHover)} />
        </Link>
      )}
      {docs && (
        <Link href={docs} className={cn(styles.link, styles.group)}>
          {"Docs"}
          <ArrowUpRightIcon className={cn(styles.icon, styles.iconHover)} />
        </Link>
      )}
    </div>
  );
}

export { ProjectLinks };
export default ProjectLinks;
