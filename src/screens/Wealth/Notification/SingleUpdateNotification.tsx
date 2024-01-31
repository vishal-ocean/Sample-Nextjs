import Image from "next/image";

const SingleUpdateNotification = () => {
  return (
    <div className="overflow-y-auto h-[calc(100vh-250px)]">
      <div className="grid sm:grid-cols-[auto_1fr] cursor-pointer gap-4 items-center">
        <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
          <Image src="/images/svg/icon-BTC.svg" width={16} height={16} alt="" />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <span className="text-blue-300 text-16 font-500 leading-5">
              Fund Raise closed
            </span>
            <span className="text-gray-300 font-500 leading-4 text-12">
              P79 • Polkadot’s Hotel Renovation
            </span>
          </div>
          <span className="text-12 text-gray-300 font-500 self-start sm:self-center leading-4">
            12.06.23, 12:30 PM
          </span>
        </div>
      </div>
      <p className="text-blue-300 font-500 text-16 sm:text-24 leading-5 sm:leading-7 pt-6 sm:pt-10 ">
        The element with painstaking attention to detail for unparalleled
        performance. Titanium strikes the perfect balance between weight,
        ruggedness, and corrosion resistance. The case rises up to surround the
        flat sapphire crystal and protect it from edge impacts. The Digital
        Crown is larger and the side button is raised from the case, making
      </p>
    </div>
  );
};

export default SingleUpdateNotification;
