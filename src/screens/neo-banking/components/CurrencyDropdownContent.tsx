export const CurrencyDropdownContent = ({
  CurrencyData,
  setCurrencyValue,
  setOpenCurrencyDropdown,
}: any) => {
  return (
    <div className="max-h-[160px] overflow-y-auto mt-1">
      {CurrencyData.map((item: any, index: number) => {
        const balance = parseFloat(item.balance.replace(/[^\d.-]/g, ""));
        return (
          <>
            <div
              className={`w-full flex justify-between items-center py-2 cursor-pointer last:pb-0  ${
                balance ? "" : "pointer-events-none"
              }`}
              onClick={() => {
                setCurrencyValue(item.currency);
                setOpenCurrencyDropdown(false);
              }}
              key={`CurrencyDropdown-${index}`}
            >
              <div className="flex gap-x-3 items-center">
                <div
                  className={`rounded-3xl h-7 w-7 text-white flex justify-center items-center p-1.5 ${
                    balance ? "bg-blue-300" : "bg-secondary"
                  }`}
                >
                  {item.currencyIcon}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-500 text-14  leading-4 ${
                      balance ? "text-blue-300" : "text-gray-300"
                    }`}
                  >
                    {item.currencyName}
                  </span>
                  <span className="font-500 text-12 text-gray-300 leading-4">
                    {item.currency}
                  </span>
                </div>
              </div>
              <div>
                {item.currency === "Euro" ? (
                  <p
                    className={`text-14 font-500 leading-4 capitalize text-right ${
                      balance ? "text-blue-300" : "text-gray-300"
                    }`}
                  >
                    {item.balance}
                  </p>
                ) : (
                  <>
                    <p
                      className={`text-14 font-500 leading-4 capitalize text-right ${
                        balance ? "text-blue-300" : "text-gray-300"
                      }`}
                    >
                      {item.balance}
                    </p>
                    <p className="text-gray-300 text-12 font-500 leading-4 uppercase text-right">
                      {item.balanceInEuro}
                    </p>
                  </>
                )}
              </div>
              {/* {currencyValue === item.currency && (
                      <span className="bg-primary rounded-full h-4 w-4 p-[1px] flex items-center justify-center">
                        <UilCheck className="text-white rounded-full" />
                      </span>
                    )} */}
            </div>
            {index !== CurrencyData.length - 1 && (
              <hr className="border-gray-300/10" />
            )}
          </>
        );
      })}
    </div>
  );
};
