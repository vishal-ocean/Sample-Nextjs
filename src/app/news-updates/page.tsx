import dynamic from "next/dynamic";

const NewsUpdates = dynamic(() => import("@/screens/newsUpdates"));

const PageNewsUpdates = () => {
  return <NewsUpdates />;
};

export default PageNewsUpdates;
