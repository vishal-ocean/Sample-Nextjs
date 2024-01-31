"use client";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { UilCheck, UilStar } from "@/icons";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ComingSoonCard = () => {
  const [isInterested, setIsInterested] = useState(false);
  const [days, setDays] = useState<string | number>("00");
  const [hours, setHours] = useState<string | number>("00");
  const [minutes, setMinutes] = useState<string | number>("00");
  const [timeUp, setTimeUp] = useState("");
  const { user, error } = useUser();
  const { property_id } = useParams();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/interested?email=${user?.email}&property_id=${property_id}`)
        .then((res) => {
          if (res.data.isInterested) {
            setIsInterested(true);
          }
        })
        .catch((err) => {});
    }
  }, [user, property_id]);
  const mutation = useMutation({
    mutationFn: async (data: {
      email: string | null | undefined;
      property_id: string | string[];
    }) => {
      const res = await axios.post("/api/interested/create", data);
      if (res.data.status) {
        setIsInterested(true);
        toast.success(
          <CustomToastMessage message={res.data.message} subText="" />
        );
      }
    },
  });

  let x: any;
  let deadline: any;

  const count = () => {
    const now = new Date().getTime();
    const t = deadline - now;
    const dd = Math.floor(t / (1000 * 60 * 60 * 24));
    const hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));

    const formattedDays = dd < 10 ? "0" + dd : dd;
    const formattedHours = hh < 10 ? "0" + hh : hh;
    const formattedMinutes = mm < 10 ? "0" + mm : mm;

    setDays(formattedDays);
    setHours(formattedHours);
    setMinutes(formattedMinutes);

    if (t < 0) {
      clearInterval(x);
      setTimeUp("TIME IS UP");
    }
  };

  useEffect(() => {
    deadline = new Date("Oct 09, 2023 21:00:00").getTime();

    x = setInterval(count, 1000);

    return () => {
      clearInterval(x);
    };
  }, []);

  return (
    <div className="w-full sm:max-w-[248px] lg:max-w-[312px] rounded-[24px] bg-white p-3 lg:p-8 flex flex-col">
      <div className="bg-gray-100 rounded-3xl flex gap-x-2 py-3 px-4 items-center w-fit">
        <UilStar className="w-4 h-4 text-blue-300" />
        <span className="text-blue-300 text-14 font-700 leading-4">
          Launching Soon
        </span>
      </div>
      <div className="grid grid-cols-12 gap-1 mt-[20px]">
        <div className="col-span-2 flex flex-col gap-y-[6px] items-center">
          <div className="bg-blue-300 rounded-[8px] p-3 items-center">
            <span className="text-white text-24 font-500 leading-7">
              {days.toString().charAt(1)}
            </span>
          </div>
          <span className="text-12 text-gray-300 font-500 leading-4">days</span>
        </div>
        <div className="col-span-1 flex justify-center items-center h-[52px]">
          <Image
            src="/images/svg/icon-separator.svg"
            height={12}
            width={4}
            alt="separator"
          />
        </div>
        <div className="col-span-4 flex flex-col gap-y-[6px] items-center">
          <div className="flex gap-x-1">
            <div className="bg-gray-100 rounded-[8px] p-3 items-center">
              <span className="text-blue-300 text-24 font-500 leading-7">
                {hours.toString().charAt(0)}
              </span>
            </div>
            <div className="bg-gray-100 rounded-[8px] p-3 items-center">
              <span className="text-blue-300 text-24 font-500 leading-7">
                {hours.toString().charAt(1)}
              </span>
            </div>
          </div>
          <span className="text-12 text-gray-300 font-500 leading-4">
            hours
          </span>
        </div>
        <div className="col-span-1 flex justify-center items-center h-[52px]">
          <Image
            src="/images/svg/icon-separator.svg"
            height={12}
            width={4}
            alt="separator"
          />
        </div>
        <div className="col-span-4 flex flex-col gap-y-[6px] items-center">
          <div className="flex gap-x-1">
            <div className="bg-gray-100 rounded-[8px] p-3 items-center">
              <span className="text-blue-300 text-24 font-500 leading-7">
                {minutes.toString().charAt(0)}
              </span>
            </div>
            <div className="bg-gray-100 rounded-[8px] p-3 items-center">
              <span className="text-blue-300 text-24 font-500 leading-7">
                {minutes.toString().charAt(1)}
              </span>
            </div>
          </div>
          <span className="text-12 text-gray-300 font-500 leading-4">
            minutes
          </span>
        </div>
      </div>
      <div className="mt-[63px] flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Target
          </span>
          <span className="text-blue-300 text-12 font-500 leading-4">TBA</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Min Investment
          </span>
          <span className="text-blue-300 text-12 font-500 leading-4">TBA</span>
        </div>
      </div>
      <hr className="bg-secondary my-4" />
      <div className="flex gap-x-3">
        <span className="text-[40px] text-blue-300 font-500 leading-10 tracking-[-0.8px]">
          TBA
        </span>
        <span className="text-12 text-blue-300 font-500 w-[108px] leading-4">
          users are interested in this project
        </span>
      </div>
      <Button
        className={cn(
          "font-700 text-14 leading-4 mt-4 py-3 mx-2 lg:mx-0 mb-2 lg:mb-0",
          isInterested && "bg-secondary text-blue-300 flex gap-x-2"
        )}
        onClick={() => {
          if (!isInterested) {
            mutation.mutate({
              email: user?.email,
              property_id: property_id,
            });
          }
        }}
        disabled={mutation.isLoading}
      >
        {isInterested && <UilCheck className="w-4 h-4 text-success-200" />}
        {isInterested ? "I am interested" : "Mark as Interested"}
      </Button>
    </div>
  );
};

export default ComingSoonCard;
