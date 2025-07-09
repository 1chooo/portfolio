import React from "react";

import SVGIcons from "@/components/svg-icons";
import { TechBadge, TechBadgeWithoutLink } from "@/components/tech-badge";
import { TECH_BADGE_CONFIGS, type TechBadgeConfig, type TechBadgeKey } from "@/lib/tech-badge/config";
import type { SVGIconProps } from "@/components/svg-icons";

// Options for badge creation
export interface TechBadgeOptions {
  clickable?: boolean;
  className?: string;
}

// Helper function to create a single tech badge
function createTechBadge(
  config: TechBadgeConfig,
  options: TechBadgeOptions = {}
): React.JSX.Element {
  const { clickable = true } = options;
  const IconComponent = SVGIcons[config.svgIcon];

  const badgeContent = (
    <>
      <IconComponent />
      {config.name}
    </>
  );

  if (clickable) {
    return <TechBadge href={config.href}>{badgeContent}</TechBadge>;
  }

  return <TechBadgeWithoutLink>{badgeContent}</TechBadgeWithoutLink>;
}

// Helper function to create tech badge by name
function createTechBadgeByName(
  name: TechBadgeKey,
  options: TechBadgeOptions = {}
): React.JSX.Element {
  const config = TECH_BADGE_CONFIGS[name];
  if (!config) {
    throw new Error(`Tech badge configuration not found for: ${name}`);
  }
  return createTechBadge(config, options);
}

// Generate badge collections
function generateBadgeCollection(clickable: boolean): Record<TechBadgeKey, React.JSX.Element> {
  return Object.keys(TECH_BADGE_CONFIGS).reduce(
    (acc, key) => {
      const badgeKey = key as TechBadgeKey;
      acc[badgeKey] = createTechBadgeByName(badgeKey, { clickable });
      return acc;
    },
    {} as Record<TechBadgeKey, React.JSX.Element>
  );
}

// 🚀 Auto-generated badge collections
export const TechBadges = {
  clickable: generateBadgeCollection(true),
  nonClickable: generateBadgeCollection(false),
};

export const ClickableTechBadges = TechBadges.clickable;
export const NonClickableTechBadges = TechBadges.nonClickable;

export const AllClickableBadges: React.JSX.Element[] = Object.values(TechBadges.clickable);
export const AllNonClickableBadges: React.JSX.Element[] = Object.values(TechBadges.nonClickable);

/**
 * Badge showcase components Demo
 */
export const BadgeShowcase = ({ clickable = true }: { clickable?: boolean }) => {
  const badges = clickable ? AllClickableBadges : AllNonClickableBadges;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <span key={index}>{badge}</span>
      ))}
    </div>
  );
};

/**
 * Badge showcase components by category.
 */
export const BadgesByCategory = ({ clickable = true }: { clickable?: boolean }) => {
  const badgeCollection = clickable ? TechBadges.clickable : TechBadges.nonClickable;
  const BadgeCategories = {
    Frontend: ["typescript", "nextjs", "react", "javascript", "tailwindcss"] as const,
    Backend: ["python", "django", "java", "go"] as const,
    DevOps: ["docker", "kubernetes", "aws", "linux"] as const,
    Tools: ["vscode", "github"] as const,
    Languages: ["cpp", "python", "java", "javascript", "go", "typescript"] as const,
    Database: ["redis", "supabase", "firebase"] as const,
  } as const;

  return (
    <div className="space-y-4">
      {Object.entries(BadgeCategories).map(([category, badges]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badgeKey) => (
              <span key={badgeKey}>{badgeCollection[badgeKey]}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface BadgesSelectorProps {
  selectedBadges: TechBadgeKey[];
  className?: string;
  clickable?: boolean;
}

export const BadgesSelector: React.FC<BadgesSelectorProps> = ({
  selectedBadges,
  className = "flex flex-wrap gap-2",
  clickable = true,
}) => {
  const badgeCollection = clickable ? TechBadges.clickable : TechBadges.nonClickable;

  return (
    <div className={className}>
      {selectedBadges.map((badgeKey) => (
        <span key={badgeKey}>{badgeCollection[badgeKey]}</span>
      ))}
    </div>
  );
};

// Utility function to get a single badge
export const getTechBadge = (key: TechBadgeKey, clickable: boolean = true): React.JSX.Element => {
  return clickable ? TechBadges.clickable[key] : TechBadges.nonClickable[key];
};

export {
  SVGIcons,
  createTechBadge,
  createTechBadgeByName,
  TECH_BADGE_CONFIGS,
  generateBadgeCollection
};

export type { SVGIconProps, TechBadgeConfig, TechBadgeKey };
