export type PropertyDataType = {
  property_id: string;
  property_banner_image: string;
  property_name: string;
  property_images: string[]; // images are used in image slider modal and view modal, also into RightCardSection component
  property_introduction1: string;
  property_introduction2: string;
  property_introduction3: string;
  monetization_strategy1: string;
  monetization_strategy2: string;
  owner_logo: string;
  owner_details: {
    // used in LeftCardSection component
    name: string;
    website: string;
    email: string;
    phone: string;
  };
  property_information: {
    // used in LeftCardSection component
    fund_raising_purpose: string;
    real_estate_type: string;
    business_type: string;
    address: string;
  };
  property_investment_information: {
    // used in RightCardSection component
    interest_rate: string;
    earnings: string;
    returns_date: string;
    fund_raising_opening_date: string;
    fund_raising_closing_date: string;
  };
  // following details are used in market-place project listing
  description: string;
  raisedPercent: string;
  daysLeft: string;
  target: string;
  investors: string;
  minimumInvestment: string;
};

export const PROPERTY_DATA: PropertyDataType[] = [
  // {
  //   property_id: "1",
  //   property_banner_image: "/images/a4.jpeg",
  //   property_name: "Luxury Dubai Apartments",
  //   property_images: [
  //     // images are used in image slider modal and view modal, also into RightCardSection component
  //    /* "/images/project-img.png",
  //     "/images/img-1.png",
  //     "/images/img-2.png",
  //     "/images/img-3.png",
  //     "/images/img-5.png",
  //     "/images/img-4.png",
  //     "/images/project-img.png",
  //     "/images/img-1.png",
  //     "/images/img-2.png",
  //     "/images/img-3.png",
  //     "/images/img-5.png",
  //     "/images/img-4.png", */
  //   ],
  //   property_introduction1: `TBA`,
  //   property_introduction2: ``,
  //   property_introduction3: ``,
  //   monetization_strategy1: ``,
  //   monetization_strategy2: ``,
  //   owner_details: {
  //     // used in LeftCardSection component
  //     name: "TBA",
  //     website: "TBA",
  //     email: "TBA",
  //     phone: "TBA",
  //   },
  //   property_information: {
  //     // used in LeftCardSection component
  //     fund_raising_purpose: "TBA",
  //     real_estate_type: "Real Estate",
  //     business_type: "real estate",
  //     address: "TBA",
  //   },
  //   property_investment_information: {
  //     // used in RightCardSection component
  //     interest_rate: "TBA",
  //     earnings: "TBA",
  //     returns_date: "TBA",
  //     fund_raising_opening_date: "TBA",
  //     fund_raising_closing_date: "TBA",
  //   },
  //   // following details are used in market-place project listing
  //   description:
  //     "Invest in one of the hottest real estate markets in the world without needing millions to enter. ",
  //   raisedPercent: "0%",
  //   daysLeft: "TBA",
  //   target: "TBA",
  //   investors: "TBA",
  //   minimumInvestment: "$5,000",
  // },
  {
    property_id: "2",
    property_banner_image: "/images/BITCOIN-banner.jpg",
    property_name: "Bitcoin Mining Fund",
    property_images: [
      // images are used in image slider modal and view modal, also into RightCardSection component
      /*  "/images/project-img.png",
      "/images/img-1.png",
      "/images/img-2.png",
      "/images/img-3.png",
      "/images/img-5.png",
      "/images/img-4.png",
      "/images/project-img.png",
      "/images/img-1.png",
      "/images/img-2.png",
      "/images/img-3.png",
      "/images/img-5.png",
      "/images/img-4.png", */
    ],
    property_introduction1: `TBA`,
    property_introduction2: ``,
    property_introduction3: ``,
    monetization_strategy1: ``,
    monetization_strategy2: ``,
    owner_logo: "/images/svg/crypto-asset-BTC.svg",
    owner_details: {
      // used in LeftCardSection component
      name: "TBA",
      website: "TBA",
      email: "TBA",
      phone: "TBA",
    },
    property_information: {
      // used in LeftCardSection component
      fund_raising_purpose: "TBA",
      real_estate_type: "BTC Fund",
      business_type: "BTC Fund",
      address: "TBA",
    },
    property_investment_information: {
      // used in RightCardSection component
      interest_rate: "TBA",
      earnings: "TBA",
      returns_date: "TBA",
      fund_raising_opening_date: "TBA",
      fund_raising_closing_date: "TBA",
    },
    // following details are used in market-place project listing
    description:
      "Gain exposure to Bitcoin mining without the need to buy or maintain a mining rig!                   ",
    raisedPercent: "0%",
    daysLeft: "TBA",
    target: "TBA",
    investors: "TBA",
    minimumInvestment: "$2,500",
  },
  {
    property_id: "3",
    property_banner_image: "/images/Quantitative-banner.jpg",
    property_name: "Quantitative Trading Fund",
    property_images: [
      // images are used in image slider modal and view modal, also into RightCardSection component
      /* "/images/project-img.png",
      "/images/img-1.png",
      "/images/img-2.png",
      "/images/img-3.png",
      "/images/img-5.png",
      "/images/img-4.png",
      "/images/project-img.png",
      "/images/img-1.png",
      "/images/img-2.png",
      "/images/img-3.png",
      "/images/img-5.png",
      "/images/img-4.png", */
    ],
    property_introduction1: `TBA`,
    property_introduction2: `TBA`,
    property_introduction3: `TBA`,
    monetization_strategy1: `TBA`,
    monetization_strategy2: `TBA`,
    owner_logo: "/images/svg/owner_logo.svg",
    owner_details: {
      // used in LeftCardSection component
      name: "TBA",
      website: "TBA",
      email: "TBA",
      phone: "TBA",
    },
    property_information: {
      // used in LeftCardSection component
      fund_raising_purpose: "Quantitative Trading Fund",
      real_estate_type: "Crypto ETFs",
      business_type: "Crypto ETFs",
      address: "TBA",
    },
    property_investment_information: {
      // used in RightCardSection component
      interest_rate: "TBA",
      earnings: "TBA",
      returns_date: "TBA",
      fund_raising_opening_date: "TBA",
      fund_raising_closing_date: "TBA",
    },
    // following details are used in market-place project listing
    description:
      "Access an institutional trading fund managed by a team of quantitative traders.",
    raisedPercent: "0%",
    daysLeft: "TBA",
    target: "TBA",
    investors: "TBA",
    minimumInvestment: "$2,500",
  },
];
