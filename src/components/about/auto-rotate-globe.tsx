"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";
import { getIcon, ICON_NAMES } from "@/components/icons";

function AutoRotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const fadeMask =
    "radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)";
  const rotationRef = useRef<number>(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let globe: ReturnType<typeof createGlobe>;

    const onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        canvasRef.current.width = width * 2;
        canvasRef.current.height = width * 2;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 2,
      mapSamples: 12_000,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 0.85, 0.42],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: [25.105497, 121.597366], size: 0.1 }],
      scale: 1.05,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          // Auto-rotate when not interacting
          currentPhi += 0.005;
        }
        state.phi = currentPhi + r.get();
        state.width = width * 2;
        state.height = width * 2;
        rotationRef.current = currentPhi;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [r]);

  const Map = getIcon(ICON_NAMES.MAP_PIN_LU);

  return (
    <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[380px]">
      <div className="flex items-center gap-2 text-white-2 mt-4 ml-4">
        <Map size={24} />
        <h2 className="text-sm font-light">Taipei, Taiwan (UTC +08:00)</h2>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          placeItems: "center",
          placeContent: "center",
          overflow: "visible",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            maxWidth: 800,
            WebkitMaskImage: fadeMask,
            maskImage: fadeMask,
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current)
                canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 200,
                });
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                api.start({
                  r: delta / 100,
                });
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              contain: "layout paint size",
              cursor: "grab",
              userSelect: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { AutoRotatingGlobe };
export default AutoRotatingGlobe;
