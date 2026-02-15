"use client";
import dairy from "../public/dairy.svg";
import legumes from "../public/leghumes.svg";
import Tubers from "../public/tubers.svg";
import grains from "../public/grains.svg";
import livestock from "../public/livestock.svg";
import vegetable from "../public/vegetables.svg";
import fertilizer from "../public/fertilizers.svg";
import fruitGrp from "../public/fruitgroup.svg";
import nairabag from "../public/sack-of-naira-removebg-preview 1.svg";
import Image from "next/image";
import {
  Button,
} from "@nextui-org/react";
import { useContext } from "react";
import { AppContext } from "@/utils/AppContext";
import Flash from "../public/flash.svg";
import ProductGrid from "@/components/ProductGrid";
import { useCountdown } from "@/lib/useCountdown";
import { StorageKeys } from "@/lib/storage";
import { pad2 } from "@/lib/format";

const MAIN_COUNTDOWN_MS = 24 * 60 * 60 * 1000;
const FLASH_SALE_MS = 6 * 60 * 60 * 1000;

export default function Home() {
  const { list, count } = useContext(AppContext);

  const countdown = useCountdown({
    durationMs: MAIN_COUNTDOWN_MS,
    storageKey: StorageKeys.mainCountdownEnd,
  });
  const flashSaleCountdown = useCountdown({
    durationMs: FLASH_SALE_MS,
    storageKey: StorageKeys.flashSaleEnd,
  });

  const isCountdownUrgent =
    countdown.hours === 0 && countdown.minutes < 10 && !countdown.isComplete;
  const isFlashSaleUrgent =
    flashSaleCountdown.hours === 0 &&
    flashSaleCountdown.minutes < 10 &&
    !flashSaleCountdown.isComplete;
  const isMainCountdownComplete = countdown.isComplete;

  return (
    <div className="mx-auto flex flex-col w-full">
      <div className=" m-auto flex-col flex gap-3 lg:flex-row sm:flex-col w-full pt-10 max-w-[1280px] px-6 py-10 ">
        <div className="flex lg:w-[70%] md:w-full gap-2">
          <div className="w-[50px] sm:w-[30%] border-black border rounded-md">
            <div className="px-2 sm:px-6  py-3 flex flex-col gap-4   max-w-[200px]">
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={dairy}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Dairy products</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={legumes}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Legumes</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={Tubers}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Tubers</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={grains}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Grains</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={livestock}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Livestock</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={vegetable}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Vegetables</span>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <Image
                  className="mx-auto sm:m-0"
                  src={fertilizer}
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <span className="hidden sm:flex">Fertilizers</span>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex justify-between w-[91%] bg-[#3E382E] rounded-md pl-2  z-[2] relative blend bg-no-repeat bg-blend-multiply ">
            <div className="flex flex-col gap-3 lg:pl-5 py-3">
              <div>
                <span className="text-[#38B419]">Categories</span>
                <h1 className="text-3xl font-semibold text-white max-w-[300px]">
                  Enhance Your <span className="text-[#38B419]">Plant</span>{" "}
                  Growth Experience
                </h1>
                <p className="text-[#38B419]">
                  The Best Fertilizer Nature Can Offer
                </p>
              </div>
              <div className="flex gap-2 text-black flex-wrap sm:flex-nowrap">
                <div className={`flex flex-col justify-center items-center bg-white rounded-full w-[52px] h-[52px] pb-[6px] leading-[16px] shadow-lg hover:scale-105 transition-transform duration-200 ${isCountdownUrgent ? 'animate-pulse bg-red-100' : ''}`}>
                  <span suppressHydrationWarning className="font-bold text-lg">
                    {countdown.days}
                  </span>
                  <span className="text-[11px] font-medium">Days</span>
                </div>
                <div className={`flex flex-col justify-center items-center bg-white rounded-full w-[52px] h-[52px] pb-[6px] leading-[16px] shadow-lg hover:scale-105 transition-transform duration-200 ${isCountdownUrgent ? 'animate-pulse bg-red-100' : ''}`}>
                  <span suppressHydrationWarning className="font-bold text-lg">
                    {countdown.hours}
                  </span>
                  <span className="text-[11px] font-medium">Hours</span>
                </div>
                <div className={`flex flex-col justify-center items-center bg-white rounded-full w-[52px] h-[52px] pb-[6px] leading-[16px] shadow-lg hover:scale-105 transition-transform duration-200 ${isCountdownUrgent ? 'animate-pulse bg-red-100' : ''}`}>
                  <span suppressHydrationWarning className="font-bold text-lg">
                    {countdown.minutes}
                  </span>
                  <span className="text-[11px] font-medium">Minutes</span>
                </div>
                <div className={`flex flex-col justify-center items-center bg-white rounded-full w-[52px] h-[52px] pb-[6px] leading-[16px] shadow-lg hover:scale-105 transition-transform duration-200 ${isCountdownUrgent ? 'animate-pulse bg-red-100' : ''}`}>
                  <span suppressHydrationWarning className="font-bold text-lg">
                    {countdown.seconds}
                  </span>
                  <span className="text-[11px] font-medium">Seconds</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-[#38B419] h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.max(0, Math.min(100, ((24 * 60 * 60 - (countdown.hours * 60 * 60 + countdown.minutes * 60 + countdown.seconds)) / (24 * 60 * 60)) * 100))}%`
                  }}
                ></div>
              </div>
              {isMainCountdownComplete && (
                <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
                  <span className="font-semibold">🎉 Countdown Complete! Special offer has ended.</span>
                </div>
              )}
              <Button
                radius="sm"
                className="bg-[#38B419] w-[100px] py-3 px-6  text-xs text-white"
              >
                Buy Now!
              </Button>
             
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-col sm:flex-col md:flex-row gap-2 lg:w-[29%] md:w-full text-white">
          <div className="flex  bg-[#008837] rounded-md justify-between p-3 lg:h-[50%] w-full">
            <div className="flex-col flex">
              <span className="font-semibold text-xl">
                The safety of your money is guaranteed
              </span>
              <p className="text-sm">
                Money is released to seller after order has been confirmed as
                received.
              </p>
            </div>
            <Image src={nairabag} width={90} height={70} alt="" />
          </div>
          <div className="bg-[#A46E05] justify-between flex rounded-md p-3 lg:h-[50%] w-full">
            <div className="flex flex-col">
              <span className="font-semibold text-xl">
                Delivery to your doorstep
              </span>
              <p className="text-sm">
                Products are delivered to your doorstep
              </p>
            </div>
            <Image src={fruitGrp} width={90} height={70} alt="" />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]  w-full gap-x-[1.50rem] gap-y-4 pt-10 max-w-[1280px] px-6 py-10 mx-auto ">
        <ProductGrid items={list} count={count} />
      </div>
      <div className="w-full bg-[#F20E0E]">
        <div className="max-w-[1280px] mx-auto  gap-8    flex justify-between text-white scroll-parent">
          <div className="flex text-2xl font-bold justify-center items-center py-2 scroll-element">
            <Image src={Flash} width={45} height={45} alt="flash" />
            <span className=" whitespace-nowrap">Flash Sales</span>
          </div>
          <div className="text-2xl flex justify-center items-center scroll-element">
            <p className="gap-2 flex items-center">
              <span className="text-sm font-medium">Time Left:</span>
              <div className={`flex gap-1 px-3 py-1 rounded-lg ${isFlashSaleUrgent ? 'bg-red-500 animate-pulse' : 'bg-[#38B419]'}`}>
                <span suppressHydrationWarning className="font-bold text-white">
                  {pad2(flashSaleCountdown.hours)}
                </span>
                <span className="text-white">:</span>
                <span suppressHydrationWarning className="font-bold text-white">
                  {pad2(flashSaleCountdown.minutes)}
                </span>
                <span className="text-white">:</span>
                <span suppressHydrationWarning className="font-bold text-white">
                  {pad2(flashSaleCountdown.seconds)}
                </span>
              </div>
            </p>
          </div>

          <div className="justify-center items-center flex gap-2 text-2xl scroll-element">
            <p className=" whitespace-nowrap">See all</p>
            <span className=" mt-1 -rotate-90">∨</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]  w-full gap-x-[1.50rem] gap-y-4 pt-10 max-w-[1280px] px-6 py-10 mx-auto  ">
        <ProductGrid items={list} count={count} slice={[3, 8]} />
      </div>
      <div className="flex flex-col w-full max-w-[1280px] mx-auto  py-10 gap-2">
        <span className="text-[27px] font-semibold px-6">
          {" "}
          Most Searched Product
        </span>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]  w-full gap-x-[1.50rem] justify-between gap-y-4 pt-10 max-w-[1280px] px-6 py-10 mx-auto ">
          <ProductGrid items={list} count={count} slice={[1, 6]} />
        </div>
      </div>
    </div>
  );
}
