"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { UilCheck, UilClock } from "@/icons";
import { useKYCContext } from "@/screens/KYC/step-form/KycContextProvider";
import Link from "next/link";
import { FC, useState } from "react";
import { Button } from "./UI/Button";

const VersionDetail = [
  {
    version: "Version 0.0.1",
    date: "OCT 13, 2023",
    description:
      "At this stage, you can deposit, withdraw and exchange using limited cryptocurrencies. The Wealth Management Section is also limited and will be updated in the next release with opportunities you can access.",
  },
];

interface ReleaseInfoProps {
  setIsTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReleaseInfo: FC<ReleaseInfoProps> = ({ setIsTermsAccepted }) => {
  const [isAgree, setIsAgree] = useState(false);
  const { userEmail } = useKYCContext();
  return (
    <div className="md:max-w-[872px] mx-auto px-4">
      <Tabs defaultValue="aboutBeta" className="">
        <TabsList className="flex gap-1 justify-start">
          <TabsTrigger
            value="aboutBeta"
            className="py-3 px-4 text-14 font-700 leading-4 data-[state=active]:bg-blue-300 data-[state=active]:text-white rounded-full"
          >
            About Alpha
          </TabsTrigger>
          <TabsTrigger
            value="versionHistory"
            className="py-3 px-4 text-14 font-700 leading-4 data-[state=active]:bg-blue-300 data-[state=active]:text-white rounded-full"
          >
            Version History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="aboutBeta"
          className="mt-6 pl-1 pr-2 pb-1 sm:px-7 sm:pb-7 w-full focus-visible:ring-offset-0 focus-visible:ring-0 overflow-auto"
        >
          <p className="text-24 lg:text-40 font-500 leading-7 lg:leading-10 tracking-[-0.8px] text-blue-300">
            Alpha Version Release
          </p>
          <div className="flex flex-col gap-3 mt-6 text-16 lg:text-20 font-500 leading-5 lg:leading-7 text-blue-300">
            <p>
              Welcome to the alpha release of our app at app.ocean.money. We
              &apos;re excited to have you as one of the earliest users to
              experience the platform and shape its future.
            </p>
            <p>
              What &apos;s Currently Available: Cryptocurrency Transactions - At
              this stage, you can deposit and withdraw using limited
              cryptocurrencies. Wealth Management Section is also limited and
              will be updated in the next release.
            </p>
            <p>
              Please Keep in Mind: Remember, this is an alpha release. It
              precedes the beta version and is the first time the software is
              available. As a result, it may have more bugs and might not be as
              stable.
            </p>
            <p>
              Potential Risks: As with any new financial platform, especially in
              its alpha stage, there are inherent risks. User funds could
              potentially be at risk due to unforeseen bugs or issues.
            </p>
            <p>
              Feedback is Gold: We rely on your invaluable feedback to identify
              and fix bugs, improve user experience, and prioritise features. If
              you encounter any issues or have suggestions, please reach out via
              support@ocean.money.
            </p>
            <p>
              Difference Between Alpha and Beta: The alpha version is the stage
              where we test our core functionalities and gather initial
              feedback. On the other hand, the beta version will be a more
              polished preview, available to a larger audience and closer to our
              final product.
            </p>
            <p>
              Both versions aim to refine the software based on user feedback,
              but alpha is earlier in the development process.
            </p>
            <p>
              Our Advice: If you are looking for a stable, glitch-free
              experience without frequent updates, you might want to wait for
              our standard release. However, if you are excited about shaping
              the future of Ocean Money and don &apos;t mind encountering some
              hiccups along the way, we welcome you aboard our alpha journey.
            </p>
          </div>
        </TabsContent>
        <TabsContent
          value="versionHistory"
          className="mt-6 pl-1 pr-2 pb-1 sm:px-7 sm:pb-7 w-full focus-visible:ring-offset-0 focus-visible:ring-0 overflow-auto"
        >
          {VersionDetail.map((value, index) => (
            <div
              key={`version-${index}`}
              className="grid grid-cols-[auto_1fr] gap-2 py-4 first:pt-0 last:pb-0 last:border-none border-b border-secondary dark:border-white/15"
            >
              <UilClock className="text-blue-300 h-5 w-5" />
              <div>
                <span className="flex justify-between gap-2.5">
                  <p className="text-16 font-500 leading-5 text-blue-300">
                    {value.version}
                  </p>
                  <p className="text-16  font-500 leading-5 text-gray-300  ">
                    {value.date}
                  </p>
                </span>
                <p className="mt-2 text-16 lg:text-20 font-500 leading-5 lg:leading-7 text-blue-300   ">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
      <div className="flex justify-between items-center sm:flex-row flex-col sm:mt-2 mt-5">
        <div className="flex gap-2 ">
          <label className="flex gap-3  cursor-pointer">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={(event) => setIsAgree(event.target.checked)}
              className="peer absolute -z-50 opacity-0"
            />

            <span className="hidden text-primary peer-checked:block peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <UilCheck className=" h-4 w-4 text-white bg-blue-300 rounded" />
            </span>
            <span className="block text-muted-foreground peer-checked:hidden peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
              <div className="bg-white h-4 w-4 rounded"></div>
            </span>
            <span className=" text-14 font-500 leading-4 text-blue-300 ">
              I agree to the&nbsp;
              <Link
                href={"https://ocean.money/terms-and-conditions"}
                className="text-primary underline underline-offset-2"
                target="_blank"
              >
                Terms and Conditions
              </Link>
              , &nbsp;
              <Link
                href={"https://ocean.money/cookies-policy"}
                className="text-primary underline underline-offset-2"
                target="_blank"
              >
                Cookie Policy
              </Link>
              &nbsp;and&nbsp;
              <Link
                href={"https://ocean.money/customer-privacy-notice"}
                className="text-primary underline underline-offset-2"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <Button
          className="text-14 font-700 leading-4 text-white px-6 py-4 sm:mt-0 mt-3"
          disabled={!isAgree}
          onClick={() => {
            setIsTermsAccepted(true);
            localStorage?.setItem("isTermsAccepted", userEmail || "");
          }}
        >
          I agree
        </Button>
      </div>
    </div>
  );
};

export default ReleaseInfo;
