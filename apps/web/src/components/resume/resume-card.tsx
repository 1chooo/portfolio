"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BriefcaseIcon } from "lucide-react";
import { getIcon } from "@/components/icons";

import {
  parseItalic,
  parseBold,
  parseHeadings,
  parseStrikethrough,
  parseBlockquote,
  parseInlineCode,
  parseHorizontalRule,
  parseHighlight,
  parseLinks,
  parseImages,
  parseUnorderedList,
} from "@/lib/markdown-parser";

import { cn } from "@1chooo/ui/lib/utils";

import type { ResumeCardType } from "@/types/resume";

import "@/styles/resume-card.css";

interface ResumeCardProps {
  resumeCard: ResumeCardType;
}

const parseMarkdown = (markdownText: string) => {
  const unorderedListProcessedText = parseUnorderedList(markdownText);
  const lines = unorderedListProcessedText.split("\n");

  return lines.map((line, index) => {
    const key = `line-${index}`;

    if (
      line.startsWith("<li>") ||
      line.startsWith("</ul>") ||
      line.startsWith("<ul>")
    ) {
      return (
        <div
          className={cn("markdown")}
          key={key}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      );
    }

    const element =
      parseHorizontalRule(line) || parseBlockquote(line) || parseHeadings(line);

    if (element) {
      return React.cloneElement(element, { key });
    }

    let parsedLine = parseBold(line);
    parsedLine = parseItalic(parsedLine);
    parsedLine = parseStrikethrough(parsedLine);
    parsedLine = parseInlineCode(parsedLine);
    parsedLine = parseHighlight(parsedLine);
    parsedLine = parseImages(parsedLine);
    parsedLine = parseLinks(parsedLine);

    return (
      <p
        className={cn("markdown")}
        key={key}
        dangerouslySetInnerHTML={{ __html: parsedLine }}
      />
    );
  });
};

export default function ResumeCard({ resumeCard }: ResumeCardProps) {
  const { institution, institutionImage, title, tags } = resumeCard;
  const [activeResumeCard, setActiveResumeCard] =
    useState<ResumeCardType | null>(null);

  const openModal = (resumeCard: ResumeCardType) => {
    setActiveResumeCard(resumeCard);
  };

  const closeModal = () => {
    setActiveResumeCard(null);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (activeResumeCard) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [activeResumeCard]);

  return (
    <>
      <section
        className="hover:scale-105 duration-300"
        onClick={() => openModal(resumeCard)}
      >
        <div className="resume-card">
          <div className="flex flex-row items-center gap-4 p-6 pb-4 cursor-pointer transition-colors rounded-t-md">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={institutionImage || "/favicon.ico"}
                alt={institution}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/favicon.ico?height=40&width=40";
                  e.currentTarget.onerror = null;
                }}
                width={40}
                height={40}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="font-semibold text-white-1 truncate">
                {institution}
              </div>
              <div className="text-sm text-light-gray truncate">{title}</div>
            </div>
          </div>

          <div className="px-6 pb-2 cursor-pointer transition-colors rounded-b-md">
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                const TagIcon = getIcon(tag.icon) || BriefcaseIcon;
                return (
                  <span
                    key={`${tag.key}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700"
                  >
                    <TagIcon className="h-3 w-3" />
                    {tag.value}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeResumeCard && (
        <div
          className="resume-card-modal-container active"
          aria-modal="true"
          role="dialog"
        >
          <div
            className={`resume-card-overlay ${activeResumeCard ? "active" : ""}`}
            onClick={closeModal}
          ></div>
          <section className="resume-card-modal">
            <button
              className="resume-card-modal-close-btn"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="resume-card-modal-img-wrapper">
              <figure className="resume-card-modal-avatar-box">
                <Image
                  src={resumeCard.institutionImage || "/favicon.ico"}
                  alt={resumeCard.institution}
                  width={80}
                  height={80}
                  className="resume-card-modal-avatar"
                  onError={(e) => {
                    e.currentTarget.src = "/favicon.ico?height=80&width=80";
                    e.currentTarget.onerror = null;
                  }}
                />
              </figure>
            </div>

            <div>
              <h1 className="font-semibold text-white-1 text-2xl mb-1">
                {resumeCard.institution}
              </h1>
              <h2 className="text-lg text-light-gray mb-4">
                {resumeCard.title}
              </h2>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {resumeCard.tags.map((tag, index) => {
                    const TagIcon = getIcon(tag.icon) || BriefcaseIcon;
                    return (
                      <span
                        key={`modal-${tag.key}-${index}`}
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium text-orange-yellow-crayola border-gray-700 bg-gray-800/30"
                      >
                        <TagIcon className="h-4 w-4" />
                        {tag.value}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <ul className="text-light-gray list-disc pl-5">
                  {resumeCard.details.map((item, index) => (
                    <li key={index}>{parseMarkdown(item)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
