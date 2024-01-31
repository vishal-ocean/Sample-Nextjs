"use client";
import SlideModal, { SlideModalHandle } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/Card";
import { UilBoltAlt, UilNewspaper } from "@/icons";
import Link from "next/link";
import { useRef } from "react";
import HomeNotification from "./HomeNotification";

const HomePageNews = () => {
  const slideModalRef = useRef<SlideModalHandle>(null);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-2">
          <Button
            variant="secondary"
            className="w-10 h-10 !p-0 dark:bg-white dark:bg-opacity-15"
          >
            <UilNewspaper className="w-4 h-4 text-blue-300 dark:text-white" />
          </Button>
          <p className="text-16 font-500 text-blue-300 leading-5 dark:text-white">
            News and Updates
          </p>
        </div>

        <Link href={"/news-updates"}>
          <Button
            variant="secondary"
            className="text-blue-300 font-700 text-14 leading-6 whitespace-nowrap dark:text-white dark:bg-white dark:bg-opacity-15"
            size="sm"
          >
            See All
          </Button>
        </Link>
      </div>
      <SlideModal ref={slideModalRef} className="max-w-[656px]">
        <div className="h-full max-h-screen" id="notification-slide-modal">
          <HomeNotification />
        </div>
      </SlideModal>
      <div className="pt-4 lg:block sm:grid grid-cols-2 gap-x-2 ">
        <Card>
          <CardContent className="p-5 rounded-[28px] mb-2 ocean-card">
            <div className="flex justify-between items-center">
              <span className="bg-primary flex justify-center items-center w-10 h-10 rounded-full">
                <UilBoltAlt className="h-6 w-6 text-white" />
              </span>
              <span className="text-14 font-700 leading-4 px-4 py-3 bg-primary/30 text-white rounded-3xl">
                v0.0.1
              </span>
            </div>
            <div className="pt-5">
              <h3 className="text-16 font-500 text-white pb-2 leading-5 truncate">
                Alpha Release!
              </h3>
              <p className="text-16 font-500 leading-5 text-gray-300 line-clamp-2">
                Explore crypto and wealth features. Your feedback shapes our
                future.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HomePageNews;
