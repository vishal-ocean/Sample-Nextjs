import IconCryptoCard from "@/components/icons/IconCryptoCard";
import IconOMCard from "@/components/icons/IconOMCard";
import IconRampOnOff from "@/components/icons/IconRampOnOff";
import IconReferralProgram from "@/components/icons/IconReferralProgram";
import IconSendReceive from "@/components/icons/IconSendReceive";
import IconSimpleExchange from "@/components/icons/IconSimpleExchange";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  UilCheck,
  UilEnvelopeAlt,
  UilLock,
  UilPen,
  UilQrcodeScan,
} from "@iconscout/react-unicons";
export const useProfileStaticData = () => {
  const { user, error, isLoading } = useUser();
  const Information = [
    {
      status: "complete",
      icon: (
        <UilEnvelopeAlt className="h-4 w-4 text-blue-300 dark:text-white" />
      ),
      editIcon: <UilPen className="h-4 w-4 text-blue-300 dark:text-white" />,
      completedIcon: (
        <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
          <UilCheck className="h-3 w-3 text-white" />
        </div>
      ),
      content: user?.email || "",
      subContent: "Contact Support to change email address",
    },
    {
      type: "password",
      status: "incomplete",
      icon: <UilLock className="h-4 w-4 text-blue-300 dark:text-white" />,
      editIcon: <UilPen className="h-4 w-4 text-blue-300 dark:text-white" />,
      completedIcon: (
        <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
          <UilCheck className="h-3 w-3 text-white" />
        </div>
      ),
      content: "Password",
      subContent: "Do not tell your password to anyone",
    },
    {
      status: "complete",
      icon: <UilQrcodeScan className="h-4 w-4 text-blue-300 dark:text-white" />,
      editIcon: <UilPen className="h-4 w-4 text-blue-300 dark:text-white" />,
      completedIcon: (
        <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
          <UilCheck className="h-3 w-3 text-white" />
        </div>
      ),
      content: "Authenticator",
      subContent: "Contact Support to change authenticator",
    },
  ];
  const FEATURES_CARD = [
    {
      icon: <IconSendReceive className="h-6 w-6 text-primary" />,
      title: "Transfer Assets",
      description: "Top Ups and Withdrawals",
    },
    {
      icon: <IconCryptoCard className="h-6 w-6 text-primary" />,
      title: "Buy Crypto with Card",
      description: "Use any Visa or Mastercard to buy crypto",
    },
    {
      icon: <IconOMCard className="h-6 w-6 text-primary" />,
      title: "OceanMoney Card",
      description: "Spend cash instantly",
    },
    {
      icon: <IconSimpleExchange className="h-6 w-6 text-primary" />,
      title: "Exchange",
      description: "Buy, sell & swap",
    },
    {
      icon: <IconRampOnOff className="h-6 w-6 text-primary" />,
      title: "On/off - ramp fiat",
      description: "Process of exchanging fiat for crypto",
    },
    {
      icon: <IconReferralProgram className="h-6 w-6 text-primary" />,
      title: "Referral Program",
      description: "Invite friends and earn Bitcoin",
    },
  ];
  const VIDEO_DATA = [
    {
      type: "Crypto",
      videoDuration: "2.02",
      videoTitle: "Fund your Crypto Account",
      sunContent: "How to fund your account in a few quick steps",
      videoSubTitle: "Fund your Crypto Account",
      action: "Top up",
      bgImage: "/images/crypto-1.png",
    },
    {
      type: "Wealth",
      videoDuration: "2.02",
      videoTitle: "Manage your Wealth",
      sunContent: "Multiply your wealth wisely just in few clicks",
      videoSubTitle: "Ways of Investing in Wealth Market",
      action: "Explore Wealth Market",
      bgImage: "/images/wealth-1.png",
    },
    {
      type: "NeoBanking",
      videoDuration: "2.02",
      videoTitle: "Banking functions in one-place",
      sunContent: "Manage your fiat currency & Transfer without any delay",
      videoSubTitle: "Usage of Banking Functions",
      action: "Top up",
      bgImage: "/images/neobanking-1.png",
    },
    {
      type: "Crypto",
      videoDuration: "2.02",
      videoTitle: "Fund your Crypto Account",
      sunContent: "How to fund your account in a few quick steps",
      videoSubTitle: "Fund your Crypto Account",
      action: "Top up",
      bgImage: "/images/crypto-2.png",
    },
    {
      type: "Crypto",
      videoDuration: "2.02",
      videoTitle: "Fund your Crypto Account",
      sunContent: "How to fund your account in a few quick steps",
      videoSubTitle: "Fund your Crypto Account",
      action: "Top up",
      bgImage: "/images/crypto-3.png",
    },
    {
      type: "Crypto",
      videoDuration: "2.02",
      videoTitle: "Fund your Crypto Account",
      sunContent: "How to fund your account in a few quick steps",
      videoSubTitle: "Fund your Crypto Account",
      action: "Top up",
      bgImage: "/images/crypto-4.png",
    },
    {
      type: "NFT",
      videoDuration: "2.02",
      videoTitle: "What is NFT Vault?",
      sunContent: "How to create safest vaults and Trade NFT seamlessly",
      videoSubTitle: "Creating NFT Vault in a few steps",
      action: "Deposit NFT",
      bgImage: "/images/nfts-1.png",
    },

    {
      type: "NeoBanking",
      videoDuration: "2.02",
      videoTitle: "Banking functions in one-place",
      sunContent: "Manage your fiat currency & Transfer without any delay",
      videoSubTitle: "Usage of Banking Functions",
      action: "Top up",
      bgImage: "/images/neobanking-2.png",
    },
  ];
  return { FEATURES_CARD, Information, VIDEO_DATA };
};
