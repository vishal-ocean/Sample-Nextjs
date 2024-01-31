"use client";
import CustomModal from "@/components/CustomModal";
import { Input } from "@/components/UI/form/Input";
import { CRYPTO_SELL_LISTING_MODAL, SELL_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilMinus, UilSearch } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useSellDataList } from "./useSellDataList";

const SellCryptoListing = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const { TRANSFER_DATA } = useSellDataList();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CRYPTO_SELL_LISTING_MODAL : "");
    setHandleModalState(false);
  };
  return (
    <>
      <CustomModal
        open={modalOpen == CRYPTO_SELL_LISTING_MODAL}
        onOpenChange={handleOpenChange}
        className="p-5"
      >
        <div className="flex gap-x-2 items-center">
          <span className="bg-secondary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilMinus className="h-4 w-4 text-blue-300" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Sell Crypto
          </span>
        </div>
        <div className="sm:px-7 flex flex-col">
          <span className="text-24 text-blue-300 font-500 w-[219px] mt-5 sm:mt-6 whitespace-break-spaces leading-7">
            What do you want to sell?
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
          <div className="mt-8 mb-1 sm:mb-7 flex flex-col gap-y-6">
            <span className="text-16 text-gray-300 font-500 leading-5">
              Your Assets
            </span>
            <div className="flex flex-col gap-y-5 sm:gap-y-6 overflow-x-auto max-h-[400px]">
              {TRANSFER_DATA.map((item, index) => (
                <div
                  className="flex justify-between items-center cursor-pointer"
                  key={`AssetsList-${index}`}
                  onClick={() => setHandleModal(SELL_MODAL)}
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
                      €
                      {readableNumber(
                        Number(item.balance.usd?.toFixed(2) || 0)
                      )}
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

export default SellCryptoListing;
