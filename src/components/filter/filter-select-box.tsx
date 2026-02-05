"use client";

import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

interface FilterSelectBoxProps {
  path: string;
  selectedTag: string;
  blogTags: string[];
}

function FilterSelectBox({
  path,
  selectedTag,
  blogTags,
}: FilterSelectBoxProps) {
  const [isSelectActive, setIsSelectActive] = useState(false);

  return (
    <div className="filter-select-box">
      <button
        className={`filter-select ${isSelectActive ? "active" : ""}`}
        onClick={() => setIsSelectActive(!isSelectActive)}
      >
        <div className="select-value">{selectedTag || "Select category"}</div>
        <div className="select-icon">
          <MdExpandMore />
        </div>
      </button>
      {isSelectActive && (
        <ul className="select-list">
          {blogTags.map((tag: string) => (
            <li className="select-item" key={tag}>
              <button
                onClick={() => {
                  setIsSelectActive(false);
                }}
              >
                <ViewTransitionsProgressBarLink
                  href={`${path}?tag=${encodeURIComponent(tag)}`}
                >
                  {tag}
                </ViewTransitionsProgressBarLink>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterSelectBox;
export { FilterSelectBox };
