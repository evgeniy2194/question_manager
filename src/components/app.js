import React from 'react';
import CreateFrom from './createform';
import Search from './search';

class App extends React.Component {
    render() {
        return <p>
            <div className="row">
                <div className="col-md-6">
                    <CreateFrom/>
                </div>
                <div className="col-md-6">
                    <Search/>
                </div>
            </div>
        </p>
    }
}

export default App;