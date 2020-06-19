import React from "react";
import './FileUploadForm.css';

import {connect} from 'react-redux'
import {compose} from 'redux';

import QuantityCarousel from "../QuantityCarousel/QuantityCarousel";

import {Grid} from "@material-ui/core";

import CanvasDialog from "../CanvasDialog/CanvasDialog";
import {addNotebookImages, getNotebookImages, SetAllCanvas} from "../../../Actions";
import Icon from "@material-ui/core/Icon";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const edit = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pencil.svg";
const duplicate = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/duplicate_icon.svg'


class PreviewImage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            preview_images: [],
            formatted_preview_images: [],
            open_dialog: false,
            CurrentIndexForCarousel:0,
            converted_images:[],
            anchorEl:null,
            menuIndex:0
        }
    }

    componentWillMount() {
        const { files, FormattedFiles } = this.props;
        this.setState({
            preview_images:files,
            formatted_preview_images:FormattedFiles,
            converted_images:this.props.converted_images
        })
    }

    listToMatrix = (list, elementsPerSubArray) => {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k][i] = list[i];
        }

        return matrix;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { files, FormattedFiles } = nextProps;
        if (nextProps.files !== this.props.files) {
            this.setState({
                preview_images:files,
                formatted_preview_images:FormattedFiles,
            })
        }
    }

    openCanvasDialog = (ParentIndex,ChildIndex) => {
        this.setState({
            open_dialog: true,
            CurrentIndexForCarousel: ChildIndex
        })
    }
    closeCanvasDialog = () => {
        this.setState({
            open_dialog: false
        })
    }

    DulicateAllDesigns = (ParentIndex,ChildIndex) => {

        let response = this.props.getNotebookImages('getAllImages');
        let designed_canvas = response.payload.designed_canvas;
        let notebook_images = response.payload.notebook_images;
        let selected_index;
            selected_index  = ChildIndex;
        let selected_canvas =  designed_canvas[selected_index].toJSON(['canvas_id','type','image_id','is_empty_image','image_name']);
        let quantity = parseInt(this.props.selected_quantity);
        let duplicated_array = [];
        for(let k=0;k<quantity;k++){
            let data1 = {
                image_name:'image_'+k,
            };
            let array = notebook_images;
            let element =array;
            duplicated_array.push(new File([element[selected_index]],element[selected_index].name));
            duplicated_array[k]['image_name'] = data1.image_name;
            duplicated_array[k]['dominant_colour'] = element[selected_index].dominant_colour;
            duplicated_array[k]['is_empty_image'] = element[selected_index].is_empty_image;
            duplicated_array[k]['palete_colour'] = element[selected_index].palete_colour;
            duplicated_array[k]['preview_url'] = element[selected_index].preview_url;

            if(k === quantity-1){
                this.setState({
                    formatted_preview_images:this.listToMatrix(duplicated_array,6),
                    preview_images:duplicated_array,
                    converted_images:duplicated_array
                },() => {
                    this.props.sendImagesToStore(duplicated_array);
                })
            }
        }

        for(let i=0;i<quantity;i++){

            let value = selected_canvas;

            for(let j=0;j<selected_canvas.objects.length;j++){

                value.objects[j].canvas_id = i;
                value.objects[j].type = selected_canvas.objects[j].type;
                if(selected_canvas.objects[j].type === "image"){
                    value.objects[j].image_id = 0;
                    value.objects[j].is_empty_image = selected_canvas.objects[j].is_empty_image;
                    value.objects[j].image_name = "image_"+i;
                }


                if(j === selected_canvas.objects.length-1){

                    designed_canvas[i].loadFromJSON(value, function(){
                        designed_canvas[i].renderAll()
                    });
                }

            }

            if(i === quantity-1){
                this.setState({
                    canvas_array:designed_canvas
                },() => {
                    this.props.sendCanvasToStore(designed_canvas);
                })
            }

        }
    }
    saveCanvas = () => {
        let response = this.props.getNotebookImages('getAllImages');
        this.setState({
            open_dialog: false,
            canvas_array:response.payload.designed_canvas,
            preview_images:response.payload.notebook_images,
            formatted_preview_images: this.listToMatrix(response.payload.notebook_images, 6),
            converted_images:response.payload.notebook_images
        })
    }

    openMenu = (e, index) => {

        this.setState({
            anchorEl: e.currentTarget,
            menuIndex:index
        });
    }

    closeMenu = () => {

        this.setState({
            anchorEl: null,
            menuIndex:0
        });
    }

    render() {

        return (

            <div className="Dropzone_image_preview">

                <QuantityCarousel CarouselIndicatorType="carousel" size="smallscreen">
                    {
                         this.state.formatted_preview_images.map((separate_packs, ParentIndex) => {
                            return (
                                <div key={ParentIndex}>
                                    <Grid container spacing={0}>
                                        {separate_packs.map((image_item, ChildIndex) => {
                                            return (
                                                <Grid item xs={4} className={this.props.selected_quantity > 6?"preview_image_column_more": "preview_image_column"} key={ChildIndex}>
                                                    <img src={image_item.preview_url} alt="notebooks"
                                                         className="uploaded_images_desktop"
                                                         onClick={() => this.openCanvasDialog(ParentIndex,ChildIndex)}
                                                    />
                                                    <span className="mobile_menu">
                                                        <Icon style={{fontSize: '20px'}}  onClick={(event) => this.openMenu(event, ChildIndex)}
                                                              key={ChildIndex}><MoreHorizIcon style={{fontSize: '1.3rem'}}/></Icon>
                                                       <Menu
                                                           id="simple-menu"
                                                           anchorEl={this.state.anchorEl}
                                                           keepMounted
                                                           open={Boolean(this.state.anchorEl)}
                                                           onClose={this.closeMenu}
                                                       >
                                                            <MenuItem className="menuItem" onClick={() => {
                                                                this.setState({
                                                                    anchorEl:null
                                                                })

                                                                this.openCanvasDialog(ParentIndex,this.state.menuIndex)}
                                                            }>
                                                                <img src={edit} className="icons" alt="Edit" style={{marginRight:'10px'}}/>
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem className="menuItem" onClick={() => {
                                                                this.setState({
                                                                    anchorEl:null
                                                                })

                                                                this.DulicateAllDesigns(ParentIndex,this.state.menuIndex)}
                                                            }>
                                                                <img src={duplicate} className="icons"
                                                                    alt="Duplicate" style={{marginRight:'10px'}}/>
                                                                    Duplicate All
                                                            </MenuItem>
                                                       </Menu>

                                                    </span>

                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </div>
                            );
                        })
                    }
                </QuantityCarousel>

                {
                    this.state.open_dialog === true ?
                        <CanvasDialog
                            open_dialog={this.state.open_dialog}
                            UserSelectedImages={this.state.preview_images}
                            FormattedPreviewImages = {this.state.formatted_preview_images}
                            CurrentIndex={this.state.CurrentIndexForCarousel}
                            canvasArray={this.state.canvas_array}
                            closeCanvasDialog={this.closeCanvasDialog}
                            saveCanvas={this.saveCanvas}
                            converted_images={this.state.converted_images}
                        />
                         : null
                }

            </div>


        );
    }

}

const mapStateToProps = state => ({
    selected_quantity: parseInt(state.specifications.notebook_quantity),
})

const mapDispatchToProps = dispatch => ({
    getNotebookImages: text => dispatch(getNotebookImages(text)),
    sendImagesToStore: selected_images => dispatch(addNotebookImages(selected_images)),
    sendCanvasToStore: canvas => dispatch(SetAllCanvas(canvas)),
})

export default compose(connect(mapStateToProps , mapDispatchToProps, null ,{forwardRef:true}))(PreviewImage);


