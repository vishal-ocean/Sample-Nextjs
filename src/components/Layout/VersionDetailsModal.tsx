import CustomModal from "@/components/CustomModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { VERSION_DETAIL_MODAL } from "@/constants";
import { UilClock } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const VersionDetail = [
  {
    version: "Version 0.0.1",
    date: "OCT 13, 2023",
    description:
      "Currently featuring basic functions for Crypto deposits and withdrawals, along with our Wealth Management section. More functionalities for Fiat and NFTs to be rolled out in subsequent releases.",
  },
];

export const VersionDetailsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? VERSION_DETAIL_MODAL : "");
    setHandleModalState(false);
  };
  return (
    <CustomModal
      open={modalOpen == VERSION_DETAIL_MODAL}
      onOpenChange={handleOpenChange}
      className="sm:max-w-[520px]"
    >
      <Tabs defaultValue="aboutBeta" className="">
        <TabsList className="flex gap-1 justify-start">
          <TabsTrigger
            value="aboutBeta"
            className="py-3 px-4 text-14 font-700 leading-4 text-blue-300 dark:text-white data-[state=active]:bg-blue-300 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-blue-300 rounded-full"
          >
            About Alpha
          </TabsTrigger>
          <TabsTrigger
            value="versionHistory"
            className="py-3 px-4 text-14 font-700 leading-4 data-[state=active]:bg-blue-300 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-blue-300 rounded-full"
          >
            Version History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="aboutBeta"
          className="mt-6 pl-1 pr-2 pb-1 sm:px-7 sm:pb-7 w-full focus-visible:ring-offset-0 focus-visible:ring-0 max-h-[400px] overflow-auto"
        >
          <p className="text-16 font-500 leading-2 text-blue-300 dark:text-white">
            Alpha Version Release
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Welcome to the alpha release of our app at app.ocean.money. We
              &apos;re excited to have you as one of the earliest users to
              experience the platform and shape its future.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              What &apos;s Currently Available: Cryptocurrency Transactions - At
              this stage, you can deposit and withdraw using limited
              cryptocurrencies. Wealth Management Section is also limited and
              will be updated in the next release.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Please Keep in Mind: Remember, this is an alpha release. It
              precedes the beta version and is the first time the software is
              available. As a result, it may have more bugs and might not be as
              stable.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Potential Risks: As with any new financial platform, especially in
              its alpha stage, there are inherent risks. User funds could
              potentially be at risk due to unforeseen bugs or issues.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Feedback is Gold: We rely on your invaluable feedback to identify
              and fix bugs, improve user experience, and prioritise features. If
              you encounter any issues or have suggestions, please reach out via
              support@ocean.money.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Difference Between Alpha and Beta: The alpha version is the stage
              where we test our core functionalities and gather initial
              feedback. On the other hand, the beta version will be a more
              polished preview, available to a larger audience and closer to our
              final product.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Both versions aim to refine the software based on user feedback,
              but alpha is earlier in the development process.
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
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
          className="mt-6 pl-1 pr-2 pb-1 sm:px-7 sm:pb-7 w-full focus-visible:ring-offset-0 focus-visible:ring-0 max-h-[400px] overflow-auto"
        >
          {VersionDetail.map((value, index) => (
            <div
              key={`version-${index}`}
              className="grid grid-cols-[auto_1fr] gap-2 py-4 first:pt-0 last:pb-0 last:border-none border-b border-secondary dark:border-white/15"
            >
              <UilClock className="text-blue-300 h-4 w-4 dark:text-white" />
              <div>
                <span className="flex justify-between gap-2.5">
                  <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                    {value.version}
                  </p>
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                    {value.date}
                  </p>
                </span>
                <p className="mt-2 text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </CustomModal>
  );
};
