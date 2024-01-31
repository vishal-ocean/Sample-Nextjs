import { PROJECT_FILTER_MODAL } from "@/constants";
import { UilCheckCircle, UilSearch } from "@/icons";
import { useProjectDummyList } from "@/screens/Wealth/MarketPlace/components/SecondaryMarket/useProjectDummyList";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import CustomModal from "./CustomModal";
import { Input } from "./UI/form/Input";

interface ProjectFilterModalProps {
  filterOption: string;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}
const ProjectFilterModal: React.FC<ProjectFilterModalProps> = ({
  filterOption,
  setFilterOption,
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { PROJECT_LIST } = useProjectDummyList();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? PROJECT_FILTER_MODAL : "");
  };
  return (
    <CustomModal
      className="p-6 w-full rounded-t-[32px] bottom-0 rounded-b-none max-w-[920px]"
      open={modalOpen === PROJECT_FILTER_MODAL}
      onOpenChange={handleOpenChange}
    >
      <span className="text-blue-300 font-500 text-24 leading-7">
        Your Assets
      </span>
      <div className="flex flex-col gap-y-3">
        <div className="relative w-full !bg-gray-100 rounded-[12px] flex items-center">
          <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
            <UilSearch className="w-4 h-4 text-blue-300" />
          </div>
          <Input
            type="text"
            id="search-assets"
            className="input w-full leading-5 rounded-[12px] outline-none py-2 pl-8 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 font-500 font-body cursor-pointer text-blue-300 bg-gray-100 border-none"
            placeholder="Search"
            required
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto mt-1 flex flex-col">
          {PROJECT_LIST.map((item, index) => (
            <>
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => {
                  setFilterOption(item.value);
                  setHandleModal("");
                }}
                key={`assetsAccordionContent-${index}`}
              >
                <div className="flex gap-x-4 items-center">
                  <div className="rounded-3xl h-7 w-7 bg-secondary flex justify-center items-center">
                    {item.img ? (
                      <Image
                        width={16}
                        height={16}
                        src={item.img}
                        alt="image"
                      />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <span className="font-500 text-blue-300 leading-5">
                    {item.name}
                  </span>
                </div>
                {filterOption === item.value && (
                  <UilCheckCircle className="text-primary h-4 w-4" />
                )}
              </div>
              {index !== PROJECT_LIST.length - 1 && (
                <hr className="my-3 bg-gray-300 opacity-60" />
              )}
            </>
          ))}
        </div>
      </div>
    </CustomModal>
  );
};

export default ProjectFilterModal;
