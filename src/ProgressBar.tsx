import * as React from "react";
import "./ProgressBar.css";

interface IProps extends React.HTMLAttributes<any> {
  maxvalue?: number;
  minvalue?: number;
  value: number;
  mode?: ProgressBarMode;
  valuedisplaymap?: Array<{ key: number; value: string }>;
  theme?: string;
  showvaluelabel?: boolean;
}

export enum ProgressBarMode {
  percentage = 0,
  range = 1
}

export const ProgressBar = (props: IProps) => {
  const {
    maxvalue = 100,
    minvalue = 0,
    value,
    mode = ProgressBarMode.percentage,
    theme,
    valuedisplaymap,
    showvaluelabel = true
  } = props;
  const errorMessage = validateValueInRange(maxvalue, minvalue, value)
    ? `Value(${value}) provided is out of range`
    : null;

  return (
    <div {...props}>
      <div className={`progress-bar-container ${theme || "default"}`}>
        <div className="progress-bar-progress-label">
          {showvaluelabel &&
            computeValue(maxvalue, minvalue, value, mode, valuedisplaymap)}
        </div>
        <div className="progress-bar-wrapper">
          {!errorMessage && (
            <div
              className="progress-bar"
              style={{
                width: `${mapValuetoWidth(maxvalue, minvalue, value)}%`
              }}
            />
          )}
          {errorMessage && (
            <div className="progress-bar-error">{errorMessage}</div>
          )}
        </div>
        {mode === ProgressBarMode.range && (
          <div className="progress-bar-label-container">
            <div className="progress-bar-min-label">{minvalue}</div>
            <div className="progress-bar-max-label">{maxvalue}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapValuetoWidth = (maxVal: any, minVal: any, val: number) => {
  return ((val - minVal) * 100) / (maxVal - minVal);
};

const validateValueInRange = (maxVal: any, minVal: any, val: number) => {
  return !(val <= maxVal && val >= minVal);
};

const computeValue = (
  maxvalue: number,
  minvalue: number,
  value: number,
  mode: ProgressBarMode,
  valuedisplaymap?: Array<{ key: number; value: string }>
) => {
  const currentValueDisplayMapIndex = !!valuedisplaymap
    ? valuedisplaymap
        .filter(kvp => kvp.key <= value)
        .reduce((prev, curr, currIndex, vdp) => {
          return vdp[prev].key >= curr.key ? prev : currIndex;
        }, 0)
    : 0;

  return valuedisplaymap
    ? valuedisplaymap[currentValueDisplayMapIndex].value
    : value + (mode === ProgressBarMode.percentage ? "%" : "");
};
