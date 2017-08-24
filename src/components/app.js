import React from 'react';
import CreateFrom from './createform';
import Search from './search';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionToSearch: '',
            answerToSearch: ''
        };

        this.onQuestionSearchClick = this.onQuestionSearchClick.bind(this);
        this.onAnswerSearchClick = this.onAnswerSearchClick.bind(this);
        this.onEditQuestionClick = this.onEditQuestionClick.bind(this);
    }

    onQuestionSearchClick(question) {
        this.setState({questionToSearch: question});
    }

    onAnswerSearchClick(answer) {
        this.setState({answerToSearch: answer});
    }

    onEditQuestionClick(question) {
        this.setState({editableQuestion: question});
    }

    render() {
        return <div className="row">
            <div className="col-md-6">
                <CreateFrom onQuestionSearchClick={this.onQuestionSearchClick}
                            onAnswerSearchClick={this.onAnswerSearchClick}
                            editableQuestion={this.state.editableQuestion}/>
            </div>
            <div className="col-md-6">
                <Search questionToSearch={this.state.questionToSearch}
                        answerToSearch={this.state.answerToSearch}
                        onEditQuestionClick={this.onEditQuestionClick}/>
            </div>
            <br/>
        </div>
    }
}

export default App;