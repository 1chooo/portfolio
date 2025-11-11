import React from "react";

import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import ResumeTimeLine from "@/components/section/resume-timeline";
import { getResumePosts } from "@/lib/api/mdx";
import { RESUME_DIRECTORY } from "@/lib/constants";
import { ICON_NAMES } from "@/components/icons";

import config from "@/config";

const { title } = config;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  const resumePosts = getResumePosts(RESUME_DIRECTORY);

  // Group by category
  const educationPosts = resumePosts.filter(
    (post) => post.category === "Education",
  );
  const experiencePosts = resumePosts.filter(
    (post) => post.category === "Experience",
  );

  return (
    <article>
      <PageTitle title="Resume" />

      {educationPosts.length > 0 && (
        <ResumeTimeLine
          icon={ICON_NAMES.GRADUATION_CAP}
          title="Education"
          resumePosts={educationPosts}
        />
      )}

      {experiencePosts.length > 0 && (
        <ResumeTimeLine
          icon={ICON_NAMES.BRIEFCASE}
          title="Internship Experiences"
          resumePosts={experiencePosts}
        />
      )}
    </article>
  );
}
