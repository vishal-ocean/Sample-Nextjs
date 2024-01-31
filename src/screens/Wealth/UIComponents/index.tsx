import InBusinessCard from "./components/InBusinessCard";
import InitialRaiseCard from "./components/InitialRaiseCard";
import InvestedCard from "./components/InvestedCard";

const UIComponent = () => {
  return (
    <div className="m-10">
      <div className="grid grid-cols-12 gap-4">
        <InvestedCard />
        <InBusinessCard />
        <InitialRaiseCard />
      </div>
    </div>
  );
};

export default UIComponent;
