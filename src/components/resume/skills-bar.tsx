import styles from "@/styles/skills-bar.module.css";

import { cn } from "@/lib/utils";


interface Skill {
  name: string;
  level: number;
}

interface SkillsBarProps {
  skills: Skill[];
}

/**
 * @example
 * import SkillsBar from "@repo/ui/skills-bar";
 *
 * const skills = [
 *   { name: "JavaScript", level: 80 },
 *   { name: "TypeScript", level: 70 },
 *   { name: "React", level: 75 },
 *   { name: "Node.js", level: 65 },
 * ];
 *
 * <SkillsBar skills={skills}/>
 */
function SkillsBar({ skills }: SkillsBarProps) {
  return (
    <section className={cn(styles.skillsSection)}>
      <ul className={cn(styles.skillsList, styles.gradientCard)}>
        {skills.map((skill, index) => (
          <li className={cn(styles.skillItem)} key={index}>
            <div className={cn(styles.skillHeader)}>
              <h5 className={cn(styles.skillName)}>{skill.name}</h5>
              <data value={skill.level}>{skill.level}%</data>
            </div>
            <div className={cn(styles.progressBarBackground)}>
              <div
                className={cn(styles.progressBarFill)}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SkillsBar;
export { SkillsBar };
