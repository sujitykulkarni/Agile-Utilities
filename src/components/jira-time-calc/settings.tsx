import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore, ManHours } from 'redux/IStore';
import { setManHours, toggleManHours } from 'redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    show: boolean;
    onClose(): void;
}

interface IStateProps {
    manHours: ManHours;
    enableManHours: boolean;
}
interface IState extends ManHours { 
    enableManHours: boolean;
}

interface IDispatchProps {
    setManHours(manHours: ManHours): void;
    toggleManHours(flag: boolean): void;
}
const mapStateToProps = () => {
    return (state: IStore): IStateProps => {
        const { settings: { manHours, enableManHours } } = state;
        return {
            manHours,
            enableManHours,
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setManHours: (manHours: ManHours) => dispatch(setManHours(manHours)),
        toggleManHours: (flag: boolean) => dispatch(toggleManHours(flag)),
    }
}
class Settings extends React.Component<IProps & IStateProps & IDispatchProps, IState> {
    constructor(props: IProps & IStateProps & IDispatchProps) {
        super(props);
        this.state = {
            hours: 7,
            minutes: 30,
            enableManHours: props.enableManHours,
        }
    }
    render() {
        const { hours, minutes, enableManHours } = this.state;
        return (
            <div className={`bg-dark text-light col-4 py-5 border-bottom settings settings--${this.props.show ? 'show' : 'hide'}`}>
                <div className="col-12">
                    <div className="row justify-content-between">
                        <div className="col-3">
                            <h2>
                                Settings
                            </h2>
                        </div>
                        <div className="col-2 align-self-center">
                            <button className="btn btn-block btn-dark" onClick={this.props.onClose}><FontAwesomeIcon icon={faTimes}/></button>
                        </div>
                    </div>
                    <form action="" className="row mt-4">
                        <h5 className="col-12">Man Hour Settings</h5>
                        <div className="form-group form-check col-12">
                            <input type="checkbox" className="form-check-input" id="enableManHours" onChange={this.toggleManHours} checked={enableManHours}/>
                            <label htmlFor="enableManHours">Enable Man Hours</label>
                        </div>
                        <h6 className="col-12">Change values for man hours</h6>
                        <div className="form-group col align-self-center">
                            <label htmlFor="hoursControlRange">{hours} Hours</label>
                            <input type="range" className="form-control-range" id="hoursControlRange" 
                                min="0" max="24" step="1" value={hours} onChange={this.handleHoursChange} 
                                disabled={!enableManHours}/>
                        </div>
                        <div className="form-group col align-self-center">
                            <label htmlFor="minuteControlRange">{minutes} Minutes</label>
                            <input type="range" className="form-control-range" id="minuteControlRange" 
                                min="0" max="60" step="5" value={minutes} onChange={this.handleMinutesChange} 
                                disabled={!enableManHours}/>
                        </div>
                        <footer className="col btn-group align-self-center">
                            <button type="button" className="btn btn-primary" onClick={this.saveSettings}>Save</button>
                            <button type="button" className="btn btn-secondary">Reset</button>
                        </footer>
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

    private toggleManHours = () => {
        const { enableManHours } = this.state;
        this.setState({
            enableManHours: !enableManHours,
        });
    }

    private saveSettings = () => {
        const { hours, minutes, enableManHours } = this.state;
        const manHours = { hours, minutes };
        this.props.setManHours(manHours);
        this.props.toggleManHours(enableManHours);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
