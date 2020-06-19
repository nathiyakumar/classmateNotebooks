import React from "react";
import './FileUploadForm.css';
import Dropzone from "react-dropzone";
import PreviewImage from "./PreviewImage";
import cogoToast from 'cogo-toast';
import {connect} from "react-redux";
import ColorThief from "colorthief";
import ColorConvert from "color-convert";

const Upload_Icon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/upload_icon.svg';


class FileUpload extends React.Component {

    constructor(props){
        super(props);
        this.child =null;
        this.state = {
            accepted_files:[],

        }
    }



    onDrop = (accepted, rejected) => {


        if (Object.keys(rejected).length !== 0) {
            let file_size_error = false;
            let file_formate = true;
            rejected.map((file, index) => {
                let FileSize = file.size / 1024 / 1024; // in MB
                if (FileSize > 2) {
                    file_size_error = true;
                }
                let ext = file.name.substr(-3);
                if(ext!== "png" && ext!== "jpeg" && ext!== "jpg")  {
                    file_formate = false;
                }
            })

            if(file_size_error === true){
                cogoToast.error("At least one of your images is too large", {position: 'top-center'});
            }
            if(file_formate === false) {
                cogoToast.error("File type not accepted, sorry!", {position: 'top-center'});
            }
        }
        if(accepted.length > 0){

                const { selected_quantity} = this.props;
                var files;

                if(accepted.length > selected_quantity ){
                    let message = "Please note that we have only selected first " +selected_quantity+"  images";
                    cogoToast.warn(message,{ position: 'top-center'});
                     files = accepted.slice(0, selected_quantity);
                } else {
                     files = accepted;
                }

                this.setState({
                    accepted_files:[]
                })





                for (let i = 0; i < files.length; i++) {
                    if(files[i]){
                        this.reSizeImage(files[i],i,files.length);
                    }
                }

        }
    };

    reSizeImage = (files,file_index,total_length) => {
        var file = files;
        var reader = new FileReader();
        const colorThief = new ColorThief();
        reader.onload = (e) => {
            var img = document.createElement("img");
            img.onload = () => {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 200;
                var MAX_HEIGHT = 350;
                var width = img.width;
                var height = img.height;
                width = MAX_WIDTH;
                height = MAX_HEIGHT;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                var color_code = colorThief.getPalette(img,5);
                let hsv_colorcode = [];
                let count = 0;
                if(color_code){
                    for(let j=0;j<color_code.length;j++){

                        hsv_colorcode[j] = ColorConvert.rgb.hsv(color_code[j][0], color_code[j][1], color_code[j][2]);
                        if (hsv_colorcode[j][2] >= 20 && hsv_colorcode[j][2] <= 80) {
                            count++;
                            let  dominent_color = 'rgb(' + color_code[j][0] + ',' + color_code[j][1] + ',' + color_code[j][2] + ')';
                            hsv_colorcode[j][1] = 20;
                            hsv_colorcode[j][2] = 100;
                            let palette_color1 = ColorConvert.hsv.rgb(hsv_colorcode[j][0], hsv_colorcode[j][1], hsv_colorcode[j][2]);

                            let  palette_color = 'rgb(' + palette_color1[0] + ',' + palette_color1[1] + ',' + palette_color1[2] + ')';
                            files['dominant_colour'] = dominent_color;
                            files['palete_colour'] = palette_color;
                            this.callBack(files,file_index,total_length);
                            break;
                        }
                        if(j === color_code.length-1){
                            if(count === 0){
                                let  dominent_color = 'rgb(' + color_code[color_code.length-1][0] + ',' + color_code[color_code.length-1][1] + ',' + color_code[color_code.length-1][2] + ')';
                                hsv_colorcode[color_code.length-1][1] = 20;
                                hsv_colorcode[color_code.length-1][2] = 100;
                                let palette_color1 = ColorConvert.hsv.rgb(hsv_colorcode[color_code.length-1][0], hsv_colorcode[color_code.length-1][1], hsv_colorcode[color_code.length-1][2]);
                                let  palette_color = 'rgb(' + palette_color1[0] + ',' + palette_color1[1] + ',' + palette_color1[2] + ')';
                                files['dominant_colour'] = dominent_color;
                                files['palete_colour'] = palette_color;
                                this.callBack(files,file_index,total_length);
                                // break;

                            }
                        }


                    }
                }


            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    callBack = (files,file_index,total_length) => {

        // console.log(files);
        // console.log(file_index);

        this.setState(prevState => ({
            accepted_files: [...prevState.accepted_files, files],
        }));

        if(this.state.accepted_files.length === total_length){



            this.props.addFile(this.state.accepted_files);
            // this.setState({warningMsg: ""});

        }


    };



    openCanvasDialog = () => {
        this.child.openCanvasDialog(0,0);
    };
    render() {
        const {files, FormattedFiles} = this.props;
             return (
            <div>

                    <Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} multiple={true}
                              accept="image/png,image/jpeg,image/jpg" minSize={0}
                              maxSize={2097152}>
                        {({getRootProps, getInputProps,isFileTooLarge , isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => (
                            <section>

                                {
                                    files.length === 0 ?
                                        (<div {...getRootProps()} className="Dropzone_Class">
                                            <div className="image_upload_content">
                                                <img src={Upload_Icon} alt="Upload_Icon"/><br/>
                                                <button>UPLOAD IMAGES</button>
                                                <input {...getInputProps()} />
                                                <p className="hello">or drag and drop images</p>
                                                <p className="hello1">Select one or more images</p>
                                                <p className="mobile_image_upload_warning" style={{margin: '15px 0px'}}>Note: Images size should not
                                                    exceed 2MB.</p>
                                            </div>
                                        </div>) :
                                        (
                                            <div>
                                                {
                                                    this.props.canvas_fill === true &&  <PreviewImage
                                                        files={files}
                                                        FormattedFiles={FormattedFiles}
                                                        canvasArray={this.props.canvasArray}
                                                        ref={ref => this.child = ref}
                                                        converted_images={this.props.converted_images}
                                                    />
                                                }
                                                <div  className="preview_image_actions">
                                                    <button type="button" className="design_fun_btn"
                                                            onClick={this.openCanvasDialog}>Edit Designs
                                                    </button>
                                                    <button type="button" className="design_fun_btn"
                                                            onClick={() => this.props.clearAllDesign()}>Clear All Designs
                                                    </button>
                                                </div>
                                            </div>

                                        )
                                }

                            </section>
                        )}
                    </Dropzone>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    selected_quantity: parseInt(state.specifications.notebook_quantity),
})

export default connect(mapStateToProps,null)(FileUpload);
