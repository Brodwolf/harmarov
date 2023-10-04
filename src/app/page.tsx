/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingLogo, setIsShowingLogo] = useState(false);

  const triggerImage = () => {
    setTimeout(() => {
      setIsShowingLogo(true);
    }, 450);
  };

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        triggerImage();
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <main className="bg-gradient-to-b from-[#0D1D25] to-[#000405]">
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>

      <div id="intro" className="relative flex h-screen flex-shrink-0 flex-col items-center justify-center">
        <div className={`select-none transition-opacity delay-150 duration-1000 ${isShowingLogo ? "opacity-100" : "opacity-0"}`}>
          <Image width="250" height="100" src="/logo.svg" alt="sim" />
        </div>
        <div
          className={`absolute bottom-20 flex w-full select-none justify-center transition-opacity delay-1000 duration-1000 ${
            isShowingLogo ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image width="40" height="100" src="/mouse_animation.gif" alt="sim" className="opacity-50" />
        </div>
      </div>

      <div className="flex h-screen flex-shrink-0 items-center justify-center"></div>

      <div className="flex h-screen flex-shrink-0 items-center justify-center"></div>

      <div className="flex h-screen flex-shrink-0 items-center justify-center"></div>
    </main>
  );
}
