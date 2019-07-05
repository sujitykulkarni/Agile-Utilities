import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faStopwatch } from '@fortawesome/free-solid-svg-icons';

export class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Agile Utilities</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/jira-time-calculator/">
                                <FontAwesomeIcon icon={faHourglass} /> JIRA Time Calculator 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rough-estimator/">
                            <FontAwesomeIcon icon={faStopwatch} /> Rough Estimator
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}