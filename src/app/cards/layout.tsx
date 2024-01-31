import { CardsFooter } from "@/components/Layout/footer/CardsFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CardsFooter />
    </>
  );
}
