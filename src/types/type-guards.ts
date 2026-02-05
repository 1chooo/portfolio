import { LifeStyle, TechStack, About } from "@/types/about";
import { SocialMedia } from "@/types/socail-media";

export const isLifeStyle = (obj: unknown): obj is LifeStyle => {
  if (!isObject(obj)) return false;
  return (
    typeof obj.icon === "string" &&
    typeof obj.title === "string" &&
    typeof obj.text === "string"
  );
};

export const isTechStack = (obj: unknown): obj is TechStack => {
  if (!isObject(obj)) return false;
  return (
    typeof obj.id === "string" &&
    typeof obj.src === "string" &&
    typeof obj.alt === "string"
  );
};

export const isSocialMedia = (obj: unknown): obj is SocialMedia => {
  if (!isObject(obj)) return false;
  return (
    typeof obj.githubUsername === "string" &&
    typeof obj.mediumUsername === "string" &&
    typeof obj.twitterUsername === "string" &&
    typeof obj.linkedinUsername === "string"
  );
};

export const isAbout = (obj: unknown): obj is About => {
  if (!isObject(obj)) return false;
  return (
    isSocialMedia(obj.socialMedia) &&
    typeof obj.header === "string" &&
    typeof obj.pronouns === "string" &&
    Array.isArray(obj.introductions) &&
    obj.introductions.every((item) => typeof item === "string") &&
    Array.isArray(obj.lifestyle) &&
    obj.lifestyle.every((item) => isLifeStyle(item)) &&
    Array.isArray(obj.programmingLanguage) &&
    obj.programmingLanguage.every((item) => isTechStack(item)) &&
    Array.isArray(obj.devOps) &&
    obj.devOps.every((item) => isTechStack(item))
  );
};

export const isObject = (
  object: unknown,
): object is Record<string, unknown> => {
  return (
    typeof object === "object" && object !== null && !Array.isArray(object)
  );
};
