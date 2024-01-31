"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";

const NotificationProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = new Ably.Realtime.Promise({
    authUrl: "api/notification/token",
  });
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default NotificationProviderWrapper;
