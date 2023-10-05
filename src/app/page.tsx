/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Preloader from "../components/Preloader";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingLogo, setIsShowingLogo] = useState(false);
  const [isShowingPieces, setIsShowingPieces] = useState(false);
  const [scroll, setScroll] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Scroll position:", latest);
    setScroll(latest);
  });

  const triggerImage = () => {
    setTimeout(() => {
      setIsShowingLogo(true);
      setTimeout(() => {
        setIsShowingPieces(true);
      }, 500);
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
    <main className="bg-parallax relative flex h-screen w-screen items-center justify-center bg-cover bg-fixed">
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      <div id="intro" className="relative flex h-screen w-screen items-center justify-center">
        <div className={`select-none transition-opacity delay-150 duration-1000 ${isShowingLogo ? "opacity-100" : "opacity-0"}`}>
          <Image width="300" height="100" src="/logo.svg" alt="sim" />
        </div>
        <div
          className={`absolute bottom-20 flex w-full select-none justify-center transition-opacity delay-1000 duration-1000 ${
            isShowingLogo ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image width="40" height="100" src="/mouse_animation.gif" alt="sim" className="opacity-50" />
        </div>
      </div>

      <Parallax pages={5}>
        <ParallaxLayer sticky={{ start: 0, end: 1 }} onScroll={(e: any) => console.log(e)}>
          <div className={`select-none transition-all delay-150 duration-1000 ${isShowingPieces ? "opacity-100" : "opacity-0"}`}>
            <Image width="300" height="100" src="/branco.png" alt="sim" className="white-piece" />
          </div>
          <div className={`select-none transition-all delay-150 duration-1000 ${isShowingPieces ? "opacity-100" : "opacity-0"}`}>
            <Image width="350" height="100" src="/preto.png" alt="sim" className="black-piece" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2}>
          <div className="flex h-screen flex-shrink-0 items-center justify-center bg-black"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <div className="flex h-screen flex-shrink-0 items-center justify-center bg-blue-200"></div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}
