import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, JiraTimeCalculator, RoughEstimator } from 'components';
export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Route path="/jira-time-calculator" component={JiraTimeCalculator} />
                <Route path="/rough-estimator" component={RoughEstimator} />
            </Router>
        )
    }
}

