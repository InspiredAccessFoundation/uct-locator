import renderer from "react-test-renderer";
import App from "./App";

it("renders without crashing", () => {
  const component = renderer.create(
    <App />
  );
  expect(component).toBeDefined();
});
