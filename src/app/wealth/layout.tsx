//dashboard/src/app/layout.tsx
import { WealthFooter } from "@/components/Layout/footer/WealthFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <WealthFooter />
    </>
  );
}
