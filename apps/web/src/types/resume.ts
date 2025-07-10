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
