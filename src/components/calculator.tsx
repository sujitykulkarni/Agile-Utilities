import React from 'react';
import { TimeInput, IInput } from './timeInput';
import { TimeOutput } from './timeOutput';

interface IState {
    output: IInput;
}
export class Calculator extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            output: {
                days: '0 days',
                hours: '0 hours',
                minutes: '0 minutes',
            },
        };
    }
    render() {
        return (
            <section className="calculator">
                <TimeOutput output={this.state.output} />
                <TimeInput onCalculate={this.handleCalculate} />
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
}