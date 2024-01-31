import Image from "next/image";

const DepositingFunds = () => {
  return (
    <div className="mx-auto text-center">
      <Image
        className=""
        src={"/images/svg/depositing-funds.svg"}
        width={293}
        height={218}
        alt="depositing-funds"
      />
      <div className="pb-8 sm:pb-12">
        <h3 className="text-24 font-500 text-blue-300 leading-[120%]">
          Depositing funds
        </h3>
        <p className="text-blue-300/60 font-500 text-16">
          It might take a while
        </p>
      </div>
    </div>
  );
};

export default DepositingFunds;
