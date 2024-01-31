import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import {
  UilCopy,
  UilEnvelope,
  UilFacebookF,
  UilLinkAlt,
  UilLinkedin,
  UilShare,
} from "@/icons";
import Image from "next/image";
import { toast } from "react-toastify";
export const Refer = () => {
  return (
    <>
      <div className="mt-6">
        <p className="text-16 font-500 leading-5 text-gray-300">
          {" "}
          Options to Invite a Friend
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2">
          <div className="p-5 bg-white rounded-2xl lg:w-[27.3%]">
            <UilLinkAlt className="h-4 w-4 text-blue-300" />
            <p className="text-16 font-500 leading-5 text-blue-300 mt-5">
              By sending Invite Link
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 mt-0.5">
              Send the generated link to a Friend
            </p>
            <div className="text-14 font-500 leading-4 text-blue-300 py-3 px-4 bg-gray-100 mt-4 rounded-lg ">
              <p className="truncate">
                https://app.ocean.money/ref/v3tghpxlun?src=web-link
              </p>
            </div>
            <Button className="text-14 font-700 leading-4 text-white py-3 px-4 flex gap-2 mt-3">
              <UilCopy className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
          <div className="p-5 bg-white rounded-2xl lg:w-[27.3%]">
            <UilEnvelope className="h-4 w-4 text-blue-300" />
            <p className="text-16 font-500 leading-5 text-blue-300 mt-5">
              By email
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 mt-0.5">
              Invite a Friend by sending invite to their email
            </p>
            <input
              type="text"
              placeholder="Enter email"
              className="text-14 font-500 leading-4 text-blue-300 py-3 px-4 bg-gray-100 mt-4 rounded-lg w-full text-blue-300 placeholder:text-gray-300"
            />

            <Button
              className="text-14 font-700 leading-4 text-white py-3 px-4 flex gap-2 mt-3 bg-secondary text-blue-300"
              onClick={() => {
                toast.success(
                  <CustomToastMessage
                    message="Referral sent"
                    subText="Mail sent to temp@ocean.money"
                  />
                );
              }}
            >
              Send
            </Button>
          </div>
          <div className="p-5 bg-white rounded-2xl lg:w-[22.2%]">
            <UilShare className="h-4 w-4 text-blue-300" />
            <p className="text-16 font-500 leading-5 text-blue-300 mt-5">
              By Social Share
            </p>
            <p className="text-12 font-500 leading-4 text-gray-300 mt-0.5">
              Invite a Friend through Facebook, X (ex. Twitter) or LinkedIn
            </p>

            <div className="flex gap-1 mt-[52px]">
              <div className="rounded-full h-10 w-10 bg-secondary flex justify-center items-center">
                <Image
                  src="/images/svg/icon-X.svg"
                  width={16}
                  height={16}
                  alt="icon"
                />
              </div>
              <div className="rounded-full h-10 w-10 bg-secondary flex justify-center items-center">
                <UilFacebookF className="h-4 w-4 text-blue-300" />
              </div>
              <div className="rounded-full h-10 w-10 bg-secondary flex justify-center items-center">
                <UilLinkedin className="h-4 w-4 text-blue-300" />
              </div>
            </div>
          </div>
          <div className="p-5 bg-blue-300 rounded-2xl flex justify-center items-center lg:w-[22.2%] h-[222px] sm:h-auto">
            <p className="text-24 font-500 leading-7 text-white">Ad Banner</p>
          </div>
        </div>
      </div>
    </>
  );
};
