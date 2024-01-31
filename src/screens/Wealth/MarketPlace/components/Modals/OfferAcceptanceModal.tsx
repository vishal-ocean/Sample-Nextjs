"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/UI/Button";
import {
  CANCEL_OFFER_MODAL,
  CHAT_CONVERSATIONS_LIST_MODAL,
  OFFER_ACCEPTANCE_MODAL,
  OFFER_SUCCESS_MODAL,
} from "@/constants";
import {
  UilAngleRightB,
  UilBoltAlt,
  UilChartPie,
  UilCommentAltMessage,
  UilCopyAlt,
  UilTimes,
  UilTrashAlt,
} from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import Link from "next/link";
const OfferAcceptanceModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  return (
    <CustomModal
      open={modalOpen === OFFER_ACCEPTANCE_MODAL}
      onOpenChange={(e: boolean) =>
        setHandleModal(e ? OFFER_ACCEPTANCE_MODAL : "")
      }
      withoutClose
      className="max-w-[520px] translate-y-0 bottom-0 w-full md:bottom-auto sm:-translate-y-1/2"
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
            <Image
              src="/images/svg/icon-BTC.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-12 text-blue-300 font-500 leading-4">
              P79
            </span>
            <span className="text-12 text-gray-300 font-500 leading-4">
              Polkadot’s Hotel Renovation
            </span>
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button
            variant="outline"
            className="flex gap-x-2 p-0 px-4 justify-center items-center h-10"
          >
            <UilBoltAlt className="w-4 h-4 text-blue-300" />
            <span className="text-14 font-700 leading-4 text-blue-300">
              Active
            </span>
          </Button>
          <Button
            variant="secondary"
            className="p-0 h-10 w-10 flex justify-center items-center"
            onClick={() => setHandleModal("")}
          >
            <UilTimes className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
      </div>
      <div className="sm:px-7 px-2 mt-1 sm:mt-6 flex flex-col">
        <span className="text-24 font-500 text-blue-300 leading-7">
          Offer Details
        </span>
        <div className="flex flex-col gap-y-2 mt-3">
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              Price
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4">
              1 USDT = 0.003 P79
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              Expiration date
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4">
              Nov 7 2023, at 09:32:27
            </span>
          </div>
        </div>
        <div className="mt-[20px] rounded-[24px] bg-gray-100 p-5 flex flex-col gap-y-5">
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              You Send
            </span>
            <div className="flex gap-x-2">
              <span className="text-12 font-500 text-gray-300 leading-4">
                0xdB05...0a73
              </span>
              <Button variant="outline" className="p-0">
                <UilCopyAlt className="w-4 h-4 text-gray-300" />
              </Button>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Image
              src="/images/svg/icon-USDT.svg"
              width={24}
              height={24}
              alt=""
            />
            <span className="text-24 font-500 text-blue-300 leading-7">
              22,487 <span className="text-gray-300">USDT</span>
            </span>
          </div>
        </div>
        <div className="mt-1 rounded-[24px] bg-gray-100 p-5 flex flex-col gap-y-5">
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              You Receive
            </span>
            <div className="flex gap-x-2">
              <span className="text-12 font-500 text-gray-300 leading-4">
                0xdB05...0a73
              </span>
              <Button variant="outline" className="p-0">
                <UilCopyAlt className="w-4 h-4 text-gray-300" />
              </Button>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Image
              src="/images/svg/icon-BTC.svg"
              width={24}
              height={24}
              alt=""
            />
            <span className="text-24 font-500 text-blue-300 leading-7">
              2 <span className="text-gray-300">P79</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-2 mt-[20px]">
          <div className="px-5 py-4 bg-gray-200 rounded-[16px] flex justify-between w-full">
            <div className="flex gap-x-[10px]">
              <UilChartPie className="w-4 h-4 text-blue-300" />
              <span className="text-14 font-700 text-blue-300 leading-4">
                See Project
              </span>
            </div>
            <Link href="/wealth/project-details/1" className="h-4">
              <Button variant={"outline"} className="p-0">
                <UilAngleRightB className="w-4 h-4 text-blue-300" />
              </Button>
            </Link>
          </div>
          <div className="px-5 py-4 bg-gray-200 rounded-[16px] flex justify-between w-full">
            <div className="flex gap-x-[10px]">
              <div className="relative">
                <div className="h-2 w-2 bg-danger-100 absolute top-[-2px] right-[-2px] rounded-3xl border-[1px] border-white" />
                <UilCommentAltMessage className="w-4 h-4 text-danger-100" />
              </div>
              <span className="text-14 font-700 text-blue-300 leading-4">
                Messages
              </span>
            </div>

            <Button
              variant={"outline"}
              className="p-0"
              onClick={() => setHandleModal(CHAT_CONVERSATIONS_LIST_MODAL)}
            >
              <UilAngleRightB className="w-4 h-4 text-blue-300" />
            </Button>
          </div>
        </div>
        <div className="flex gap-x-3 mt-8 mb-0 sm:mb-7">
          <Button
            className="px-4 py-0 h-10 text-14 w-fit text-white font-700 rounded-3xl leading-4"
            onClick={() => setHandleModal(OFFER_SUCCESS_MODAL)}
          >
            Accept Offer
          </Button>
          <Button
            className="px-4 py-0 h-10 text-14 w-fit text-white font-700 rounded-3xl bg-danger-100 flex gap-x-2 leading-4"
            onClick={() => setHandleModal(CANCEL_OFFER_MODAL)}
          >
            <UilTrashAlt className="w-4 h-4 text-white" />
            <span>Cancel Offer</span>
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default OfferAcceptanceModal;
