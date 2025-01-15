import { Button } from "@ui";
import { User } from "@types";
import { appConfig } from "@config";
import { multiply } from "@utils";

function App() {
  const test: User = {
    email: "test@email.com",
    id: 1,
    name: "Test",
  };
  return (
    <>
      <p>{appConfig.appName}</p>
      <p>{test.email}</p>
      <p>Multiply {multiply(4, 2)}</p>
      <Button />
    </>
  );
}

export default App;
