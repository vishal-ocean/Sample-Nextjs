import { create } from "zustand";

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
interface NewsStore {
  news: NewsData[];
  tendingNews: NewsData[];
}

interface NewsStoreAction {
  setNewsData: (value: NewsData[]) => void;
  setTrendingNewsData: (value: NewsData[]) => void;
}

export const useNewsStore = create<NewsStore>(() => ({
  news: [],
  tendingNews: [],
}));

export const useNewsStoreAction: NewsStoreAction = {
  setNewsData: (value) => {
    useNewsStore.setState(() => ({ news: value }));
  },
  setTrendingNewsData: (value) => {
    useNewsStore.setState(() => ({ tendingNews: value }));
  },
};
