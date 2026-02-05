import React, { JSX } from "react";
import slugify from "@/lib/slugify";
import { IoLink } from "react-icons/io5";

interface HeaderProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

function AnchorHeader({ level, children, ...props }: HeaderProps) {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;
  let id = slugify(children?.toString() ?? "", { lower: true });

  let getMargins = (level: number) => {
    switch (level) {
      case 1:
        return "text-3xl text-white-2 font-bold mt-14 mb-10";
      case 2:
        return "text-2xl text-white-2 font-bold mt-12 mb-8";
      case 3:
        return "text-xl text-white-2 font-bold mt-10 mb-6";
      case 4:
        return "text-lg text-white-2 font-semibold mt-8 mb-4";
      case 5:
        return "text-base text-white-2 font-semibold mt-6 mb-3";
      case 6:
        return "text-sm text-white-2 font-semibold mt-4 mb-2";
      case 7:
        return "text-xs text-white-2 font-semibold mt-4 mb-2";
      default:
        return "";
    }
  };

  let margins = getMargins(level);

  return (
    <Tag
      id={id}
      className={`relative group cursor-pointer ${margins}`}
      {...props}
    >
      <a
        href={`#${id}`}
        className="no-underline text-[#d6d6d6] hover:underline flex items-center"
      >
        <span className="absolute left-[-2.0rem] top-[0.2rem] opacity-0 transition-opacity duration-200 ease-in-out scale-90 group-hover:opacity-100">
          <IoLink />
        </span>
      </a>
      {children}
    </Tag>
  );
}

export default AnchorHeader;
