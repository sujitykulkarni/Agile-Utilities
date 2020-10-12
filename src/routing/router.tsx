import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, JiraTimeCalculator, RoughEstimator } from 'components';
export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={JiraTimeCalculator} />
                    <Route path="/jira-time-calculator" component={JiraTimeCalculator} />
                    <Route path="/rough-estimator" component={RoughEstimator} />
                </Switch>
            </Router>
        )
    }
}

