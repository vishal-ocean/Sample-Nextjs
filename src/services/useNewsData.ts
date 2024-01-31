import { useNewsStoreAction } from "@/store/NewsStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  page: number;
  items: number;
  section: string;
  token: string;
}

type QueryKey = [string, Params];

type NewsData = {
  news_url: string;
  image_url: string;
  title: string;
  text: string;
  source_name: string;
  date: string;
  topics: string[];
  sentiment: string;
  type: string;
  tickers: string[];
};
export const useNewsData = (params: Params) => {
  const { setNewsData } = useNewsStoreAction;
  return useQuery<NewsData[], Error, NewsData[], QueryKey>(
    ["newsUpdate", params],
    async ({ queryKey }: { queryKey: QueryKey }) => {
      const [_, params] = queryKey;
      try {
        const res = await axios.get(
          `https://cryptonews-api.com/api/v1/category`,
          {
            params: {
              ...params,
            },
          }
        );
        if (res.data) {
          setNewsData(res.data.data.balance);
        }
        if (res.data.data === null) {
          setNewsData([]);
        }
        return res.data.data;
      } catch (error) {
        // console.error("Error:", error);
        // console.log("Something went wrong while fetching transaction history");
      }
    },
    {
      enabled: true,
      cacheTime: 5 * 60 * 1000,
    }
  );
};

export const useTrendingNewsData = () => {
  const { setTrendingNewsData } = useNewsStoreAction;
  return useQuery<NewsData[], Error, NewsData[], string[]>(
    ["newsUpdate"],
    async () => {
      try {
        const res = await axios.get(
          `https://cryptonews-api.com/api/v1/trending-headlines`,
          {
            params: {
              page: 1,
              // token: process.env.CRYPTO_NEWS_API_TOKEN,
            },
          }
        );
        if (res.data) {
          setTrendingNewsData(res.data.data.balance);
        }
        if (res.data.data === null) {
          setTrendingNewsData([]);
        }
        return res.data.data;
      } catch (error) {
        // console.error("Error:", error);
        // console.log("Something went wrong while fetching transaction history");
      }
    },
    {
      enabled: true,
      cacheTime: 5 * 60 * 1000,
    }
  );
};
