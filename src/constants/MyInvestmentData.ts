export interface MyInvestmentDataProps {
  estateImage: string;
  estateCategory: string;
  ownerLogo: string;
  estateName: string;
  description: string;
  minimumInvestment: string;
  interestRate: string;
  raisedPercent: string;
  daysLeft: string;
  target: string;
  investors: string;
  earnings?: number;
  status: "fundRaising" | "inBusiness"; // Define possible status values
}
export const MyInvestmentData: MyInvestmentDataProps[] = [
  {
    estateImage: "/images/project-img.png",
    estateCategory: "Hotel",
    ownerLogo: "/images/owner-logo.png",
    estateName: "Polkadot’s Hotel Renovation",
    description:
      "Our vision is to enable our planet's transition to sustainable energy",
    minimumInvestment: "€25,000",
    interestRate: "22%",
    raisedPercent: "70%",
    daysLeft: "7",
    target: "$100M",
    investors: "128",
    status: "fundRaising",
  },
  {
    estateImage: "/images/project-img.png",
    estateCategory: "Hotel",
    ownerLogo: "/images/owner-logo.png",
    estateName: "Polkadot’s Hotel Renovation",
    description:
      "Our vision is to enable our planet's transition to sustainable energy",
    minimumInvestment: "€25,000",
    interestRate: "22%",
    raisedPercent: "100%",
    daysLeft: "7",
    target: "$100M",
    investors: "128",
    earnings: 25000,
    status: "inBusiness",
  },
  {
    estateImage: "/images/project-img.png",
    estateCategory: "Hotel",
    ownerLogo: "/images/owner-logo.png",
    estateName: "Polkadot’s Hotel Renovation",
    description:
      "Our vision is to enable our planet's transition to sustainable energy",
    minimumInvestment: "€25,000",
    interestRate: "22%",
    raisedPercent: "70%",
    daysLeft: "7",
    target: "$100M",
    investors: "128",
    status: "fundRaising",
  },
  {
    estateImage: "/images/project-img.png",
    estateCategory: "Hotel",
    ownerLogo: "/images/owner-logo.png",
    estateName: "Polkadot’s Hotel Renovation",
    description:
      "Our vision is to enable our planet's transition to sustainable energy",
    minimumInvestment: "€25,000",
    interestRate: "22%",
    raisedPercent: "100%",
    daysLeft: "7",
    target: "$100M",
    investors: "128",
    earnings: 25000,
    status: "inBusiness",
  },
];
