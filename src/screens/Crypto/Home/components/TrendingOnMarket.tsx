"use client";
import CoinData from "@/components/CoinData";
import TrendingMarketSkeleton from "@/components/Loaders/TrendingMarketSkeleton";
import { UilFire } from "@/icons";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useTrendingOnMarket } from "./useTrendingOnMarket";

const apiKey = "CG-zZ7fPkQie5p8LZdERreaJhzm";

const TrendingOnMarket = () => {
  const [topCoins, setTopCoins] = useState<any[]>([]); // use any[]

  const slickSliderRef = useRef();
  const { sliderSettings } = useTrendingOnMarket();
  useEffect(() => {
    const fetchTopCoins = async () => {
      const coinsUrl = `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false&x_cg_pro_api_key=${apiKey}`;
      const nftsUrl = `https://pro-api.coingecko.com/api/v3/nfts/markets?asset_platform_id=ethereum&order=h24_volume_native_desc&per_page=10&page=1&x_cg_pro_api_key=${apiKey}`;

      const [coinsResponse, nftsResponse] = await Promise.all([
        fetch(coinsUrl),
        fetch(nftsUrl),
      ]);

      const [coinsData, nftsData] = await Promise.all([
        coinsResponse.json(),
        nftsResponse.json(),
      ]);

      // Tag the data with its type
      const taggedCoinsData = coinsData.map((coin: any) => ({
        ...coin,
        type: "coin",
      }));
      const taggedNftsData = nftsData.map((nft: any) => ({
        ...nft,
        type: "nft",
      }));

      // Combine the data into an array that alternates between coins and NFTs
      const combinedData: string[] = [];
      for (
        let i = 0;
        i < Math.max(taggedCoinsData.length, taggedNftsData.length);
        i++
      ) {
        if (taggedCoinsData[i]) {
          combinedData.push(taggedCoinsData[i]);
        }
        if (taggedNftsData[i]) {
          combinedData.push(taggedNftsData[i]);
        }
      }

      setTopCoins(combinedData);
    };

    fetchTopCoins();
  }, []);

  if (topCoins && topCoins.length === 0) {
    return <TrendingMarketSkeleton />;
  }
  return (
    <>
      <div className="flex mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="flex gap-x-3 items-center lg:mx-0 mx-2">
          <div className="bg-blue-300 dark:bg-white w-10 h-10 flex justify-center items-center rounded-full">
            <UilFire className="w-4 h-4 text-white dark:text-blue-300" />
          </div>
          <span className="text-16 text-blue-300 font-500 leading-5 dark:text-white">
            Market Updates
          </span>
        </div>
        {/* <Link href="/crypto/market-place">
          <Button className="font-700 text-14 py-3 px-4 leading-4">
            Marketplace
          </Button>
        </Link> */}
      </div>
      <div className="mt-4 overflow-hidden w-full max-w-[1320px] cursor-grab relative">
        {/* {topCoins.length > 10 && (
          <>
            <div className="bg-gradient-to-l from-[#f1f3f4] dark:from-black-100 to-transparent pointer-events-none w-full max-w-[200px] !h-[130px] z-20 absolute right-0 top-0 bottom-0 hidden sm:block" />
            <div className="bg-gradient-to-r from-[#f1f3f4] dark:from-black-100 to-transparent pointer-events-none w-full max-w-[200px] !h-[130px] z-20 absolute left-0 top-0 bottom-0 hidden sm:block" />
          </>
        )} */}
        <Slider
          {...sliderSettings}
          ref={slickSliderRef}
          className="pl-3 sm:pl-10 lg:pl-4 xl:pl-0"
        >
          {topCoins.map((item, index) => {
            if (index % 2 === 0) {
              return <CoinData coin={item} key={`coinData-${index}`} />;
            }
            // else {
            //   return <NftData nft={item} key={`nftData-${index}`} />;
            // }
          })}
        </Slider>
      </div>
    </>
  );
};

export default TrendingOnMarket;
