import { BasePost } from "@/types/post";

export type TagType = {
  key: string;
  value: string;
  icon: string;
  color?: string;
};

export type ResumeCardType = {
  institution: string;
  institutionImage: string;
  title: string;
  tags: TagType[];
  details: string[];
};

export type ResumeTimeLineType = {
  icon: string;
  title: string;
  resumeCards: ResumeCardType[];
  iconName: string;
};

export type Resumes = {
  [key: string]: ResumeTimeLineType;
};

// New types for MDX-based resume
export type ResumePost = BasePost & {
  institution: string;
  institutionImage: string;
  tags: TagType[];
  startDate: string;
  endDate?: string; // Optional for ongoing positions
};
