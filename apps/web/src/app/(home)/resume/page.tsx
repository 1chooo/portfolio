import React from "react";

import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import ResumeTimeLine from "@/components/section/resume-timeline";

import type { ResumeTimeLineType } from "@/types/resume";

import config from "@/config";

const { title, resumes } = config;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <PageTitle title="Resume" />
      {(Object.entries(resumes) as [string, ResumeTimeLineType][]).map(
        ([key, resumeTimeLine]) => (
          <ResumeTimeLine
            key={key}
            icon={resumeTimeLine.icon}
            title={resumeTimeLine.title}
            resumeCards={resumeTimeLine.resumeCards}
          />
        ),
      )}
    </article>
  );
}
