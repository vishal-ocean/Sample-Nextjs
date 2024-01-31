import { DashboardFooter } from "@/components/Layout/footer/DashboardFooter";
import HomeScreen from "@/screens/Home";

export default async function Home() {
  return (
    <>
      <HomeScreen />
      <DashboardFooter />
    </>
  );
}
