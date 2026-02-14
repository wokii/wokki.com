"use client";

import Image from "next/image";

export default function ChristineThemeImage() {
  return (
    <>
      <Image
        src="/mcn/christine-day.JPG"
        alt="Christine Hui full-body portrait"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className="theme-image-day object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] opacity-100 scale-100"
      />
      <Image
        src="/mcn/christine-night.JPG"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className="theme-image-night object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] opacity-0 scale-[1.01]"
      />
    </>
  );
}
