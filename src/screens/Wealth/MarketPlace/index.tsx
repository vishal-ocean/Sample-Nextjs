"use client";
import { Button } from "@/components/UI/Button";
import {
  CANCEL_OFFER_MODAL,
  CREATE_OFFER_MODAL,
  FILTER_MODAL,
  OFFER_ACCEPTANCE_MODAL,
  OFFER_CREATED_MODAL,
  OFFER_SUCCESS_MODAL,
} from "@/constants";
import { UilAngleLeft, UilPlus } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CancelOffer from "./components/Modals/CancelOffer";
import CreateOffer from "./components/Modals/CreateOffer";
import FilterModal from "./components/Modals/FilterModal";
import OfferAcceptanceModal from "./components/Modals/OfferAcceptanceModal";
import OfferCreated from "./components/Modals/OfferCreated";
import OfferSuccessModal from "./components/Modals/OfferSuccessModal";
import Tab from "./components/tabs";
const CustomVideo = dynamic(
  () => import("@/components/UI/CustomVideoComp/index")
);

const MarketPlace = () => {
  const router = useRouter();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div className="relative mx-3 sm:mx-10 lg:mx-4 xl:mx-0 bg-blue-300 rounded-[24px]">
        <Image
          src="/images/wealth-banner.png"
          height={1500}
          width={3000}
          sizes="100vh"
          className="absolute h-full w-full max-h-[312px] rounded-[24px] object-cover object-right"
          alt="banner"
        />
        <div className="relative rounded-[24px] p-3 sm:p-5 sm:pb-10 lg:p-12 top-0 left-0">
          <div className="flex justify-between items-center sm:items-start ">
            <Button
              className="font-700 bg-white/15 text-14 lg:text-16 leading-4 lg:leading-5 px-3 sm:px-6 py-3 lg:py-4 text-secondary"
              onClick={() => router.back()}
            >
              <span className="hidden sm:block">Go Back</span>
              <UilAngleLeft className="h-4 w-4 sm:hidden" />
            </Button>

            <p className="opacity-60 leading-4 font-500 text-12 text-white">
              Wealth Management / Marketplace
            </p>
          </div>
          <div className="flex justify-between gap-y-5 sm:items-end flex-col sm:flex-row mt-[60px] sm:mt-[67px] lg:mt-20">
            <h1 className="font-500 leading-8 sm:leading-10 lg:leading-[56px] text-32 sm:text-40 lg:text-56 tracking-[-1.12px] text-white">
              Wealth Market
            </h1>
            <Button
              className="font-700 text-gray-300  bg-secondary h-max flex gap-2 py-3 lg:py-4 px-4 lg:px-6 text-14 lg:text-16 leading-4 lg:leading-5 pointer-events-none"
              // onClick={() => setHandleModal(CREATE_OFFER_MODAL)}
            >
              <UilPlus className="h-4 w-4 text-gray-300" />
              Create Offer
            </Button>
          </div>
        </div>
      </div>
      <Tab />
      {modalOpen === CREATE_OFFER_MODAL && <CreateOffer />}
      {modalOpen === CANCEL_OFFER_MODAL && <CancelOffer />}
      {modalOpen === OFFER_CREATED_MODAL && <OfferCreated />}
      {modalOpen === OFFER_ACCEPTANCE_MODAL && <OfferAcceptanceModal />}
      {modalOpen === OFFER_SUCCESS_MODAL && <OfferSuccessModal />}
      {modalOpen === FILTER_MODAL && <FilterModal />}
    </>
  );
};

export default MarketPlace;
