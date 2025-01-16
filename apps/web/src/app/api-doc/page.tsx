import { getApiDocs } from "rc/lib/swagger";
import ReactSwagger from "./react-swagger";
import { Metadata } from "next";
import { appConfig } from "@config";

export const metadata: Metadata = {
  title: `${appConfig.appName} Swagger API`,
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
