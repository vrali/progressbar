import * as React from "react";
import "./App.css";
import { ProgressBar, ProgressBarMode } from "./ProgressBar";

interface IState {
  progress: number;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { progress: 0 };
  }
  public componentWillMount() {
    const timerId = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 });
      if (this.state.progress === 100) {
        clearInterval(timerId);
      }
    }, 200);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Progress Bar Demo</h1>
        </header>
        <div className="App-progress-bar">
          <ProgressBar
            mode={ProgressBarMode.percentage}
            value={this.state.progress}
          />
        </div>
      </div>
    );
  }
}

export default App;
