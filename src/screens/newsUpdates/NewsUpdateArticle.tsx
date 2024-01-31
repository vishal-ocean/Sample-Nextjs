"use client";
import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/Card";
import IconGold from "@/components/icons/IconGold";
import { IconX } from "@/components/icons/IconX";
import {
  UilAngleLeftB,
  UilAngleRightB,
  UilCircleLayer,
  UilCopyAlt,
  UilDollarAlt,
  UilFacebookF,
} from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Slider from "react-slick";

const sliderSettings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  infinite: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};
const NewsUpdateArticle = () => {
  const [newsFilter, setNewsFilter] = useState("All");
  const slickSliderRef = useRef<any>(null);
  const router = useRouter();

  const NewsFilterData = [
    {
      name: "All",
      icon: "",
    },
    {
      name: "Crypto",
      icon: <UilCircleLayer className="h-4 w-4" />,
    },
    {
      name: "Wealth",
      icon: <IconGold strokeWidth={1.2} className="h-4 w-4" />,
    },
    {
      name: "NeoBanking",
      icon: <UilDollarAlt className="h-4 w-4" />,
    },
    {
      name: "Updates",
      icon: (
        <>
          <Image
            src="/images/svg/icon-group.svg"
            width={14}
            height={14}
            alt="news Image"
            className={cn(
              "h-[14px] w-auto rounded-xl dark:hidden",
              newsFilter === "Updates" && "hidden dark:block"
            )}
          />
          <Image
            src="/images/svg/updates.svg"
            width={14}
            height={14}
            alt="news Image"
            className={cn(
              "h-[14px] w-auto rounded-xl hidden dark:block",
              newsFilter === "Updates" && "block dark:hidden"
            )}
          />
        </>
      ),
    },
  ];

  const next = () => {
    slickSliderRef.current.slickNext();
  };

  const prev = () => {
    slickSliderRef.current.slickPrev();
  };

  return (
    <div className="">
      <Card className="sm:row-span-2 lg:col-span-2 px-3 sm:px-10 lg:px-4 xl:px-0">
        <CardContent className="bg-white rounded-xl h-[268px] sm:h-[244px] lg:h-[368px] relative group cursor-pointer">
          <Image
            src="/images/newsBg.png"
            width={656}
            height={408}
            alt="news Image"
            className="h-full w-full rounded-xl"
          />
          <div className="absolute p-3 sm:p-5 lg:p-12 h-full flex w-full flex-col rounded-xl justify-between top-0 left-0 bg-gradient-to-b from-[rgba(6,25,53,0.00)] form-[-27.82%] to-blue-300 to-100% hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-171.33%] hover:to-blue-300 hover:to-[65.33%]">
            <div className="flex justify-between items-center">
              <Button
                className="bg-white/15 hidden sm:flex text-white rounded-3xl px-6 py-4 justify-center items-center text-16 font-700 leading-5"
                onClick={() => router.push("/news-updates")}
              >
                Go Back
              </Button>
              <Button className="bg-white/15 p-0  sm:hidden flex rounded-3xl h-10 w-10 justify-center items-center ">
                <UilAngleRightB className="h-4 w-4 text-white " />
              </Button>
              <div className="flex gap-x-3 items-center">
                <p className="text-white/60 text-12 font-500 leading-4">
                  Source
                </p>
                <Button className="bg-blue-300 text-white rounded-3xl px-4 py-3 lg:px-6 lg:py-4 flex justify-center items-center text-14 lg:text-16 font-700 leading-4 lg:leading-5">
                  Bloomberg
                </Button>
              </div>
            </div>
            <div className="ml-3 mb-3 lg:mb-0 lg:ml-0 group-hover:pb-2.5 transition-all">
              <h3 className="text-24 lg:text-40 font-500 text-white leading-7 lg:leading-10 lg:tracking-[-0.8px]  lg:w-2/3">
                Why Some Ex-Workers at Bed Bath & Beyond Face 401(k) Losses
              </h3>
              <div className="flex gap-x-3">
                <p className="text-12 font-500 leading-4 text-gray-300 mt-3">
                  23 Aug 2023, 4:28 AM
                </p>
                <p className="text-12 font-500 leading-4 text-gray-300 mt-3">
                  By Olga Kharif
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="max-w-[312px] sm:max-w-[512px] lg:max-w-[872px] grid gap-y-10 lg:gap-y-[60px] mt-10 lg::mt-[60px] mx-auto ">
        <p className="text-24 lg:text-40 font-500 leading-7 lg:leading-10 tracking-[-0.8px] text-blue-300 dark:text-white">
          Federal law generally protects retirement savings when a company files
          for bankruptcy. But that’s not always the case.
        </p>
        <div className="grid gap-y-4 lg:gap-y-6">
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            Federal law generally protects savings in workers’ retirement plans
            when a company files for bankruptcy protection or goes out of
            business. Yet there may still be situations when employees lose
            money, as some former workers at Bed Bath & Beyond have discovered.
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            Bed Bath & Beyond, a home furnishings retailer, filed for&nbsp;
            <Link
              target="_blank"
              href="https://www.nytimes.com/2023/04/23/business/bed-bath-beyond-bankruptcy.html"
              className="underline underline-offset-[6px]"
            >
              bankruptcy protection
            </Link>
            &nbsp;in April and has been closing up shop and&nbsp;
            <Link
              target="_blank"
              href="https://www.nytimes.com/2023/06/22/business/bed-bath-beyond-overstock-bankruptcy.html"
              className="underline underline-offset-[6px]"
            >
              selling off assets
            </Link>
            . It also terminated its 401(k) retirement plan as of Aug. 1
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            Some former workers, who had invested in a “guaranteed interest
            account” that they believed was low risk, saw losses of about 10
            percent related to the plan’s termination. One saver shared a
            financial statement showing he had lost about $10,000 in his
            guaranteed interest account, while another said he had lost more
            than $2,000. The two former workers spoke on the condition of
            anonymity, saying they were still determining what recourse they may
            have.
          </p>
        </div>
        <Image
          src="/images/newsImage.png"
          width={656}
          height={400}
          alt="news Image"
          className="h-[154px] sm:h-[253px] lg:h-full w-full rounded-xl"
        />
        <div className="grid gap-y-4 lg:gap-y-6">
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            How can I protect my workplace retirement savings if my company is
            struggling?
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            A federal law known as ERISA, for the{" "}
            <Link
              target="_blank"
              href="https://www.dol.gov/general/topic/retirement/erisa"
              className="underline underline-offset-[6px]"
            >
              Employee Retirement Income Security Act
            </Link>
            , generally protects funds in a 401(k). Colleen E. Medill, a
            professor at the University of Nebraska College of Law who is an
            expert in employee benefits law, said in an email that the bulk of
            workers’ savings in a 401(k) are well protected by ERISA in a
            bankruptcy. Once an employee’s contributions, or an employer’s
            matching contributions, are deposited into the trust that holds the
            401(k) plan’s assets, “those funds are secure and cannot be reached
            by creditors of an employer,” she said.
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            A federal law known as ERISA, for the{" "}
            <Link
              target="_blank"
              href="https://www.dol.gov/general/topic/retirement/erisa"
              className="underline underline-offset-[6px]"
            >
              Employee Retirement Income Security Act
            </Link>
            , generally protects funds in a 401(k). Colleen E. Medill, a
            professor at the University of Nebraska College of Law who is an
            expert in employee benefits law, said in an email that the bulk of
            workers’ savings in a 401(k) are well protected by ERISA in a
            bankruptcy. Once an employee’s contributions, or an employer’s
            matching contributions, are deposited into the trust that holds the
            401(k) plan’s assets, “those funds are secure and cannot be reached
            by creditors of an employer,” she said.
          </p>
        </div>
        <div className="grid gap-y-4 lg:gap-y-6">
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            Where can I get help if I have concerns?
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            If you are having trouble getting information about your retirement
            plan, or you suspect that contributions have not been properly
            deposited in your retirement account, you can contact the Employee
            Benefits Security Administration, part of the&nbsp;
            <Link
              target="_blank"
              href="https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/fact-sheets/your-employers-bankruptcy.pdf"
              className="underline underline-offset-[6px]"
            >
              Department of Labor
            </Link>
            , at &nbsp;
            <Link
              target="_blank"
              href="https://www.dol.gov/agencies/ebsa/about-ebsa/ask-a-question/ask-ebsa"
              className="underline underline-offset-[6px]"
            >
              askebsa.dol.gov
            </Link>
            &nbsp;or <span className="whitespace-nowrap">1-866-444-3272</span>.
            That is what the Labor Department suggested that former Bed Bath &
            Beyond workers do.
          </p>
          <p className="text-16 lg:text-24 font-500 leading-5 lg:leading-7 text-blue-300 dark:text-white">
            It can be expensive to hire legal help, especially if the amount of
            money in question isn’t large. Groups like the &nbsp;
            <Link
              target="_blank"
              href="https://pensionrights.org/find-help/"
              className="underline underline-offset-[6px]"
            >
              Pension Rights Center
            </Link>
            &nbsp;and the&nbsp;
            <Link
              target="_blank"
              href="https://www.umb.edu/pensionaction/about-us/"
              className="underline underline-offset-[6px]"
            >
              Pension Action Center
            </Link>{" "}
            may offer free legal advice or referrals for people with concerns
            about access to their retirement plans.
          </p>
        </div>
      </div>
      <div className="border-y border-secondary dark:border-white/15 py-4 lg:py-6 mt-10 sm:max-w-[688px] mx-auto lg:max-w-full">
        <div className="max-w-[312px] sm:max-w-[512px] lg:max-w-[872px] mx-auto flex justify-between items-center">
          <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
            Share article
          </p>
          <div className="flex gap-x-1">
            <span className="h-10 w-10 bg-secondary dark:bg-white/15 flex justify-center items-center rounded-full cursor-pointer">
              <IconX className="text-blue-300 dark:text-white" />
            </span>
            <span className="h-10 w-10 bg-secondary dark:bg-white/15 flex justify-center items-center rounded-full cursor-pointer">
              <UilFacebookF className=" text-blue-300 dark:text-white h-4 w-4 " />
            </span>
            <span className="h-10 w-10 bg-secondary dark:bg-white/15 flex justify-center items-center rounded-full cursor-pointer">
              <UilCopyAlt className=" text-blue-300 dark:text-white h-4 w-4 " />
            </span>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:justify-between lg:items-center mt-10 mb-4 sm:max-w-[688px] lg:max-w-full ">
        <div className="flex gap-x-1 overflow-auto px-3 sm:px-10 lg:px-4 xl:px-0">
          {NewsFilterData.map((value, index) => {
            return (
              <Button
                className={`bg-secondary dark:bg-white/15 flex gap-x-2 text-blue-300 dark:text-white px-4 py-3 text-14 font-700 leading-4 ${
                  newsFilter === value.name &&
                  "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
                }`}
                onClick={() => setNewsFilter(value.name)}
                key={index}
              >
                {value.icon}
                {value.name}
              </Button>
            );
          })}
        </div>
        <div className="hidden lg:flex gap-x-2">
          <Button
            variant="secondary"
            className="w-10 h-10 !p-0 text-14 font-700 dark:bg-white/15"
            onClick={prev}
          >
            <UilAngleLeftB className="h-4 w-4 text-blue-300 dark:text-white" />
          </Button>
          <Button
            variant="secondary"
            className="w-10 h-10 !p-0 text-14 font-700 dark:bg-white/15"
            onClick={next}
          >
            <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
          </Button>
        </div>
      </div>
      <div className="cursor-grab overflow-auto w-full relative">
        <Slider
          {...sliderSettings}
          ref={slickSliderRef}
          className="overflow-x-auto pl-2 sm:pl-10 lg:pl-4 xl:pl-0"
        >
          {[...Array(10)].map((_, index) => (
            <Card className="" key={index}>
              <CardContent className="bg-white dark:bg-white/15 ml-2 rounded-xl w-[322px] h-[200px]  relative group cursor-pointer">
                <Image
                  src="/images/newsBg.png"
                  width={324}
                  height={200}
                  alt="news Image"
                  className="h-full w-full rounded-xl !hidden group-hover:!block"
                />
                <div className="absolute p-5 h-full flex flex-col  rounded-xl justify-between top-0 left-0  hover:bg-gradient-to-b hover:from-[rgba(6,25,53,0.00)] hover:form-[-27%] hover:to-blue-300 hover:to-100%">
                  <div className="flex justify-between items-center">
                    <div className="bg-secondary dark:bg-white/15 flex justify-center items-center w-10 h-10 rounded-full">
                      <Image
                        src="/images/svg/newsIcon-3.svg"
                        width={24}
                        height={24}
                        alt=""
                      />
                    </div>
                    <span className="bg-secondary dark:bg-white/15 rounded-3xl h-10 w-10 flex justify-center items-center">
                      <UilAngleRightB className="h-4 w-4 text-blue-300 dark:text-white" />
                    </span>
                  </div>
                  <div className=" flex justify-between gap-x-[54px]">
                    <div className="grid content-end">
                      <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                        01:05 AM
                      </p>
                      <p className="text-24 mt-4 font-500 leading-7 text-blue-300 group-hover:text-white dark:text-white">
                        11.05
                      </p>
                    </div>
                    <h3 className="text-16 font-700 text-blue-300 dark:text-white group-hover:text-white leading-5 line-clamp-3 group-hover:line-clamp-4">
                      Binance Offers Incentives to Accelerate Shift From
                      Stablecoin to Fresh Alternatives
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsUpdateArticle;
