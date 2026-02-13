"use client";

import Image from "next/image";

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
  return (
    <>
      <Image
        src={daySrc}
        alt={alt}
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className="object-cover object-top transition-all duration-700 ease-out opacity-100 scale-[1.14] group-hover:scale-[1.16] dark:opacity-0"
      />
      <Image
        src={nightSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className="object-cover object-top transition-all duration-700 ease-out opacity-0 scale-[1.16] dark:opacity-100 dark:scale-[1.26] dark:group-hover:scale-[1.28]"
      />
    </>
  );
}
