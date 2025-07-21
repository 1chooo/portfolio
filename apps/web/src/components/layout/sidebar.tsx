"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useRef } from "react";
import { MdExpandMore } from "react-icons/md";

import Footer from "@/components/layout/footer";
import IconBox from "@/components/icon-box";
import { getIcon } from "@/components/icons";

import type { Contact, SocialLink } from "@/types/config";

import styles from "@/styles/layout/sidebar.module.css";

interface SidebarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
  socialLinks?: SocialLink[];
}

function Sidebar({
  avatar,
  firstName,
  lastName,
  preferredName,
  status,
  contacts,
  socialLinks,
}: SidebarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const sideBarState = `${styles.sidebar} ${isActive ? styles.sidebarActive : ""}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <div className={styles.sidebarInfo}>
        <figure className={styles.avatarBox}>
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
        <div>
          <h1
            className={styles.name}
            title={`${firstName} (${preferredName}) ${lastName}`}
          >
            {firstName} ({preferredName}) {lastName}
          </h1>
          <p className={styles.title}>{status}</p>
        </div>

        <button
          className={styles.infoMoreBtn}
          onClick={handleSidebarToggle}
          data-sidebar-btn
        >
          <span>Show Contacts</span>
          <MdExpandMore />
        </button>
      </div>

      <div className={styles.sidebarInfoMore}>
        <div className={styles.separator}></div>
        <ul className={styles.contactsList}>
          {contacts?.map((contact, index) => {
            const { icon, title, content, link } = contact;

            const ContentElement = link ? (
              <Link
                href={link}
                className={styles.contactContentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            ) : (
              <span className={styles.contactContent}>
                {content}
              </span>
            );

            return (
              <li key={index} className={styles.contactItem}>
                <IconBox iconName={icon} />
                <div className={styles.contactInfoContainer}>
                  <p className={styles.contactTitle}>
                    {title}
                  </p>
                  {ContentElement}
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.separatorNoLine}></div>
        <ul className={styles.socialLinksContainer}>
          {socialLinks?.map(({ url, icon }) => {
            const Icon = getIcon(icon);
            return (
              <li
                key={icon}
                className={styles.socialLinkItem}
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
        <div className={styles.separatorFooter}></div>
        <Footer />
      </div>
    </aside>
  );
}

export default Sidebar;
export { Sidebar };
