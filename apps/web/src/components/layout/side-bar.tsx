"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef } from "react";
import { MdExpandMore } from "react-icons/md";

import Footer from "@/components/layout/footer";
import IconBox from "@/components/icon-box";
import { getIcon } from "@/components/icons";

import type { Contact, SocialLink } from "@/types/config";

import "@/styles/side-bar.css";

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
  socialLinks?: SocialLink[];
}

function SideBar({
  avatar,
  firstName,
  lastName,
  preferredName,
  status,
  contacts,
  socialLinks,
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? "active" : ""}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <Image
            id={`${firstName} (${preferredName}) ${lastName}`}
            src={avatar}
            alt={`${firstName} (${preferredName}) ${lastName}`}
            width={150}
            height={150}
            quality={50}
            loading="eager"
            priority
          />
        </figure>
        <div className="info-content">
          <h1
            className="name"
            title={`${firstName} (${preferredName}) ${lastName}`}
          >
            {firstName} ({preferredName}) {lastName}
          </h1>
          <p className="title">{status}</p>
        </div>

        <button
          className="info-more-btn"
          onClick={handleSidebarToggle}
          data-sidebar-btn
        >
          <span>Show Contacts</span>
          <MdExpandMore />
        </button>
      </div>

      <div className="sidebar-info-more">
        <div className="separator"></div>
        <ul className="contacts-list">
          {contacts.map((contact, index) => {
            const { icon, title, content, link } = contact;

            const ContentElement = link ? (
              <Link
                href={link}
                className="block text-white-2 text-sm font-light truncate hover:text-orange-yellow-crayola
            transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            ) : (
              <span className="block text-white-2 text-sm font-light truncate">
                {content}
              </span>
            );

            return (
              <li key={index} className="min-w-full flex items-center gap-4">
                <IconBox iconName={icon} />
                <div className="contact-info">
                  <p className="text-light-gray-70 uppercase mb-1 text-xs">
                    {title}
                  </p>
                  {ContentElement}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="separator-no-line"></div>
        <ul className="flex items-center gap-4 pb-1 pl-2 justify-center">
          {socialLinks.map(({ url, icon }) => {
            const Icon = getIcon(icon);
            return (
              <li
                key={icon}
                className="text-light-gray-70 text-lg hover:scale-110 hover:text-orange-yellow-crayola"
              >
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon}
                >
                  <Icon />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="separator-footer"></div>
        <Footer />
      </div>
    </aside>
  );
}

export default SideBar;
export { SideBar };
