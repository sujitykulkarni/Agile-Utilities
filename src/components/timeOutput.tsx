import React from 'react';
import { IInput } from './timeInput';
interface IProps {
    output: IInput;
}
export class TimeOutput extends React.Component<IProps, any> {
    render() {
        const { days, hours, minutes } = this.props.output;
        return (
            <div className="timeOutput">
                <h1 className="timeOutput__title">Total time</h1>            
                <h3 className="timeOutput__value">{`${days} ${hours} ${minutes}`}</h3>
            </div>
        )
    }
}