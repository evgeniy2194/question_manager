import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data_uri: null,
            filename: null,
            filetype: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    submit(event) {
        event.preventDefault();

        const data = new FormData();

        data.append('question', this.state.question);
        data.append('file', this.state.file);

        fetch('/questions/add', {
            method: 'POST',
            //headers: {"Content-type": "multipart/form-data"},
            body: data
        });
        console.log(this.state);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onInputFileChange(event) {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                file: file,
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
    }

    render() {

        const crop = {
            aspect: 16 / 9
        };

        return (
            <form className="form form-horizontal">
                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Вопрос:</label>
                        <textarea className="form-control"
                                  name="question"
                                  onChange={this.handleChange}
                                  value={this.state.question}/>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Категория:</label>
                        <select className="form-control"
                                name="category"
                                onChange={this.handleChange}
                                value={this.state.category}>
                            <option value="1">Категория 1</option>
                            <option value="2">Категория 2</option>
                        </select>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Ответы:</label>
                    </div>
                    <div className="col-md-6 col-xs-6">
                        <textarea className="form-control"
                                  name="answer1"
                                  onChange={this.handleChange}
                                  value={this.state.answer1}/>
                    </div>
                    <div className="col-md-6 col-xs-6">
                        <textarea className="form-control"
                                  name="answer2"
                                  onChange={this.handleChange}
                                  value={this.state.answer2}/>
                    </div>
                </div>
                <div className="form-group form-group-sm">
                    <div className="col-md-6 col-xs-6">
                        <textarea className="form-control"
                                  name="answer3"
                                  onChange={this.handleChange}
                                  value={this.state.answer3}/>
                    </div>
                    <div className="col-md-6 col-xs-6">
                        <textarea className="form-control"
                                  name="answer4"
                                  onChange={this.handleChange}
                                  value={this.state.answer4}/>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-xs-6">
                        <label>Изображение:</label>
                        <input type="file" onChange={this.onInputFileChange.bind(this)}
                               value={this.state.originalImage}/>
                        <ReactCrop src={this.state.data_uri} crop={crop}/>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-sm btn-default pull-right"
                                onClick={this.submit.bind(this)}>Добавить
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CreateForm;