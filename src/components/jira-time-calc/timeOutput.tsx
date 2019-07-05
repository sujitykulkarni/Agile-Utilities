import React from 'react';
import { IInput } from './timeInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    output: IInput;
    asManHours: boolean;
}
export class TimeOutput extends React.Component<IProps, {}> {
    render() {
        const { days, hours, minutes } = this.props.output;
        return (
            <div className="card">
                <div className="card-header">
                    Total time
                </div>
                <div className="card-body">
                    {
                        this.props.asManHours ?
                        <span className="badge badge-pill badge-primary"><FontAwesomeIcon icon={faClock} /> man hours</span>
                        : null
                    }
                    <h5 className="text-primary">{`${days} ${hours} ${minutes}`}</h5>
                </div>
            </div>
        )
    }
}