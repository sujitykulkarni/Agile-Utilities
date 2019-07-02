import React, { SyntheticEvent, FormEvent } from 'react';

interface IProps {
    show: boolean;
}

interface IState {
    hours: number;
    minutes: number;
}
export class Settings extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hours: 7,
            minutes: 30,
        }
    }
    render() {
        const { hours, minutes } = this.state;
        return (
            <div className={`bg-dark text-light col-4 py-5 border-bottom settings settings--${this.props.show ? 'show' : 'hide'}`}>
                <div className="col-12">
                    <h2 className="row">Settings</h2>
                    <h5 className="row mt-4">1 day to man hours</h5>
                    <form action="" className="row">
                        <div className="form-group col">
                            <label htmlFor="hoursControlRange">{hours} Hours</label>
                            <input type="range" className="form-control-range" id="hoursControlRange" min="0" max="24" step="1" value={hours} onChange={this.handleHoursChange} />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="minuteControlRange">{minutes} Minutes</label>
                            <input type="range" className="form-control-range" id="minuteControlRange" min="0" max="60" step="5" value={minutes} onChange={this.handleMinutesChange} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    private handleHoursChange = (event: any) => {
        this.setState({
            hours: event.target.value,
        });
    }

    private handleMinutesChange = (event: any) => {
        this.setState({
            minutes: event.target.value,
        });
    }
}