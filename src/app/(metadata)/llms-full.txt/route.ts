export const dynamic = "force-static"; // or make it dynamic if you want

import config from "@/config";

export function GET() {
  return new Response(config.llmsFullTxtContent);
}
