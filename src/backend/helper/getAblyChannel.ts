import Ably from "ably/promises";
export const getAblyChannel = async (userId: string) => {
  const ablyKey = process.env.ABLY_SUBSCRIBER_PUBLISHER_KEY as string;
  const ably = new Ably.Rest({ key: ablyKey });
  const channel = ably.channels.get(userId);
  return channel;
};
