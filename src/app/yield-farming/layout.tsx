import { CryptoFooter } from "@/components/Layout/footer/CryptoFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CryptoFooter />
    </>
  );
}
