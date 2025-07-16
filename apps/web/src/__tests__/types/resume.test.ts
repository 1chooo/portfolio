import { describe, it, expect, expectTypeOf } from "vitest";
import type {
  TagType,
  ResumeCardType,
  ResumeTimeLineType,
  Resumes,
} from "@/types/resume";

describe("Resume Types Tests", () => {
  describe("TagType", () => {
    describe("type structure", () => {
      it("should have correct property types", () => {
        expectTypeOf<TagType>().toEqualTypeOf<{
          key: string;
          value: string;
          icon: string;
          color?: string;
        }>();
      });

      it("should require key property as string", () => {
        expectTypeOf<TagType["key"]>().toBeString();
      });

      it("should require value property as string", () => {
        expectTypeOf<TagType["value"]>().toBeString();
      });

      it("should require icon property as string", () => {
        expectTypeOf<TagType["icon"]>().toBeString();
      });

      it("should have optional color property as string", () => {
        expectTypeOf<TagType["color"]>().toEqualTypeOf<string | undefined>();
      });
    });

    describe("type compatibility", () => {
      it("should accept valid TagType without color", () => {
        const validTag: TagType = {
          key: "skill",
          value: "TypeScript",
          icon: "typescript-icon",
        };

        expectTypeOf(validTag).toEqualTypeOf<TagType>();
        expect(validTag.key).toBe("skill");
        expect(validTag.value).toBe("TypeScript");
        expect(validTag.icon).toBe("typescript-icon");
        expect(validTag.color).toBeUndefined();
      });

      it("should accept valid TagType with color", () => {
        const validTagWithColor: TagType = {
          key: "framework",
          value: "React",
          icon: "react-icon",
          color: "#61DAFB",
        };

        expectTypeOf(validTagWithColor).toEqualTypeOf<TagType>();
        expect(validTagWithColor.color).toBe("#61DAFB");
      });

      it("should work with array of TagType", () => {
        const tags: TagType[] = [
          { key: "lang", value: "JavaScript", icon: "js-icon" },
          {
            key: "lang",
            value: "Python",
            icon: "python-icon",
            color: "#3776ab",
          },
        ];

        expectTypeOf(tags).toEqualTypeOf<TagType[]>();
        expect(tags).toHaveLength(2);
        expect(tags[0].color).toBeUndefined();
        expect(tags[1].color).toBe("#3776ab");
      });
    });
  });

  describe("ResumeCardType", () => {
    describe("type structure", () => {
      it("should have correct property types", () => {
        expectTypeOf<ResumeCardType>().toEqualTypeOf<{
          institution: string;
          institutionImage: string;
          title: string;
          tags: TagType[];
          details: string[];
        }>();
      });

      it("should require institution property as string", () => {
        expectTypeOf<ResumeCardType["institution"]>().toBeString();
      });

      it("should require institutionImage property as string", () => {
        expectTypeOf<ResumeCardType["institutionImage"]>().toBeString();
      });

      it("should require title property as string", () => {
        expectTypeOf<ResumeCardType["title"]>().toBeString();
      });

      it("should require tags property as TagType array", () => {
        expectTypeOf<ResumeCardType["tags"]>().toEqualTypeOf<TagType[]>();
      });

      it("should require details property as string array", () => {
        expectTypeOf<ResumeCardType["details"]>().toEqualTypeOf<string[]>();
      });
    });

    describe("type compatibility", () => {
      it("should accept valid ResumeCardType", () => {
        const validCard: ResumeCardType = {
          institution: "Tech University",
          institutionImage: "/images/tech-uni.png",
          title: "Bachelor of Computer Science",
          tags: [
            { key: "field", value: "Computer Science", icon: "cs-icon" },
            {
              key: "level",
              value: "Bachelor",
              icon: "degree-icon",
              color: "#0066cc",
            },
          ],
          details: [
            "Graduated with honors",
            "GPA: 3.8/4.0",
            "Relevant coursework: Data Structures, Algorithms",
          ],
        };

        expectTypeOf(validCard).toEqualTypeOf<ResumeCardType>();
        expect(validCard.institution).toBe("Tech University");
        expect(validCard.tags).toHaveLength(2);
        expect(validCard.details).toHaveLength(3);
      });

      it("should accept empty arrays for tags and details", () => {
        const cardWithEmptyArrays: ResumeCardType = {
          institution: "Some Institution",
          institutionImage: "/image.png",
          title: "Some Title",
          tags: [],
          details: [],
        };

        expectTypeOf(cardWithEmptyArrays).toEqualTypeOf<ResumeCardType>();
        expect(cardWithEmptyArrays.tags).toEqual([]);
        expect(cardWithEmptyArrays.details).toEqual([]);
      });

      it("should work with array of ResumeCardType", () => {
        const cards: ResumeCardType[] = [
          {
            institution: "University A",
            institutionImage: "/a.png",
            title: "Degree A",
            tags: [{ key: "type", value: "Education", icon: "edu-icon" }],
            details: ["Detail A"],
          },
          {
            institution: "Company B",
            institutionImage: "/b.png",
            title: "Position B",
            tags: [{ key: "type", value: "Work", icon: "work-icon" }],
            details: ["Detail B1", "Detail B2"],
          },
        ];

        expectTypeOf(cards).toEqualTypeOf<ResumeCardType[]>();
        expect(cards).toHaveLength(2);
      });
    });
  });

  describe("ResumeTimeLineType", () => {
    describe("type structure", () => {
      it("should have correct property types", () => {
        expectTypeOf<ResumeTimeLineType>().toMatchTypeOf<{
          icon: string;
          title: string;
          resumeCards: ResumeCardType[];
          iconName: string;
        }>();
      });

      it("should require icon property as string", () => {
        expectTypeOf<ResumeTimeLineType["icon"]>().toBeString();
      });

      it("should require title property as string", () => {
        expectTypeOf<ResumeTimeLineType["title"]>().toBeString();
      });

      it("should require resumeCards property as ResumeCardType array", () => {
        expectTypeOf<ResumeTimeLineType["resumeCards"]>().toEqualTypeOf<
          ResumeCardType[]
        >();
      });

      it("should require iconName property as string", () => {
        expectTypeOf<ResumeTimeLineType["iconName"]>().toBeString();
      });
    });

    describe("type compatibility", () => {
      it("should accept valid ResumeTimeLineType", () => {
        const validTimeline: ResumeTimeLineType = {
          icon: "🎓",
          title: "Education",
          iconName: "graduation-cap",
          resumeCards: [
            {
              institution: "MIT",
              institutionImage: "/mit.png",
              title: "Computer Science",
              tags: [{ key: "field", value: "CS", icon: "cs-icon" }],
              details: ["Top student"],
            },
          ],
        };

        expectTypeOf(validTimeline).toMatchTypeOf<ResumeTimeLineType>();
        expect(validTimeline.icon).toBe("🎓");
        expect(validTimeline.title).toBe("Education");
        expect(validTimeline.resumeCards).toHaveLength(1);
      });

      it("should accept empty resumeCards array", () => {
        const timelineWithEmptyCards: ResumeTimeLineType = {
          icon: "💼",
          title: "Work Experience",
          iconName: "briefcase",
          resumeCards: [],
        };

        expectTypeOf(
          timelineWithEmptyCards,
        ).toMatchTypeOf<ResumeTimeLineType>();
        expect(timelineWithEmptyCards.resumeCards).toEqual([]);
      });
    });
  });

  describe("Resumes", () => {
    describe("type structure", () => {
      it("should be a record with string keys and ResumeTimeLineType values", () => {
        expectTypeOf<Resumes>().toEqualTypeOf<
          Record<string, ResumeTimeLineType>
        >();
      });

      it("should accept string keys", () => {
        // Test that we can access with string keys
        type TestKey = "education" | "experience";
        expectTypeOf<TestKey>().toMatchTypeOf<keyof Resumes>();
      });

      it("should have ResumeTimeLineType values", () => {
        expectTypeOf<Resumes[string]>().toEqualTypeOf<ResumeTimeLineType>();
      });
    });

    describe("type compatibility", () => {
      it("should accept valid Resumes object", () => {
        const validResumes: Resumes = {
          education: {
            icon: "🎓",
            title: "Education",
            iconName: "graduation-cap",
            resumeCards: [
              {
                institution: "Stanford University",
                institutionImage: "/stanford.png",
                title: "MS Computer Science",
                tags: [
                  { key: "degree", value: "Masters", icon: "master-icon" },
                  {
                    key: "field",
                    value: "AI/ML",
                    icon: "ai-icon",
                    color: "#ff6b6b",
                  },
                ],
                details: [
                  "Specialized in Machine Learning",
                  "Thesis on Neural Networks",
                  "GPA: 3.9/4.0",
                ],
              },
            ],
          },
          experience: {
            icon: "💼",
            title: "Work Experience",
            iconName: "briefcase",
            resumeCards: [
              {
                institution: "Google",
                institutionImage: "/google.png",
                title: "Software Engineer",
                tags: [
                  { key: "role", value: "SWE", icon: "code-icon" },
                  {
                    key: "team",
                    value: "Search",
                    icon: "search-icon",
                    color: "#4285f4",
                  },
                ],
                details: [
                  "Developed search algorithms",
                  "Improved performance by 20%",
                  "Led team of 5 engineers",
                ],
              },
            ],
          },
        };

        expectTypeOf(validResumes).toMatchTypeOf<Resumes>();
        expect(Object.keys(validResumes)).toContain("education");
        expect(Object.keys(validResumes)).toContain("experience");
        expect(validResumes.education.title).toBe("Education");
        expect(validResumes.experience.resumeCards).toHaveLength(1);
      });

      it("should accept empty Resumes object", () => {
        const emptyResumes: Resumes = {};

        expectTypeOf(emptyResumes).toMatchTypeOf<Resumes>();
        expect(Object.keys(emptyResumes)).toEqual([]);
      });

      it("should work with dynamic keys", () => {
        const dynamicResumes: Resumes = {};

        dynamicResumes["projects"] = {
          icon: "🚀",
          title: "Projects",
          iconName: "rocket",
          resumeCards: [],
        };

        expectTypeOf(dynamicResumes).toMatchTypeOf<Resumes>();
        expect(dynamicResumes.projects.icon).toBe("🚀");
      });
    });
  });

  describe("Integration Tests", () => {
    it("should work with complex nested structure", () => {
      const createCompleteResume = (): Resumes => {
        return {
          education: {
            icon: "🎓",
            title: "Education",
            iconName: "graduation-cap",
            resumeCards: [
              {
                institution: "MIT",
                institutionImage: "/mit-logo.png",
                title: "PhD in Computer Science",
                tags: [
                  {
                    key: "degree",
                    value: "PhD",
                    icon: "phd-icon",
                    color: "#8e44ad",
                  },
                  { key: "specialization", value: "AI", icon: "ai-icon" },
                ],
                details: [
                  "Research in Deep Learning",
                  "Published 10+ papers",
                  "Teaching Assistant for 3 years",
                ],
              },
            ],
          },
          experience: {
            icon: "💼",
            title: "Professional Experience",
            iconName: "briefcase",
            resumeCards: [
              {
                institution: "OpenAI",
                institutionImage: "/openai-logo.png",
                title: "Senior ML Engineer",
                tags: [
                  {
                    key: "level",
                    value: "Senior",
                    icon: "senior-icon",
                    color: "#2ecc71",
                  },
                  { key: "domain", value: "ML", icon: "ml-icon" },
                ],
                details: [
                  "Worked on GPT models",
                  "Improved training efficiency",
                  "Mentored junior engineers",
                ],
              },
            ],
          },
        };
      };

      const resume = createCompleteResume();

      expectTypeOf(resume).toMatchTypeOf<Resumes>();
      expect(resume.education.resumeCards[0].tags).toHaveLength(2);
      expect(resume.experience.resumeCards[0].details).toHaveLength(3);
    });

    it("should validate type constraints at runtime", () => {
      const validateTagType = (tag: TagType): boolean => {
        return (
          typeof tag.key === "string" &&
          typeof tag.value === "string" &&
          typeof tag.icon === "string" &&
          (tag.color === undefined || typeof tag.color === "string")
        );
      };

      const validateResumeCard = (card: ResumeCardType): boolean => {
        return (
          typeof card.institution === "string" &&
          typeof card.institutionImage === "string" &&
          typeof card.title === "string" &&
          Array.isArray(card.tags) &&
          Array.isArray(card.details) &&
          card.tags.every(validateTagType) &&
          card.details.every((detail) => typeof detail === "string")
        );
      };

      const sampleCard: ResumeCardType = {
        institution: "Test University",
        institutionImage: "/test.png",
        title: "Test Degree",
        tags: [
          { key: "test", value: "value", icon: "icon" },
          { key: "test2", value: "value2", icon: "icon2", color: "#123456" },
        ],
        details: ["Detail 1", "Detail 2"],
      };

      expect(validateResumeCard(sampleCard)).toBe(true);
    });
  });
});
