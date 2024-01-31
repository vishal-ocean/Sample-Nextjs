import { UilCircleLayer, UilTimes } from '@/icons';

import CustomModal from '@/components/CustomModal';
import { IconRoundedCheck } from '@/components/icons/IconRoundedCheck';
import { ASSETS_DROPDOWN } from '@/constants';
import { useHandleModalAction, useHandleModalStore } from '@/store/handleModal';
import Image from 'next/image';

const FILTER_ITEMS = [
  {
    name: '1 Month',
    value: '1M'
  },
  {
    name: '6 Months',
    value: '6M'
  },
  {
    name: '1 Year',
    value: '1Y'
  },
  {
    name: 'All Time',
    value: 'All'
  }
];
const AssetsDropDownItems = [
  {
    assetName: 'All',
    asset: 'All',
    assetIcon: <UilCircleLayer className="h-4 w-4" />
  },
  {
    assetName: 'Ethereum',
    asset: 'ETH',
    assetIcon: (
      <Image
        src={'/images/svg/icon-ETH.svg'}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4 rounded-full"
      />
    )
  },
  {
    assetName: 'Tether',
    asset: 'USDT',
    assetIcon: (
      <Image
        src={'/images/svg/icon-USDT.svg'}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4 rounded-full"
      />
    )
  }
];

interface ChartDropDownModalProps {
  assetItem: string;
  setAssetItem: React.Dispatch<React.SetStateAction<string>>;
}
const AssetsDropDownModal: React.FC<ChartDropDownModalProps> = ({
  assetItem,
  setAssetItem
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ASSETS_DROPDOWN : '');
  };
  return (
    <CustomModal
      className="p-5 w-full !rounded-t-[16px] bottom-0 rounded-b-none"
      open={modalOpen === ASSETS_DROPDOWN}
      onOpenChange={handleOpenChange}
      withoutClose
    >
      <div className="flex justify-between items-center">
        <span className="text-16 text-blue-300 dark:text-white font-500 leading-5">
          Assets{' '}
        </span>
        <div
          className="flex bg-secondary dark:bg-white/15 disabled:text-gray-300 text-black rounded-full !p-0 w-7 h-7 items-center cursor-pointer"
          onClick={() => setHandleModal('')}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300 dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col mt-2 divide-y divide-gray-300/10 dark:divide-white/15">
        {AssetsDropDownItems.map((item, index) => (
          <>
            <div
              className="w-full flex justify-between items-center py-2 cursor-pointer"
              onClick={() => {
                setAssetItem(item.asset);
              }}
              key={`CurrencyDropdown-${index}`}
            >
              <div className="flex gap-x-3 items-center">
                <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center p-1.5 dark:bg-white/10">
                  {item.assetIcon}
                </div>
                <div className="flex flex-col">
                  <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                    {item.assetName}
                  </span>
                  {item.asset !== 'All Assets' && (
                    <span className="font-500 text-12 text-gray-300 leading-4 dark:text-white/30">
                      {item.asset}
                    </span>
                  )}
                </div>
              </div>
              {assetItem === item.asset && (
                <IconRoundedCheck className="h-4 w-4 text-primary" />
              )}
            </div>
            {index !== AssetsDropDownItems.length - 1 && (
              <hr className="border-gray-300/10" />
            )}
          </>
        ))}
      </div>
    </CustomModal>
  );
};

export default AssetsDropDownModal;
