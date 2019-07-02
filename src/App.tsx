import React from 'react';
import { Calculator, Settings, Navbar } from './components';
import './App.scss';

interface IProps { }

interface IState {
    showSettings: boolean;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showSettings: false,
        }
    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="container-fluid">
                    <section>
                        <header className="App__header row justify-content-center  mt-2">
                            <div className="col-8">
                                <h1>JIRA Time Calculator</h1>
                                <p>A utility to calculate time using the day, hour, minute analogy of JIRA.</p>
                            </div>
                            <nav className="App__nav col-2 align-self-center">
                                <ul>
                                    <li>
                                        <button onClick={this.toggleSettings} className="btn btn-lg btn-block btn-outline-info">Settings</button>
                                    </li>
                                </ul>
                            </nav>
                        </header>
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <Calculator />
                            </div>
                        </div>
                    </section>
                    <Settings show={this.state.showSettings} />
                </div>
            </div>
        );
    }

    private toggleSettings = () => {
        const { showSettings } = this.state;
        this.setState({
            showSettings: !showSettings,
        });
    }
}

export default App;
