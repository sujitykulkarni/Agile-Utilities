import React from 'react';
import { IInput } from './timeInput';
interface IProps {
    output: IInput;
}
export class TimeOutput extends React.Component<IProps, any> {
    constructor(props: IProps){
        super(props);
    }
    render() {
        const { days, hours, minutes } = this.props.output;
        return <h1 className="timeOutput">{`${days} ${hours} ${minutes}`}</h1>
    }
}