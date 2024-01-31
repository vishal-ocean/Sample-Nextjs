import dynamic from "next/dynamic";

const NewsUpdateArticle = dynamic(
  () => import("@/screens/newsUpdates/NewsUpdateArticle")
);

const PageNewsUpdateArticle = () => {
  return <NewsUpdateArticle />;
};

export default PageNewsUpdateArticle;
