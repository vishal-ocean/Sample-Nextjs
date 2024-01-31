import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/screens/Crypto/Home"));
// home page
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
