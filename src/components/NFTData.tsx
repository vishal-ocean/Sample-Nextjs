import { Card, CardContent } from "@/components/UI/Card";
import Image from "next/image";
const NftData = ({ nft }: any) => (
  <div className="item h-[124px] w-[124px]">
    <Card className="!bg-white p-0 flex flex-col">
      <div className="relative w-full h-0 pb-full">
        <Image
          width={124}
          height={124}
          src={nft.image.small}
          alt={nft.name}
          className="h-[124px] w-full rounded-[28px]"
          onError={(e) => {
            e.currentTarget.src = "";
          }}
        />
      </div>
      <CardContent className="!p-5 absolute h-[124px] w-[124px] flex flex-col z-10">
        <p className="font-500 text-12 font-body text-white leading-4 z-10 h-8">
          {nft?.name.length > 10
            ? `${nft?.name.substring(0, 10)}...`
            : nft?.name}
        </p>
        <div className="pt-5 z-10">
          <p className="font-700 text-14 font-body text-white leading-4 z-10">
            {nft.floor_price ? `$${nft.floor_price.usd.toFixed(2)}` : "-"}
          </p>
          <p className="font-500 text-12 font-body text-success-200 leading-[14px] z-10">
            {nft.floor_price_in_usd_24h_percentage_change
              ? nft.floor_price_in_usd_24h_percentage_change.toFixed(2)
              : 0}
            %
          </p>
        </div>
        <div className="bg-gradient-to-t from-[#061935] dark:from-black-100 from-10% to-transparent pointer-events-none w-[124px] !h-[120px] absolute left-0 bottom-0 rounded-[28px]" />
      </CardContent>
    </Card>
  </div>
);

export default NftData;
