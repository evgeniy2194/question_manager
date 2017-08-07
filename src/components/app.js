import React from 'react';
import CreateFrom from './createform';

class App extends React.Component {
    render() {
        return <div>
            <div className="col-md-5">
                <CreateFrom />
            </div>
            <div className="col-md-7"></div>
        </div>
    }
}

export default App;