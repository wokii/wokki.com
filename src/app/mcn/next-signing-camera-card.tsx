"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CameraState = "requesting" | "live" | "blocked" | "unavailable" | "idle";

type NextSigningCameraCardProps = {
  className: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function NextSigningCameraCard({
  className,
  eyebrow,
  title,
  description,
}: NextSigningCameraCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>("requesting");
  const [errorText, setErrorText] = useState(
    "Allow camera access to reveal your live profile preview.",
  );

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(
    async (userInitiated = false) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("unavailable");
        setErrorText("This browser does not support camera capture.");
        return;
      }

      setCameraState("requesting");
      setErrorText("Requesting camera permission...");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        stopCamera();
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }

        setCameraState("live");
        setErrorText("Yep, that's you.");
      } catch (error) {
        const errorName =
          error instanceof DOMException ? error.name : "UnknownError";

        if (
          errorName === "NotAllowedError" ||
          errorName === "PermissionDeniedError"
        ) {
          if (!userInitiated) {
            setCameraState("idle");
            setErrorText("Tap the button to allow camera access.");
            return;
          }

          setCameraState("blocked");
          setErrorText(
            "Camera permission is blocked. Allow camera in your browser, then press the button again.",
          );
          return;
        }

        setCameraState("unavailable");
        setErrorText("Camera is unavailable on this device right now.");
      }
    },
    [stopCamera],
  );

  const revokeCameraAccess = useCallback(() => {
    stopCamera();
    setCameraState("idle");
    setErrorText("");
  }, [stopCamera]);

  useEffect(() => {
    void startCamera(false);

    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <article className={`group ${className}`}>
      <div
        className={`absolute inset-0 overflow-hidden rounded-[inherit] ${
          cameraState === "live" ? "bg-black" : "bg-[#1cb8ae]"
        }`}
      >
        {cameraState !== "live" ? (
          <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-12">
            <span
              className="select-none text-[16rem] leading-none font-black text-[#d91f4f] md:text-[20rem]"
              aria-hidden="true"
            >
              ?
            </span>
          </div>
        ) : null}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover [transform:scaleX(-1)]"
          aria-label="Live camera preview"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/28 to-black/45" />
      </div>

      <div className="relative z-10 text-white">
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">
          {eyebrow}
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
          {description}
        </p>
        <div className="mt-6 border-t border-white/20 pt-7">
          {cameraState === "live" ? (
            <div className="relative inline-flex overflow-hidden rounded-full border border-white/45 bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_28px_rgba(255,255,255,0.24),0_10px_30px_rgba(0,0,0,0.35)] transition-shadow duration-300 before:pointer-events-none before:absolute before:-inset-1 before:rounded-full before:border before:border-white/25 before:opacity-70 before:blur-[1.5px] before:content-['']">
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white transition-all duration-300 hover:bg-white/20 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.2)]"
              >
                Speak to us
              </a>
              <button
                type="button"
                onClick={revokeCameraAccess}
                aria-label="Revoke camera access"
                className="inline-flex h-9 w-9 items-center justify-center border-l border-white/30 bg-black/20 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-[#d91f4f]/25 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(217,31,79,0.35)]"
              >
                x
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                void startCamera(true);
              }}
              className="relative rounded-full border border-white/45 bg-white/20 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_28px_rgba(255,255,255,0.24),0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 before:pointer-events-none before:absolute before:-inset-1 before:rounded-full before:border before:border-white/25 before:opacity-70 before:blur-[1.5px] before:content-[''] hover:-translate-y-0.5 hover:bg-white/28 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_0_36px_rgba(255,255,255,0.34),0_14px_38px_rgba(0,0,0,0.4)] active:translate-y-0"
            >
              Wondering who&apos;s next in the roster?
            </button>
          )}
          <p className="mt-3 text-xs leading-relaxed text-white/70">
            {errorText}
          </p>
        </div>
      </div>
    </article>
  );
}
