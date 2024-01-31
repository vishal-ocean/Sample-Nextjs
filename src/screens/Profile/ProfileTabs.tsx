import { TabsContent, TabsTrigger } from "@/components/UI/Tabs";
import { IconBook } from "@/components/icons/IconBook";
import { UilShield, UilStar } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import dynamic from "next/dynamic";

const LearningCenter = dynamic(() =>
  import("./TabContent/LearningCenter").then((mod) => mod.LearningCenter)
);
const Payment = dynamic(() =>
  import("./TabContent/Payment").then((mod) => mod.Payment)
);
const Refer = dynamic(() =>
  import("./TabContent/Refer").then((mod) => mod.Refer)
);
const Settings = dynamic(() => import("./TabContent/Settings"));
const Tiers = dynamic(() =>
  import("./TabContent/Tier").then((mod) => mod.Tiers)
);
const Verification = dynamic(() =>
  import("./TabContent/Verification").then((mod) => mod.Verification)
);

const TabName = [
  {
    name: "Identity Verification",
    value: "verification",
    icon: <UilShield className="h-4 w-4" />,
  },
  {
    name: "Tiers",
    value: "tiers",
    icon: <UilStar className="h-4 w-4" />,
  },
  {
    name: "Learning Center",
    value: "learning",
    icon: <IconBook strokeWidth={1.2} className="h-4 w-4" />,
  },
];
const ProfileTabs = ({
  tabValue,
  setTabValue,
}: {
  tabValue: string;
  // setTabValue: React.Dispatch<React.SetStateAction<string>>;
  setTabValue: any;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Tabs value={tabValue}>
      <TabsList className="flex gap-x-1 overflow-auto px-3 md:px-10 lg:px-4 xl:px-0 justify-start h-full py-0 remove-scrollbar">
        {TabName.map((item, index) => (
          <>
            <TabsTrigger
              value={item?.value}
              onClick={() => setTabValue(item?.value)}
              className={cn(
                "py-3 px-4 rounded-3xl bg-secondary flex gap-x-2 text-blue-300 dark:bg-white/15 dark:text-white text-14 font-700 leading-4",
                tabValue === item?.value &&
                  "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
              )}
              key={index}
            >
              {item?.icon}
              {item?.name}
            </TabsTrigger>
          </>
        ))}
      </TabsList>
      <TabsContent
        value="verification"
        className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 my-0"
      >
        <Verification modalOpen={modalOpen} setHandleModal={setHandleModal} />
      </TabsContent>
      <TabsContent value="tiers" className="px-3 sm:pl-10 lg:px-4 xl:px-0 my-0">
        <Tiers modalOpen={modalOpen} setHandleModal={setHandleModal} />
      </TabsContent>
      <TabsContent
        value="payment"
        className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 my-0"
      >
        <Payment modalOpen={modalOpen} setHandleModal={setHandleModal} />
      </TabsContent>
      <TabsContent value="refer" className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 my-0">
        <Refer />
      </TabsContent>
      <TabsContent
        value="settings"
        className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 my-0"
      >
        <Settings modalOpen={modalOpen} setHandleModal={setHandleModal} />
      </TabsContent>
      <TabsContent
        value="learning"
        className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 my-0"
      >
        <LearningCenter />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
