import React from 'react';
import { AppRouter } from 'routing/router';
import './App.scss';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <AppRouter />
            </div>
        );
    }
}

export default App;
