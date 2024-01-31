import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { IconBook } from "@/components/icons/IconBook";
import { LEARNING_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";

export const LearningModal = ({
  videoContentTitle,
}: {
  videoContentTitle: string;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? LEARNING_MODAL : "");
  };
  return (
    <Dialog open={modalOpen == LEARNING_MODAL} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 w-full bottom-0 top-auto"
        )}
      >
        <DialogTitle className="">
          <div className="flex items-center gap-x-2">
            <div className="rounded-full h-10 w-10 bg-blue-300 flex justify-center items-center">
              <IconBook strokeWidth={1.2} className="h-4 w-4 text-white" />
            </div>
            <p className="text-12 font-500 leading-4 text-blue-300">
              {videoContentTitle}
            </p>
          </div>
          <div className="mt-10 h-[500px] overflow-auto flex flex-col gap-y-4 px-1 sm:px-7">
            <p className="text-24 font-500 leading-7 text-blue-300">
              The Booster Explained
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300">
              With the Booster, you can buy up to 3x of the crypto asset you
              want by leveraging your current holdings. This is all possible
              thanks to the hybrid nature of the product that shares identical
              features with both the Exchange and our Instant Crypto Credit
              Lines. The result is an automatically executed borrow and exchange
              transaction with an added aspect of leverage.
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300">
              With the Booster, you can buy up to 3x of the crypto asset you
              want by leveraging your current holdings. This is all possible
              thanks to the hybrid nature of the product that shares identical
              features with both the Exchange and our Instant Crypto Credit
              Lines. The result is an automatically executed borrow and exchange
              transaction with an added aspect of leverage.
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300 ">
              You can execute a booster transaction using a single asset or
              different assets. Boosts with a Single AssetBoost a cryptocurrency
              from 1.5x to 3x its value and receive the total amount in the same
              asset. Example: Boost BTC and get more BTC. Boosts with Two
              AssetsBoost a cryptocurrency from 1.5x to 3x its value and receive
              the total amount in the new cryptocurrency. Example: Boost BTC to
              get ETH.
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300">
              With the Booster, you can buy up to 3x of the crypto asset you
              want by leveraging your current holdings. This is all possible
              thanks to the hybrid nature of the product that shares identical
              features with both the Exchange and our Instant Crypto Credit
              Lines. The result is an automatically executed borrow and exchange
              transaction with an added aspect of leverage.
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300">
              With the Booster, you can buy up to 3x of the crypto asset you
              want by leveraging your current holdings. This is all possible
              thanks to the hybrid nature of the product that shares identical
              features with both the Exchange and our Instant Crypto Credit
              Lines. The result is an automatically executed borrow and exchange
              transaction with an added aspect of leverage.
            </p>
            <p className="text-16 font-500 leading-5 text-gray-300 ">
              You can execute a booster transaction using a single asset or
              different assets. Boosts with a Single AssetBoost a cryptocurrency
              from 1.5x to 3x its value and receive the total amount in the same
              asset. Example: Boost BTC and get more BTC. Boosts with Two
              AssetsBoost a cryptocurrency from 1.5x to 3x its value and receive
              the total amount in the new cryptocurrency. Example: Boost BTC to
              get ETH.
            </p>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
