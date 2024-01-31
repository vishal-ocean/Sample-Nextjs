import dynamic from "next/dynamic";
const UIComponent = dynamic(() => import("@/screens/Wealth/UIComponents"));

const UIComponentPage = () => {
  return (
    <>
      <UIComponent />
    </>
  );
};

export default UIComponentPage;
