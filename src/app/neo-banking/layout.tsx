import { NeoBankingFooter } from "@/components/Layout/footer/NeoBankingFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NeoBankingFooter />
    </>
  );
}
