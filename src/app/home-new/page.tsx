import { DashboardFooter } from "@/components/Layout/footer/DashboardFooter";
import HomePage from "@/screens/HomeNew";

export default async function Home() {
  return (
    <>
      <HomePage />
      <DashboardFooter />
    </>
  );
}
