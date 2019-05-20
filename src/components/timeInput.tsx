import React from 'react';

interface IProps {
    onCalculate(inputs: IInput[]): void;
}
interface IState {
    inputs: IInput[];
}

export interface IInput {
    days: string;
    hours: string;
    minutes: string;
    [key: string]: string;
}

export class TimeInput extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            inputs: [
                {
                    days: '',
                    hours: '',
                    minutes: '',
                },
            ], 
        };
    }
    render() {
        return (
            <React.Fragment>
                <table className="timeInput__table">
                    <thead>
                        <tr>
                            <th>Days</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={1}>
                                <button onClick={this.addRow}>Add</button>
                            </td>
                            <td colSpan={1}>
                                <button onClick={this.reset}>Reset</button>
                            </td>
                            <td colSpan={3}>
                                <button onClick={() => this.props.onCalculate(this.state.inputs)}>Count</button>                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment>
        );
    }

    private getRows = () => {
        const { inputs } = this.state;
        return inputs.map((input: IInput, index: number) => {
            return (
                <tr key={index}>
                    <td><input type="number" value={input.days} onChange={this.handleInputChange} data-key={index} data-type="days"/></td>
                    <td><input type="number" value={input.hours} onChange={this.handleInputChange} data-key={index} data-type="hours"/></td>
                    <td><input type="number" value={input.minutes} onChange={this.handleInputChange} data-key={index} data-type="minutes"/></td>
                    <td><button onClick={this.removeRow} data-key={index} disabled={(inputs.length === 1) ? true : false}>Remove</button></td>
                </tr>
            );
        });
    }

    private addRow = () => {
        const defaultInput: IInput = {
            days: '',
            hours: '',
            minutes: '',
        };
        let inputs = this.state.inputs;
        inputs.push(defaultInput);
        this.setState({
            inputs,
        });
    }

    private removeRow = (event: React.MouseEvent<HTMLElement>) => {
        let inputs = this.state.inputs;
        const key = event.currentTarget.dataset.key;
        console.log(key);      
        if(inputs.length > 1 && key){
            inputs.splice(parseInt(key), 1);
        }
        this.setState({
            inputs,
        })
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputs: IInput[] = this.state.inputs;
        const key = event.target.dataset.key;
        const type = event.target.dataset.type;
        inputs.forEach((input, index) => {
            if((index.toString() === key) && type){
                input[type] = event.target.value;
            }
        });
        this.setState({
            inputs,
        });
        return null;
    }

    private reset = () => {
        const defaultInput: IInput = {
            days: '',
            hours: '',
            minutes: '',
        };
        this.setState({
            inputs: [defaultInput],
        })
    }
}