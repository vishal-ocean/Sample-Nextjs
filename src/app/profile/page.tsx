"use client";
import { Profile } from "@/screens/Profile/index";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
const PageProfile = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return <Profile modalOpen={modalOpen} setHandleModal={setHandleModal} />;
};

export default PageProfile;
