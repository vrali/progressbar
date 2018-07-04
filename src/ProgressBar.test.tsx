import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBar, ProgressBarMode } from "./ProgressBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ProgressBar mode={ProgressBarMode.percentage} value={10} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
