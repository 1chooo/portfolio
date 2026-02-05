import React from "react";

import { BlurFade } from "@/components/magicui/blur-fade";

import styles from "@/styles/about-section.module.css";

interface AboutSectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
}

function AboutSection({ id, title, children }: AboutSectionProps) {
  return (
    <section id={id} className={styles.section}>
      {title && (
        <BlurFade inView delay={0.4} direction="down">
          <h2 className={styles.title}>{title}</h2>
        </BlurFade>
      )}
      {children}
    </section>
  );
}

export default AboutSection;
export { AboutSection };
