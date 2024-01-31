import { usePathname } from "next/navigation";

export const IsStretchBanner = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  return (
    pathParts.includes("cards") ||
    pathParts.includes("profile") ||
    pathParts.includes("token-details")
  );
};
