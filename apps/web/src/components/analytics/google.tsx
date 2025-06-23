import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

interface GoogleAnalyticProps {
  googleAnalyticId: string | undefined;
  googleTagManagerId: string | undefined;
}

export default function GoogleAnalytic({ googleAnalyticId, googleTagManagerId }: GoogleAnalyticProps) {
  return (
    <>
      <GoogleAnalytics gaId={googleAnalyticId as string} />
      <GoogleTagManager gtmId={googleTagManagerId as string} />
    </>
  )
}
