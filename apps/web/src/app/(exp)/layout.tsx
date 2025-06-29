import Script from "next/script";
import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

import { VercelNavBar } from "@/components/layout/vercel-navbar";
import SideBar from "@/components/layout/side-bar";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";

import config from "@/config";

import type { JsonLdHtml } from "@/types/json-ld";

import "@/app/globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  preload: false,
});

const {
  googleAnalyticId,
  googleTagManagerId,
  about,
  avatar,
  status,
  navigationLinks,
  jsonLdPerson,
  homeMetaData,
  socialLinks,
  contacts,
} = config;

const { firstName, lastName, middleName, preferredName } = about;

export const metadata: Metadata = homeMetaData;

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

function HomeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body>
        <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
          <Hello />
          <main>
            <SideBar
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
              status={status}
              socialLinks={socialLinks}
              contacts={contacts}
            />
            <div className="main-content">
              <VercelNavBar navigationLinks={navigationLinks} />
              {children}
            </div>
          </main>
        </ProgressBar>
        <Script
          id="application/ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="1chooo-website-jsonld"
        />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={googleAnalyticId as string} />
      <GoogleTagManager gtmId={googleTagManagerId as string} />
    </html>
  );
}

export default HomeLayout;
