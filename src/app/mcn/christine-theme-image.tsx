"use client";

import Image from "next/image";
import { useTheme } from "../theme-provider";

export default function ChristineThemeImage() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Image
        src="/mcn/christine-day.JPG"
        alt="Christine Hui full-body portrait"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${
          isDark ? "opacity-0 scale-[1.01]" : "opacity-100 scale-100"
        }`}
      />
      <Image
        src="/mcn/christine-night.JPG"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 35vw, 92vw"
        className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
        }`}
      />
    </>
  );
}
