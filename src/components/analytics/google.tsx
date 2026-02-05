import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

interface GoogleAnalyticProps {
  googleAnalyticId: string;
  googleTagManagerId: string;
}

function GoogleAnalytic({
  googleAnalyticId,
  googleTagManagerId,
}: GoogleAnalyticProps) {
  return (
    <>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </>
  );
}

export default GoogleAnalytic;
export { GoogleAnalytic };
