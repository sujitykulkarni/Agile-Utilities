import React from 'react';
import { IInput } from './timeInput';
interface IProps {
    output: IInput;
}
export class TimeOutput extends React.Component<IProps, any> {
    render() {
        const { days, hours, minutes } = this.props.output;
        return (
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">Total time</h1>
                    <h4 className="text-primary">{`${days} ${hours} ${minutes}`}</h4>
                </div>
            </div>
        )
    }
}