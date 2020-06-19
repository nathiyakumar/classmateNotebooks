import React from "react";
import './DesignContestUploadImagePage.css';
import Dropzone from "react-dropzone";
// import PreviewImage from "./PreviewImage";

import cogoToast from 'cogo-toast';
import {connect} from "react-redux";
import ColorThief from "colorthief";
import ColorConvert from "color-convert";
import Grid from "@material-ui/core/Grid";
import DesignContestHeaders from "../DesignContestHeader/DesignContestHeader";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import {api} from "../../../serviceApi";
import Media from "react-media";
import {small_screen} from "../../../variables";
import MobileHomePage from "../../Home/MobileHomePage";
import DesktopHome from "../../Home/DesktopHome";
import MetaWrapper from "../../../Meta/MetaWrapper";
import MobileDesignContestHeader from "../DesignContestHeader/MobileDesignContestHeader";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../Environment";


// import Upload_Icon from 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/upload_icon.svg';
const designContestUpload = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/design-contest-upload.png';


const getIsProfessionUpdated = graphql`
  query DesignContestUploadImagePageIsProfessionUpdatedQuery{
      isProfessionUpdated
        }
`;

class DesignContestUploadImagePage extends React.Component {

    constructor(props){
        super(props);
        this.child =null;
        this.state = {
            accepted_files:[],
            imageUpload:false,
            designTitle:'',
            workType:'Photography',
            isRulesAccepted:false,
            age:'',
            profession:'',
            isProfessionUpdated:false

        }
    }

componentDidMount(): void {
        this.getIsProfessionUpdated()
}

    getIsProfessionUpdated = () => {
        const variables = {

        };


        fetchQuery(environment, getIsProfessionUpdated, variables,{force:false})
            .then(data => {

                if (data.isProfessionUpdated !== null) {
                    this.setState({
                        isProfessionUpdated: data.isProfessionUpdated,
                    })

                }

                else{
                    this.setState({
                        isProfessionUpdated:false ,
                    })
                }
            });


    };

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
                cogoToast.error("your images is too large", {position: 'top-center'});
            }
            if(file_formate === false) {
                cogoToast.error("File type not accepted, sorry!", {position: 'top-center'});
            }
        }
        if(accepted.length > 0){

            var files;
                files = accepted;

            this.setState({
                accepted_files:files,
                imageUpload:true
            });
            var output = document.getElementById('uploadImage');
            output.src = URL.createObjectURL(files[0]);
            output.onload = function() {
                URL.revokeObjectURL(output.src) // free memory
            }
            // var reader = new FileReader();
            // reader.onload = function(e) {
            //     $('#blah').attr('src', e.target.result);
            // }
            //
            // reader.readAsDataURL(input.files[0]);
        }
    };



    uploadDesignContestImage = e => {
        let imageFile = this.state.accepted_files[0]
        let obj
           if(this.state.isProfessionUpdated === true){
                obj ={
                   designTitle:this.state.designTitle,
                   workType:this.state.workType,
                   isRulesAccepted:this.state.isRulesAccepted,
                    age:0,
                   profession:this.state.profession
               };
           }
           else{
               obj ={
                   designTitle:this.state.designTitle,
                   workType:this.state.workType,
                   isRulesAccepted:this.state.isRulesAccepted,
                   age: JSON.parse(this.state.age),
                   profession:this.state.profession
               };
           }



            const variables = {
                designData:obj,

            };
            var data = new FormData();
            data.append("query", "mutation DesignContestUploadImagePageMutation(\n" +
                "    $designData: DesignDataInput\n" +
                ") {\n" +
                "    designDataCreate(designData:$designData){\n" +
                "        message\n" +
                "    }\n" +
                "}");
            data.append("variables", JSON.stringify(variables));
            this.state.accepted_files.map((file,index) => {
                data.append("designed_image", file)
            });
            let token = localStorage.getItem('user_token');

            if(token !== null && token !== undefined && token !== ""){

                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'JWT '+token
                    },

                };

            } else {

                var config = {
                    headers: {
                        'Accept': 'application/json'
                    },
                };
            }
            let self = this
            if(this.state.designTitle !== '' &&
            this.state.isRulesAccepted !== '' &&
            this.state.age !== ''){
                axios.post(api, data, config)
                    .then(function (response) {
                        if(response.data && response.data.data.designDataCreate !== null){
                            cogoToast.success(response.data.data.designDataCreate.message,{ position: 'top-center'});
                            self.props.history.push('/design-contest-success' ,
                                {image:imageFile});                    }

                    })
                    .catch(function (err) {
                        cogoToast.error("Your Images are not uploaded,Please try again",{ position: 'top-center'});

                    });
            }
            else{
                cogoToast.error("Please fill Empty Field",{ position: 'top-center'});

            }


    }

    handleChangeRules = (e) =>{
        let checkedItem = e.target.checked
        this.setState({
            isRulesAccepted:checkedItem
        })
    }

    handleRadioChange =(e)=>{
        let selectedValue = e.target.value;
        this.setState({
            workType:selectedValue
        })
    }
   changeInputValues = (e, name) =>{
        this.setState({
            [name] : e.target.value
        })

   }

    render() {
        // const {files, FormattedFiles} = this.props;
        return (
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileDesignContestHeader />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <DesignContestHeaders/>
                    )}
                />

                <div className="design-contest-upload-page">
                    <h2 style={{textAlign:'center'}}>Submit Your Work</h2>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} multiple={false}
                                      accept="image/png,image/jpeg,image/jpg" minSize={0}
                                      maxSize={2097152}>
                                {({getRootProps, getInputProps,isFileTooLarge , isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => (

                                    <div><section>

                                        {/*{*/}
                                        {/*    files.length === 0 ?*/}
                                        {/*        (*/}
                                        <div {...getRootProps()} className="Dropzone_Class_design_contest">
                                            <div className="image_upload_content">
                                                {this.state.imageUpload === false ?
                                                     <div>
                                                        <img src={designContestUpload} style={{width: '45%'}} alt="Upload_Icon"/><br/>
                                                        <p>Drag & Drop the file</p>
                                                        <p>Allowed image format: .jpg & .png</p>
                                                        <button className="upload_btn" >UPLOAD IMAGES</button>
                                                        <input {...getInputProps()} />
                                                        {/*<p className="hello">or drag and drop images</p>*/}
                                                        {/*<p className="hello1">Select one or more images</p>*/}
                                                        <p className="mobile_image_upload_warning" style={{margin: '15px 0px'}}>Note: Images size should not
                                                            exceed 2MB.</p>
                                                    </div>:

                                                    <img id="uploadImage"  style={{width:'100%'}}/>

                                                }
                                            </div>
                                        </div>


                                    </section>
                                    </div>
                                )}
                            </Dropzone>
                            <div className="upload_submit_btn">YOUR SUBMISSION WILL BE REVIEWED BY OUR TEAM.</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="contentField"><h4 style={{margin:'0px'}}>Title</h4>
                            <input type='text'  className="design-contest-title" value={this.state.designTitle} onChange={(e) =>this.changeInputValues(e , 'designTitle')}/></div>
                            {this.state.isProfessionUpdated !== true ? <div className="contentField">
                                <h4 style={{margin:'0px'}}>Age</h4>
                                <input type='number' className="design-contest-title" value={this.state.age} onChange={(e) =>this.changeInputValues(e , 'age')}/></div>
                            : null}
                            <div className="contentField"><h4 style={{margin:'0px'}}>Profession</h4>
                                <input type='text' className="design-contest-title" value={this.state.proffession} onChange={(e) =>this.changeInputValues(e , 'profession')} /></div>
                            <h4 style={{margin:'0'}}>Medium of Work</h4>
                            <div className="contentField">
                                <RadioGroup aria-label="quiz" name="quiz" style={{flexDirection: 'row'}}
                                            value={this.state.workType} onChange={this.handleRadioChange}
                                >
                                <FormControlLabel value="Photography" control={<Radio />} label="Photography" />
                                <FormControlLabel value="Art" control={<Radio />} label="Art" />
                            </RadioGroup></div>
                            <div className="contentField">
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.isRulesAccepted} onChange={this.handleChangeRules}
                                        name="" />}
                                    label="I, abide to rules of this contest (Read Rules)"
                                />
                            </div>
                            {/*<div className="contentField">*/}
                            {/*    <button >SUBMIT & BUY DESIGN</button></div>*/}
                            <div className="contentField">
                                <button onClick={this.uploadDesignContestImage} disabled={this.state.designTitle.length === 0 }>SUBMIT</button>
                            </div>

                            {/*<Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} multiple={true}*/}
                            {/*          accept="image/png,image/jpeg,image/jpg" minSize={0}*/}
                            {/*          maxSize={2097152}>*/}
                            {/*    {({getRootProps, getInputProps,isFileTooLarge , isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => (*/}
                            {/*        <section>*/}

                            {/*            /!*{*!/*/}
                            {/*            /!*    files.length === 0 ?*!/*/}
                            {/*            /!*        (*!/*/}
                            {/*            <div {...getRootProps()} className="Dropzone_Class">*/}
                            {/*                <div className="image_upload_content">*/}
                            {/*                    <img src={designContestUpload} style={{width: '45%'}} alt="Upload_Icon"/><br/>*/}
                            {/*                    <p>Drag & Drop the file</p>*/}
                            {/*                    <p>Allowed image format: .jpg & .png</p>*/}
                            {/*                    <button>UPLOAD IMAGES</button>*/}
                            {/*                    <input {...getInputProps()} />*/}
                            {/*                    /!*<p className="hello">or drag and drop images</p>*!/*/}
                            {/*                    /!*<p className="hello1">Select one or more images</p>*!/*/}
                            {/*                    <p className="mobile_image_upload_warning" style={{margin: '15px 0px'}}>Note: Images size should not*/}
                            {/*                        exceed 2MB.</p>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            /!*) :*!/*/}
                            {/*            /!*(*!/*/}
                            {/*            /!*    <div>*!/*/}
                            {/*            /!*        {*!/*/}
                            {/*            /!*            this.props.canvas_fill === true &&  <PreviewImage*!/*/}
                            {/*            /!*                files={files}*!/*/}
                            {/*            /!*                FormattedFiles={FormattedFiles}*!/*/}
                            {/*            /!*                canvasArray={this.props.canvasArray}*!/*/}
                            {/*            /!*                ref={ref => this.child = ref}*!/*/}
                            {/*            /!*                converted_images={this.props.converted_images}*!/*/}
                            {/*            /!*            />*!/*/}
                            {/*            /!*        }*!/*/}
                            {/*            /!*        <div  className="preview_image_actions">*!/*/}
                            {/*            /!*            <button type="button" className="design_fun_btn"*!/*/}
                            {/*            /!*                    onClick={this.openCanvasDialog}>Edit Designs*!/*/}
                            {/*            /!*            </button>*!/*/}
                            {/*            /!*            <button type="button" className="design_fun_btn"*!/*/}
                            {/*            /!*                    onClick={() => this.props.clearAllDesign()}>Clear All Designs*!/*/}
                            {/*            /!*            </button>*!/*/}
                            {/*            /!*        </div>*!/*/}
                            {/*            /!*    </div>*!/*/}

                            {/*            /!*        )*!/*/}
                            {/*            /!*}*!/*/}

                            {/*        </section>*/}
                            {/*    )}*/}
                            {/*</Dropzone>*/}
                        </Grid>
                    </Grid>
                </div>



            </div>
        );
    }
}

const mapStateToProps = state => ({
    selected_quantity: parseInt(state.specifications.notebook_quantity),
})

export default connect(mapStateToProps,null)(DesignContestUploadImagePage);
