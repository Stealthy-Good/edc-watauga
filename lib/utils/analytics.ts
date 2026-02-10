declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GAEventParams = Record<string, string | number | boolean>;

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

export const analytics = {
  pageView(url: string) {
    gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  },

  event(action: string, params?: GAEventParams) {
    gtag("event", action, params);
  },

  contactFormSubmission(interest: string) {
    analytics.event("contact_form_submission", {
      interest_type: interest,
    });
  },

  ctaClick(label: string, location: string) {
    analytics.event("cta_click", {
      cta_label: label,
      cta_location: location,
    });
  },

  pageDownload(filename: string) {
    analytics.event("file_download", {
      file_name: filename,
    });
  },
};
