import * as React from "react";
import "./ProgressBar.css";

interface IProps extends React.HTMLAttributes<any> {
  maxValue?: number;
  minValue?: number;
  value: number;
  mode?: ProgressBarMode;
  valueDisplayMap?: Array<{ key: number; value: string }>;
  theme?: string;
  showValueLabel?: boolean;
}

export enum ProgressBarMode {
  percentage = 0,
  range = 1
}

export const ProgressBar = (props: IProps) => {
  const {
    maxValue = 100,
    minValue = 0,
    value,
    mode = ProgressBarMode.percentage,
    theme,
    valueDisplayMap,
    showValueLabel = true
  } = props;
  const errorMessage = validateValueInRange(maxValue, minValue, value)
    ? `Value(${value}) provided is out of range`
    : null;

  return (
    <div {...props}>
      <div className={`progress-bar-container ${theme || "default"}`}>
        <div className="progress-bar-progress-label">
          {showValueLabel &&
            computeValue(maxValue, minValue, value, mode, valueDisplayMap)}
        </div>
        <div className="progress-bar-wrapper">
          {!errorMessage && (
            <div className="progress-bar" style={{ width: `${value}%` }} />
          )}
          {errorMessage && (
            <div className="progress-bar-error">{errorMessage}</div>
          )}
        </div>
        {mode === ProgressBarMode.range && (
          <div className="progress-bar-label-container">
            <div className="progress-bar-min-label">{minValue}</div>
            <div className="progress-bar-max-label">{maxValue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const validateValueInRange = (maxVal: any, minVal: any, val: number) => {
  if (typeof maxVal === "number" && typeof minVal === "number") {
    return !(val <= maxVal && val >= minVal);
  } else {
    return false;
  }
};

const computeValue = (
  maxValue: number,
  minValue: number,
  value: number,
  mode: ProgressBarMode,
  valueDisplayMap?: Array<{ key: number; value: string }>
) => {
  const currentValueDisplayMapIndex = !!valueDisplayMap
    ? valueDisplayMap
        .filter(kvp => kvp.key <= value)
        .reduce((prev, curr, currIndex, vdp) => {
          return vdp[prev].key >= curr.key ? prev : currIndex;
        }, 0)
    : 0;

  return valueDisplayMap
    ? valueDisplayMap[currentValueDisplayMapIndex].value
    : value + (mode === ProgressBarMode.percentage ? "%" : "");
};
