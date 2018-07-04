import * as React from "react";
import "./App.css";
import { ProgressBar, ProgressBarMode } from "./ProgressBar";

interface IState {
  progress: number;
  superPowerGladiatorMatchProgress: number;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { progress: 0, superPowerGladiatorMatchProgress: 0 };
  }
  public componentWillMount() {
    const timerId = setInterval(() => {
      this.setState({
        progress: this.state.progress + 1,
        superPowerGladiatorMatchProgress:
          this.state.superPowerGladiatorMatchProgress + 1
      });
      if (this.state.progress === 100) {
        clearInterval(timerId);
      }
    }, 200);
  }

  public render() {
    const commentary = [
      { key: 0, value: "Friends from Work!!!" },
      { key: 20, value: "Hulk Smaaash!!" },
      { key: 40, value: "Epic Fight!!" },
      { key: 60, value: "Thor Electrocutes Hulk" },
      { key: 80, value: "Thor Gets Electrocuted?!?!? " },
      { key: 100, value: "The End" }
    ];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Progress Bar Demo</h1>
        </header>
        <div>
          <div className="App-demo">
            <ProgressBar
              className="App-progress-bar"
              mode={ProgressBarMode.percentage}
              value={this.state.progress}
            />
            <p className="App-progress-bar-desc">Basic Demo</p>
          </div>

          <div className="App-demo">
            <ProgressBar
              className="App-progress-bar"
              mode={ProgressBarMode.percentage}
              value={this.state.superPowerGladiatorMatchProgress}
              valueDisplayMap={commentary}
            />
            <p className="App-progress-bar-desc">Thor vs Hulk</p>
          </div>

          <div className="App-demo">
            <ProgressBar
              className="App-progress-bar"
              mode={ProgressBarMode.range}
              value={this.state.progress}
              showValueLabel={false}
              minValue={10}
              maxValue={90}
            />
            <p className="App-progress-bar-desc">
              {" "}
              Demo with min max range + Error on out of range
            </p>
          </div>

          <div className="App-demo">
            <ProgressBar
              className="App-progress-bar"
              value={this.state.progress}
              showValueLabel={false}
            />
            <p className="App-progress-bar-desc">Demo with hidden label </p>
          </div>

          <div className="App-demo">
            <ProgressBar
              className="App-progress-bar"
              value={this.state.progress}
              theme="override-theme"
            />
            <p className="App-progress-bar-desc">
              Demo overriding default theme{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
