import CustomModal from '@/components/CustomModal';
import { SquareImageStack } from '@/components/SquareImageStack';
import { ASSETS_DETAILS_MODAL } from '@/constants';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import AssetDetailCard from '../AssetDetailCard';
import { useStaticData } from '../useStaticData';

const AssetsDetailsModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { ASSETS_DETAILS_DATA } = useStaticData();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ASSETS_DETAILS_MODAL : '');
  };
  const imgStackArr = ['BTC', 'USDT', 'XRP', 'ETH'];

  return (
    <CustomModal
      open={modalOpen == ASSETS_DETAILS_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] md:translate-y-[-58%] max-h-[760px] "
    >
      <div>
        <div className="flex mb-6">
          <div className="flex gap-x-2">
            <SquareImageStack />
            <div>
              <div className="text-12 text-blue-300 font-500 leading-4 dark:text-white">
                BTC / USDT / USDCe
              </div>
              <div className="text-16 text-gray-300 font-500 leading-5 dark:text-white/30">
                Assets Details
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 max-h-[670px] overflow-y-scroll">
          {ASSETS_DETAILS_DATA.map((item, index) => (
            <AssetDetailCard
              key={`assetsDetailsList-${index}`}
              name={item.name}
              shortName={item.shortName}
              currency={item.currency}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </CustomModal>
  );
};

export default AssetsDetailsModal;
