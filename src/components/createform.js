import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSrc: 'http://zagonka.ru/uploads/posts/2015-03/1426894132_2485901.jpg',
            filename: null,
            filetype: null,
            crop: {aspect: 16 / 9},
            pixelCrop: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    submit(event) {
        event.preventDefault();

        const data = {};

        data.question = this.state.question;
        data.cotegory = this.state.cotegory;
        data.answer1 = this.state.answer1;
        data.answer2 = this.state.answer2;
        data.answer3 = this.state.answer3;
        data.answer4 = this.state.answer4;
        data.imageSrc = this.state.imageSrc;
        data.cropX = this.state.pixelCrop.x;
        data.cropY = this.state.pixelCrop.y;
        data.cropW = this.state.pixelCrop.width;
        data.cropH = this.state.pixelCrop.height;

        fetch('/questions/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
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

    onComplete(crop, pixelCrop) {
        this.setState({crop, pixelCrop});
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Добавить вопрос
                </div>
                <div className="card-body">
                    <form className="form form-horizontal">
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Вопрос:</label>
                            <div className="col-sm-9">
                            <textarea className="form-control form-control-sm"
                                      name="question"
                                      onChange={this.handleChange}
                                      value={this.state.question}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Категория:</label>
                            <div className="col-sm-9">
                                <select className="form-control form-control-sm"
                                        name="category"
                                        onChange={this.handleChange}
                                        value={this.state.category}>
                                    <option value="1">Категория 1</option>
                                    <option value="2">Категория 2</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Ответы:</label>
                            <div className="col-sm-9">
                                <input className="form-control form-control-sm"
                                       name="answer1"
                                       onChange={this.handleChange}
                                       value={this.state.answer1}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer2"
                                       onChange={this.handleChange}
                                       value={this.state.answer2}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer3"
                                       onChange={this.handleChange}
                                       value={this.state.answer3}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer4"
                                       onChange={this.handleChange}
                                       value={this.state.answer4}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Изображение:</label>
                            <div className="col-sm-9">
                                <input className="form-control form-control-sm"
                                       name="imageSrc"
                                       onChange={this.handleChange}
                                       value={this.state.imageSrc}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <small class="text-muted">Высота: {this.state.pixelCrop.height || 0}px,&nbsp;</small>
                            <small class="text-muted">Ширина: {this.state.pixelCrop.width || 0}px</small>
                            <ReactCrop src={this.state.imageSrc} crop={this.state.crop}
                                       onComplete={this.onComplete.bind(this)}/>
                        </div>

                        <div className="form-group row">
                            <button className="btn btn-sm btn-default ml-auto"
                                    onClick={this.submit.bind(this)}>Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateForm;