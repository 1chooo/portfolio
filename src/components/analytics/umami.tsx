import Script from "next/script";

interface UmamiAnalyticProps {
  umamiWebsiteId: string;
  umamiUrl: string;
}

function UmamiAnalytic({ umamiWebsiteId, umamiUrl }: UmamiAnalyticProps) {
  return (
    <Script
      async
      data-website-id={umamiWebsiteId}
      src={`${umamiUrl}/script.js`}
    />
  );
}

export default UmamiAnalytic;
export { UmamiAnalytic };
