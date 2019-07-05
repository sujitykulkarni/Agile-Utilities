import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    onCalculate(inputs: IInput[]): void;
    onReset(): void;
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
                <table className="table table-borderless">
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
                            <td colSpan={2}>
                                <button onClick={this.addRow} className="btn btn-primary btn-lg btn-block">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                            </td>
                            <td colSpan={1}>
                                <button onClick={this.reset} className="btn btn-lg btn-secondary btn-block">
                                <FontAwesomeIcon icon={faUndo}/>
                                </button>
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
                    <td><input type="number" value={input.days} onChange={this.handleInputChange} data-key={index} data-type="days" onKeyDown={this.handleKeyDown} className="form-control form-control-lg" /></td>
                    <td><input type="number" value={input.hours} onChange={this.handleInputChange} data-key={index} data-type="hours" onKeyDown={this.handleKeyDown} className="form-control form-control-lg" /></td>
                    <td><input type="number" value={input.minutes} onChange={this.handleInputChange} data-key={index} data-type="minutes" onKeyDown={this.handleKeyDown} className="form-control form-control-lg" /></td>
                    <td>
                        <button onClick={this.removeRow} data-key={index} disabled={(inputs.length === 1) ? true : false} className="btn btn-lg btn-block btn-light">
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    private handleKeyDown = (e: React.KeyboardEvent) => {
        const { length } = this.state.inputs;
        const { days, hours, minutes } = this.state.inputs[length-1];
        if ((e.keyCode === 13) && (days || hours || minutes)) {
            this.addRow();
        }
    }

    private addRow = () => {
        this.props.onCalculate(this.state.inputs);
        const defaultInput: IInput = {
            days: '',
            hours: '',
            minutes: '',
        };
        let inputs = [...this.state.inputs];
        inputs.push(defaultInput);
        this.setState({
            inputs
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
        });
        this.props.onCalculate(this.state.inputs);
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
        });
        this.props.onReset();
    }
}