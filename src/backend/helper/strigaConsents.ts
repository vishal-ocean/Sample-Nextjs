declare global {
  interface Window {
    StrigaUXPlugin: any;
  }
}

export const strigaCreateConsent = async () => {
  if (typeof window !== undefined) {
    await window.StrigaUXPlugin.create(
      process.env.NEXT_PUBLIC_STRIGA_UI_SECRET,
      {
        applicationId: process.env.NEXT_PUBLIC_STRIGA_APPLICATION_ID,
      }
    );
  }
};

export const strigaRequestConsent = async (userId: string) => {
  if (typeof window !== undefined) {
    const response = await window.StrigaUXPlugin.requestConsent({
      userId: userId,
    });
    return response;
  }
};

export const strigaRender = (cardId: string, authToken: string) => {
  if (typeof window !== undefined) {
    window.StrigaUXPlugin.render("cardNumber", (data: any) =>
      console.log(data)
    );
  }
};
