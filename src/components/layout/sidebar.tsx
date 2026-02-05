import Link from "next/link";
import Image from "next/image";

import Footer from "@/components/layout/footer";
import IconBox from "@/components/icon-box";

import type { Contact } from "@/types/config";

import styles from "@/styles/layout/sidebar.module.css";

interface SidebarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
}

function Sidebar({
  avatar,
  firstName,
  lastName,
  preferredName,
  status,
  contacts,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar} data-sidebar>
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
              <span className={styles.contactContent}>{content}</span>
            );

            return (
              <li key={index} className={styles.contactItem}>
                <IconBox iconName={icon} />
                <div className={styles.contactInfoContainer}>
                  <p className={styles.contactTitle}>{title}</p>
                  {ContentElement}
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.separator}></div>
        <Footer />
      </div>
    </aside>
  );
}

export default Sidebar;
export { Sidebar };
