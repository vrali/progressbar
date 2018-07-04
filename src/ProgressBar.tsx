import * as React from "react";
import "./ProgressBar.css";

interface IProps {
  maxValue?: number | string;
  minValue?: number | string;
  value: number;
  mode: ProgressBarMode;
  valueDisplayMap?: Map<number, string>;
  theme?: string;
}

export enum ProgressBarMode {
  percentage = 0,
  range = 1
}

export const ProgressBar = (props: IProps) => {
  const { maxValue = 100, minValue = 0, value, mode, theme } = props;
  const isError = valueInRange(maxValue, minValue, value);

  return (
    <div className={`progress-bar-container ${theme || "default"}`}>
      <div className="progress-bar-progress-label">
        {value + (mode === ProgressBarMode.percentage ? "%" : "")}
      </div>
      <div className="progress-bar-wrapper">
        {!isError && (
          <div className="progress-bar" style={{ width: `${value}%` }} />
        )}
        {isError && (
          <div className="progress-bar-error">
            Value Provided is out of range
          </div>
        )}
      </div>
      {mode === ProgressBarMode.range && (
        <div className="progress-bar-label-container">
          <div className="progress-bar-min-label">{minValue}</div>
          <div className="progress-bar-max-label">{maxValue}</div>
        </div>
      )}
    </div>
  );
};

const valueInRange = (maxVal: any, minVal: any, val: any) => {
  if (
    typeof maxVal === "number" &&
    typeof minVal === "number" &&
    typeof val === "number"
  ) {
    return !(val <= maxVal && val >= minVal);
  } else {
    return false;
  }
};
