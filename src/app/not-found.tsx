"use client";
import { Footer } from "@/components/Layout/footer/Footer";
import { Button } from "@/components/UI/Button";
import { UilBoltAlt } from "@/icons";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.body.style.background =
      "url('/images/error-page-bg.png') center center/cover no-repeat fixed";
    document.body.style.backgroundColor = "#F1F3F4";
    return () => {
      document.body.style.background = "none";
    };
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-318px)] flex items-center justify-center">
        <div className="max-w-[448px] flex flex-col items-center mx-6">
          <Button className="bg-[#FFD966] text-blue-300 text-14 font-700 leading-4 flex gap-2 items-center px-4 py-3 w-max">
            <UilBoltAlt className="h-4 w-4 " />
            404 Error
          </Button>
          <p className="text-32  sm:text-40 font-500 leading-8  sm:leading-10 tracking-[-0.64px] sm:tracking-[-0.8px] mt-[60px] text-center">
            The page you are looking for does not exist or is currently
            unavailable
          </p>
          <div className="mt-8 flex sm:flex-row flex-col gap-3 items-center">
            <Link href="/">
              <Button className="bg-secondary text-blue-300 py-4 px-6 text-16 font-700 leading-5 rounded-full">
                Dashboard
              </Button>
            </Link>
            <p className="text-12 font-500 leading-4 text-gray-300">
              <u className="underline-offset-2">or Contact Support</u> if you
              cannot <br /> find what you are looking for.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
