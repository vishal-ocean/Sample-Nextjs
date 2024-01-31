import CustomModal from "@/components/CustomModal";
import { Input } from "@/components/UI/form/Input";
import { BUY_CRYPTO_LISTING, BUY_MODAL } from "@/constants";
import DEPOSIT_DATA from "@/constants/TableData.json";
import { readableNumber } from "@/helper/readableNumber";
import { UilPlus, UilSearch } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
const BuyCryptoListing = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? BUY_CRYPTO_LISTING : "");
    setHandleModalState(false);
  };
  return (
    <>
      <CustomModal
        open={modalOpen == BUY_CRYPTO_LISTING}
        onOpenChange={handleOpenChange}
        className="p-5"
      >
        <div className="flex gap-x-2 items-center">
          <span className="bg-success-200 rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilPlus className="h-4 w-4 text-white" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Buy Crypto
          </span>
        </div>
        <div className="px-7 flex flex-col">
          <span className="text-24 text-blue-300 font-500 w-[219px] mt-4 sm:mt-6 whitespace-break-spaces leading-7">
            What do you want to buy?
          </span>
          <div className="relative w-full !bg-white rounded-[28px] flex items-center mt-8 sm:mt-10 ">
            <div className="flex justify-center absolute top-[38%] items-center text-center pl-6 pointer-events-none">
              <UilSearch className="w-4 h-4 text-blue-300" />
            </div>
            <Input
              type="text"
              id="search-assets"
              className="input w-full leading-5 rounded-3xl outline-none py-4 pl-12 md:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-16  font-500 font-body cursor-pointer text-blue-300 bg-gray-50 border-none"
              placeholder="Search"
              required
            />
          </div>
          <div className="mt-8 mb-1 sm:mb-7">
            <div
              className={cn(
                "flex flex-col gap-y-5 sm:gap-y-6 ",
                DEPOSIT_DATA?.length > 6 ? "overflow-auto max-h-[350px]" : ""
              )}
            >
              {DEPOSIT_DATA.map((item, index) => (
                <div
                  className="flex justify-between items-center cursor-pointer"
                  key={`AssetsList-${index}`}
                  onClick={() => setHandleModal(BUY_MODAL)}
                >
                  <div className="flex gap-x-4 leading-5">
                    <span className="rounded-3xl h-10 w-10">
                      <Image
                        width={40}
                        height={40}
                        src={item.img}
                        alt="image"
                      />
                    </span>
                    <div className="flex flex-col leading-5">
                      <span className="font-500 text-blue-300">
                        {item.name}
                      </span>
                      <span className="font-500 text-gray-300">
                        {item.subText?.length > 18
                          ? `${item.subText?.substring(0, 18)}...`
                          : item.subText}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col leading-5 items-end pr-1">
                    <div className="text-blue-300 font-500">
                      €{readableNumber(Number(item.balance.usd.toFixed(2)))}
                    </div>
                    <div className="text-gray-300 font-500">
                      {`${Number(item.balance.token).toFixed(2)} ${
                        item.tokenSymbol
                      }`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default BuyCryptoListing;
