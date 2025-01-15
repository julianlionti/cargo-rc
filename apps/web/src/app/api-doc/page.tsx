import { getApiDocs } from "rc/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  console.log(spec);
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
