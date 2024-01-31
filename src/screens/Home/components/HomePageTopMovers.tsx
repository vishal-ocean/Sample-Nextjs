//dashboard/src/page-components/HomePageTopcoins2.tsx
"use client";
import { UilAngleLeftB, UilAngleRightB, UilFire } from "@/icons";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/Card";
import { Skeleton } from "@/components/UI/Skeleton";

import CoinData from "@/components/CoinData";
import NftData from "@/components/NFTData";
import Slider from "react-slick";

const apiKey = "CG-zZ7fPkQie5p8LZdERreaJhzm	";

const HomePageTopcoins = () => {
  const [topcoins, setTopcoins] = useState<any[]>([]); // use any[]
  const [topNfts, setTopNfts] = useState([]);
  const slickSliderRef = useRef<any>(null);

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

      setTopcoins(combinedData);
    };

    fetchTopCoins();
  }, []);

  const next = () => {
    slickSliderRef.current.slickNext();
  };

  const prev = () => {
    slickSliderRef.current.slickPrev();
  };

  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    initialSlide: 0,
    autoplay: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: true,
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 2.7,
        },
      },
    ],
  };

  if (!topcoins || topcoins.length === 0) {
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-start items-center gap-x-2">
            <div className="bg-blue-300 w-10 h-10 flex justify-center items-center rounded-full">
              <UilFire className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-16 text-blue-300 font-500">Top Coins & NFTs</p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className="w-10 h-10 !p-0 text-14 font-700"
            >
              <UilAngleLeftB className="h-4 w-4 text-blue-300" />
            </Button>
            <Button
              variant="secondary"
              className="w-10 h-10 !p-0 text-14 font-700"
            >
              <UilAngleRightB className="h-4 w-4 text-blue-300" />
            </Button>
          </div>
        </div>
        <div className="carousel cursor-grab overflow-hidden w-full max-w-[1320px]">
          <div className="inner-carousel flex gap-x-2">
            {[...Array(10)].map((_, index) => (
              <Card
                className="!bg-white p-5 min-h-[124px] min-w-[124px]"
                key={`skeleton-${index}`}
              >
                <CardContent className="!p-0">
                  <div className="flex justify-start items-center w-[84px] gap-x-[10px]">
                    <Skeleton className="w-8 h-8 rounded-full bg-gray-50" />

                    <div>
                      <Skeleton className="w-[42px] h-4 bg-gray-50" />
                    </div>
                  </div>
                  <div className="pt-5">
                    <Skeleton className="w-full h-4 bg-gray-50" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2 sm:mb-4 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="flex justify-start items-center gap-x-2">
          <div className="bg-blue-300 w-10 h-10 flex justify-center items-center rounded-full">
            <UilFire className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-16 text-blue-300 font-500">Top Coins & NFTs</p>
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button
            variant="secondary"
            className="w-10 h-10 !p-0 text-14 font-700"
            onClick={prev}
          >
            <UilAngleLeftB className="h-4 w-4 text-blue-300" />
          </Button>
          <Button
            variant="secondary"
            className="w-10 h-10 !p-0 text-14 font-700"
            onClick={next}
          >
            <UilAngleRightB className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
      </div>
      <div className="sm:bg-gradient-to-l from-[#f1f3f4] dark:from-black-100 from-30% to-transparent pointer-events-none w-[120px] !h-[130px] z-20 absolute right-0 top-[56px] bottom-0"></div>
      <div className="cursor-grab overflow-hidden w-full max-w-[1320px] relative pl-3 sm:pl-10 lg:pl-4 xl:pl-0">
        <Slider {...sliderSettings} ref={slickSliderRef}>
          {topcoins.map((item, index) => {
            if (index % 2 === 0) {
              return <CoinData coin={item} key={`coinData-${index}`} />;
            } else {
              return <NftData nft={item} key={`nftData-${index}`} />;
            }
          })}
        </Slider>
      </div>
    </>
  );
};

export default HomePageTopcoins;
