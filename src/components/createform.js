import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.initialState = {
            id: '',
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            imageSrc: '',
            crop: {
                aspect: 16 / 9
            },
            pixelCrop: {}
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.onQuestionSearchClick = this.onQuestionSearchClick.bind(this);
        this.onAnswerSearchClick = this.onAnswerSearchClick.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onImageRemoveClick = this.onImageRemoveClick.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editableQuestion) {
            let question = nextProps.editableQuestion;

            this.setState({
                id: question.id,
                question: question.question,
                answer1: question.answers[0].answer,
                answer2: question.answers[1].answer,
                answer3: question.answers[2].answer,
                answer4: question.answers[3].answer,
                imageSrc: window.location.protocol + '//' + window.location.host + '/uploads/' + question.image.origin,
                pixelCrop: {
                    x: question.image.x,
                    y: question.image.y,
                    width: question.image.width,
                    height: question.image.height
                }
            });
        }
    }

    onQuestionSearchClick(event) {
        event.preventDefault();

        this.props.onQuestionSearchClick(this.state.question);
    }

    onAnswerSearchClick(event) {
        event.preventDefault();

        this.props.onAnswerSearchClick(this.state.answer1);
    }

    onImageRemoveClick(event) {
        event.preventDefault();

        this.setState({
            imageSrc: '',
            pixelCrop: {}
        });
    }

    reset(event) {
        if (event) {
            event.preventDefault();
        }
        this.setState(this.initialState);
    }

    submit(event) {
        event.preventDefault();

        const data = {};
        const self = this;

        data.id = this.state.id;
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
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success === true) {
                self.reset();
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

    onImageLoaded(crop, image, pixelCrop) {
        const naturalHeight = image.naturalHeight;
        const naturalWidth = image.naturalWidth;
        const serverPixelCrop = this.state.pixelCrop;

        if (serverPixelCrop.x !== null && serverPixelCrop.y !== null && serverPixelCrop.height && serverPixelCrop.width) {
            this.setState({
                crop: {
                    x: serverPixelCrop.x / naturalWidth * 100,
                    y: serverPixelCrop.y / naturalHeight * 100,
                    width: serverPixelCrop.width / naturalWidth * 100,
                    height: serverPixelCrop.height / naturalHeight * 100,
                    aspect: 16 / 9
                }
            });
        }
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
                                <div className="input-group">
                                    <input className="form-control form-control-sm"
                                           name="question"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.question}/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-sm btn-secondary"
                                                onClick={this.onQuestionSearchClick}>
                                            <i className="material-icons">search</i>
                                        </button>
                                    </span>
                                </div>
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
                                <div className="input-group">
                                    <input className="form-control form-control-sm"
                                           name="answer1"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.answer1}/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-sm btn-secondary"
                                                onClick={this.onAnswerSearchClick}>
                                            <i className="material-icons">search</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer2"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.answer2}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer3"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.answer3}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9 ml-auto">
                                <input className="form-control form-control-sm"
                                       name="answer4"
                                       type="text"
                                       onChange={this.handleChange}
                                       value={this.state.answer4}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Изображение:</label>
                            <div className="col-sm-9">
                                <div className="input-group">
                                    <input className="form-control form-control-sm"
                                           name="imageSrc"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.imageSrc}/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-sm btn-secondary" onClick={this.onImageRemoveClick}>
                                            <i className="material-icons">clear</i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {this.state.imageSrc &&
                        <div className="form-group row">
                            <div className="col-md-12">
                                <small className="text-muted">
                                    Высота: {this.state.pixelCrop.height || 0}px,&nbsp;</small>
                                <small className="text-muted">Ширина: {this.state.pixelCrop.width || 0}px</small>
                                <ReactCrop src={this.state.imageSrc} crop={this.state.crop}
                                           onImageLoaded={this.onImageLoaded}
                                           onComplete={this.onComplete.bind(this)}/>
                            </div>
                        </div>
                        }

                        <div className="row">
                            <div className="col-md-12">
                                <div className="float-right">
                                    <button className="btn btn-sm btn-default mr-2" onClick={this.reset}>
                                        Сбросить
                                    </button>
                                    <button className="btn btn-sm btn-default" onClick={this.submit.bind(this)}>
                                        {this.state.id ? 'Созранить' : 'Добавить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateForm;