
const HomeSingleNotification = () => {
  return (
    <div className="">
      <div className="w-full grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] items-center  gap-4">
        <div className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center order-1 ">
         {/* <Image src="/images/svg/dodo.svg" width={16} height={16} alt="" />*/}
        </div>
        <span className="text-blue-300 font-500 order-3 sm:order-2 col-span-2 sm:col-span-1">
          Polkadot’s Hotel Renovation
        </span>
        <span className="text-12 text-gray-300 font-500 justify-self-end order-2 sm:order-3">
          12.06.23, 12:30
        </span>
      </div>
      <p className="text-blue-300 font-500  mt-6 text-24 leading-7">
        The element with painstaking attention to detail for unparalleled
        performance. Titanium strikes the perfect balance between weight,
        ruggedness, and corrosion resistance. The case rises up to surround the
        flat sapphire crystal and protect it from edge impacts. The Digital
        Crown is larger and the side button is raised from the case, making
      </p>
    </div>
  );
};

export default HomeSingleNotification;
