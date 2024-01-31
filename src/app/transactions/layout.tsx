import { TransactionsFooter } from "@/components/Layout/footer/TransactionsFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TransactionsFooter />
    </>
  );
}
