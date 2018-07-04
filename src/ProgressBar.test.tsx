import * as Enzyme from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBar } from "./ProgressBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ProgressBar value={10} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("default mode is percentage", () => {
  const progressBar = Enzyme.shallow(<ProgressBar value={10} />);
  expect(
    progressBar
      .find(".progress-bar-progress-label")
      .text()
      .includes("%")
  ).toBe(true);
});

it("shows error when value out of range", () => {
  const progressBar = Enzyme.shallow(<ProgressBar minvalue={20} value={10} />);
  expect(progressBar.find(".progress-bar-error").length).toBeTruthy();
  expect(progressBar.find(".progress-bar").length).toBe(0);
});

it("maps 25 value to width 50% when range is 0 to 50", () => {
  const progressBar = Enzyme.shallow(<ProgressBar maxvalue={50} value={25} />);
  expect(
    progressBar
      .find(".progress-bar")
      .html()
      .includes('style="width:50%"')
  ).toBeTruthy();
});

it("hide value label when showvaluelabel is false", () => {
  const progressBar = Enzyme.shallow(
    <ProgressBar showvaluelabel={false} maxvalue={50} value={25} />
  );
  expect(progressBar.find(".progress-bar-progress-label").text()).toBeFalsy();
});
