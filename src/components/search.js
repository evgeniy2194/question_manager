import React from 'react';
import url from 'url';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: {},
            result: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionToSearch !== '') {
            this.setState({question: nextProps.questionToSearch});
        }

        if (nextProps.answerToSearch !== '') {
            this.setState({answer: nextProps.answerToSearch});
        }
    }

    handleDoubleClick(item) {
        this.props.onEditQuestionClick(item);
    }

    search(event) {
        event.preventDefault();

        fetch('/search' + url.format({query: this.state})).then(response => {
            return response.json();
        }).then(data => {
            this.setState({result: data});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Поиск
                </div>
                <div className="card-body">
                    <form className="form form-horizontal">
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Вопрос:</label>
                            <div className="col-sm-9">
                                <input className="form-control form-control-sm"
                                       type="text"
                                       placeholder="Вопрос"
                                       name="question"
                                       onChange={this.handleChange}
                                       value={this.state.question}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Ответ:</label>
                            <div className="col-sm-9">
                                <input className="form-control form-control-sm"
                                       type="text"
                                       placeholder="Ответ"
                                       name="answer"
                                       onChange={this.handleChange}
                                       value={this.state.answer}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-sm btn-default ml-auto" onClick={this.search}>
                                    Поиск
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="search-list">
                        {this.state.result.map(item => {
                            return <li className="media my-3"
                                       key={item.id}
                                       onDoubleClick={this.handleDoubleClick.bind(this, item)}>
                                <img className="img-sm d-flex mr-3" src={item.image ? '/uploads/' + item.image.thumb : ''}/>
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">#{item.id + ' ' + item.question}</h6>
                                    <div className="row">
                                        {item.answers.map(answer => {
                                            return <div className="col-sm-6" key={answer.id}>{answer.answer}</div>
                                        })}
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search;