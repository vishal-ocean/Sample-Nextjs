import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { VIDEO_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { UilPlay } from "@iconscout/react-unicons";

export const VideoModal = ({
  videoContentTitle,
}: {
  videoContentTitle: string;
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? VIDEO_MODAL : "");
  };
  return (
    <Dialog open={modalOpen == VIDEO_MODAL} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent className={cn(" p-5 max-w-[656px] top-1/2 border-none")}>
        <DialogTitle className="">
          <div className="flex items-center gap-x-2">
            <div className="rounded-full h-10 w-10 bg-blue-300 flex justify-center items-center">
              <UilPlay className="h-4 w-4 text-white" />
            </div>
            <p className="text-12 font-500 leading-4 text-blue-300">
              {videoContentTitle}
            </p>
          </div>
          <div className="mt-5">
            {/* <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/K4TOrB7at0Y?si=RKQfdHAvJfd51qS_"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe> */}
            <video
              width="320"
              height="240"
              controls
              className="aspect-video w-full"
            >
              <source
                src="https://youtu.be/K4TOrB7at0Y?si=fbqeeOixEkAnpGua"
                type="video/mp4"
              />
              <source
                src="https://youtu.be/K4TOrB7at0Y?si=fbqeeOixEkAnpGua"
                type="video/ogg"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
