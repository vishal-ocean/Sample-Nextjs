import { getAblyChannel } from "@/backend/helper/getAblyChannel";
import { getParams } from "@/backend/helper/getParams";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const prisma = new PrismaClient();

const createCryptoNotificationSchema = Yup.object().shape({
  notification: Yup.object().test(
    "is-not-empty",
    "Notification object cannot be empty",
    (value) => {
      return Object.keys(value).length > 0;
    }
  ),
  auth0Id: Yup.string()
    .matches(/^auth0\|[a-fA-F0-9-]+$/, "Invalid auth0Id format.")
    .required("auth0Id is required"),
  externalId: Yup.string().required("externalId is required"),
});

const getCryptoNotificationSchema = Yup.object().shape({
  auth0Id: Yup.string()
    .matches(/^auth0\|[a-fA-F0-9-]+$/, "Invalid auth0Id format.")
    .required("auth0Id is required"),
});

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // Validate the request body
    await createCryptoNotificationSchema.validate(reqBody);

    const userId = reqBody.auth0Id;
    const channel = await getAblyChannel(userId);
    const isNotificationExist = await prisma.notifications.findFirst({
      where: {
        source: "CRYPTO",
        externalId: reqBody.externalId,
      },
    });
    if (isNotificationExist) {
      return NextResponse.json(
        {
          status: false,
          message: "Notification is already exist.",
        },
        { status: 400 }
      );
    }

    // Create a notification in the database
    const notification = await prisma.notifications.create({
      data: {
        ...reqBody,
        source: "CRYPTO",
      },
    });

    // Publish to the Ably channel
    await channel.publish("myEvent", reqBody);

    // Respond with success
    return NextResponse.json(
      {
        status: 200,
        message: "Notification created successfully.",
        notification,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Handle Yup validation errors
      return NextResponse.json(
        { status: 400, message: error.message },
        { status: 400 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        {
          status: false,
          message: "An error occurred while creating the notification.",
          error,
        },
        { status: 500 }
      );
    }
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const params = getParams(req.url);
    await getCryptoNotificationSchema.validate(params);

    // get all notifications
    const notificationList = await prisma.notifications.findMany({
      where: {
        source: "CRYPTO",
        auth0Id: params?.auth0Id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Respond with success
    return NextResponse.json(
      {
        status: 200,
        message: "Notification list fetched successfully.",
        data: notificationList,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Handle Yup validation errors
      return NextResponse.json(
        { status: 400, message: error.message },
        { status: 400 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        {
          status: false,
          message: "An error occurred while fetching the notification list.",
        },
        { status: 500 }
      );
    }
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // Validate the request body
    await createCryptoNotificationSchema.validate(reqBody);

    const userId = reqBody.auth0Id;
    const channel = await getAblyChannel(userId);

    const isNotificationExist = await prisma.notifications.findFirst({
      where: {
        source: "CRYPTO",
        externalId: reqBody.externalId,
      },
    });
    if (!isNotificationExist) {
      return NextResponse.json(
        {
          status: false,
          message: "Notification not found",
        },
        { status: 400 }
      );
    }
    // Update a notification in the database
    const notification = await prisma.notifications.update({
      where: {
        source_externalId: {
          source: "CRYPTO",
          externalId: reqBody.externalId,
        },
      },
      data: {
        notification: reqBody.notification,
        updatedAt: new Date(),
      },
    });

    // Publish to the Ably channel
    await channel.publish("myEvent", notification);

    // Respond with success
    return NextResponse.json(
      {
        status: 200,
        message: "Notification updated successfully.",
        notification,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Handle Yup validation errors
      return NextResponse.json(
        { status: 400, message: error.message },
        { status: 400 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        {
          status: false,
          message: "An error occurred while updating the notification.",
          error,
        },
        { status: 500 }
      );
    }
  }
};
