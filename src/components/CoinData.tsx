import { Card, CardContent } from "@/components/UI/Card";
import { readableNumber } from "@/helper/readableNumber";
import { cn } from "@/utils";
import Image from "next/image";
const CoinData = ({ coin }: any) => (
  <div className="w-[124px]">
    <Card className="!bg-white dark:!bg-white/10 p-5 min-h-[124px]">
      <CardContent className="!p-0">
        <div className="flex justify-start items-center w-[84px] gap-x-[10px]">
          <div className="w-8 h-8 flex justify-center items-center rounded-full">
            <Image
              width={32}
              height={32}
              src={coin.image}
              alt={coin.name}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.currentTarget.src = "";
              }}
            />
          </div>
          <div>
            <p className="font-500 text-12 font-body text-blue-300 dark:text-white leading-4">
              {coin?.name.length > 5
                ? `${coin?.name.substring(0, 5)}...`
                : coin?.name}
            </p>
            <p className="font-500 text-12 font-body text-gray-300 dark:text-gray-300/30 leading-[14px]">
              {coin?.symbol?.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="pt-5">
          <p className="font-700 text-14 font-body text-blue-300 leading-4 dark:text-white">
            €{readableNumber(Number(coin?.current_price?.toFixed(2) || 0))}
          </p>
          <p
            className={cn(
              "font-500 text-12 font-body leading-[14px] dark:leading-4",
              coin.price_change_percentage_24h > 0
                ? "text-success-200"
                : coin.price_change_percentage_24h < 0
                ? "text-danger-100"
                : "text-blue-300"
            )}
          >
            {coin.price_change_percentage_24h > 0 ? "+" : ""}
            {coin.price_change_percentage_24h
              ? coin.price_change_percentage_24h.toFixed(2)
              : 0}
            %
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CoinData;
