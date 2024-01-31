const KYCError = ({ userData }: any) => {
  return (
    <div className="w-full flex justify-center items-center">
      {["REJECTED", "REJECTED_FINAL"].includes(userData.kyc) ? (
        <div className="text-center font-500 text-blue-300 leading-5">
          Your application has been rejected, please contract{" "}
          <a
            href="mailto:support@ocean.money"
            className="text-primary underline"
          >
            support@ocean.money
          </a>{" "}
          for more information
        </div>
      ) : userData.kyc === "ON_HOLD" ? (
        <div className="text-center font-500 text-blue-300 leading-5">
          Your application is currently being reviewed.
        </div>
      ) : (
        <div className="text-center font-500 text-blue-300 leading-5">
          Something went wrong, please contract{" "}
          <a
            href="mailto:support@ocean.money"
            className="text-primary underline"
          >
            support@ocean.money
          </a>{" "}
          for more information
        </div>
      )}
    </div>
  );
};

export default KYCError;
