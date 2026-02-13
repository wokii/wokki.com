"use client";

import Image from "next/image";
import { useTheme } from "../theme-provider";

type WokkiThemeImageProps = {
  daySrc: string;
  nightSrc: string;
  alt: string;
};

export default function WokkiThemeImage({
  daySrc,
  nightSrc,
  alt,
}: WokkiThemeImageProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Image
        src={daySrc}
        alt={alt}
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className={`object-cover object-top transition-all duration-700 ease-out ${
          isDark
            ? "opacity-0 scale-[1.14]"
            : "opacity-100 scale-[1.14] group-hover:scale-[1.16]"
        }`}
      />
      <Image
        src={nightSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className={`object-cover object-top transition-all duration-700 ease-out ${
          isDark
            ? "opacity-100 scale-[1.26] group-hover:scale-[1.28]"
            : "opacity-0 scale-[1.16]"
        }`}
      />
    </>
  );
}
