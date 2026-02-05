import { Swords } from "lucide-react";
import { getIcon } from "@/components/icons";

import { cn } from "@/lib/utils";

import styles from "@/styles/icon-box.module.css";

interface IconBoxProps {
  key?: string;
  iconName: string;
  className?: string;
}

function IconBox({ key, iconName, className }: IconBoxProps) {
  const Icon = getIcon(iconName) || Swords;

  return (
    <div key={key} className={cn(styles.iconBox, className)}>
      <Icon />
    </div>
  );
}

export { IconBox };
export type { IconBoxProps };
export default IconBox;
