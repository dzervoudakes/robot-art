import React from 'react';
import ReactDOM from 'react-dom';
import { FPO } from './components';
require('../sass/style.scss');

class RobotArt extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="wrapper">
                <FPO />
            </div>
        );
    }
}

ReactDOM.render(
    <RobotArt />,
    document.getElementById('app')
);