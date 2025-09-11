import OGImageGenerator from "./og-image-generator";
import PageTitle from "@/components/page-title";

export const metadata = {
  title: "Chun-Ho (Hugo) Lin",
  description:
    "I am a first-year M.S. student in Computer Science at the [USC Viterbi School of Engineering](https://viterbischool.usc.edu/) ✌️. I graduated with a B.S. in Atmospheric Sciences from the [National Central University](https://www.ncu.edu.tw/) 🐿️.".slice(
      0,
      100,
    ) + "...",
  openGraph: {
    title: "Chun-Ho (Hugo) Lin",
    description:
      "I am a first-year M.S. student in Computer Science at the [USC Viterbi School of Engineering](https://viterbischool.usc.edu/) ✌️. I graduated with a B.S. in Atmospheric Sciences from the [National Central University](https://www.ncu.edu.tw/) 🐿️.".slice(
        0,
        100,
      ) + "...",
    url: "https://1chooo.com",
    siteName: "1chooo.com",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chun-Ho (Hugo) Lin",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <article>
      <PageTitle title={"OG Image Generator"} />
      <OGImageGenerator />
    </article>
  );
}
