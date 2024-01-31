import CardsSection from "./CardsSection";
import ChartSection from "./ChartSection";

const MyInvestments = () => {
  return (
    <div className="grid grid-cols-12 gap-y-2 gap-x-6">
      <div className="lg:col-span-9 col-span-12 w-full h-full ">
        <ChartSection />
      </div>
      <CardsSection />
    </div>
  );
};

export default MyInvestments;
