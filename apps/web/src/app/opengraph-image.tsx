import { ImageResponse } from "next/og";

export const alt = "Chun-Ho (Hugo) Lin - 1chooo";
export const size = {
  width: 1920,
  height: 1080,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage:
            "url(https://docs.1chooo.com/images/cover-with-1chooo-com.png)",
        }}
      ></div>
    ),
    {
      ...size,
    },
  );
}
