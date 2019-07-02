import React from 'react';
import { TimeInput, IInput } from './timeInput';
import { TimeOutput } from './timeOutput';

interface IState {
    output: IInput;
}

const defaultOutput: IInput = {
    days: '0 days',
    hours: '0 hours',
    minutes: '0 minutes',
};

/**
 * A parent component that hosts time input and output
 *
 * @export
 * @class Calculator
 * @extends {React.Component<{}, IState>}
 */
export class Calculator extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            output: { ...defaultOutput},
        };
    }
    render() {
        return (
            <section className="calculator row">
                <div className="col align-self-end">
                    <TimeOutput output={this.state.output} />
                </div>
                <div className="col-9">
                    <TimeInput onCalculate={this.handleCalculate} onReset={this.handleOnReset}/>
                </div>
            </section>
        )
    };

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
        if (minutes >= 60) {
            totalHours += ~~(minutes / 60);
            totalMinutes = (minutes % 60);
        }
        if (totalHours >= 24) {
            totalDays += ~~(totalHours / 24);
            totalHours = (totalHours % 24);
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