import React from 'react';
import { Calculator, Settings } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

interface IProps { }

interface IState {
    showSettings: boolean;
}

export class JiraTimeCalculator extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showSettings: false,
        }
    }
    render() {
        return (
            <div className="container">
                <section>
                    <header className="App__header row justify-content-center my-3">
                        <div className="col-9 bg-white">
                            <h1>JIRA Time Calculator</h1>
                            <p>A utility to calculate time using the day, hour, minute analogy of JIRA.</p>
                        </div>
                        <nav className="App__nav bg-white col-1 align-self-center">
                            <ul>
                                <li>
                                    <button onClick={this.toggleSettings} className="btn btn-lg btn-block btn-outline-info"><FontAwesomeIcon icon={faCogs} /></button>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div className="row justify-content-center">
                        <div className="col">
                            <Calculator />
                        </div>
                    </div>
                </section>
                <Settings show={this.state.showSettings} onClose={this.toggleSettings} />
            </div>
        )
    }

    private toggleSettings = () => {
        const { showSettings } = this.state;
        this.setState({
            showSettings: !showSettings,
        });
    }
}