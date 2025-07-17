"use client";

import React, { useState } from "react";
import Image from "next/image";

import styles from "@/styles/md/image.module.css";

import { cn } from "@1chooo/ui/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

function CaptionImage({
  src,
  alt,
  caption,
  priority = false,
  quality = 75,
  ...props
}: ImageProps) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const imageCaption = caption || alt;

  return (
    <span className={cn(styles.imageContainer)}>
      <span
        className={cn(styles.imageFrame)}
        style={{
          maxWidth: "100%",
          aspectRatio: aspectRatio,
        }}
      >
        <Image
          className={cn(styles.responsiveImage)}
          src={src}
          alt={alt ?? "Chun-Ho (Hugo) Lin"}
          fill
          quality={quality}
          priority={priority}
          onLoadingComplete={(target) => {
            setAspectRatio(target.naturalWidth / target.naturalHeight);
          }}
          {...props}
        />
      </span>
      {imageCaption && (
        <span className={cn(styles.imageCaption)}>{imageCaption}</span>
      )}
    </span>
  );
}

export type { ImageProps };
export { CaptionImage };
export default CaptionImage;
