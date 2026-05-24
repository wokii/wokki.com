import { createReadStream, statSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const VIDEO_PATH = join(process.cwd(), "src/app/c/c.MP4");

export async function GET(request: NextRequest) {
  const stat = statSync(VIDEO_PATH);
  const range = request.headers.get("range");

  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range);
    if (!match) {
      return new NextResponse(null, { status: 416 });
    }

    const start = Number.parseInt(match[1], 10);
    const end = match[2] ? Number.parseInt(match[2], 10) : stat.size - 1;
    const chunkSize = end - start + 1;
    const stream = createReadStream(VIDEO_PATH, { start, end });

    return new NextResponse(stream as unknown as BodyInit, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
      },
    });
  }

  const stream = createReadStream(VIDEO_PATH);

  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Length": String(stat.size),
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
    },
  });
}
