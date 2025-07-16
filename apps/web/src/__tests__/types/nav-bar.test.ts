import { describe, it, expect, expectTypeOf } from "vitest";
import type { NavigationLink } from "@/types/nav-bar";

describe("NavigationLink Type Tests", () => {
  describe("type structure", () => {
    it("should have correct property types", () => {
      expectTypeOf<NavigationLink>().toMatchTypeOf<{
        path: string;
        label: string;
      }>();
    });

    it("should require path property as string", () => {
      expectTypeOf<NavigationLink["path"]>().toBeString();
    });

    it("should require label property as string", () => {
      expectTypeOf<NavigationLink["label"]>().toBeString();
    });

    it("should have exactly two properties", () => {
      expectTypeOf<keyof NavigationLink>().toEqualTypeOf<"path" | "label">();
    });
  });

  describe("type compatibility", () => {
    it("should accept valid NavigationLink objects", () => {
      const validLink: NavigationLink = {
        path: "/home",
        label: "Home",
      };

      expectTypeOf(validLink).toMatchTypeOf<NavigationLink>();
      expect(validLink).toEqual({
        path: "/home",
        label: "Home",
      });
    });

    it("should accept empty strings", () => {
      const linkWithEmptyStrings: NavigationLink = {
        path: "",
        label: "",
      };

      expectTypeOf(linkWithEmptyStrings).toMatchTypeOf<NavigationLink>();
      expect(linkWithEmptyStrings.path).toBe("");
      expect(linkWithEmptyStrings.label).toBe("");
    });

    it("should accept special characters in strings", () => {
      const linkWithSpecialChars: NavigationLink = {
        path: "/path-with_special.chars?query=123&test=true#anchor",
        label: "Label with 特殊字符 & symbols! 🎉",
      };

      expectTypeOf(linkWithSpecialChars).toMatchTypeOf<NavigationLink>();
      expect(linkWithSpecialChars.path).toContain("special");
      expect(linkWithSpecialChars.label).toContain("特殊字符");
    });
  });

  describe("type validation with runtime tests", () => {
    it("should validate NavigationLink object properties at runtime", () => {
      const createNavigationLink = (
        path: string,
        label: string,
      ): NavigationLink => ({
        path,
        label,
      });

      const link = createNavigationLink("/about", "About");

      expect(typeof link.path).toBe("string");
      expect(typeof link.label).toBe("string");
      expect(link.path).toBe("/about");
      expect(link.label).toBe("About");
    });

    it("should work with array of NavigationLinks", () => {
      const navigationLinks: NavigationLink[] = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
      ];

      expectTypeOf(navigationLinks).toMatchTypeOf<NavigationLink[]>();

      navigationLinks.forEach((link) => {
        expect(typeof link.path).toBe("string");
        expect(typeof link.label).toBe("string");
        expect(link.path).toBeDefined();
        expect(link.label).toBeDefined();
      });
    });

    it("should work as function parameter type", () => {
      const processNavigationLink = (link: NavigationLink): string => {
        return `${link.label}: ${link.path}`;
      };

      const testLink: NavigationLink = {
        path: "/test",
        label: "Test Page",
      };

      const result = processNavigationLink(testLink);
      expect(result).toBe("Test Page: /test");
    });

    it("should work as function return type", () => {
      const createLink = (path: string, label: string): NavigationLink => {
        return { path, label };
      };

      const link = createLink("/blog", "Blog");

      expectTypeOf(link).toMatchTypeOf<NavigationLink>();
      expect(link).toEqual({
        path: "/blog",
        label: "Blog",
      });
    });
  });

  describe("edge cases", () => {
    it("should handle very long strings", () => {
      const longPath = "/" + "a".repeat(1000);
      const longLabel = "Label " + "b".repeat(1000);

      const linkWithLongStrings: NavigationLink = {
        path: longPath,
        label: longLabel,
      };

      expectTypeOf(linkWithLongStrings).toMatchTypeOf<NavigationLink>();
      expect(linkWithLongStrings.path).toHaveLength(1001);
      expect(linkWithLongStrings.label).toHaveLength(1006);
    });

    it("should handle Unicode characters", () => {
      const unicodeLink: NavigationLink = {
        path: "/路径/测试",
        label: "标签 🚀 émojis ñ",
      };

      expectTypeOf(unicodeLink).toMatchTypeOf<NavigationLink>();
      expect(unicodeLink.path).toBe("/路径/测试");
      expect(unicodeLink.label).toContain("🚀");
    });
  });
});
