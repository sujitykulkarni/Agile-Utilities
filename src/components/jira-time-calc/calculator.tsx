import React from 'react';
import { connect } from 'react-redux';
import { TimeInput, IInput } from 'components/jira-time-calc/timeInput';
import { TimeOutput } from 'components/jira-time-calc/timeOutput';
import { IStore, ManHours } from 'redux/IStore';
/* Props */
interface  IProps {}
/* State */
interface IState {
    output: IInput;
}
/* Props received from store */
interface IStateProps {
    manHours?: ManHours;
    enableManHours: boolean;
}
/* Deafult values when app loads */
const defaultOutput: IInput = {
    days: '0 days',
    hours: '0 hours',
    minutes: '0 minutes',
};
/* Get store values */
const mapStateToProps = () => {
    return (state: IStore): IStateProps => {
        const { settings: {manHours, enableManHours} } = state;
        return {
            manHours,
            enableManHours,
        }
    }
}

/**
 * A parent component that hosts time input and output
 *
 * @class Calculator
 * @extends {(React.Component<IProps & IStateProps, IState>)}
 */
class Calculator extends React.Component<IProps & IStateProps, IState> {
    constructor(props: IProps & IStateProps) {
        super(props);
        this.state = {
            output: Object.assign({}, defaultOutput),
        };
    }
    render() {
        return (
            <section className="calculator row">
                <div className="col mb-4 align-self-end">
                    <TimeOutput output={this.state.output} asManHours={this.props.manHours ? true : false}/>
                </div>
                <div className="col-9">
                    <TimeInput onCalculate={this.handleCalculate} onReset={this.handleOnReset}/>
                </div>
            </section>
        )
    };
    /**
     * Accumulates the total values entered
     *
     * @private
     * @memberof Calculator
     */
    private handleCalculate = (inputs: IInput[]) => {
        const days = inputs.map(input => this.stripChars(input.days)).reduce(this.getTotalTime, 0);
        const hours = inputs.map(input => this.stripChars(input.hours)).reduce(this.getTotalTime, 0);
        const minutes = inputs.map(input => this.stripChars(input.minutes)).reduce(this.getTotalTime, 0);
        this.sanitizeTime(days, hours, minutes);
    }
    
    private stripChars = (value: string): number => {
        const pattern = /\D/g;
        if (value) {
            return parseInt(value.replace(pattern, ''));
        }
        return 0;
    }

    private getTotalTime = (acc: number, cur: number) => acc + cur;

    private sanitizeTime = (days: number, hours: number, minutes: number) => {
        let totalDays = days;
        let totalHours = hours;
        let totalMinutes = minutes;
        const { enableManHours, manHours } = this.props; 
        const { hours: maxHours, minutes: maxMinutes } = {hours: 24, minutes: 60};
        if (minutes >= maxMinutes) {
            totalHours += ~~(minutes / maxMinutes);
            totalMinutes = (minutes % maxMinutes);
        }
        if (totalHours >= maxHours) {
            totalDays += ~~(totalHours / maxHours);
            totalHours = (totalHours % maxHours);
        }
        if(enableManHours && manHours) {
            const tempManHours = manHours.hours + (manHours.minutes / maxMinutes);
            const tempHours = (totalDays * 24) + totalHours + (totalMinutes / maxMinutes);
            totalDays = ~~(tempHours / tempManHours);
            totalHours = ~~(tempHours % tempManHours);
            totalMinutes = Math.abs(totalHours - (tempHours % tempManHours)) * 60;
        }
        const output = Object.assign(this.state.output, {
            days: `${totalDays} days`,
            hours: `${totalHours} hours`,
            minutes: `${totalMinutes} minutes`,
        });
        this.setState({
            output,
        });
    }

    private handleOnReset = () => {
        this.setState({
            output: defaultOutput,
        });
    }
}

export default connect(mapStateToProps)(Calculator);