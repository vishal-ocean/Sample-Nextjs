import { Button } from "@/components/UI/Button";
import { UilAngleLeftB } from "@/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderCard = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="rounded-[24px] mx-3 sm:mx-10 lg:mx-4 xl:mx-0 relative ">
      <Image
        src={"/images/transaction-bg.png"}
        height={2000}
        width={2000}
        alt=""
        className="w-full h-full rounded-[24px] absolute top-0 -z-10 bg-blue-900 object-cover sm:object-fill  object-right"
      />
      <div className="sm:p-12 p-6 ">
        <Button
          variant="secondary"
          className="rounded-3xl bg-secondary/10 text-white h-10 w-10 md:h-fit md:w-fit md:py-4 md:px-6 p-0 font-700 leading-5"
          onClick={handleGoBack}
        >
          <UilAngleLeftB className="block md:hidden h-4 w-4" />
          <span className="hidden md:block">Go Back</span>
        </Button>
        <div className="sm:text-[56px] text-32 sm:mt-[80px] mt-[72px] font-500 text-white sm:tracking-[-1.12px] tracking-[-0.64px] leading-[100%]">
          Transaction History
        </div>{" "}
      </div>
    </div>
  );
};

export default HeaderCard;
