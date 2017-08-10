import React from 'react';
import ReactCrop from 'react-image-crop';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data_uri: null,
            filename: null,
            filetype: null
        };
    }

    onInputFileChange(event) {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
    }

    render() {

        const crop = {
            aspect: 16/9
        };

        return (
            <form className="form form-horizontal">
                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Вопрос:</label>
                        <textarea className="form-control"></textarea>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Категория:</label>
                        <select className="form-control">
                            <option>Категория 1</option>
                            <option>Категория 2</option>
                        </select>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Ответы:</label>
                    </div>
                    <div className="col-md-6">
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-group form-group-sm">
                    <div className="col-md-6">
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="col-md-6">
                        <textarea className="form-control"></textarea>
                    </div>
                </div>

                <div className="form-group form-group-sm">
                    <div className="col-md-12">
                        <label>Изображение:</label>
                        <input type="file" onChange={this.onInputFileChange.bind(this)}/>
                        <ReactCrop src={this.state.data_uri} crop={crop}/>
                    </div>
                </div>
            </form>
        );
    }
}

export default CreateForm;