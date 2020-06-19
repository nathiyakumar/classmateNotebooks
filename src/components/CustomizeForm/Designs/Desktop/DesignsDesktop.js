import React from "react";
import {api} from '../../../../serviceApi';
import './DesignsDesktop.css';
import { fabric } from 'fabric'
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import {addNotebookImages, ClearAllDesigns, getNotebookImages, SetAllCanvas} from '../../../../Actions/index'
import {AddToCart} from '../../../../Actions/non_customiser_action';
import  QuantityCarousel  from '../../QuantityCarousel/QuantityCarousel';
import FileUploadForm from "../../FileUploadForm/FileUploadForm";
import {Box, Button, Container, Grid} from "@material-ui/core";
import VerticalLinearStepper from "../../../VerticalLinearStepper/VerticalLinearStepper";
import Icon from "@material-ui/core/Icon";
import CreateAddToCartCustomiserMutation from '../../../../mutations/CreateAddToCartCustomiserMutation'
import CartContext from "../../../CartProvider/cart-context";
import cogoToast from 'cogo-toast';
import LoadingScreen from "react-loading-screen";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from 'axios';
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import graphql from "babel-plugin-relay/macro";
// import ReactGA from "react-ga";



const Information_Icon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/infermation_icon.svg';
const Defalut_Placeholder_Notebook = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/defalut_notebook.png";



const GetSKUBySpecification = graphql`
        query DesignsDesktopNotebookSkuQuery($size:String , $bindingType:String , $pages:String , $rulingType:String ) {
          notebookSku(size: $size, bindingType: $bindingType, pages: $pages, rulingType: $rulingType){
            id
            SKU
            size
            pages
            bindingType
            rulingType
            MRP
          }
        }          
        `

class DesignsDesktopComponent extends React.Component{

    static contextType = CartContext;

    constructor(props){
        super(props);
        this.canvasRefs = {}
        this.state = {
            files:[],
            formatted_preview_images: [],
            canvas_array:[],
            loading:false,
            loading_msg:'',
            canvas_width:558,
            canvas_height:679.25,
            canvas_fill:false,
            converted_images:[],
            progress: 0,
            file_upload:false,
            checkout_complete_error:false
        }
    }

    componentDidMount(){
        if(this.props.selected_page === "" || this.props.selected_size === "" || this.props.selected_ruling === "" || this.props.selected_binding === "" || this.props.selected_quantity === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }

    componentWillMount() {
        //longbook
        if(this.props.size === "297 x 210"){
            this.setState({
                canvas_width:558,
                canvas_height:730.58
            })

        } else if(this.props.size === "240 x 180") { //shortbook
            this.setState({
                canvas_width:558,
                canvas_height:679.25
            })
        }
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

    addFile = file => {

        // console.log(file);

        this.setState({
            loading:true,
            loading_msg:"Please wait, while we create your canvas",
            file_upload:true

        })
        const { selected_quantity} = this.props;
        const files = file;
        let temp_preview_images = [];
        for (let i = 0; i < selected_quantity; i++) {
            if (files[i]) {
                files[i]['preview_url'] = URL.createObjectURL(files[i]);
                files[i]['image_name'] = 'image_'+i;
                files[i]['is_empty_image'] = false;
                temp_preview_images[i] = files[i];


            } else {
                let default_file = {
                    'preview_url':Defalut_Placeholder_Notebook,
                    'image_name':'emptyImage',
                    'is_empty_image': true,
                    'dominant_colour':'rgb(150, 150, 150)',
                    'palete_colour':'rgb(90, 90, 90)'

                }
                temp_preview_images[i] = default_file;
            }

            if(i === selected_quantity-1){

                this.setState({
                    files: temp_preview_images,
                });
                this.setCanvasImages();
            }
        }

    };

    setCanvasImages = () => {
        let scope = this;
        let array = [];
        this.state.files.map((item, index) => {



            let canvas = new fabric.Canvas(this.canvasRefs[`canvas${index}`],{
                hoverCursor: 'pointer',
                preserveObjectStacking: true,
                selection: false,
            });

            let palete_colour = this.state.files[index].palete_colour;

            let dominant_colour = this.state.files[index].dominant_colour;

            let svg_value;

            if(this.props.size === "297 x 210"){ //Longbook
                svg_value = this.getLongbookSvgImage(palete_colour,dominant_colour);
            } else if(this.props.size === "240 x 180") { //shortbook
                svg_value = this.getShortbookSvgImage(palete_colour,dominant_colour);
            }

            let blob = new Blob([svg_value], {type: 'image/svg+xml'});
            let url = URL.createObjectURL(blob);

            fabric.Image.fromURL(url, imgObj => {
                canvas.setOverlayImage(imgObj, canvas.renderAll.bind(canvas), {
                    opacity: 1,
                    width:canvas.width,
                    height:canvas.height

                });
                imgObj.scaleToWidth(canvas.width);
                imgObj.scaleToHeight(canvas.height);
                canvas.renderAll();
            });

            fabric.Image.fromURL(item.preview_url, function (myImg) {
                var img = myImg.set({ left: 0, top: 0 });
                img.set({
                    globalCompositeOperation: 'destination-over',
                    canvas_id:index,
                    type:'image',
                    image_id:0,
                    is_empty_image:item.is_empty_image,
                    image_name:item.image_name,

                });
                if(img.width > img.height){
                    img.scaleToWidth(scope.state.canvas_width); //fit landscap image to canvas width
                } else if(img.width < img.height){
                    img.scaleToHeight(scope.state.canvas_height -100);//fit portrait image to canvas width

                }else {
                    img.scaleToWidth(200);
                    img.scaleToHeight(200);
                }


                img.setCoords();
                canvas.centerObject(img);
                canvas.add(img);
            });
            array.push(canvas);
        });

        this.setState({
            canvas_array: array,
        })

        setTimeout(
            function() {
                let canvas = this.state.canvas_array;
                let preview_images =[...this.state.files];let emptyArray = [];
                for(let i=0;i<canvas.length;i++){
                    let previewImage = new File([preview_images[i]],preview_images[i].name);
                    previewImage['preview_url'] = canvas[i].toDataURL();
                    previewImage['dominant_colour'] = preview_images[i].dominant_colour;
                    previewImage['image_name'] = preview_images[i].image_name;
                    previewImage['is_empty_image'] = preview_images[i].is_empty_image;
                    previewImage['palete_colour'] = preview_images[i].palete_colour;
                    emptyArray[i] = previewImage;
                    if(i === canvas.length-1){
                        this.props.sendImagesToStore(emptyArray);
                        this.props.sendCanvasToStore(this.state.canvas_array);
                        this.setState({
                            loading:false,
                            loading_msg:'',
                            converted_images:emptyArray,
                            formatted_preview_images:this.listToMatrix(emptyArray,6),
                            canvas_fill:true
                        })
                    }

                }

            }
                .bind(this),
            5000
        );
    }

    getLongbookSvgImage = (palete_colour,dominant_colour) => {


        return '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<!-- Generator: Adobe Illustrator 23.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n' +
            '<svg version="1.1" width="558" height="730" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '\t viewBox="0 0 558 730" style="enable-background:new 0 0 558 730;" xml:space="preserve">\n' +
            '<style type="text/css">\n' +
            '\t.st0{fill:'+palete_colour+';}\n' +
            '\t.st1{fill:'+dominant_colour+';}\n' +
            '\t.st2{enable-background:new    ;}\n' +
            '\t.st3{fill:#061922;}\n' +
            '\t.st4{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}\n' +
            '</style>\n' +
            '<g id="Notebook">\n' +
            '\t<g id="Lower_Border_Curve">\n' +
            '\t\t<path class="st0" d="M64.7,95H0V85h64.7c14.9,0,32.9-7.4,51.9-15.3C140,60,166.5,49,194,49h364v10H194.1\n' +
            '\t\t\tc-26,0-51.7,10.7-74.3,20.1C99.9,87.3,81.2,95,64.7,95z"/>\n' +
            '\t</g>\n' +
            '\t<path id="Upper_Curve" class="st1" d="M558,54H194.1C145,54,99.2,90,64.7,90H0V0h558V54z"/>\n' +
            '\t<g id="Lower__Border_Curve">\n' +
            '\t\t<path class="st0" d="M363.9,681H0v-10h363.9c26,0,51.7-10.7,74.3-20.1c19.8-8.2,38.4-15.9,55.1-15.9H558v10h-64.7\n' +
            '\t\t\tc-14.9,0-32.9,7.4-51.9,15.3C418,670,391.5,681,363.9,681z"/>\n' +
            '\t</g>\n' +
            '\t<path id="Lower_Curve" class="st1" d="M0,676h363.9c49.1,0,94.9-36,129.4-36H558v90H0V676z"/>\n' +
            '</g>\n' +
            '<g class="st2">\n' +
            '\t<g>\n' +
            '\t\t<rect x="391.1" y="27" class="st3" width="141.8" height="31.9"/>\n' +
            '\t\t<path class="st4" d="M417.4,33.9h-0.2v-0.2h0.2V33.9z M417.2,32.5h-0.2v-0.1L417.2,32.5L417.2,32.5z M416.9,35.4v0.2h-0.1\n' +
            '\t\t\tL416.9,35.4L416.9,35.4z M416.5,36.3h-0.2v-0.1L416.5,36.3L416.5,36.3z M416.2,37.7h-0.2v-0.2h0.2V37.7z M416.2,39.8h-0.3v-0.1\n' +
            '\t\t\tl0.1-0.1h0.2C416.2,39.7,416.2,39.8,416.2,39.8z M416,41L416,41l-0.1,0.2h-0.2v-0.1h-0.1v0.1h-0.2v-0.2h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tc0.1,0,0.2,0,0.2-0.1h0.1C415.9,40.7,415.9,40.8,416,41L416,41L416,41z M415.9,42.9L415.9,42.9L415.9,42.9l0.1,0.2l-0.1,0.1v0.1\n' +
            '\t\t\th-0.2v-0.1h-0.1v-0.1l0.1-0.1L415.9,42.9L415.9,42.9z M415.8,43.9L415.8,43.9L415.8,43.9l-0.2,0.1v-0.1h-0.1v-0.2h0.1v-0.2h0.1\n' +
            '\t\t\tv0.1h0.1V43.9z M415.5,31.3v-0.2h0.2v0.2H415.5z M415.7,31.8c0.2,0,0.1-0.2,0.2-0.1v0.2l-0.1,0.1V32h-0.2L415.7,31.8L415.7,31.8\n' +
            '\t\t\tL415.7,31.8z M415.9,39.4c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1l0,0L415.9,39.4L415.9,39.4z M415.4,41.1h-0.2V41h0.2V41.1z\n' +
            '\t\t\t M415.4,43.6h-0.2v-0.2h0.2V43.6z M415.5,46.5v0.2h-0.3v-0.2H415.5z M415.4,44.9L415.4,44.9l0.2-0.1v0.1h0.1v0.1h-0.1V45h-0.1v0.2\n' +
            '\t\t\th-0.2V44.9z M415.2,47.6L415.2,47.6L415.2,47.6l0.1,0.2h-0.1v0.1H415v-0.1h-0.1l-0.1-0.2h-0.1v0.2h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.1,0.2-0.1v0.1h0.2v-0.1h0.1v0.2h0.1L415.2,47.6L415.2,47.6z M415,48.4v-0.2h0.1L415,48.4L415,48.4z M415.1,49.3\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1v0.2h0.2v0.3h-0.2V50h0.1v0.1h-0.1v0.1h-0.1v-0.1h-0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.1h0.1v-0.2h0.1V49.3z M415.1,48.9c0.2,0.1,0-0.2,0.2-0.1V49h-0.2V48.9z M414.8,50.8h-0.3v-0.2h0.2v-0.2l0,0h0.1\n' +
            '\t\t\th0.1V50.8z M414.6,51.1h-0.2v-0.2h0.2V51.1z M414.4,50.3L414.4,50.3l-0.1-0.2h-0.1v0.1h-0.1v0.2h-0.1c0-0.1,0-0.2-0.1-0.1h-0.1\n' +
            '\t\t\tv0.2h-0.2v-0.8h0.2l0.1,0.1h0.1v0.1h0.1v0.1h0.2V50l0,0v0.1h0.1L414.4,50.3h0.2v0.2h-0.2C414.4,50.4,414.5,50.2,414.4,50.3\n' +
            '\t\t\t M413.7,48.9h0.2V49h-0.2V48.9z M413.9,44.6L413.9,44.6L413.9,44.6l-0.1-0.2c0.2,0.1,0-0.1,0.2-0.1l0.1,0.1h0.1v0.2H413.9z\n' +
            '\t\t\t M413.7,44.1L413.7,44.1L413.7,44.1L413.7,44.1l-0.2,0.1v-0.2h0.1v-0.2h-0.1v-0.1l0,0v-0.1l0.1-0.1h0.2v0.1h0.1v0.1h0.1v0.2\n' +
            '\t\t\tl-0.1,0.1L413.7,44.1L413.7,44.1z M414.1,48.9L414.1,48.9l0.1,0.2h-0.1V48.9z M414.1,41.8h0.2V42h-0.2V41.8z M414.4,38.6\n' +
            '\t\t\tL414.4,38.6l0.1-0.2l0.1-0.1h0.2v0.2h-0.1v0.2h-0.2v-0.1h-0.1V38.6z M414.4,37.4v-0.2h0.2v0.2H414.4z M414.8,46.7v0.2h-0.2v-0.2\n' +
            '\t\t\tH414.8z M414.9,46.7c0.2,0.1,0-0.2,0.2-0.1v0.2h0.1V47H415V47h-0.1V46.7z M415.1,33.6L415.1,33.6L415.1,33.6L415.1,33.6\n' +
            '\t\t\tL415.1,33.6z M415.4,48.9h0.2V49h-0.2V48.9z M413.6,45.8L413.6,45.8L413.6,45.8l-0.2,0.1v-0.2h0.1L413.6,45.8L413.6,45.8\n' +
            '\t\t\tL413.6,45.8z M415.4,31.1L415.4,31.1L415.4,31.1L415.4,31.1v0.3h0.1l0.2,0.1h0.1v0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.2v0.5h0.1v0.1v0.1\n' +
            '\t\t\th0.1v0l0.1-0.1v0.1l-0.1,0.1v0.1h0.1c0.1,0.1,0.1,0.2,0,0.4h-0.1v0.1h-0.2l-0.1,0.2h-0.3v0.2h0.1v0.3h-0.1v0.2h0.2V34h-0.2v0.2\n' +
            '\t\t\th0.1v0.2h-0.1v0.1h0.1v0.2h-0.2v0.2h0.1v-0.1h0.2V35h-0.1v0.1l-0.2,0.1c0,0.2,0,0.3,0,0.5h-0.2v0.2h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v-0.1h0.1v-0.3h0.2c0,0.2,0,0.3,0,0.4h-0.1v0.1c0,0.1-0.2,0-0.2,0.1v0.2h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.4h-0.2v0.1c-0.1,0.1-0.2,0-0.4,0V37h-0.1v0.1h-0.2v0.4h0.2v0.1h0.1v0.1h0.1v0.2h-0.1v0.1h-0.1V38h0.1V38h0.1v0.3\n' +
            '\t\t\th-0.1l-0.1-0.2h-0.1v0.2h0.1v0.2h-0.2v0.2h0.1v0.1h-0.2v0.1l-0.1,0.1v0.1h0.1V39H414v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.2h-0.2v0.2\n' +
            '\t\t\th-0.2v0.3c0.1,0,0.2,0,0.2,0v0.2h-0.1v0.2h-0.3v0.5h0.2v-0.4h0.2c0,0.2,0,0.3,0,0.4H414v0.1h-0.2V41h0.2v0.2h-0.2v0.5h-0.2v0.6\n' +
            '\t\t\th-0.2v0.5h0.2v-0.1h0.1v-0.2h-0.1v0h0.2v-0.2h0.1v-0.1h0.2v0.3h-0.1v0.5h-0.1v0.1h-0.2l0,0h-0.1v0.1h-0.1l0,0l-0.1,0.1v0.2h0.1\n' +
            '\t\t\tl0.1,0.1l-0.1,0.1v0.1h0.1l0.1,0.1h0.1v0.1h-0.1V44h-0.1v0.1h0.1v0.1h-0.1v0.2h0.2v0.2h-0.2v0.2h0.1v0.1h0.1v-0.1h0.1l0.2,0.1\n' +
            '\t\t\th-0.1v0.2l-0.3,0.1V45h0.2v0.2h-0.2v0.2h0.2v-0.2h0.1v0.1c0.2,0,0.1,0.2,0.1,0.3h0.1v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2v-0.1h-0.1v0.2h-0.2v0h-0.1v0.2h0.1v0.1h-0.1v0.1h0.1v0.2h0.1v0.2h0.2v-0.2h-0.1V46h0.1\n' +
            '\t\t\tc0.1,0,0.1,0,0.1,0.1h0.1v0.1h0.1v0.2h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1c-0.1,0.1-0.3,0-0.4,0.1l0,0h-0.1v0.1h0.1V47h-0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.2V47h0.1l0.2,0.1h0.1v0.1h-0.2v0.6h-0.2v-0.1h-0.1v-0.1h-0.2v0.1l-0.1,0.1v0.1h0.2v0.3h0.1v-0.1h0.2v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v0.2h-0.2v0.3h0.2c0,0.2,0,0.3,0,0.4h-0.1v0.2h0.1l0.1,0.1h0.1v0.2h-0.1v0.2h0.2V50h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.2,0.4l0,0c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v0.1h0.1V51h0.1v0.1h0.1v0.1h0.1v0.1h0.5v0.2h0.4v-0.1h0.1l0,0\n' +
            '\t\t\tl0.1-0.1v-0.1l0.1-0.1V51h-0.1c-0.1-0.3-0.1-0.6,0-0.9h0.1v0.2l0.1-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v0.1h0.1v0.1h0.1v0.2\n' +
            '\t\t\th0.2v-0.4H416v-0.1h-0.1v-0.2h0.1v-0.1h-0.3v-0.1h-0.1v-0.1h0.1v-0.1h-0.1v-0.1h0.1v-0.1h0.2v0.2h-0.1v0.2h0.2v-0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.4H416V49h-0.1V49l0,0v-0.1h-0.1v-0.1h-0.5v-0.2h0.1v-0.1h-0.1v-0.2h-0.2v-0.2h0.2v-0.1l0.1-0.1V48h0.3v0.3h0.3v-0.2h-0.2v-0.3\n' +
            '\t\t\th-0.2v-0.5h-0.2v-0.1h-0.1v-0.2h0.2v0.1h0.1v-0.4h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.2v-0.2h-0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.9h0.1\n' +
            '\t\t\tl0.1,0.1h-0.1v-0.1h0.1v-0.1h-0.1V45h-0.1l-0.1-0.1h0.1v-0.2h-0.2v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.3h0.2v-0.1h0.1v0.2\n' +
            '\t\t\th0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2h-0.1v-0.2h0.2c0-0.2,0-0.3,0-0.4h0.2v-0.2h-0.1v-0.1h-0.1c0-0.2,0-0.5,0-0.8H416l0,0h-0.1v0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1h0.2c0-0.1,0-0.2,0-0.2h0.1c0.2,0,0.1,0.2,0.2,0.4h0.2v-0.3h0.2v-1h-0.2v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1c0-0.2,0-0.3,0-0.5h0.2v-0.4h-0.1v-0.2h0.2v-0.1l0.1-0.1V39h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1c-0.1-0.2,0-0.3,0-0.4\n' +
            '\t\t\th-0.1v-0.2h0.1V38h-0.1V38h0.1v-0.1h0.2v0.2h-0.1v0.1h0.2v-0.1l0.1-0.1V38h0.1V38h0.2v-0.2h-0.2c0-0.2,0-0.3,0-0.4h0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.4c0-0.2,0-0.3,0-0.4h0.2v-0.2h0.2v-0.2h0.2v-0.2h0.1l0,0l0.1-0.1V36h0.1v-0.1h0.1v-0.2h-0.1v-0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.5H417v0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.2h0.1v-0.2h0.2v-0.1h0.1l0.1,0.1h0.1v-0.2h0.1V35h-0.1v0.2h-0.3V35h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.2h0.1v-0.3h-0.3v-0.1H417v-0.2h0.2v0.1h0.1v-0.1h0.1V34l0.1-0.1v-0.1h0.1v-0.2h0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tc0-0.2,0-0.5,0-0.8h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.1h0.1c0-0.2,0-0.3,0-0.4h0.1V32h-0.1v-0.1h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h0.1\n' +
            '\t\t\tv-0.1h0.2l-0.1-0.2h-0.2l-0.1-0.2h-0.1h-0.3v-0.1l-0.2-0.2l-0.2,0.1l-0.2-0.1h-0.2l-0.1,0.2l-0.3-0.1h-0.3v0.2h-0.2L415.4,31.1z"\n' +
            '\t\t\t/>\n' +
            '\t\t<polygon class="st4" points="415.1,32.6 415.2,32.6 415.2,32.5 415.2,32.5 415.1,32.5 415.1,32.5 415,32.6 415,32.7 415.1,32.7 \t\t\n' +
            '\t\t\t"/>\n' +
            '\t\t<path class="st4" d="M507.6,47.7L507.6,47.7L507.6,47.7l-0.2,0.1v0.1h-0.1v-0.2l0.1-0.1L507.6,47.7L507.6,47.7z M507.5,48.5h0.2\n' +
            '\t\t\tv0.2h-0.2V48.5z M507.2,47.1L507.2,47.1l-0.1-0.2h0.1V47.1z M505.3,49.7L505.3,49.7L505.3,49.7l-0.2,0.1v-0.2c0.2,0,0-0.2,0.2-0.1\n' +
            '\t\t\tL505.3,49.7L505.3,49.7L505.3,49.7L505.3,49.7z M505.1,50.2L505.1,50.2l-0.1,0.2H505l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\tC505.1,50.3,504.8,50.1,505.1,50.2L505.1,50.2z M504.9,49.9L504.9,49.9L504.9,49.9L504.9,49.9h-0.2v-0.1c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tV49.9l0.2-0.1v0.1H504.9z M504.3,47.6h-0.2v0.1l-0.1,0.1v0.1h-0.2v-0.1h0.1v-0.1h0.1v-0.2L504.3,47.6L504.3,47.6z M504.1,50.5\n' +
            '\t\t\th-0.4v-0.3h0.2v-0.1h0.1v-0.2h0.1l0.1,0.1h0.1L504.1,50.5z M503.5,47.9L503.5,47.9L503.5,47.9l-0.2,0.1v-0.1h-0.1v-0.2h0.2V47.9z\n' +
            '\t\t\t M502.1,51.1H502V51h0.2V51.1z M501.9,48.3L501.9,48.3L501.9,48.3l-0.2,0.1v-0.2L501.9,48.3L501.9,48.3z M499.7,51h-0.5v-0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.1h0.2v0.1h-0.1v0.2h0.1V51h0.1l0,0L499.7,51L499.7,51z M498.9,50.4L498.9,50.4L498.9,50.4l-0.2,0.2v0.1h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.3l-0.1-0.1h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.2v0.1h0.3L498.9,50.4L498.9,50.4z M497.5,40.7L497.5,40.7\n' +
            '\t\t\tl-0.1,0.2h-0.3v0.3h-0.2v-0.1h-0.1v-0.2h-0.1V41h-0.2v-0.3c0.2,0,0.3,0,0.4-0.1v-0.1l0.1-0.1h0.2v0.1h0.1v0.2H497.5L497.5,40.7\n' +
            '\t\t\tL497.5,40.7L497.5,40.7z M496.4,38.1L496.4,38.1l0.1-0.2h0.2v0.2H496.4z M496.5,41.3L496.5,41.3l-0.1,0.2h-0.2v-0.3l0.1-0.1h0.2\n' +
            '\t\t\tv0.1h0.1V41.3z M497.2,44.6h-0.2v0.2H497v-0.1h-0.1v-0.2C497.2,44.7,497,44.4,497.2,44.6L497.2,44.6z M495.6,41.1L495.6,41.1\n' +
            '\t\t\tL495.6,41.1l-0.2,0.1l-0.1-0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1l0.1-0.1V41c0.1,0,0.3,0.1,0.2-0.1h0.2L495.6,41.1L495.6,41.1\n' +
            '\t\t\tz M494.8,40.8h-0.2v-0.1L494.8,40.8L494.8,40.8z M494.8,41.4L494.8,41.4l-0.1-0.2h0.1V41.4z M494.6,41.3h-0.2v-0.1L494.6,41.3\n' +
            '\t\t\tL494.6,41.3z M494.3,41.3L494.3,41.3L494.3,41.3l-0.2,0.2v0.1h-0.2l-0.1-0.1l-0.1,0.1v0.1h-0.2l-0.1-0.2h-0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tl0.1-0.1h0.2v0.3h0.2l0.1-0.1l0.2-0.1v-0.1h0.1v-0.1h0.1L494.3,41.3L494.3,41.3L494.3,41.3L494.3,41.3z M498.4,43.9\n' +
            '\t\t\tc0.2,0,0-0.2,0.2-0.1v0.4h-0.2V43.9z M498.6,42.8c0.2,0.1,0-0.2,0.2-0.1v0.2h0.1V43h-0.2V42.8z M498.6,41.6L498.6,41.6L498.6,41.6\n' +
            '\t\t\tl0.2,0.1v0.2h-0.2L498.6,41.6L498.6,41.6z M498.8,43.5h-0.2v-0.2h0.1L498.8,43.5L498.8,43.5L498.8,43.5z M498.8,40.8h0.2v0.2\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1L498.8,40.8L498.8,40.8z M499.1,33.3v-0.2h0.2v0.1h0.2v0.1h-0.1v0.1H499.1z M499.2,33.5H499v-0.1L499.2,33.5\n' +
            '\t\t\tL499.2,33.5z M500.6,31.8h0.2v0.1L500.6,31.8L500.6,31.8L500.6,31.8L500.6,31.8L500.6,31.8z M500.7,33.5L500.7,33.5l0.1-0.2h0.2\n' +
            '\t\t\tv-0.1l0.1-0.1l0,0h0.1v-0.1c0.2,0.1,0.1-0.1,0.2-0.1v0.2l-0.1,0.1l0,0h-0.1v0.1H501v0.2h0.1v0.1H501v-0.1H500.7l0.1,0.2h-0.1V33.5\n' +
            '\t\t\tz M500.2,40L500.2,40l0.1,0.2h-0.1V40z M500.6,39.8L500.6,39.8L500.6,39.8L500.6,39.8L500.6,39.8z M500.7,39.8L500.7,39.8\n' +
            '\t\t\tL500.7,39.8L500.7,39.8L500.7,39.8z M500.9,37.3L500.9,37.3l0.1-0.2h0.5v0.2c-0.1,0-0.2,0-0.3,0.1v0.1h0.1v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.2-0.1h-0.1v0.1h-0.1L500.9,37.3L500.9,37.3z M502.4,39.2c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1v0.1h-0.2V39.2z M504.3,38.1\n' +
            '\t\t\tc0.2,0.1,0-0.1,0.2-0.1v0.2h-0.2V38.1z M501,47.8L501,47.8l0.1,0.2H501V47.8z M508.6,47.3h-0.2v-0.2h-0.1v0.1h-0.2v-0.1H508v0.3\n' +
            '\t\t\th-0.2v-0.3h-0.2v0.2h-0.1v-0.1h-0.1v-0.1l0.1-0.1V47h0.1v-0.3h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.2v-0.5h-0.2v-0.2h-0.1v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.2V46l0.1-0.1v-0.1h-0.5V46h-0.3v-0.1H507V46h-0.1v0.2h0.1l0.2,0.1h0.1v0.1h0.2v-0.1h0.1V46h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.1h0.1v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.3v0.2h-0.3v0.2H507v-0.1l0,0l0,0h-0.3v-0.2h0.1v-0.2h-0.2\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1v-0.1h-0.1c-0.1-0.1,0-0.2,0-0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.1v-0.1h-0.2v-0.1H506v0.1h-0.1v0.2h-0.2v-0.1\n' +
            '\t\t\th-0.2v0.5c-0.2,0-0.1-0.2-0.1-0.4h-0.1v-0.1h-0.1v0.1h-0.1v0.2h0.1l0.1,0.1h-0.2V47l-0.1,0.1V47h-0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2\n' +
            '\t\t\tH505c-0.2,0-0.1-0.2-0.1-0.2h-0.1V47c-0.2,0.1-0.4,0-0.5,0v-0.1h-0.1V47h-0.1v0.2h-0.1L504,47h-0.5v0.1l-0.1,0.1v-0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h0.1v0.2h-0.2v0.2h-0.4v-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.1h0.1v0.2h0.5V48c-0.2,0.1-0.3,0-0.5,0V48\n' +
            '\t\t\tc-0.1,0.1-0.3,0-0.4,0.1v0.1h-0.2c0-0.1,0-0.2,0-0.2h0.1l0.2,0.1h0.2v-0.4h-0.2v0.2h-0.3V48h0.1v0.2h-0.3v0.1h-0.2v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.4v-0.1c0.1-0.1,0.3,0,0.4-0.1v-0.2h0.1v-0.2h0.1l0.1,0.1h0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1h-0.4v0.2h-0.7\n' +
            '\t\t\tv0.2h-0.2v0.2h0.1V48h-0.3v-0.1h-0.1V48h-0.2V48H500v0.1h-0.2v-0.2h-0.1v-0.1h-0.2v0.1h-0.2v-0.2h0.6v-0.1h0.2v-0.2h-0.3v0.2h-0.3\n' +
            '\t\t\tv-0.2h-0.2v-0.1h-0.1v-0.1H499v0.2h-0.2c-0.2,0-0.1-0.2-0.1-0.3h-0.2V47h-0.2l0.1-0.2h0.2v-0.7h-0.1c0-0.1,0-0.2,0-0.4h0.1v-0.2\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.1h-0.1v-0.2h-0.1v-0.2h0.1v0.2h0.1v0.2h0.1v-0.1h0.1v-0.4h-0.1l-0.1-0.1h-0.1v-0.1l0.2-0.1c0-0.3,0-0.7,0-1h0.2\n' +
            '\t\t\tv-0.6h0.1v-0.3h0.1v-0.1h-0.2v0.2h-0.1v0.1h-0.1v-0.2h0.1v-0.1l0.2-0.1v-0.3h0.1v-0.7h0.1v-0.1H499v-0.2h0.1v-0.1h0.2V41h0.1l0,0\n' +
            '\t\t\tl0.1-0.1l0.1,0.1l0,0h0.1l0,0c0-0.1,0.2,0,0.2-0.1v-0.2h-0.1v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.4,0v-0.1h0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.3,0,0.5,0v-0.2h-0.1v-0.2h0.2v0.1h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2H501v-0.1h0.1l0.2,0.1h0.2v0.1h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tV40h-0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.2h-0.2v-0.2h0.1l0.1,0.1h0.2c0-0.1,0-0.2,0-0.2h0.5v0.1l-0.1,0.1l0,0l-0.1,0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1l0.1-0.1v-0.1h0.1v-0.2h-0.1V39h-0.1l-0.1-0.1h0.2v-0.2h-0.1v-0.2h0.2v0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.2h0.1v-0.1h-0.1l-0.1-0.1H503V38h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.1h0.1l0.1,0.1h0.2V38h0.1V38h0.1v0.2h0.1V38\n' +
            '\t\t\th0.1v-0.5h0.1c0,0.2,0,0.3,0,0.5h0.1v0.2h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1l0,0c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h0.1v-0.1h0.2\n' +
            '\t\t\tv0.2h-0.2V39h0.3v-0.2h0.1l0,0l0.1-0.1v-0.1c0.1-0.1,0.2,0,0.2,0c0-0.1,0-0.2,0-0.2h0.1v-0.1h0.1V38h0.2v-0.3h-0.2v-0.2h-0.2v-0.2\n' +
            '\t\t\th0.3V37h-0.2v0.2h-0.2v-0.4h-0.1v-0.1h0.2l-0.1-0.2h-0.1l0,0l-0.1,0.1v0.2h0.1V37h0.1c0.1,0.2,0.1,0.4,0,0.6h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2H504c0-0.2,0-0.3,0-0.5h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.3c0,0.2,0,0.3,0,0.5h-0.4V37\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1l-0.1-0.2h0.1v0.1h-0.1v0.2h0.1V37h-0.1V37l-0.1,0.1v0.1h-0.2v0.2h-0.2v-0.2h-0.1v0.1H502v-0.1\n' +
            '\t\t\th-0.1v0.1h-0.3v-0.1h0.1V37l0.1-0.1v-0.1h0.1v-0.1l0.1-0.1v0.1h0.2v-0.2h-0.3v0.1h-0.3v-0.1h-0.2v0.2h-0.1v0.1l-0.1,0.1V37H501\n' +
            '\t\t\tv-0.2h-0.2v0.1l-0.1,0.1l-0.1-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.3h0.1V36h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.1l0.1-0.1v0.1h0.3v-0.2h-0.1v-0.1h0.1v0.1h-0.2v-0.3h0.5v-0.1h0.1v-0.1h0.2v-0.1H501V35h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1c0-0.1,0-0.2,0-0.3h0.1v-0.1h0.1l0.1,0.1l0,0v0.1h0.2v-0.2h-0.1c0-0.2,0-0.3,0-0.5h0.1l0,0h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h0.1l0.2,0.1h0.1v-0.1h0.1V33h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.3v-0.2H501v-0.2h-0.1l-0.1-0.1c0.1-0.1,0.2,0,0.3-0.1\n' +
            '\t\t\tv-0.3H501l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.8v-0.2h0.2v-0.1h0.1V31l0.1-0.1l0,0h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1l-0.1-0.2h-0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1l-0.1-0.1h0v0.3h-0.2v0.3h-0.2v0.2h0.1v0.2h-0.2v0.2h0.2V32h-0.2v0.1h0.1v0.1h0.2\n' +
            '\t\t\tl0,0h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.2h-0.1l0,0l-0.1,0.1v-0.1h-0.1v-0.2h0.2v-0.2h-0.1l0,0h-0.1v0.2h-0.2v0.8h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h-0.1v0.1h-0.2v0.2h0.1c0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1c0.1,0.1,0,0.2,0.1,0.2h0.2v-0.4h-0.2v-0.4h0.3v0.2h0.2\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1V34l-0.1,0.1v0.6H499v-0.2h-0.2v0.2h-0.2v0.2h-0.2V35h-0.1v-0.1h-0.2v0.2h-0.2v0.2h0.3v0.4h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2v0.2h-0.1l-0.1,0.8h-0.3v0.2h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1V37H498v0.2h0.2v0.2H498v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0-0.3,0v-0.1h0.2v-0.2h-0.1V37h-0.2l0,0l-0.3,0.2v0.1h0.1v0.2h-0.2v0.2h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1v-0.1H497v0.1\n' +
            '\t\t\th-0.1V38h-0.1V38h-0.1v-0.2h-0.5V38h-0.5v0.2h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.2v0.2h-0.2\n' +
            '\t\t\tv-0.2h-0.2v0.1l-0.1,0.1v-0.1H495v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.2h-0.1v0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.2h-0.1v-0.1H494v0.1c-0.2,0.1-0.4,0-0.5,0v-0.1h-0.1v0.2h-0.2v0.1l-0.1,0.1v0.1h0.1V39\n' +
            '\t\t\th0.1l0.1,0.1h0.1l0.1,0.1c0,0.1-0.2,0-0.3,0.1v0.1h0.1v0.1h-0.1v0.9H493v0.2h0.1v0.1h0.1v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1\n' +
            '\t\t\th-0.1v0.4h0.1v0.1h0.1v0.1l-0.1,0.1v0.3h0.5v-0.1l0.1-0.1v0.2h0.1l0.1,0.1h0.1l0.1,0.1l-0.2,0.1v0.1h-0.1v0.1h0.3V42h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.2h0.3v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.2h0.2v-0.2h0.1v-0.1h0.1v-0.1h0.1v0.1h0.1v-0.1h0.2v-0.1h0.1l0.1,0.1h0.1v0.1\n' +
            '\t\t\tH496v0.2h0.2v-0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0,0v0.1h0.1l0.1,0.1h-0.1V42h-0.2v0.1h0.1l0.1,0.1h0.1l0.1,0.1h0.2v-0.1\n' +
            '\t\t\th0.1v-0.1h0.1v0.2h0.2v0.2h-0.2v-0.1h-0.1v0.2H497v0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v0.2h0.1v0.2h-0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0,0.2,0,0.2,0.1h0.1v0.1h-0.1v0.2h0.3v0.2h-0.4v-0.3h-0.2V43l-0.1,0.1v0.1h0.1c0,0.2,0.1,0.4,0,0.5h-0.1v0.1h0.2v0.2h-0.2V44\n' +
            '\t\t\tl-0.1,0.1v0.1h0.3v0.1h0.1v0.3h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.9h0.2c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.3\n' +
            '\t\t\tv-0.4h0.2v-0.2h-0.1v-0.2h0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v0.2h0.1v0.1h0.1v-0.1h0.1v0.1h0.2c0,0.1,0,0.2,0,0.2h-0.4V46h0.3v0.2\n' +
            '\t\t\th-0.3v0.2h0.3v0.3h0.1l0.1,0.1h0.1v0.1l-0.1,0.1V47h-0.1v-0.2h-0.2V47h-0.2v-0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\th0.1v0.2h-0.1V47h0.1v0.1h0.1V47h0.1v-0.1h0.1l0.1,0.2h0.1v0.1c0.2,0,0,0.2,0.1,0.3h0.2v-0.2c0.1,0,0.2,0,0.2,0v0.2h-0.4v0.1l0,0\n' +
            '\t\t\tv0.1h0.1c0.1,0.2,0.1,0.5,0,0.7c0.1,0,0.2,0,0.2,0v0.2h-0.2v0.2h-0.1v-0.1h-0.2v-0.3h-0.2v0.2h-0.2v0.2h0.1v0.1h0.1l0.1,0.1h0.1\n' +
            '\t\t\tv0.1h0.1V49h0.1V49h0.1v0.2h0.1l0.1,0.1h0.2v-0.1h0.1v0.2h0.2v-0.1h0.1l0.1,0.1h0.2V50c-0.1,0-0.2,0-0.2,0v-0.1h-0.2v0.3h0.6v0.2\n' +
            '\t\t\th-0.4v0.1h0.1v0.1h0.2l0,0l0.1-0.1l0.1,0.1h0.2v0.2h-0.2v0.2h0.3v-0.2h0.3v0.3l0,0v0.1l0,0v0.1h0.2v-0.1h0.1l0.1,0.2h0.1v0.1h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.1h0.1V51h0.1l0.1,0.1h0.1v0.2h0.2v-0.2h-0.1v-0.2h0.2v-0.2c0.1,0,0.2,0,0.2,0v0.2h0.2v0.2h-0.2v0.1h0.1v0.1h0.2v-0.2\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.2h0.1V51h0.1c0.1,0.1,0,0.2,0,0.2h0.2v-0.5h-0.2v-0.2h0.5v0.2h-0.2v0.2h0.1V51h0.1v0.1h0.8\n' +
            '\t\t\tV51h0.1l0,0h0.2v-0.2h-0.1v-0.2h0.1v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.2h0.1v-0.2h0.1v-0.1h0.1\n' +
            '\t\t\tv0.2h0.1v0.1h0.1v-0.2h0.5v0.2h0.1v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1l0.1-0.1v-0.2h-0.2v-0.2h0.4v0.3h0.2v-0.1l0.1-0.1v-0.2h0.1\n' +
            '\t\t\tv0.1h0.2V50h0.2v-0.2h0.4v-0.1h0.1v-0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.4h-0.3v-0.2h0.2V49h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.3h0.1\n' +
            '\t\t\tv0.1h0.1v0.2h-0.2v0.4h0.2V50h0.2v-0.1h0.1v-0.1h0.1v-0.1h-0.2v-0.5h0.1v-0.1l0.1-0.1l0,0h0.1v0.2h0.1v0.1h0.1V49h0.1V49l0.1-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.1h0.3v-0.1h-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2h0.2v-0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.5h0.3v-0.2h-0.7\n' +
            '\t\t\tv-0.1h-0.1v0.1h-0.2V48h0.2V48l0.1-0.1v-0.2h0.2v-0.2h0.2v0.1h0.1l0.1,0.1h0.1v-0.2h-0.1v-0.2L508.6,47.3L508.6,47.3l-0.2,0\n' +
            '\t\t\tL508.6,47.3z"/>\n' +
            '\t\t<polygon class="st4" points="499.4,41.1 499.5,41.1 499.5,41 499.5,41 499.4,41 \t\t"/>\n' +
            '\t\t<rect x="414.6" y="34.9" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="414.5,36.3 414.4,36.3 414.4,36.4 414.5,36.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="414.6,36.9 414.8,36.9 414.8,36.8 414.8,36.7 414.8,36.7 414.8,36.7 414.8,36.6 414.4,36.6 \n' +
            '\t\t\t414.4,36.7 414.5,36.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="503.3,36.7 503.1,36.7 503.1,36.8 503.3,36.8 \t\t"/>\n' +
            '\t\t<path class="st4" d="M432.3,46.8L432.3,46.8l-0.1-0.2h0.2L432.3,46.8L432.3,46.8z M432.3,47.1h-0.2v0.2h0.2v0.1l-0.1,0.1l0,0l0,0\n' +
            '\t\t\tv-0.1h-0.3v-0.2h0.1v-0.1h-0.1V47L432,47h0.4L432.3,47.1z M431.8,46h0.2v0.1h0.1v0.2h-0.2V46z M431.2,46H431v-0.2h0.2V46z\n' +
            '\t\t\t M431,46.3L431,46.3l-0.1,0.2h-0.4v-0.1h0.1v-0.1c0.1,0,0.3,0.1,0.2-0.1L431,46.3L431,46.3z M430.6,48.3h-0.2V48h0.1v0.1h0.1\n' +
            '\t\t\tC430.6,48.1,430.6,48.3,430.6,48.3z M430.6,49.4h-0.2v0.2h-0.2v0.2h-0.2v-0.1H430v-0.2h0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.5l0.1-0.1h0.2v0.2h-0.2V49h0.2c0.1,0.1-0.1,0.3,0.1,0.2h0.1V49.4z M430.3,50.1h-0.2V50h0.2V50.1z M430,49.2h-0.3V49h0.2V49\n' +
            '\t\t\th0.1v-0.2h0.2V49H430V49.2z M429.6,46.4L429.6,46.4L429.6,46.4L429.6,46.4L429.6,46.4z M430.1,47.5L430.1,47.5L430.1,47.5\n' +
            '\t\t\tL430.1,47.5L430.1,47.5z M429.6,46.2h-0.2v-0.1c-0.1,0-0.2,0-0.2,0l-0.1-0.1H429v-0.2h0.2v0.1h0.4V46h0.1L429.6,46.2L429.6,46.2z\n' +
            '\t\t\t M429.6,49L429.6,49L429.6,49L429.6,49L429.6,49z M429.4,46.6h-0.2v-0.2h0.2V46.6z M429.4,49.9L429.4,49.9L429.4,49.9l-0.2-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.2h0.1l0.1,0.1h0.1L429.4,49.9z M428.8,46.2h-0.2v-0.3h0.2V46.2z M428.5,46.1L428.5,46.1L428.5,46.1l-0.2-0.1\n' +
            '\t\t\tv-0.2h0.2V46.1z M428.4,49L428.4,49L428.4,49l-0.2,0.1v-0.2L428.4,49L428.4,49z M428.2,46.3h-0.2v-0.1L428.2,46.3L428.2,46.3z\n' +
            '\t\t\t M428.1,45.9L428.1,45.9l0.1,0.2h-0.1V45.9z M427.5,48.5L427.5,48.5L427.5,48.5l-0.2,0.1v-0.2h0.2V48.5z M427.2,43l-0.2-0.1h-0.1\n' +
            '\t\t\tV43h-0.2v-0.5h0.1v-0.1l0.2-0.1v-0.1c0.2,0.1,0-0.1,0.2-0.1v0.1h0.1v0.2l-0.1,0.1v0.1h0.1v0.1h0.2v0.2L427.2,43L427.2,43z\n' +
            '\t\t\t M426.8,41.7L426.8,41.7L426.8,41.7L426.8,41.7L426.8,41.7z M426.5,45.7h-0.2v0.1h-0.1v0.1h0.1V46h-0.2v0.2h0.1v0.1l-0.1,0.1v0\n' +
            '\t\t\th-0.2c0-0.1,0-0.2-0.1-0.2h-0.1v0.2l-0.1,0.1v0.1h-0.1l0,0l-0.1,0.1l0,0h-0.2v0.1h-0.2v-0.2h-0.1v-0.2l-0.1,0.1v0h-0.5v-0.1h-0.1\n' +
            '\t\t\tv-0.2h-0.1v0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1l0,0H424v0.1h-0.1v0.1h-0.1v-0.1h-0.2c0-0.1,0.1-0.2-0.1-0.2l-0.1,0.1l0,0h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.1v-0.1h-0.1V46l0.1-0.1v-0.1h0.1v-0.1h0.1v-0.2h0.2v-0.1l0.1-0.1v-0.1h-0.3v-0.1h-0.1v-0.1\n' +
            '\t\t\tc0.1,0,0.3,0.1,0.3-0.1v-0.1h0.1l0,0h0.1v-0.4h-0.2v0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1l-0.1-0.1h-0.1v-0.2c0.2,0,0.5,0,0.8,0v-0.1\n' +
            '\t\t\tl0.1-0.1V44h-0.1v-0.1h0.1v-0.2H424v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.1v0.1h0.2v-0.1h0.1v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.2V42h0.2\n' +
            '\t\t\tv0.1h0.2v0.2h-0.2v0.2h0.4v0.1h0.1v0.1h0.2v0.6h0.2v0.2h0.4v0.1h0.2v0.2l-0.1,0.1v0.1h-0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0.1,0.1h0.1v0.2h0.3V44H426v0.2h0.2v0.1h0.1v0.1H426v0.2h0.1v0.1h0.1v0.2h0.2v-0.2h0.2V45H426v0.3h0.5v0.2h0.1\n' +
            '\t\t\tL426.5,45.7L426.5,45.7z M424.8,48.7L424.8,48.7L424.8,48.7L424.8,48.7L424.8,48.7z M423.9,48.6L423.9,48.6L423.9,48.6L423.9,48.6\n' +
            '\t\t\tL423.9,48.6z M423.4,48.6L423.4,48.6l-0.1,0.2h-0.1v0.1H423v-0.2l0.1-0.1v-0.1l0.1-0.1h0.2V48.6z M423,45.8L423,45.8l-0.2-0.1\n' +
            '\t\t\tv-0.1l0.1-0.1h0.3v0.2h-0.1v0.1H423z M423.8,43.2L423.8,43.2l0.1,0.2h-0.1V43.2z M424,43.1L424,43.1L424,43.1L424,43.1l0.1-0.2\n' +
            '\t\t\tl0.1-0.1l-0.1-0.1H424v-0.2h0.2v0.5L424,43.1L424,43.1z M423.8,39.4h0.2l0.1,0.1h0.1v0.1h0.1v0.2l-0.1,0.1V40h-0.1v0.1h-0.1v-0.4\n' +
            '\t\t\th-0.2L423.8,39.4L423.8,39.4z M425.8,40L425.8,40L425.8,40L425.8,40L425.8,40z M422.7,45.8L422.7,45.8L422.7,45.8L422.7,45.8\n' +
            '\t\t\tL422.7,45.8z M421.8,49.3h-0.2v-0.2h0.2L421.8,49.3L421.8,49.3L421.8,49.3z M421.9,49.7h-0.2v-0.2h0.2V49.7z M421.6,49.8h-0.2\n' +
            '\t\t\tv-0.2h0.2V49.8z M421.3,45.6h-0.2v-0.2h0.2V45.6z M421.3,45.9h-0.2v-0.1L421.3,45.9L421.3,45.9z M420.2,49.5H420v-0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.2l-0.1,0.1V50h-0.1v-0.7h0.2l0.1,0.1h0.1v-0.2h0.1c0,0.1-0.1,0.2,0.1,0.2h0.1C420.2,49.4,420.2,49.5,420.2,49.5z\n' +
            '\t\t\t M420.2,47.8L420.2,47.8l-0.1-0.3h0.1V47.8z M421,46L421,46l-0.1-0.2h0.1V46z M422.5,42.9L422.5,42.9L422.5,42.9l-0.2,0.1v-0.3\n' +
            '\t\t\th0.2C422.5,42.7,422.5,42.9,422.5,42.9z M433.5,47h-0.4v-0.4H433v0.2h-0.1v-0.1h-0.2l0,0h-0.1v-0.1h-0.1v-0.1h0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.2-0.1v-0.2h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.3V46h-0.2v-0.3h-0.5v0.1l-0.1,0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2l-0.1-0.2H432v0.1H432v0.2h-0.2v0.2h0.1l0.1,0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v0.1h0.1l0.1,0.1h-0.2v-0.5h-0.5v-0.1H431v0.2\n' +
            '\t\t\tH431v0.1h-0.3v0.1l-0.1,0.1l0,0h-0.1v-0.1h-0.2v0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.2H430v-0.1c-0.5,0-0.9,0-1.3,0v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.2v-0.2h-0.2v0.1h-0.1v0.1H428v-0.1h-0.2v0.2h-0.1l-0.1-0.1h-0.2v-0.1h-0.1v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1\n' +
            '\t\t\th0.1v-0.5h0.1v-0.1l0.1-0.1v0.1h0.2v-0.3h-0.4v-0.1h-0.1v-0.1h-0.1V44h-0.1v-0.2h0.1v-0.1h-0.2v-0.2h0.2l0,0l0.1-0.1v-0.1h0.1\n' +
            '\t\t\tv-0.6h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h-0.2v-0.2h0.1v-0.7h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.1H427v0.2h-0.2v0.2h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h-0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2\n' +
            '\t\t\th0.1c0.1,0.1,0,0.2,0,0.3h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.1v-0.1h-0.1c0-0.2,0-0.3,0-0.5h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.2h-0.1l0,0h-0.2v-0.2h-0.1c0-0.2,0-0.3,0-0.5h0.1l0.2,0.1h0.1v0.1h-0.1v0.2h0.2v-0.3h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2V39H426V39h0.1v-0.1H426v-0.2h0.1v-0.1h0.1v0.1h0.2v-0.3h-0.2v-0.2h-0.4v-0.4h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.4v-0.2h-0.4l-0.1,0.1v0.1l-0.2,0.1v0.2h0.1l0.1,0.1h0.1v-0.1h0.1h0h0.2v-0.1h0.1\n' +
            '\t\t\tv0.1h0.1v0.3h-0.2v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.2h-0.2v0.1h0.1l0.1,0.1h0.1v0.1h-0.1V39h-0.1V39h-0.2v-0.2h-0.2V39h-0.2\n' +
            '\t\t\tv0.2h0.2v0.2h-0.2v0.2h-0.2v0.4h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1l0,0l-0.1,0.1v0.1h-0.2v0.2h0.1v0.2h0.1v0.1h0.1v0.2h-0.2V41h0.1\n' +
            '\t\t\tv0.1l-0.1,0.1v0.1h-0.1v0.1h0.1v0.2h-0.1l-0.1-0.1H423v-0.1h-0.2v0.2h-0.2v0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1V42h-0.1l0.1,0.1\n' +
            '\t\t\th-0.1v0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.2h-0.1v-0.1h-0.2v0.3h-0.2v0.5h0.2V43l0.1-0.1V43h0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1l0.1,0.1\n' +
            '\t\t\tl-0.1,0.1v0.2h-0.1v0.1h-0.2c0,0.2,0,0.3,0,0.5h-0.1v0.2h-0.3v0.1H422v0.2h-0.2v-0.4h0.2V44h0.2v-0.5H422v0.3h-0.5v-0.1h-0.1V44\n' +
            '\t\t\th0.2v0.2h-0.2v0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.3h0.2v-0.1h0.1v0.1h0.1c0.1,0.1,0.1,0.3,0,0.5H421v0.1h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1v0.2h-0.1l0.1,0.1h0.1V46h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v0.1l-0.2,0.1l0,0h-0.1\n' +
            '\t\t\tv0.1h-0.2v-0.3h-0.2v0.2h-0.1l0,0h-0.1v0.1h-0.2V47h0.1v0.2h-0.1v0.1h-0.2v0.2h0.1v0.1h-0.1v0.2h0.2V48h0.1v0.2h-0.1l0,0h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1l-0.1,0.1v0.1h-0.1c0,0.2,0,0.3,0,0.4h-0.2v-0.1h-0.1V49h-0.1v0.2h-0.2v0.2h-0.2v0.2h0.3v0.3h-0.2v0.4h0.2v0.5h-0.2\n' +
            '\t\t\tv0.2h0.3v-0.4h0.5c0,0.1,0,0.2,0,0.2h-0.1v0.2H420v0.2h0.1l0.2,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1v0.2h0.2v-0.1h0.1v-0.1h0.2v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.2h0.2v-0.3h-0.2v-0.2H421v-0.2h0.1V51H421v-0.1h-0.1v-0.2h0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.2V51h0.3v-0.1\n' +
            '\t\t\th0.1v0.2h0.1V51h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v-0.2h0.1v-0.1h0.1v-0.1c0.1-0.1,0.3,0,0.4-0.1v-0.2h0.2v-0.2H422v-0.7h0.2v-0.2h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.2l0.1-0.1v-0.2h-0.1l-0.1-0.1l0.1-0.1l0,0h0.1v-0.2h-0.1v-0.1h0.1V48l0.1-0.1V48h0.1v0.2h-0.1v0.2h0.1v0.1l-0.1,0.1\n' +
            '\t\t\tv0.2h0.1v0.1h0.1V49h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2V49h0.1V49l0.1-0.1v-0.2h0.2v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.4,0v0.1h0.1c0.1,0.1,0,0.2,0,0.2h0.1V49h0.2V49h0.1V49h0.2c0-0.2,0-0.3,0-0.4h0.1v0.1h0.1v0.2h0.2V49h0.2v-0.2\n' +
            '\t\t\th0.3v-0.2h-0.7v-0.2h0.1v-0.2h0.1v0.2h0.2c0-0.1,0-0.2,0-0.2h0.1v-0.1h0.1v0.1h0.2v-0.2h0.2v0.3h-0.1v0.2h0.1v0.1h0.5v0.2h0.2\n' +
            '\t\t\tv-0.5h0.1v-0.1l0.1-0.1v0.1h0.2v0.2h0.3v0.2h0.1c0.2,0,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.2V49h0.3v0.2h-0.3v0.2h0.5\n' +
            '\t\t\tv-0.2h0.2v0.4h0.1v0.1h0.1v0.1h0.1v0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1V50l-0.1,0.1v0.1h-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0,0.4h0.2v-0.2h0.2c0.2,0,0.1,0.2,0.1,0.2h0.1l0,0c0.1-0.1,0.2-0.1,0.3,0v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1l0,0\n' +
            '\t\t\tc0.1-0.1,0.3-0.1,0.4-0.1v-0.2h0.2v-0.2h-0.2v0.2c-0.2,0-0.3,0-0.5,0v-0.2h0.2v-0.1h0.1l0,0c0.1-0.1,0.2,0,0.4-0.1v-0.2h0.2v-0.2\n' +
            '\t\t\th-0.1v-0.1c0-0.1,0.2-0.1,0.3-0.1v-0.2h0.4V49h-0.2v-0.3H431v-0.2h0.1v-0.1H431l-0.1-0.1h-0.2v-0.2h0.1V48h0.1v0.1h0.3v-0.5h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1h0.1v-0.1c0.1-0.1,0.3-0.1,0.5,0v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v-0.1h0.1v-0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\th0.1v0.1h0.4v-0.1l0.1-0.1V47C433.3,47,433.5,47,433.5,47l0.1-0.5h-0.2L433.5,47z"/>\n' +
            '\t\t<path class="st4" d="M478.6,49.9L478.6,49.9L478.6,49.9L478.6,49.9l-0.2-0.1v-0.2l0,0h-0.1v-0.1h0.1v0.1l0,0l0,0l0,0h0.1v-0.1h0.2\n' +
            '\t\t\tL478.6,49.9L478.6,49.9z M478.5,50.8L478.5,50.8L478.5,50.8l-0.2-0.1v-0.1h0.2V50.8z M478.9,50.3L478.9,50.3l0.1,0.2h-0.1V50.3z\n' +
            '\t\t\t M478.1,50.5h-0.2v-0.1L478.1,50.5L478.1,50.5z M477.5,48.5L477.5,48.5l-0.1-0.2h-0.1v-0.2h0.2V48.5z M477.5,50.8L477.5,50.8\n' +
            '\t\t\tL477.5,50.8l-0.2-0.1v-0.1h0.2V50.8z M477.3,48h-0.2v-0.4h0.2V48z M477.3,50.7L477.3,50.7L477.3,50.7l-0.2-0.1v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tV50.7z M476.7,45.5h0.2v0.1L476.7,45.5L476.7,45.5z M476.5,49.4L476.5,49.4l-0.1,0.2h-0.1v-0.2L476.5,49.4L476.5,49.4z\n' +
            '\t\t\t M476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1z M476.5,43.8h0.2v0.2h-0.1V44h-0.1v-0.1h-0.1\n' +
            '\t\t\tC476.5,43.9,476.5,43.8,476.5,43.8z M476.5,42.1h0.2v0.1L476.5,42.1L476.5,42.1z M476.1,40.4L476.1,40.4L476.1,40.4L476.1,40.4\n' +
            '\t\t\tL476.1,40.4z M476,48.3h-0.2V48h0.1v0.1h0.1V48.3z M475.7,47h-0.2v-0.2h0.2V47z M475.5,44h-0.2c0-0.1,0.1-0.3-0.1-0.2h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1v0.1h0.2V44z M475.2,39.6h0.2v0.1L475.2,39.6L475.2,39.6z M475.1,40.6L475.1,40.6L475.1,40.6L475.1,40.6\n' +
            '\t\t\tL475.1,40.6z M474.2,42.8L474.2,42.8L474.2,42.8L474.2,42.8L474.2,42.8z M474.2,43.1L474.2,43.1l-0.1-0.2h0.1V43.1z M474,43.1\n' +
            '\t\t\th-0.2V43L474,43.1L474,43.1z M473.9,43.5L473.9,43.5L473.9,43.5l-0.2-0.1v-0.1h0.2V43.5z M472.9,44.2h-0.2v-0.2h0.1L472.9,44.2\n' +
            '\t\t\tL472.9,44.2L472.9,44.2z M472.2,42.7h-0.4v-0.1h-0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.2v0.2h0.1v0.1h0.1V42.7z M472.2,44.7H472v-0.2h0.2\n' +
            '\t\t\tV44.7z M471.9,42.9L471.9,42.9l-0.1,0.2h-0.1V43h-0.1v-0.1H471.9L471.9,42.9z M471.3,42.8h-0.2v-0.2h0.2V42.8z M471.1,43.5H471\n' +
            '\t\t\tv-0.2h0.1L471.1,43.5L471.1,43.5L471.1,43.5z M471,46.1h-0.4v-0.2h0.1v-0.2h0.2v0.1h-0.1v0.2c0.1,0,0.2,0,0.2,0V46.1z M469.8,45.7\n' +
            '\t\t\tL469.8,45.7l-0.1,0.2h-0.2v-0.1l0.1-0.1H469.8L469.8,45.7z M469.3,46.2h-0.2V46h0.2V46.2z M468.4,48L468.4,48L468.4,48l-0.2,0.1\n' +
            '\t\t\tV48c0.2,0.1,0-0.2,0.2-0.1V48z M468.2,45.6L468.2,45.6L468.2,45.6L468.2,45.6L468.2,45.6z M468.1,40.2L468.1,40.2L468.1,40.2\n' +
            '\t\t\tl-0.2-0.1v-0.1h-0.1V40h-0.1v-0.2h0.2v0.1h0.1V40h0.1V40.2z M468,46.2h-0.2v-0.1L468,46.2L468,46.2z M467.8,47h-0.2v-0.1L467.8,47\n' +
            '\t\t\tL467.8,47z M467.8,47.6L467.8,47.6L467.8,47.6L467.8,47.6L467.8,47.6z M467.5,46v-0.2h-0.1v-0.1h0.1v-0.3h0.2V46H467.5z M467.5,45\n' +
            '\t\t\tL467.5,45L467.5,45l0.2,0.1v0.1h-0.2V45z M467.5,39.4L467.5,39.4L467.5,39.4l0.2,0.1v0.1h-0.1v0.1h-0.1V39.4z M467.3,45.7\n' +
            '\t\t\tL467.3,45.7L467.3,45.7l-0.2,0.1c0-0.1,0.1-0.2-0.2-0.2h-0.1v0.1h-0.1v-0.1h-0.1v-0.4h0.2l0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tC467.3,45.6,467.3,45.7,467.3,45.7z M467.2,46.3H467v-0.2h0.2V46.3z M466.9,46.1L466.9,46.1l-0.1,0.2l0,0l-0.1-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tL466.9,46.1L466.9,46.1L466.9,46.1z M466.7,44.6v-0.2h0.1v-0.1h0.1v-0.5h0.1v0.1h0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1H466.7z\n' +
            '\t\t\t M466.5,43.5v-0.2h-0.3v-0.2h0.3c0.1-0.2,0-0.3,0-0.4h-0.2v-0.2h0.2v-0.2h0.2v0.1h-0.1v0.1h0.1v0.1h0.2v0.1l0,0v0.7h0.1v-0.2h0.2\n' +
            '\t\t\tv0.1h0.1v0.2h-0.1v0.2h-0.2v0.1h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.2H466.5z M466.6,44.1L466.6,44.1L466.6,44.1l-0.2,0.1v-0.1h-0.3\n' +
            '\t\t\tv-0.4c0.2,0.1,0.1-0.2,0.2-0.1v0.3h0.3V44.1z M466.5,38.7L466.5,38.7L466.5,38.7L466.5,38.7L466.5,38.7z M466.6,38h0.2v0.2h-0.1\n' +
            '\t\t\tL466.6,38L466.6,38L466.6,38z M466.9,43.1L466.9,43.1L466.9,43.1L466.9,43.1L466.9,43.1z M467,40.4L467,40.4L467,40.4L467,40.4\n' +
            '\t\t\tL467,40.4z M465.8,41h-0.2v-0.2h0.1v-0.2h0.1V41z M465.7,43.8h-0.2v-0.2h0.2V43.8z M465.5,41.7L465.5,41.7L465.5,41.7l-0.2,0.1\n' +
            '\t\t\tv-0.2h0.1v-0.2h0.1V41.7z M465.4,45h-0.2v-0.2h0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1C465.4,44.6,465.4,45,465.4,45z M465.1,44h0.2v0.2\n' +
            '\t\t\th-0.2V44z M465,41.8h-0.2v-0.2h0.1L465,41.8L465,41.8L465,41.8z M464.7,45.9l-0.2,0.1V46h-0.1v-0.1h-0.1v-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tl0.1,0.1L464.7,45.9L464.7,45.9L464.7,45.9L464.7,45.9z M464.4,46.3L464.4,46.3L464.4,46.3L464.4,46.3L464.4,46.3z M464.2,41.4\n' +
            '\t\t\tL464.2,41.4l-0.1,0.2h-0.1v-0.2H464.2L464.2,41.4z M464.1,46.6L464.1,46.6L464.1,46.6L464.1,46.6L464.1,46.6z M463.1,50.1\n' +
            '\t\t\tL463.1,50.1L463.1,50.1l-0.2,0.1l-0.2-0.1h-0.1v-0.1h-0.1v-0.2h0.1v0.1h0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1L463.1,50.1L463.1,50.1z\n' +
            '\t\t\t M462.7,43.7L462.7,43.7L462.7,43.7L462.7,43.7L462.7,43.7z M462.5,44.2h-0.2v-0.2h0.1L462.5,44.2L462.5,44.2L462.5,44.2z\n' +
            '\t\t\t M462.3,45.9h-0.2v-0.1H462v-0.2h0.2v0.2L462.3,45.9L462.3,45.9z M461.9,47.4L461.9,47.4l-0.1-0.2h0.1V47.4z M461.7,48.3\n' +
            '\t\t\tL461.7,48.3l-0.1,0.2h0.1v0.2h-0.1V49h-0.1c0-0.1,0.1-0.3-0.1-0.3v0.2h-0.2v-0.1l0.1-0.1v0.1l0.2-0.1v-0.1h0.1v-0.4h0.1\n' +
            '\t\t\tL461.7,48.3L461.7,48.3L461.7,48.3z M461.5,49.4l-0.2,0.1l0,0h-0.2v0.1h-0.1v-0.1l0.1-0.1v-0.1l0.1-0.1L461.5,49.4L461.5,49.4z\n' +
            '\t\t\t M461.3,50.1h-0.2v-0.1L461.3,50.1L461.3,50.1z M478.7,50.1h0.2v-0.2h-0.1v-0.2h-0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.1h-0.2\n' +
            '\t\t\tv0.2h-0.2v-0.2h0.2v-0.1h-0.1v-0.1h-0.2V49h-0.2c0-0.1,0-0.2,0-0.4h0.2v-0.2h-0.2v0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.3-0.1-0.5h-0.2\n' +
            '\t\t\tV48h-0.1v-0.2h0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.1V47l0.1-0.1v-0.2H477v-0.1h-0.2v-0.1h-0.1v-0.2h0.4v0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.1h0.2v-0.2h-0.1l-0.1-0.1h-0.1V46h0.1v-0.2h-0.2v-0.5h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\tc0.2-0.1,0.4,0,0.5,0V45h-0.3v0.1h-0.1V45h-0.1v-0.2h0.1v-0.2h-0.2v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.2,0v-0.2h-0.1v-0.2h0.1\n' +
            '\t\t\tc0.1,0,0.1,0.1,0.1,0.1h0.1v0.1h-0.1v0.2h0.3v-0.8h-0.4v-0.1h-0.1v-0.1h0.1v-0.2h0.1v-0.5h0.2v-0.2h0.2v-0.2H477v-0.7h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.1h-0.2v0.2h-0.1c-0.1-0.1,0-0.2,0-0.4h0.1v-0.2h0.1V41h-0.2v-0.2h0.1v-0.2h-0.2v-0.1h0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tc-0.1,0-0.2-0.1-0.1-0.1h-0.1v-0.1h-0.2v-0.1h-0.2v-0.2h0.1l0.2,0.1l0,0v-0.2h0.1v-0.2h-0.1v0.2c-0.2,0,0-0.2-0.1-0.3H476\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.1h0.1v-0.3h0.1v-0.1l0.2-0.1l0,0h0.1v-0.1h-0.4v0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v0.1l-0.1,0.1l0,0l-0.1,0.1v-0.1h-0.1v0.2h-0.1v0.2h0.1V40l-0.1,0.1v0.2h0.1v0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v0.3h0.1v0.1h-0.1v0.1h-0.1v0.2h0.1v0.1l-0.2,0.1v0.2h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv0.1h-0.1v0.2h-0.1v-0.1h-0.1V41h-0.1l0,0c-0.1,0.1-0.2,0-0.3,0v0.2H473v0.1l-0.1,0.1v0.2h-0.1l-0.1-0.1h-0.5v0.2h-0.2\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.4H472v-0.2h-0.2v0.1l-0.1,0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.2v0.2h-0.1v0.1h-0.1v0.1l-0.2,0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h-0.1v0.1H471v-0.1h-0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.4v0.1H470v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v0.2h-0.2v-0.1h-0.4v0.2h0.1v0.1h0.1l0.1,0.1h-0.1v0.3h-0.2v-0.1h-0.1c-0.1,0-0.1,0-0.1-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v0h0.2v-0.2h-0.1v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.1v0.1h-0.1V44l0,0v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.2h0.1v-0.1h0.1V43h-0.1v-0.2h0.1v-0.3h-0.1v-0.1h0.1v-0.1h0.2v-0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.2v-0.2h0.1v-0.6h-0.1v-0.2h-0.1v-0.1h0.1v-0.1h0.1c0.1,0.1,0,0.2,0,0.2h0.1v-0.1l0.1-0.1v-0.1h-0.1c-0.1-0.2,0-0.3,0-0.5h-0.1\n' +
            '\t\t\tv0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h0.1v-0.2h-0.2v-0.2h-0.1v-0.2H468v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1V39h0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1V39h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.2h-0.1v0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.3,0-0.4h-0.1v0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.1l-0.2,0.1v0.1h-0.2v-0.1h0.1v-0.1l0.2-0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1H467v-0.2h0.2V38H467V38h-0.1v-0.2h0.1v-0.2h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1l-0.1-0.1c-0.2,0,0,0.2-0.2,0.1v0.1l-0.1,0.1v0.1h-0.1v0.1l-0.1-0.3v0.2h-0.1v0.1h-0.1V38h-0.1l0,0H466v0.2h-0.1\n' +
            '\t\t\tv0.1h-0.1v0.1h0.1v0.2h-0.2v0.1h-0.1v0.1h0.1v0.1h-0.1l0,0l-0.2,0.3v0.5h-0.1v0.1h-0.1v0.3h-0.1v0.2h-0.1v0.1h0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th-0.1v0.1h-0.1v-0.1h-0.2v0.2h0.1v0.1l-0.1,0.1v0.2h0.1V41h-0.1v0h-0.2v0.1h0.1v0.2h-0.2v0.1v0.1c0,0.2,0,0.3,0,0.4\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0c0-0.1,0-0.2,0-0.2h0.1v-0.1l0.1-0.1v-0.3h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1c0,0.1,0,0.2,0,0.2h-0.2v-0.2h0.1\n' +
            '\t\t\tv-0.2h0.1v-0.2h-0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.2-0.2v-0.1\n' +
            '\t\t\tv-0.2h-0.2v-0.1h-0.1l-0.1-0.1h-0.5v0.1h-0.1v0.2H463v0.1h-0.2v0.2h-0.1v0.1l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1l-0.3,0.1v0.2h0.1v0.1\n' +
            '\t\t\th-0.1v0.2h0.1l0.1,0.1h0.1v0.1l-0.1,0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0v0.2h0.1v0.2h-0.2v0.1h0.1v0.1h0.2v0.2h-0.1v0.1h0.1v0.2h-0.1\n' +
            '\t\t\tv0.2h0.2v-0.1h0.1v-0.1l0.1-0.1c0.1,0.2,0.1,0.3,0,0.5h-0.1v0.1h-0.1v0.1h-0.1V43l-0.1,0.1v0.1h0.1v0.2h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l-0.1,0.8H462v0.4h-0.2v0.2h0.1c0.2,0,0.1,0.2,0.1,0.4h0.2v0.2h-0.5v0.2h0.2v0.2h-0.2v0.2h0.2v0.2h-0.2v0.2h0.1v0.1h-0.1\n' +
            '\t\t\tv0.1c0,0.1-0.2,0-0.2,0.1v0.2c0.1,0,0.2,0,0.2,0v0.2h-0.1l0,0l-0.1,0.1V47h0.1v0.1l-0.1,0.1v0.2h0.1v0.1h0.2v0.2h-0.2v0.1h-0.1\n' +
            '\t\t\tv0.1h0.1V48h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.8h-0.1v0.2h-0.1v0.1H461v0.2h-0.1l0.1,0.2h0.1v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.2h0.1l0.1,0.1h0.1v0.1h0.1l0.1,0.1h-0.1v0.3h0.1l0.2,0.1h-0.2v0.1h0.1l0.2,0.1h0.2v0.1h0.1v0.1h0.2v-0.1c0-0.1,0.2,0,0.2,0\n' +
            '\t\t\tv-0.2h-0.1v-0.1l0.1-0.1V51h0.2c0-0.1,0-0.2,0-0.2h0.4v-0.3h0.2v-0.5h0.1l0,0c0-0.1,0.1-0.1,0.2-0.1v-0.1h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tl-0.3,0v-0.2h0.2v-0.1h0.1v-0.1l0.1-0.1c0.1,0,0.2,0,0.2,0.1l0,0l0.1-0.7h0.3v-0.2h0.2V48h-0.1v-0.2h0.3v-0.5h-0.2v0.1l-0.1,0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.4,0v-0.1h0.1v-0.1l0.1-0.1V47h0.1v-0.1c0.2-0.1,0-0.3,0.1-0.5h0.2l0,0l0.1-0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1c0.1-0.1,0.2,0,0.3,0V46h0.1l0,0l0.1-0.1v-0.6h0.2v-0.2h0.2v-0.8h0.1v-0.1h0.1v-0.1h0.5v0.4h0.2v0.2h-0.1v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.1v0.2h0.2v0.2h-0.2v0.2h0.2v0.2h-0.1v0.2h0.1v0.1h0.1v-0.1h0.1v-0.2h0.1v0.1h0.1v0.2h-0.2v0.1l-0.1,0.1v0.3h0.1\n' +
            '\t\t\tc0,0.2,0,0.2,0,0.4h-0.1v0.2h0.1l0.1,0.1h0.1V47h-0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.3c0,0.2,0,0.3,0,0.5h-0.1v0.2h0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3\n' +
            '\t\t\tv0.1h0.1l0.1,0.1h0.3l0,0l0.1-0.1l0,0l0.1-0.1l0,0h0.1v-0.2h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.2l0,0l0.1-0.1V48h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.1l-0.1-0.1h0.1v-0.1l0.1-0.1v-0.2h0.7v-0.2h-0.2V47h-0.1V47l0.1-0.1v-0.2h-0.2v-0.2h0.3v0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1c0,0.1,0,0.2,0,0.2h0.2v-0.3h0.1c0.2,0,0.1,0.2,0.2,0.3h0.1v-0.1h0.1v-0.2h0.1v0.1h0.2v-0.2h0.2v-0.9h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1l0.1,0.2h0.1v-0.1l0.1-0.1v0.1h0.1v-0.2h0.1v-0.2h-0.2v-0.1h-0.1v-0.1l0.1-0.1V45h-0.2v-0.2\n' +
            '\t\t\th0.1l0.1,0.1h0.1V45h0.5v-0.2h-0.5v-0.2h0.7v0.1h0.1v-0.2h0.1v-0.1l0.1-0.1v0.1h0.2v-0.2h-0.2v-0.2h0.1l0,0h0.1v-0.1l0.2-0.1v-0.3\n' +
            '\t\t\th-0.1v-0.2h0.2v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1l0.1-0.1c0.1,0.1,0,0.2,0,0.4h0.1v0.1h0.1c0,0.1,0,0.2,0,0.2h0.3\n' +
            '\t\t\tv-0.2h0.2v-0.1H474v-0.2h0.2v-0.1l0.1-0.1v-0.1l0,0v0.1h0.2v-0.2h-0.2V43h0.2v0.1h0.1V43l0.1-0.1l0.1,0.1h0.2v0.2h-0.2v0.1h-0.1\n' +
            '\t\t\tl0,0l-0.1,0.1v0.3h0.2v0.2h0.1v0.1h0.1V44h0.1v-0.2h0.1l0,0l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.2v0.2h-0.1v0.2h0.1v0.1h-0.1v0.2\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v0.1c0,0.1-0.1,0-0.2,0.1l0,0h-0.1v0.1l-0.1,0.1l0,0h-0.1v0.2h0.1l0.2,0.1h0.1v0.1h-0.1v0.8h0.2v0.9\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.2h-0.3V48h0.1v0.1h0.2v0.6h0.1l0.1,0.1l-0.1,0.1V49h-0.1V49h0.1v0.1h0.1l0.2,0.1h0.1v0.1h0.1\n' +
            '\t\t\tv0.2h-0.1v0.3h0.1v0.1h0.1v-0.1h0.1v0.1h0.1v0.2h-0.2v0.2h0.6v0.1h0.1v0.1h0.2v0.3h0.1c0.2,0,0.1,0.2,0.1,0.2c0.1,0,0.2,0,0.2,0\n' +
            '\t\t\tv0.1h0.1v0.2h0.1v-0.2h0.1l0,0c0.2-0.1,0.4,0,0.6,0v0.1h0.1V51h0.1v-0.1h0.2V51h0.2v-0.3h0.2v-0.5h-0.3L478.7,50.1z"/>\n' +
            '\t\t<path class="st4" d="M468.4,40.5L468.4,40.5L468.4,40.5z"/>\n' +
            '\t\t<polygon class="st4" points="468.4,40.5 468.5,40.5 468.5,40.5 \t\t"/>\n' +
            '\t\t<path class="st4" d="M493,47.3h-0.2v-0.1h-0.3v-0.2h0.1V47h0.1V47h0.2v0.1h0.1v0.1h0.1L493,47.3L493,47.3z M492.5,46.7h0.2v0.1\n' +
            '\t\t\tL492.5,46.7L492.5,46.7z M492.3,47.1L492.3,47.1L492.3,47.1L492.3,47.1L492.3,47.1z M492,47.3h-0.2v-0.2h0.2L492,47.3L492,47.3\n' +
            '\t\t\tL492,47.3z M491.4,47h-0.2v-0.1L491.4,47L491.4,47z M491.1,47.6H491v-0.1L491.1,47.6L491.1,47.6z M491.1,48H491V48L491.1,48\n' +
            '\t\t\tL491.1,48z M491,48.2h-0.2v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H491L491,48.2z M491,48.7h0.2v0.2H491V48.7z\n' +
            '\t\t\t M491.2,49.7V50H491v-0.2C491.2,49.8,491,49.7,491.2,49.7 M491.2,49h0.2v0.1l-0.1,0.1v0.1h-0.1L491.2,49L491.2,49z M491.2,48.7\n' +
            '\t\t\tL491.2,48.7L491.2,48.7L491.2,48.7L491.2,48.7z M491.3,49.7h0.2v0.2h-0.2V49.7z M490.4,46.3h-0.2v0.1l-0.2,0.1l0,0h-0.1v-0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1l-0.1-0.1h-0.1v-0.4h0.4V46h0.1v0.1h0.2L490.4,46.3L490.4,46.3z M488.9,49.5h-0.3v-0.1h-0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1c0-0.1,0.1-0.2-0.2-0.2l0,0v-0.2h0.1v0.1h0.1c0,0.1-0.1,0.2,0.2,0.2h0.1l0.1,0.1h0.1v0.1h0.1v0.2h0.2L488.9,49.5\n' +
            '\t\t\tL488.9,49.5z M488.7,48.9L488.7,48.9L488.7,48.9L488.7,48.9L488.7,48.9z M487.9,42.1h-0.2V42h-0.1v-0.1c0.1,0,0.1-0.1,0.1-0.1h0.2\n' +
            '\t\t\tv0.1h0.1V42.1z M487.6,43.7L487.6,43.7L487.6,43.7h-0.3v-0.2h0.2L487.6,43.7L487.6,43.7L487.6,43.7z M487.5,46.4h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1H487v-0.1h-0.1v-0.1c-0.1,0-0.2,0-0.3,0v0.1h0.1v0.1h0.2v0.1l-0.1,0.1l0,0l-0.2,0.1v0.1h0.1l0.1,0.1h0.1v0.2h-0.1v-0.1\n' +
            '\t\t\th-0.2v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1v-0.1l0.1-0.1l0,0h0.1v0.1h0.2v-0.2h-0.2V46h-0.2v0.1h-0.1v0.1H486v0.2h0.2v0.1H486l-0.1-0.1\n' +
            '\t\t\th-0.1v0.2h-0.1v0.1h-0.1c0-0.1,0.1-0.3-0.2-0.2l-0.1,0.1v0h-0.2v-0.2c-0.1,0-0.2,0-0.2,0v-0.1h-0.1v0.2l-0.1,0.1l0,0h-0.2v0.2\n' +
            '\t\t\tl-0.1,0.1v0.1h-0.2v-0.1h0.1v-0.2h-0.2v-0.1h-0.1v-0.2l-0.1,0.1v0.1c-0.1,0-0.3,0-0.3,0v0.1l-0.1,0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2\n' +
            '\t\t\th-0.1l-0.1-0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1v-0.2h0.1V46h-0.1v-0.2l0.1-0.1v-0.1h0.1v0.1l0.1-0.1v-0.1h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.2c0.1,0,0.2,0,0.2-0.1v-0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1c0-0.2,0-0.3,0-0.5h-0.1v-0.2h0.4v-0.2\n' +
            '\t\t\th-0.1v-0.1h0.2v-0.1h0.1v-0.2h-0.2c0-0.1,0.1-0.3-0.1-0.3h-0.1v-0.5h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th0.2v-0.2h0.5v0.3h-0.1v0.1h0.1v0.1c0.2,0,0.3,0,0.5,0v-0.1h0.1v0.1h0.1v0.2h-0.2v-0.1l-0.1,0.1v0.1H486c0,0.2,0,0.3,0,0.4h0.2\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.1h0.2v0.4h-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1v0.1h-0.2v0.1l-0.2,0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.2h-0.1l0.1,0.1h0.1l0.1,0.1h0.1v0.2h-0.1v0.2h0.1l0.1,0.1l0.1-0.1v-0.1h0.3c0.1,0.1-0.1,0.2,0.1,0.2h0.1v0.3h0.2\n' +
            '\t\t\tL487.5,46.4z M487.1,47.8L487.1,47.8L487.1,47.8L487.1,47.8L487.1,47.8z M486.8,46.9L486.8,46.9L486.8,46.9L486.8,46.9L486.8,46.9\n' +
            '\t\t\tz M484.5,43.5L484.5,43.5L484.5,43.5l0.2,0.1v0.2h-0.2V43.5z M484.8,42.4L484.8,42.4L484.8,42.4L484.8,42.4L484.8,42.4z\n' +
            '\t\t\t M485.1,40.8h0.2c0,0.1-0.1,0.2,0.1,0.2h0.1v-0.2h0.2v0.1h0.1v0.1h0.1v0.4h-0.5v-0.2h0.1l-0.2-0.1h-0.1V41h-0.1L485.1,40.8\n' +
            '\t\t\tL485.1,40.8z M486,39.6L486,39.6L486,39.6L486,39.6L486,39.6z M486.2,39.5h0.2v0.2h-0.2V39.5z M486.4,39.2h0.2v0.1L486.4,39.2\n' +
            '\t\t\tl0.1,0.2h-0.1V39.2z M486.5,38.4L486.5,38.4l0.1,0.2h-0.1V38.4z M486.6,38.7c0.2,0.1,0-0.2,0.2-0.1V39h-0.1V39h-0.1V38.7z\n' +
            '\t\t\t M487.5,41.6c0.2,0.1,0-0.2,0.2-0.1v0.2L487.5,41.6L487.5,41.6z M483.4,48.3L483.4,48.3L483.4,48.3l-0.2,0.1v-0.2h0.1L483.4,48.3\n' +
            '\t\t\tL483.4,48.3L483.4,48.3z M483,43.3L483,43.3l-0.1-0.2h0.1V43.3z M482.9,48.7L482.9,48.7L482.9,48.7l-0.2,0.2l0,0h-0.2V49l-0.2,0.1\n' +
            '\t\t\tv0.1h-0.2V49h0.1v-0.2h-0.1v-0.2h0.1l0.1,0.1h0.1l0.1,0.1l0.1-0.1v-0.1h0.2v-0.2h0.2L482.9,48.7L482.9,48.7z M482.7,49.3h-0.2\n' +
            '\t\t\tv-0.1L482.7,49.3L482.7,49.3z M482.5,45.9v0.2h-0.1L482.5,45.9L482.5,45.9z M482.1,44.8L482.1,44.8L482.1,44.8L482.1,44.8H482\n' +
            '\t\t\tv-0.1L482.1,44.8v-0.4h0.2v0.1h0.1v0.1h-0.1v0.2H482.1z M482,49.6L482,49.6L482,49.6l-0.2,0.1v-0.2L482,49.6L482,49.6z\n' +
            '\t\t\t M481.8,49.4h0.2v0.1L481.8,49.4L481.8,49.4z M482.7,48.1L482.7,48.1L482.7,48.1L482.7,48.1L482.7,48.1z M481.7,50.9L481.7,50.9\n' +
            '\t\t\tl-0.2,0.1v-0.2L481.7,50.9L481.7,50.9L481.7,50.9z M481.7,51.4h-0.2v0.1h-0.1v-0.2l0.1-0.1h0.2V51.4z M481.2,46.7H481v-0.1\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1V46.7z M480.6,49.7h-0.2v0.3l-0.1,0.1v0.1h-0.1c0-0.1,0-0.2,0-0.2h-0.1v-0.2l0.1-0.1v-0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1l-0.1-0.1h-0.1v-0.2h0.1v-0.1l0.1-0.1h0.2v0.2l-0.1,0.1v0h0.4L480.6,49.7L480.6,49.7z M480.6,50.4h-0.2v-0.2h0.2V50.4z\n' +
            '\t\t\t M480.3,49h0.2V49L480.3,49L480.3,49z M480.5,49L480.5,49l0.1,0.2h-0.1V49z M493.6,46.6h-0.3v0.1h-0.1v-0.3h0.2l0,0h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1v0.2H493v0.2h-0.1v-0.1h-0.1l-0.1-0.2h-0.3v-0.2h0.1v-0.1h-0.1c-0.1,0-0.1,0-0.1-0.1h-0.1l-0.1-0.1c0.2-0.1,0.3,0,0.5,0v-0.5\n' +
            '\t\t\th-0.1l0,0h-0.1v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.1h-0.2v0.2h0.1v0.1h0.1v0.1h-0.1l0,0l-0.1,0.1l-0.1-0.1H492\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.2-0.3l0,0v0.1h-0.3v-0.1h-0.1v0.2h-0.1l0,0h-0.1v0.1h-0.2v0.2h-0.2v-0.2h-0.5v0.2h0.1v0.1c-0.1,0.1-0.2,0-0.3,0\n' +
            '\t\t\tv-0.2h0.1v-0.1h-0.2l0,0H490v0.1c-0.1,0.1-0.3,0-0.5,0v-0.2h-0.1l-0.1-0.1h-0.1v0.1h-0.1v0.1l-0.1,0.1l0,0h-0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.1v-0.2h0.1v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2H488v-0.1h-0.1V45h0.1v-0.2h-0.2v-0.2h0.2\n' +
            '\t\t\tv-0.2h0.2v-0.2h0.1v0.1h0.2v-0.2h-0.1c-0.1-0.1-0.1-0.2-0.1-0.3h-0.1v-0.1l0.2-0.1l0,0h0.1v-0.1h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.1v0.1l-0.1,0.1v0.2h0.1V44c0,0.1-0.2,0-0.2,0.1v-0.7h0.1v-0.2h0.2l0,0l0.1-0.1v-0.1h-0.1L488,43h-0.1v-0.1c-0.1,0-0.2,0-0.2,0\n' +
            '\t\t\tv-0.2h0.2V42h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.2v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1v-0.2h-0.1v-0.2h0.1v-0.2h-0.1v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h0.1v-0.5H487v-0.5h-0.2v0.4h-0.2c0-0.2,0-0.3,0-0.4h0.1v-0.1h0.1v-0.2h0.2v-0.2h-0.3v-0.2h0.3V39h-0.3v-0.2h-0.2v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.2v-0.1h-0.1v-0.1h-0.1c0-0.1,0-0.2,0-0.2h0.2V38h-0.1V38h-0.1V38h-0.2V38H486V38h-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.2l-0.1,0.1v0.1l-0.1,0.1v0.1c-0.1,0.1-0.2,0-0.4,0V38l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.3h-0.1v0.1l-0.1,0.1v0.1h0.2v-0.1\n' +
            '\t\t\th0.1v0.2h-0.2V39h-0.1V39h0.1v0.1h0.1l0.1,0.1c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h-0.1v0.1l-0.2,0.1v0.2c0.1,0,0.2,0,0.2,0v0.1\n' +
            '\t\t\th-0.1v0.1h-0.2V40h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1H484v0.4h-0.2c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.3v0.2h-0.3v0.2h0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th-0.1V42l-0.1,0.1v0.1h0.2v-0.1h0.2v0.2H484v0.1l-0.1,0.1v-0.1h-0.5v-0.1h-0.2v0.2h0.1v0.2h-0.1v-0.1h-0.2v0.3h0.2v-0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1l-0.2,0.1v0.1h-0.1l0,0c-0.1,0.1-0.3,0-0.4,0v0.2h0.1l0.1,0.1h-0.1v0.1h-0.1v0.1h0.1v0.1h0.1l0.1,0.1h-0.2v0.5h0.1v0.1\n' +
            '\t\t\th-0.1v0.1h-0.2v-0.2h-0.1v-0.1h-0.1v0.1l-0.2,0.1v0.2h-0.2v-0.1H482v0.1H482l0,0c0,0.1-0.1,0-0.2,0.1v0.2h0.3V45H482\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v0.2h-0.1v0.1l-0.2,0.1v0.1h0.1l0.1,0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v-0.5l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.2V45H481v0.2h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.1h0.1v0.2h-0.3l0,0h-0.2v-0.1h-0.1v0.1\n' +
            '\t\t\tH481v0.1H481l0,0l-0.1,0.1v0.3h0.1v0.1h0.4v0.2H481v-0.1h-0.1v0.2l-0.1,0.1l0,0l-0.1,0.1l0,0h-0.1v0.1h0.1v0.2h-0.2v0.1l0,0V47\n' +
            '\t\t\th0.2v-0.2h0.3V47h0.1V47H481v0.1c-0.1,0.1-0.2,0-0.3,0v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.2H481v0.1c0,0.1-0.2,0-0.2,0.1V48\n' +
            '\t\t\th0.2v0.2h-0.1v0.2h-0.1v0.2h-0.3v-0.2h-0.2v0.1h-0.1v0.1h0.1v0.1l-0.1,0.1v0.2H480v0.1h0.1V49h-0.2v0.5h-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1l-0.1,0.1v0.1H480V50h0.1v0.1h0.1v0.2h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2h0.1v0.1h0.2v0.2h0.2v0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0.1,0.5h0.1l0.2,0.1l0,0v0.1h0.1v0.2h0.4v-0.2h0.2v-0.5H482l-0.1-0.1l0.1-0.1v-0.1h0.1v-0.2h0.2v-0.4h0.3V50h-0.1\n' +
            '\t\t\tv-0.1h-0.2v0.3h-0.3v-0.1h-0.1c0-0.1,0-0.2,0-0.4h0.2v-0.2h0.2v-0.2h0.2v-0.2h0.1v0.1h0.1v0.1h0.2v-0.2h0.1v-0.1L483,49V49h-0.2\n' +
            '\t\t\tv-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h0.1l0.1,0.1h0.1l0,0h0.1c0.1,0,0.2,0.1,0.1,0.1h0.1l0.1,0.1h0.4v-0.2h-0.1v-0.1h-0.1\n' +
            '\t\t\tv0.1h-0.2v-0.2h0.6v0.2h-0.1v0.1h0.1v0.1c0.1,0,0.2,0,0.2,0V49h0.2c0-0.1,0-0.2,0-0.2h0.1v0.1h0.2v-0.2h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.3-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v0.2h-0.1v0.1h0.1v0.1h1v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.2h0.3\n' +
            '\t\t\tv-0.2H487v-0.2h-0.3v-0.2h-0.5V48h-0.2v0.2h0.1l0.1,0.1c0,0.1-0.1,0-0.2,0.1v0.2h0.2v0.2h-0.3v-0.3h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\tl0.1-0.1V48h0.1l0.1,0.1h0.2V48h0.1v-0.1l0.1-0.1v-0.2h0.1c0.1,0,0.1,0.1,0.1,0.1h0.1v0.1h0.1v0.1h0.1l0,0l0.1-0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.3,0v0.2h-0.1v0.2h0.2V48l0.1-0.1l0.2,0.1l-0.1,0.1v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1c0.1-0.1,0.2,0,0.4,0v0.1\n' +
            '\t\t\th0.1v0.1h0.1v-0.1h0.2v0.4h0.2v0.4h0.1l0.1,0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.1v-0.2h0.1\n' +
            '\t\t\tv-0.1h0.1v0.1h0.2v-0.1h0.1v0.1h0.1V50H489v0.2h0.1c0.2-0.1,0.1,0.2,0.2,0.2s0.2,0,0.2,0v0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1v0.2\n' +
            '\t\t\th-0.1v0.2h0.1l0.1,0.1h0.1v0.2h0.1v0.2h0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v-0.2h0.2v-0.2h-0.2v-0.2h0.6v0.5h0.4v-0.1h-0.2v-0.2h0.1\n' +
            '\t\t\tv0.2h0.1V51h0.1v-0.1h0.2v-0.1H491v-0.1H491v-0.1h0.2v-0.4h0.2V50h0.1v0.1h0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.2-0.1v-0.2h-0.3v-0.1h-0.2v0.2h-0.2v-0.2h0.1v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1h0.1v-0.2h0.1v-0.1l0.1-0.1v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v-0.1h0.1v-0.1H492V49h0.2v-0.2H492v0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.2h-0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1l0.1-0.1v-0.2\n' +
            '\t\t\th-0.1l-0.1-0.1H491v-0.2h0.1l0.1,0.1h0.2v-0.1h-0.1v-0.1h-0.1V48h0.1v0h-0.1v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1V48h0.2v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1h0.2v0.2h0.3v-0.2h-0.1l-0.1-0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v-0.1l0.1-0.1l0.2,0.1h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v0.1h0.1v-0.1L493,47v-0.2h0.1l0.1,0.1h0.1v-0.2h0.2v-0.1L493.6,46.6L493.6,46.6c-0.2,0-0.2,0-0.3,0v-0.2h0.2v-0.1h-0.1\n' +
            '\t\t\tL493.6,46.6z"/>\n' +
            '\t\t<polygon class="st4" points="501.1,37.4 501,37.4 501,37.5 501.1,37.5 \t\t"/>\n' +
            '\t\t<path class="st4" d="M446.2,48L446.2,48l-0.1,0.2h-0.2V48l0.1-0.1L446.2,48L446.2,48z M446.1,47.3L446.1,47.3L446.1,47.3\n' +
            '\t\t\tL446.1,47.3L446.1,47.3z M445.8,49.7L445.8,49.7l-0.1,0.2h-0.1v-0.2L445.8,49.7L445.8,49.7z M445.2,50.1L445.2,50.1L445.2,50.1\n' +
            '\t\t\tl-0.2,0.1v-0.1H445V50L445.2,50.1C445.2,50,445.2,50.1,445.2,50.1z M443.8,51.3h-0.4v-0.2h0.1v-0.2h0.2V51h-0.2v0.2h0.2\n' +
            '\t\t\tC443.8,51.1,443.8,51.3,443.8,51.3z M443.2,51.4H443v0.1h-0.5v0.1h-0.2v-0.2c0.1,0,0.3,0.1,0.3-0.1v-0.1h0.2v-0.1h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.1h0.2c0,0.1-0.1,0.3,0.1,0.3h0.1L443.2,51.4L443.2,51.4L443.2,51.4z M441.2,49.4H441v-0.2c0.2,0.1,0-0.2,0.2-0.1V49.4z\n' +
            '\t\t\t M440.9,49.6L440.9,49.6L440.9,49.6l-0.6,0.1v-0.2h0.2v0.1C440.6,49.5,440.7,49.6,440.9,49.6L440.9,49.6L440.9,49.6L440.9,49.6\n' +
            '\t\t\tL440.9,49.6L440.9,49.6z M440.8,51.8L440.8,51.8L440.8,51.8l-0.2,0.1v-0.1h-0.2v-0.1l0.1-0.1h0.2L440.8,51.8L440.8,51.8\n' +
            '\t\t\tL440.8,51.8z M439.5,49.4L439.5,49.4L439.5,49.4L439.5,49.4L439.5,49.4z M439.2,51.4L439.2,51.4L439.2,51.4L439.2,51.4L439.2,51.4\n' +
            '\t\t\tz M438.9,51.4L438.9,51.4L438.9,51.4l-0.2-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1C438.9,51.2,438.9,51.4,438.9,51.4z M438.8,50.8\n' +
            '\t\t\tL438.8,50.8h-0.2v-0.2h0.2L438.8,50.8L438.8,50.8z M438.2,50.8L438.2,50.8L438.2,50.8l-0.5,0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tl0.1,0.1h0.1v-0.1h0.2V50.8z M436.4,49.7h-0.3v-0.2h0.3V49.7z M442.5,44.9h-0.2l0,0H442.5L442.5,44.9z M442.3,47h-0.2l-0.1-0.1\n' +
            '\t\t\tH442v-0.1h0.3V47z M442,44.6L442,44.6L442,44.6l-0.2-0.1v-0.1h0.2V44.6z M441.7,47L441.7,47L441.7,47l-0.2,0.1V47h-0.1v-0.2H441\n' +
            '\t\t\tv-0.2h0.2v0.1h0.5V47z M440.9,46.6L440.9,46.6L440.9,46.6l-0.2,0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1L440.9,46.6L440.9,46.6L440.9,46.6z\n' +
            '\t\t\t M439.9,43.5c-0.1,0-0.2-0.1-0.2,0.1v0.1h-0.2v-0.2C439.8,43.5,439.6,43.3,439.9,43.5L439.9,43.5z M438.6,43.4h-0.2v0.1h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1V43.4z M437.5,45.5h-0.2v-0.1L437.5,45.5L437.5,45.5z M437.1,42.7L437.1,42.7L437.1,42.7l-0.2,0.1l-0.1-0.1\n' +
            '\t\t\tl0,0v-0.1L437.1,42.7L437.1,42.7z M436.8,42.5L436.8,42.5L436.8,42.5L436.8,42.5L436.8,42.5z M434.8,42.6h-0.3v-0.2h0.3V42.6z\n' +
            '\t\t\t M434.8,44.2h-0.2V44h0.2V44.2z M437.6,41.5L437.6,41.5L437.6,41.5L437.6,41.5L437.6,41.5z M438.8,41.1h0.2v0.2h-0.2V41.1z\n' +
            '\t\t\t M439.6,40.9h0.5v0.2h-0.4L439.6,40.9L439.6,40.9L439.6,40.9z M440,38.7L440,38.7L440,38.7L440,38.7L440,38.7z M441.5,40.4\n' +
            '\t\t\tL441.5,40.4L441.5,40.4L441.5,40.4L441.5,40.4z M441.5,38.6h0.2v0.1L441.5,38.6L441.5,38.6z M441.5,38.3h0.4v0.2h-0.4V38.3z\n' +
            '\t\t\t M442.3,40.2L442.3,40.2L442.3,40.2L442.3,40.2L442.3,40.2z M446.4,47.7c-0.2,0-0.1-0.2-0.1-0.3h-0.1v-0.2h-0.1\n' +
            '\t\t\tc-0.1-0.2,0-0.4,0-0.6h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.1v0.1h-0.2v-0.1h-0.2v0.2h-0.1v0.1h-0.1v-0.1h-0.2l0,0h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.2v-0.2h-0.1v-0.1h0.1V46h0.5v-0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1H445l0,0h-0.1v0.1c-0.1,0.1-0.3,0-0.5,0v-0.3\n' +
            '\t\t\th-0.2v-0.1H444v-0.1h-0.1v-0.1h-0.1v-0.1h0l-0.1-0.1h-0.3v-0.2h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.2h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.4v0.1h-0.1v0.1l-0.2,0.1v0.2h-0.2V45h-0.1v-0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1H442v-0.2h-0.4v-0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.2v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.2h-0.1l-0.1-0.1h-0.1l-0.1-0.1H441v-0.1H441l-0.1-0.1h-0.1l-0.1-0.2l0,0v0.1h-0.2V44\n' +
            '\t\t\th0.2v-0.1l0,0v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.2v-0.1h-0.1v-0.1H440v-0.1h-0.1v-0.1h-0.4v0.1l-0.1-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th-0.1l0,0l-0.2,0.1v0.2H439l0,0h-0.3V43h-0.2l0,0l-0.1,0.1V43h-0.1v-0.2l0,0v0.1h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.3v0.2\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.1h-0.1v-0.1h-0.1l-0.1-0.2h-0.1v-0.1h-0.3v-0.1h-0.2v-0.2c0.1,0,0.2,0,0.2,0v0.1h0.2v-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tV42l0.1-0.1v-0.1h-0.1v-0.2h0.1v-0.1h0.1l0.2,0.1l-0.1,0.1v0l0,0v0.1c0.1,0,0.2,0,0.2,0V42h0.2v-0.2h0.4v-0.1l0.1-0.1v-0.1\n' +
            '\t\t\tc-0.2-0.1-0.1-0.2-0.1-0.4h-0.2v-0.1h0.1v-0.1h0.3v0.5h0.4v-0.1h0.1v-0.1l0.1-0.1l0,0h0.1v-0.1l0.2-0.1v-0.1h-0.1v-0.2h0.1V41h0.1\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h0.2v-0.1h0.1v0.1h0.1v0.2h0.2v-0.1l0.1-0.1v-0.2h0.1v0.2h0.1v0.1h0.1v-0.1l0.1-0.1c0.1,0,0.2,0.1,0.1,0.1h0.1\n' +
            '\t\t\tv-0.1l0.1-0.1v-0.2h-0.1v-0.1c0-0.1,0.1,0,0.2-0.1v-0.1h0.1v-0.2h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.1h0.1v0.1h0.2v-0.2\n' +
            '\t\t\tH441l0.1,0.2H441v-0.2h0.8v0.1h0.1v0.1h0.5v-0.2h-0.1v-0.2h0.1v-0.1h0.1v-0.1c0.1,0,0.2,0,0.2,0v0.1h0.2v-0.1l0.1-0.1v-0.1l0,0\n' +
            '\t\t\th-0.2h-0.1l-0.1-0.1h0.2v-0.1h0.1V40l0.1-0.1V40h0.1v0.1h0.4v-0.2h0.2l0,0h0.1v-0.2h0.1v-0.1h0.1v-0.1l0.1-0.1l0,0h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.1h0.2V39h-0.1V39h-0.1v-0.1h-0.1c0-0.2,0-0.5,0-0.7H444l-0.1-0.1h-0.1V38l0,0V38h-0.1v-0.1h-0.1l-0.1-0.1h-0.2l-0.1,0.1V38\n' +
            '\t\t\th-0.2v-0.1h0.1V38h-0.1l-0.2-0.1h-0.2V38h-0.1l-0.1-0.1h-0.1l0-0.1h-0.2v0.2h-0.2V38H442v-0.2h-0.5V38h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1l0.1,0.1c-0.1,0.1-0.3,0-0.4,0.1v0.1h-0.1v-0.1H441v-0.1h-0.3v0.1l-0.1,0.1c-0.1-0.1,0-0.2,0-0.3\n' +
            '\t\t\th-0.3v0.2h-0.5v0.1c0.2,0.1,0.1,0.3,0.1,0.5h-0.2v-0.4h-0.2v0.3h-0.2V39h-0.1V39h0.1v0.1h-0.1l0,0c-0.1,0.1-0.3,0.1-0.4,0V39h0.3\n' +
            '\t\t\tv-0.4h-0.1v-0.1h-0.1v0.1H439v0.1h0.1v0.2h-0.9V39h-0.2c0,0.2,0,0.3,0,0.4H438v0.1h-0.1v-0.1l-0.3,0.1v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.1-0.1,0-0.3,0-0.4h-0.3v0.2H437v0.2h0.1v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.2h-0.2v0.2h-0.2v0.2h0.1v0.1\n' +
            '\t\t\th0.1l0.1,0.1h0.1v0.2h-0.2v0.1h-0.1l-0.2-0.1l0.1-0.1v-0.2h-0.2v0.5h0.1v0.1h-0.1l-0.1-0.1h-0.1l-0.1-0.1h-0.1v0.1l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.1c0-0.2,0-0.3,0-0.4h-0.2v0.6h-0.5v0.9h0.2v-0.2h-0.1v-0.1h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1l0.1,0.1h0.1v0.1h0.2v0.2h-0.1V42\n' +
            '\t\t\th-0.2v-0.1h-0.1V42h-0.2v-0.1h-0.1v0.3h-0.4v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v0.1h0.1v0.2h-0.2V43H434l0,0l-0.1,0.1v0.2h0.2v0.2\n' +
            '\t\t\tH434v0.1h0.1l0.1,0.1h0.2v-0.3h-0.1v-0.1l0.1-0.1v-0.3h0.1v0.1h0.1l0.2,0.1l-0.1,0.1v0.5h0.2v0.2h-0.1v0.2h-0.2v0.5l0,0l0.1,0.1\n' +
            '\t\t\th0.2v0.3h0.2v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h-0.1v-0.2h0.5v0.1h0.1l0.1,0.1h0.3v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1h0.2v0.1h0.1v0.3h-0.3v0.2h0.1v0.1h0.1v0.2h0.2v-0.2h0.1v0.1h0.5v-0.1h0.1v0.1h0.1v0.2h0.4v-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.5v-0.1h0.1v-0.2h-0.1c0-0.1,0-0.2,0-0.4h0.2v0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.6v0.3h0.2V46l0.1-0.1v-0.1h-0.1v-0.2h0.1l0.2,0.1h0.2v-0.1l0.1-0.1v0.2h-0.2v0.4h0.1v-0.1\n' +
            '\t\t\tc0.2-0.1,0.4,0,0.5,0v0.2h0.5v0.1h0.1v0.1h0.1v-0.1h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.3v0.2h0.2v-0.1h0.1l0.1,0.2h0.1V47h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v0.1h0.3v-0.1l0.1-0.1v0.1h0.1v-0.2h0.1v-0.1h0.1l0.1,0.2h0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1V47h0.3v-0.2h0.1V47h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.2h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.1l-0.2,0.1V48h0.1V48h0.2v0.2H444v0.1h-0.2v-0.2h0.1v0.6h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.4v0.2h0.2V49h-0.3v-0.2c-0.1,0-0.2,0-0.2,0v-0.1h-0.1v-0.1h-0.4v0.2h-0.2V49h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.4v0.1h-0.1v-0.1h-0.1l-0.1-0.2h-0.3v-0.1h-0.1V49h-0.1v0.3h-0.1v-0.1h-0.4V49h0.1v-0.2h-0.5V49h-0.2v-0.2h-0.1l-0.1,0.2h-0.1\n' +
            '\t\t\tV49h-0.2V49h0.1v0.1h0.2V49c0.1-0.1,0.3-0.1,0.5,0v0.1h0.1v0.1c-0.2,0.1-0.3,0-0.5,0v0.1c-0.1,0.1-0.2,0.1-0.4,0v-0.1h-0.2V49\n' +
            '\t\t\th-0.1V49h-0.1V49l-0.1,0.1l-0.1-0.1h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.5l0,0c0,0.1-0.2,0-0.2,0.1V49h-0.1c-0.2,0-0.1-0.2-0.1-0.3\n' +
            '\t\t\th-0.3v-0.2h-0.2v0.1l-0.1-0.1v-0.2h-0.1v-0.1h-0.1v0.1h-0.2V48h-0.5v-0.1h-0.1v-0.1h-0.2c0.2-0.3-0.4-0.1-0.5-0.2v-0.1h0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1v0.2h-0.1l0,0l-0.1,0.1v0.1h-0.1v0.1l-0.1-0.1l0,0h-0.2v0.8h0.1v0.1h0.1v-0.2h0.1v-0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0.1,0.5h0.4v0.2h0.2v0.2h-0.2V49h-0.1v0.1h-0.2v0.1h-0.1c0-0.1,0-0.2,0-0.2h-0.2V49l-0.1,0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v-0.1h0.1l0.1,0.1h0.1v0.1l-0.2,0.1v0.1H436v0.1h0.1v0.1l0,0v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2,0,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.2v-0.2l0,0v-0.2h-0.1v-0.1h0.2v0.4h0.1c0.2,0,0.1,0.2,0.1,0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0.1-0.1l0.1,0.1l0,0v0.1h-0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.2h-0.1v-0.1H437v0.1\n' +
            '\t\t\tl-0.1,0.1l-0.1,0.1l0,0v-0.2h-0.1v0.1l-0.1,0.1v0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2l0,0v0.1h0.1v-0.1h0.1c0.2,0,0.1,0.2,0.1,0.2\n' +
            '\t\t\tc0.1,0,0.2,0,0.2,0v0.1h0.1v0.1h0.2v-0.2h0.3v0.3h0.2v-0.3h0.1v-0.1l0.1-0.1v-0.1h0.3v0.3h-0.2v0.2h0.1c0.1-0.1,0.1,0,0.2,0.1h0.1\n' +
            '\t\t\tv0.1h0.1l0,0h0.1v0.1h0.3l0,0h0.1V52h0.1v0.1h0.1v-0.2h0.1v-0.2h0.2v0.1h0.1v0.1h0.1v-0.1h0.1l0.2,0.1h0.1v-0.1h0.1l0.2,0.1h0.1\n' +
            '\t\t\tV52h0.1v-0.1l0.1-0.1l0.1,0.1h0.1V52h0.4v-0.1h0.1l0,0l0.1-0.1v0h0.1v-0.1h0.1v0.1h0.2v-0.2h0.1v-0.1h0.1l0.1,0.2h0.2v-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2l0,0v-0.2h0.1l0.1,0.1h0.2v-0.1h0.1l0.1,0.2h0.1V52h0.1v-0.1c0-0.1,0.1,0,0.2-0.1c0-0.2,0-0.3,0-0.5h0.3\n' +
            '\t\t\tv0.1h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2c0-0.1,0-0.2,0-0.2h0v-0.1h0.2c0-0.2,0-0.3,0-0.5h0.3v-0.1h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tc0-0.1,0-0.2,0-0.4h0.5v-0.2h0.1l0.2,0.1h0.4v-0.1l0.1-0.1v0.1h0.1V50l0.1-0.1v-0.2h0.2v0.5h0.2v-0.4h0.1l0.2,0.1h0.1v-0.2h0.1\n' +
            '\t\t\tv-0.1h0.1v-0.4h-0.2v-0.2h0.1V49h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1h-0.2v0.2h-0.1v0.1H446V49h-0.2v-0.2h0.1v-0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.2-0.1v-0.1l0.1-0.1v0.4h0.1v-0.1h-0.3v-0.2h0.4V48h-0.1C446.4,47.9,446.4,47.8,446.4,47.7"/>\n' +
            '\t\t<polygon class="st4" points="414.1,37.9 414.2,37.9 414.1,37.9 414.1,38 414.1,38 \t\t"/>\n' +
            '\t\t<path class="st4" d="M414.3,37.9L414.3,37.9C414.1,37.7,414.2,37.9,414.3,37.9L414.3,37.9z"/>\n' +
            '\t\t<path class="st4" d="M459.7,49.7L459.7,49.7L459.7,49.7L459.7,49.7c-0.1,0.1-0.2,0.1-0.3,0.1v0.1h-0.2v0.2h0.1V50\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.4,0v0.1h0.1V50h0.1L459.7,49.7L459.7,49.7L459.7,49.7z"/>\n' +
            '\t\t<path class="st4" d="M457.9,48.7h-0.2v-0.1l0,0v-0.1h0.1l-0.1-0.1h-0.1v-0.1h0.1v0.1h0.2V48.7z M458,50.5h-0.3v-0.1\n' +
            '\t\t\tc0.1,0,0.3,0.1,0.2-0.1h0.1V50.5z M457.5,50.8h-0.4v-0.1L457.5,50.8L457.5,50.8z M457.2,48.8h0.2v0.1h0.1V49h-0.1V49h-0.2V48.8z\n' +
            '\t\t\t M454.9,49.2L454.9,49.2L454.9,49.2L454.9,49.2L454.9,49.2z M454.7,51.5L454.7,51.5L454.7,51.5L454.7,51.5L454.7,51.5z\n' +
            '\t\t\t M454.4,51.4L454.4,51.4L454.4,51.4L454.4,51.4L454.4,51.4z M454.3,51.6L454.3,51.6L454.3,51.6L454.3,51.6L454.3,51.6z\n' +
            '\t\t\t M451.9,49.2h-0.2V49c0.2,0.1,0-0.2,0.2-0.1V49.2z M451.7,49L451.7,49L451.7,49l-0.2,0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2h0.3\n' +
            '\t\t\tC451.7,48.8,451.7,49,451.7,49z M451.2,51.1H451v-0.4c0.2,0.1,0-0.2,0.2-0.1V51.1z M450.7,48.4h-0.2v0.3h-0.3v-0.2l0.1-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1l-0.1-0.1H450v-0.2c0.2,0.1,0.1-0.2,0.2-0.1v0.2h0.1v0.1h0.1v-0.1h0.2L450.7,48.4L450.7,48.4L450.7,48.4z\n' +
            '\t\t\t M450.4,50L450.4,50l-0.1-0.3h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1V50z M457.9,47.7h-0.2v-0.1L457.9,47.7L457.9,47.7z M457.4,45.6\n' +
            '\t\t\th-0.2v-0.1L457.4,45.6L457.4,45.6z M455.9,46.5h-0.2v-0.1h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1V46.5z M455,46.6L455,46.6\n' +
            '\t\t\tL455,46.6l-0.2,0.1l-0.1-0.1h-0.1v0.2h-0.2c-0.1-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2h0.2v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tv0.1h0.1V46.6z M453.5,43.7h-0.2v-0.2h0.2V43.7z M452.4,45.6L452.4,45.6L452.4,45.6l-0.2,0.1v-0.2h0.2V45.6z M452.3,45.9h-0.2\n' +
            '\t\t\tv-0.2h0.2V45.9z M452,45.6h-0.2v0.1h-0.1v-0.1h-0.1c0-0.1,0.1-0.3-0.1-0.2h-0.1v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1h0.1\n' +
            '\t\t\tc0,0.1-0.1,0.2,0.1,0.2h0.1V45.6z M451.4,43.2l-0.2-0.1h-0.1V43l0.1-0.1h0.2L451.4,43.2l0.2-0.1v0.1H451.4z M451.7,43.2h0.2v0.2\n' +
            '\t\t\th-0.2V43.2z M451.2,43.1H451v-0.2h0.2V43.1z M451,45.3L451,45.3L451,45.3L451,45.3L451,45.3z M450.4,44.6h-0.2v-0.2h0.2V44.6z\n' +
            '\t\t\t M450.3,42.1h-0.2V42h0.2V42.1z M449.6,44.6l-0.2,0.1v0.1h-0.3v-0.1h0.1v-0.1c0.1,0,0.2,0,0.2-0.1L449.6,44.6\n' +
            '\t\t\tC449.6,44.5,449.6,44.6,449.6,44.6z M449.2,42.8L449.2,42.8l0.1,0.2h-0.1V42.8z M449.1,44.2h-0.2v-0.2h0.2V44.2z M448.8,44.6\n' +
            '\t\t\tL448.8,44.6L448.8,44.6L448.8,44.6L448.8,44.6z M448.6,43.6L448.6,43.6L448.6,43.6l-0.2,0.1v0.1h0.1v0.2l-0.1,0.1l0,0h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.2h0.2v-0.2l0.1-0.1L448.6,43.6L448.6,43.6z M448.1,42.8L448.1,42.8l-0.1-0.2h0.1V42.8z M451.3,41.4L451.3,41.4\n' +
            '\t\t\tL451.3,41.4L451.3,41.4L451.3,41.4z M451.5,41.4L451.5,41.4L451.5,41.4L451.5,41.4L451.5,41.4z M452,41.3h0.3v0.2H452V41.3z\n' +
            '\t\t\t M454.3,40.7L454.3,40.7L454.3,40.7l0.2,0.1v0.1h-0.2V40.7z M456.8,39.2L456.8,39.2L456.8,39.2L456.8,39.2L456.8,39.2z M456.8,38\n' +
            '\t\t\th0.2V38L456.8,38L456.8,38z M457.2,39h0.2v0.2h-0.2V39z M457.5,38.8L457.5,38.8L457.5,38.8L457.5,38.8L457.5,38.8z M457.7,38.9\n' +
            '\t\t\th0.2v0.2h-0.2V38.9z M459.1,46.6c0.2,0,0.1-0.2,0.2-0.1l0.1,0.1h0.1v0.1h-0.1v0.1h-0.2L459.1,46.6z M460,47.2L460,47.2L460,47.2\n' +
            '\t\t\tl-0.2,0.1v-0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1v0.1h-0.2v-0.4c-0.1,0-0.2,0-0.2,0v-0.1h-0.1V47h-0.1V47h0.5v-0.5h-0.2l0,0\n' +
            '\t\t\tc-0.1,0.1-0.3,0.1-0.4,0v-0.1H459v-0.1h0.1v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h-0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v0.1h-0.4l0,0h-0.1v0.2h-0.1v-0.1h-0.3v-0.1H458v-0.1l0.1-0.1v-0.2h-0.2v-0.1h-0.2v0.1h-0.1V45h-0.2v0.1h-0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v0.1h-0.2l0,0l-0.1,0.1v-0.1h-0.2v-0.5H457v-0.1h-0.2v-0.1h-0.1v-0.2h-0.1v0.1c0,0.1-0.2,0-0.3,0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.1l-0.1-0.1h-0.1v0.1h-0.2v-0.2h-0.2v-0.1h-0.1l-0.1-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2\n' +
            '\t\t\tV44l-0.1,0.1v-0.2h-0.1v-0.1h-0.1V44h-0.1v0.1h-0.1c0-0.2-0.4-0.1-0.5-0.1v-0.1h-0.2v-0.1h-0.1v-0.1c-0.2,0-0.1-0.2-0.1-0.3\n' +
            '\t\t\tl-0.6-0.2v-0.1H453v-0.1H453V43h-0.5v0.1l-0.1,0c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1v-0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.4\n' +
            '\t\t\tv-0.2h-0.2v-0.3h-0.1v-0.1h0.1v-0.1h0.1V42h0.2l0,0c0.2-0.1,0.5,0,0.9,0v-0.2h0.2v-0.1h0.1v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2h-0.1v-0.1h-0.1v-0.1h0.1l0.1,0.1h0.2l0,0h0.1v0.2h-0.1v0.1h0.1v0.1h0.2\n' +
            '\t\t\tv-0.1h0.1v-0.1l0.2-0.3v-0.1h0.1v-0.1h0.2v0.1h-0.1V41H454v0.1h0.1v0.1h0.4V41h0.2v-0.3h0.4v0.1h0.1l0.1,0.1h0.2v-0.2h0.2v-0.2\n' +
            '\t\t\th0.2v-0.1h0.2v0.1h0.1v0.1h0.2c0.2,0,0.1,0.2,0.1,0.4h0.2v-0.2h0.2v-0.2h-0.2v-0.2h0.3v0.1h-0.2v0.1h0.1v0.1h0.2v-0.2h0.3v0.1\n' +
            '\t\t\th-0.1v0.2h0.2v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.2v-0.1h-0.1v-0.2c0.1,0,0.2,0,0.2,0V40h0.2v-0.2h0.2\n' +
            '\t\t\tv-1.2h-0.1c-0.1-0.1,0-0.2,0-0.3h-0.1v-0.2h-0.1V38h-0.1v-0.1h-0.2v-0.1h-0.1v-0.1H457l-0.1,0.1V38h-0.1V38l-0.2,0.1v0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.1l-0.1-0.2H456V38h-0.1l-0.1-0.1h-0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.2v0.2h-0.1V38h-0.1v-0.2h-0.1l0,0h-0.1V38\n' +
            '\t\t\th-0.1V38H455v0.1h0.1v0.1l-0.1,0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v-0.2h-0.6v-0.2H454v0.2h-0.2v0.4h-0.1v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0-0.4,0V39l-0.1,0.1l0,0l-0.2-0.1v-0.1H453l0,0l-0.1,0.1v-0.1h-0.1v-0.2h0.1v-0.1l0.1-0.1v-0.2h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v0.2h-0.2v0.1l-0.1,0.1v0.1l0,0c0,0.1,0,0.2,0,0.4h-0.1c-0.2,0-0.1-0.2-0.1-0.2H452v0.1H452v0.1h0.1v0.1H452v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2v0.1h-0.2v-0.2H451v0.2h-0.2v0.2c0.1,0,0.2,0,0.2,0v0.1h-0.5l0,0l-0.1,0.1v-0.1h-0.1v-0.2h-0.2v0.1h-0.1v0.4h0.1V40l-0.1,0.1\n' +
            '\t\t\tv0.1c-0.1,0.1-0.3,0-0.5,0V40h-0.2v0.2h-0.3v0.2h0v0.1h-0.1v0.1l-0.1,0.1v-0.2H449v-0.1h-0.1v0.2h-0.2v0.2h0.5v-0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v-0.1h0.2v0.2h-0.1v0.1h-0.1V41h-0.1v-0.1h-0.2v-0.1h-0.1v-0.1h-0.7v0.2h0.1V41h-0.1v0.1\n' +
            '\t\t\tl-0.2,0.1v0.4l0,0l0.2,0.1h0.1v0.1c-0.1,0.1-0.3,0.1-0.5,0v-0.2h0.1v-0.1h-0.1l-0.1-0.1h-0.1c0,0.1,0,0.2-0.2,0.2v1.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h0.1V43h-0.1v0.2h-0.1v0.1l0,0c0.2,0,0.1,0.2,0.2,0.3h0.2v0.7h0.2V44h0.1v0.1h0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h0.1\n' +
            '\t\t\tc0.1,0.1,0,0.2,0.1,0.3h0.1v0.1h-0.1v0.1l-0.2,0.1v0.2h0v0.1h-0.2v0.2h0.3v-0.2h0.1c0.2,0,0.1,0.1,0.1,0.2c0.1,0,0.2,0,0.2,0v0.1\n' +
            '\t\t\th0.1V45h0.2v-0.2h-0.1v-0.2h0.1v0.2c0.1-0.1,0.2,0,0.4,0l0,0h0.1l0,0l0.1-0.1v0.1h0.1v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.1v-0.2\n' +
            '\t\t\th-0.2v-0.2h0.2v0.4h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.2h0.2v-0.2h0.1v0.1h0.1v0.2h-0.1v0.1h0.1v-0.1l0.1-0.1v0.2h0.1v0.2h-0.1\n' +
            '\t\t\tv0.1h-0.2v0.2h0.1l0.1,0.1l0,0v-0.1h0.1v-0.2h0.4v0.5h0.1v0.1h0.1v0.2h0.4v-0.2h0.1c0.2,0,0.1,0.2,0.1,0.4h0.5v-0.1h0.1V46\n' +
            '\t\t\tc0.1-0.1,0.3,0,0.4-0.1v-0.2h-0.2v-0.2h0.1l0.2,0.1h0.2v0.1h0.2v0.2h-0.2v0.2h0.1v0.1h0.2v-0.4h0.3V46l0,0v0.2h0.1l0.2,0.1h-0.1\n' +
            '\t\t\tv0.1c0,0.1-0.2,0-0.2,0.1v0.1l0,0l0.2,0.1h0.1v0.1h0.4V47h0.5v-0.2h-0.1v-0.1h0.1v-0.1c0.1-0.1,0.3,0,0.4,0v-0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.8v0.1h0.1v-0.1c0-0.1,0.1,0,0.2-0.1v-0.1h0.1v-0.1h0.2v0.2h-0.1v0.2h0.1l0.1,0.1h0.1L457,47h0.1v0.1h0.1\n' +
            '\t\t\tv0.1h0.1v0.1h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.1h0.1l0.1,0.1h0.2V48l0.1-0.1l0.1,0.1h0.1V48h-0.1v0.1h-0.2V48l0,0v0.1\n' +
            '\t\t\th-0.2v0.1h0.1v0.2h-0.2v0.1h0.1v0.1h0.1l0.1,0.1h0.2v0.2h-0.1v0.1h-0.1v-0.1h-0.2v-0.1h-0.1v-0.2h-0.2v0.1H457v0.1l-0.2,0.2v0.2\n' +
            '\t\t\th-0.1V49h-0.2v-0.2h-0.2v-0.2h-0.3v0.5H456v0.1h-0.2v-0.1h-0.1v-0.1h-0.1v-0.2h-0.2V49h-0.2v0.3h-0.2v-0.2h-0.1V49h-0.1V49H455V49\n' +
            '\t\t\th-0.2v0.2h-0.1v-0.1h-0.1v-0.1h-0.2v0.1h-0.1l-0.1-0.1h-0.2v0.1h-0.2V49h-0.2v0.2h-0.2V49h-0.1V49h-0.1v0.2h0.1v0.1h-0.1v0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1V49h0.1v-0.2h-0.6V49h-0.2v0.2h-0.1l-0.1-0.1h-0.2V49h-0.1v0.2h-0.1v0.1h-0.1c-0.1-0.2,0-0.3,0-0.5H452\n' +
            '\t\t\tc-0.2,0-0.1-0.1-0.1-0.2h-0.3v-0.2h0.1v-0.1h-0.2v-0.1H451v0.1H451v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h0.2V48h-0.3v-0.2\n' +
            '\t\t\tH450v0.5h-0.1l-0.1-0.1h-0.1l-0.1-0.1h0.1v-0.3h-0.7v-0.1h0.1v-0.1h0.2v-0.4h-0.2v-0.2l0,0v0.1H449v0.1h0.1v0.2H449v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1l0.1,0.1h0.1V48h0.1V48h0.1c0.1,0.2,0,0.3,0,0.5h-0.3v0.1h-0.1v0.1h-0.1v0.1l-0.1,0v0.1h0.1V49h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\th-0.1v0.4h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v-0.2h0.4v-0.1l0.1-0.1v-0.2h0.1v0.1h0.2v-0.2h-0.1l-0.1-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.2,0.2h0.2v0.1h0.1v0.1l-0.2,0.1v0.3h0.1v-0.1h0.1v-0.2h0.1v0.2h0.1v0.2h-0.1v0.1h-0.2v-0.1h-0.3v0.1l-0.1,0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1l-0.1,0.1v0.2h0.1c0.2,0,0.1,0.2,0.1,0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.1h0.1l0.1,0.1h0.6v0.1h0.1v0.1h0.2v-0.2h-0.2v-0.1c-0.1,0-0.2,0-0.2,0v-0.2h0.2v-0.2h0.1v0.1h0.3\n' +
            '\t\t\tv-0.2h0.5v0.2h0.3v-0.1l0.1-0.1v-0.1l0.2-0.1v-0.1h0.2v0.1H453v0.2h0.1l0.1,0.1l0,0v0.1v0.2v0.1H453l-0.1-0.1h-0.7v0.2h-0.2v0.3\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3v-0.1h0.1c0-0.2,0-0.3,0-0.5h0.1l0.2,0.1h0.1l0,0h0.1v0.1h0.2v-0.1h0.3v0.1h-0.1v0.1h0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1c0.2-0.1,0.5,0,0.6,0v-0.1l0.1-0.1v0.1h0.1l0.2,0.1h-0.2v0.2h0.1v0.1h-0.1v0.1l-0.2,0.2v-0.2h-0.1v-0.1l0.1-0.1v-0.1\n' +
            '\t\t\th-0.1v0.1h-0.2v0.1h-0.5v0.2h-0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.3v-0.1h0.1v0.1l0,0v0.2h0.1v-0.1h0.6v-0.2h-0.2v-0.1\n' +
            '\t\t\tl0.2-0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1h-0.2v-0.1c0.1-0.1,0.3,0,0.5,0v0.2h-0.1v0.2H455v0.1h-0.1v0.2h0.1v0.1h0.1v-0.1h0.2\n' +
            '\t\t\tv0.1h0.1v-0.2h0.1l0.1,0.1h0.1l0,0h0.1v-0.2h0.1v0.1h0.1v0.2h0.2v-0.4h-0.7v-0.1c0.2-0.1,0.5,0,0.6,0v-0.1l0.1-0.1v-0.1h0.3v0.2\n' +
            '\t\t\th0.2v-0.1l0.1-0.1v0.1c0.1,0,0.2,0,0.2,0v0.1h-0.1l0,0h-0.2v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.2v0.2h0.2v-0.1h0.1v0.1h0.1v0.2h0.1\n' +
            '\t\t\tv-0.1l0.1-0.1v-0.1h-0.1v-0.2h0.5v-0.2h0.2v-0.2h-0.1V51h-0.1v0.1H457V51h-0.1v-0.2h0.9l0,0l0.1-0.1v-0.1l0.1-0.1l0.1,0.1h0.1\n' +
            '\t\t\tl0.1,0.2h0.2v-0.1h0.1l0.2,0.1l0,0v-0.1h0.1v-0.1h-0.1v-0.2h0.6v-0.2h-0.7v-0.2h-0.1v0.1h-0.2v-0.1h-0.1v0.1h0.1v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1h0.2v-0.1l0.1-0.1V50h0.1l0.1,0.1h0.1V50h0.2v-0.1h-0.1v-0.1H459l-0.1-0.1l0.1-0.1v-0.1h0.2v-0.2h0.2l0,0h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1l0.2,0.1h0.1v0.1h-0.1v0.1l0,0h0.2v-0.2h0.1v-0.2h-0.1l-0.1-0.1h0.2v-0.1L460,49V49h-0.1v-0.1h-0.1c0-0.1,0-0.2,0-0.4h0.1\n' +
            '\t\t\tv-0.1h0.1v-0.2h-0.1V48h0.2v-0.2H460l-0.1-0.1h-0.1v-0.2h0.1v-0.1l0.2-0.1L460,47.2L460,47.2L460,47.2z"/>\n' +
            '\t\t<path class="st4" d="M412.1,50.5H412v-0.2h0.2V50.5z M411.8,50.2L411.8,50.2l-0.1,0.2h0.1v0.2h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.1h0.1v-0.1h-0.1V50h0.2v0.2l0.1-0.1V50h0.2V50.2z M411.5,49.7L411.5,49.7L411.5,49.7L411.5,49.7\n' +
            '\t\t\tL411.5,49.7z M411.2,50.6H411v-0.1h-0.1v-0.1h0.3V50.6z M410.8,50.7h-0.2v-0.2h0.2V50.7z M410.2,50.9L410.2,50.9l-0.1,0.2H410V51\n' +
            '\t\t\th-0.1v-0.1C410.1,51,409.9,50.8,410.2,50.9L410.2,50.9L410.2,50.9L410.2,50.9z M409.6,50.6v0.2h-0.2v-0.2H409.6v-0.3h0.2\n' +
            '\t\t\tc0,0.1-0.1,0.2,0.1,0.2h0.1v0.2C409.9,50.6,409.6,50.6,409.6,50.6z M409.6,49.7h0.3v0.2l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1V49.7z M409.2,48.9h-0.4v-0.2h0.4V48.9z M407.1,51.1h-0.3V51c0.1,0,0.2,0.1,0.2-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tC407.1,50.8,407.1,51.1,407.1,51.1z M406.7,49.1L406.7,49.1l-0.1,0.2h-0.2v-0.1h-0.1v-0.1h-0.1v-0.1h0.1V49l0.1-0.1v-0.1h0.2v-0.2\n' +
            '\t\t\th0.2V49L406.7,49.1L406.7,49.1z M405.6,51.1h-0.2v-0.2h0.1v0.1h0.1V51.1z M404.7,49L404.7,49L404.7,49l-0.2,0.1V49h-0.1V49h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h0.5V49z M404.2,51.1h-0.2v-0.2H404v-0.1h0.2C404.2,50.8,404.2,51.1,404.2,51.1z M403.8,48.9v-0.2h0.2v0.2H403.8z\n' +
            '\t\t\t M403.1,48.4H403v-0.1L403.1,48.4L403.1,48.4z M402.9,50.3h-0.4v-0.1l0.1-0.1h0.2L402.9,50.3L402.9,50.3L402.9,50.3z M401.3,49.6\n' +
            '\t\t\th-0.2v-0.2h0.2V49.6z M401.1,46.2L401.1,46.2h-0.2v-0.7h0.2c0,0.1-0.1,0.3,0.1,0.3v0.1h0.1V46L401.1,46.2z M401,49.6h-0.2v-0.3\n' +
            '\t\t\th0.2V49.6z M400.5,40.4h-0.2v-0.2h0.2V40.4z M400.3,41.1h-0.2V41h0.2V41.1z M400.3,47.8L400.3,47.8l-0.1-0.2h0.1V47.8z M400,44.2\n' +
            '\t\t\th-0.2v-0.2h0.1L400,44.2L400,44.2L400,44.2z M399.7,42.5L399.7,42.5L399.7,42.5l-0.2,0.1v-0.2c0.2,0.1,0-0.1,0.2-0.1V42.5z\n' +
            '\t\t\t M399.7,46.9h-0.2v-0.2h0.2V46.9z M399.5,45.7h-0.2v-0.2h0.2V45.7z M399.3,44.6L399.3,44.6l-0.1-0.2h0.1V44.6z M402.1,42h0.2v0.1\n' +
            '\t\t\tL402.1,42L402.1,42z M402.4,39.1h0.2v0.1l-0.1,0.1v0.1h-0.1V39.1z M402.5,38.7h0.2v0.1L402.5,38.7L402.5,38.7z M402.6,39.8v-0.2\n' +
            '\t\t\th0.1L402.6,39.8L402.6,39.8z M402.7,41.6L402.7,41.6L402.7,41.6l0.1,0.3h-0.2v-0.2h-0.1v-0.2H402.7z M402.8,41.5h0.2v0.1\n' +
            '\t\t\tL402.8,41.5L402.8,41.5z M402.8,38.7h0.2v0.1l-0.1,0.1v0.1h-0.1L402.8,38.7L402.8,38.7L402.8,38.7z M403.1,41.4L403.1,41.4\n' +
            '\t\t\tl0.1,0.2h-0.1V41.4z M403.7,38.7h0.2V39h-0.2V38.7z M404.3,39.1h0.2v0.2h-0.1L404.3,39.1L404.3,39.1L404.3,39.1z M405,41.7\n' +
            '\t\t\tL405,41.7L405,41.7L405,41.7L405,41.7z M405.5,42.4L405.5,42.4l0.1,0.2h-0.1V42.4z M405.7,43.2h0.2v0.3h-0.1v-0.1h-0.1V43.2z\n' +
            '\t\t\t M406,43.7L406,43.7L406,43.7L406,43.7L406,43.7z M406.1,40.1h0.2v0.1h0.1v0.2h0.1v0.1h0.2l0.1,0.1h0.1v0.1h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2l-0.1-0.2h-0.1V40.1z M406.8,44.4L406.8,44.4L406.8,44.4L406.8,44.4L406.8,44.4z M406.8,41.8c0.2,0,0-0.2,0.2-0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1V42h-0.2v-0.1H407L406.8,41.8L406.8,41.8L406.8,41.8z M406.4,44.5L406.4,44.5L406.4,44.5L406.4,44.5L406.4,44.5z\n' +
            '\t\t\t M407.5,43.9L407.5,43.9L407.5,43.9L407.5,43.9L407.5,43.9z M412.2,50.1H412v-0.2h-0.3v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.3h-0.1v-0.1h-0.1v0.2h0.1v0.2H411v0.1H411v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.2v-0.2h0.3v0.1h0.1\n' +
            '\t\t\tv0.2h0.1v-0.1h0.1v-0.1l0.2-0.1v-0.1h-0.3v-0.1h-0.1V49l0.1-0.1v-0.2h-0.6v0.1l-0.1,0.1V49H410v0.2h0.1v0.1h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.2h-0.1V49h-0.2V49h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H409v-0.2h0.2v-0.2H409v0.2h-0.1v0.1l-0.1,0.1v-0.1h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1v-0.2h0.1v0.1l-0.1,0.1V49c-0.2,0.1-0.3,0-0.5,0v-0.5h-0.2v0.8h-0.1v0.1h-0.1v0.1h-0.1v0.2l-0.3-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h-0.2v-0.3h0.2v-0.2h-0.1v-0.1h-0.1l-0.1-0.2h-0.2v0.1c-0.2,0.1-0.4,0-0.6,0v-0.1h-0.1v0.1h-0.1v0.2h0.2V49h-0.2\n' +
            '\t\t\tv-0.2h-0.2v0.2h-0.1l-0.1-0.1h-0.1v-0.1h-0.1V49h-0.1v0.1h-0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1V49h0.2v-0.3h-0.2v0.2h-0.1\n' +
            '\t\t\tV49c-0.1,0.1-0.2,0-0.4,0v-0.2h-0.1l-0.1-0.1h0.1v-0.2h0.1l0,0h0.1v0.1h0.1v0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.6h-0.2v0.1H405v-0.2\n' +
            '\t\t\th-0.1V48h-0.1v0.1l-0.1,0.1v0.1h0.1v0.3h-0.2v-0.2h-0.1v-0.1h-0.1v-0.1H404v0.2h-0.2v-0.2h-0.1v0.1l-0.1,0.1v0.3h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1l0.2-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1H403v0.1h-0.2v-0.1h-0.2v-0.2h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1V48h-0.4v-0.2h0.2l0,0l0.1-0.1v-0.2H402v-0.1h-0.1v-0.1h-0.4v-0.1h-0.1v-0.1h-0.1V47h-0.1V47\n' +
            '\t\t\th-0.1c0-0.4,0-0.5,0-0.7h0.1v-0.1h0.1v-0.3h-0.1v-0.1h-0.1v-0.2h-0.1v-0.1H401v-0.2h0.1v-0.1h0.1v-0.2H401v-0.2h0.1v-0.2H401v-0.2\n' +
            '\t\t\th0.1v0.1h0.1v-0.1l0.2-0.1v-0.2h-0.1l-0.1-0.2h-0.1V44h0.2v-0.8h0.1V43h0.1c0.1,0.1,0,0.3,0.1,0.4h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2\n' +
            '\t\t\th-0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.1h0.1v-0.1h0.2v-0.1l0.1-0.1v0.2h0.2v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1h0.1V42\n' +
            '\t\t\th-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v-0.1l0.1-0.1v-0.2h-0.1v-0.2h0.1v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h0.1l0.1,0.1h0.2v-0.2\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0.1-0.1v0.1h0.1l0.1,0.1h0.2v0.2h-0.2v-0.1h-0.1v-0.1h-0.1v0.3h0.1v0.1h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.1v-0.1h0.1v0.1h0.1v-0.1h0.1v-0.2h0.1v0.1h0.2l0,0h0.1l0.1,0.1h0.1v0.3h-0.1v0.1h0.2v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.1c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.1v0.1h0.1v0.1h-0.1v0.1h0.1v0.1h0.2v0.2\n' +
            '\t\t\th-0.1v0.1h0.1l0.1,0.1h0.1v0.1c0,0.1-0.1,0-0.2,0.1v0.3h-0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.2h0.2v0.5h0.2v-0.1h0.1v0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.6v0.1h0.1V45h0.2v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h-0.2v0.2c0-0.1,0.2,0,0.3-0.1v-0.2h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th0.3v-0.4h0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h-0.1v-0.2h-0.1v-0.2h0.1l0.1,0.1h0.1v0.1h0.1V43h-0.1v-0.1h-0.1\n' +
            '\t\t\tc-0.1-0.1,0-0.3,0-0.5h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.3h-0.1v-0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.2,0-0.2\n' +
            '\t\t\tH407V41h-0.1v-0.3h0.1v-0.2c-0.2,0-0.1-0.2-0.1-0.3h-0.5v-0.1h-0.1V40h-0.1v-0.2h0.2v-0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2H406v0.2\n' +
            '\t\t\th-0.3v-0.1h-0.2l0,0h-0.3v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h-0.2V39h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.3H405v-0.1h-0.1\n' +
            '\t\t\tV39h0.1v-0.1h-0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2h-0.1v0.1l-0.1,0.1c-0.1-0.1,0-0.2-0.1-0.4h-0.2V39c-0.2,0-0.3,0-0.5,0v-0.3h0.1\n' +
            '\t\t\tv-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v0.2h-0.2v0.2h-0.3v-0.2h-0.1l0,0h0.2v-0.1h-0.2v-0.2h-0.3v0.2h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.5V39h-0.4v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.1l0,0h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.5H401v-0.1H401v-0.1h-0.2v0.2h0.1v0.2h-0.1v0.1h0.1v0.1h0.1v-0.1h0.1v0.1h0.1v-0.2h0.1v-0.1h0.1v-0.2h0.2v0.2\n' +
            '\t\t\th-0.1v0.1h-0.2v0.4h-0.1v0.1H401l-0.1-0.1h-0.1v-0.1h-0.2v0.2h-0.2v-0.3h-0.2v0.1h-0.1v0.4h0.1v0.1l-0.1,0.1v0.1h-0.1v0.1H400v0.1\n' +
            '\t\t\th0.1l0.2,0.1h0.1v0.2h-0.2v0.1h-0.1l-0.1-0.2h-0.1v0.2h-0.1v0.1l-0.2,0.1v0.2h-0.2v0.5h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.2h0.1V41\n' +
            '\t\t\th0.2v0.1h-0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1v-0.2h0.1c0.1,0.1,0.1,0.2,0,0.4H400v0.1h-0.1v0.2h-0.1v0.1h-0.1v0.1h-0.5v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.2h-0.2v0.1H399v0.1h0.1l0.1,0.1h0.1v0.2h-0.1v-0.1h-0.3v0.1h0.1V43h0.1l0.1,0.1H399\n' +
            '\t\t\tv0.1c0,0.1-0.1,0-0.2,0.1v0.1h0.1v0.1h0.1l0.2,0.1h0.1v-0.1h0.1v-0.2c0.1,0,0.2,0,0.2,0v0.1h0.1c0.1,0.2,0.1,0.3,0,0.5h-0.1v0.2\n' +
            '\t\t\th0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1v-0.2h0.1v-0.2h-0.2v0.2h-0.2v-0.2h-0.3v0.1h0.1c0.2,0,0.1,0.2,0.1,0.2h0.2V44H399v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.1h-0.1v0.4H399v0.2h0.1c0.1,0.1,0.1,0.3,0,0.5h-0.2v0.3h0.2v-0.1h0.1v0.2h0.1v0.1h-0.1v0.4h0.1v0.2H399v0.2h0.1\n' +
            '\t\t\tv0.3H399v0.2h0.2v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1V47h0.1v0.1h0.1v0.2h0.1V47h0.1l0.2,0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.1h0.1\n' +
            '\t\t\tv0.2h-0.2V48h0.7v0.2h-0.1v0.1h-0.2v0.2h0.1v0.1h0.1v-0.1h0.1v0.1l0,0v0.2h0.1v0.1h0.2v0.2h-0.1v0.3h-0.2v0.3h0.2v0.1h0.1v0.1h0.5\n' +
            '\t\t\tv0.1h0.1v0.1h0.1l0.1,0.2h0.4v-0.1h0.2v0.7h0.1c0.2,0,0.1,0.1,0.1,0.2h0.2v-0.1l0.2-0.1v-0.1h0.1v0.1h0.3v0.1h0.1v0.2h-0.2v0.2\n' +
            '\t\t\th0.1v0.1h0.1v-0.1c0.1-0.1,0.2,0,0.4,0v0.1h0.2v-0.1h0.1V51h-0.2v-0.2h0.1l0.2,0.1h0.1c0.2,0,0.1,0.1,0.1,0.2h0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0.1,0,0.2,0,0.3h0.4v-0.3h0.1v-0.1h0.1c0.1,0.1,0.1,0.2,0.1,0.4h0.2v-0.3h0.1v-0.1h0.1v0.1h0.2v-0.1h0.3v0.2h0.9v-0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.2,0.2h0.5v0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3v-0.8h-0.1v-0.2h0.2v-0.1h0.1v-0.1h-0.1v-0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tv0.1h0.1v0.1h-0.1v0.1h0.1v0.1h0.1c0.1,0.2,0,0.5,0,0.8h0.2v-0.1h0.1v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v0.1h0.2v-0.1\n' +
            '\t\t\th0.1l0,0h0.1v-0.2h-0.2v0.1h-0.1v-0.1h-0.1l-0.1-0.1l0.1-0.1V51h0.1v-0.2h-0.2v0.1h-0.2v-0.1h-0.1c-0.1-0.1-0.1-0.2,0-0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.3v0.1h0.1c0.1,0,0.2,0,0.1,0.1h0.1v0.1h0.1V51h0.1l0.1,0.1h0.2V51l0.1-0.1l0.2,0.1h0.2v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h0.1v-0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v0.2h0.1v0.1h0.2V51h0.1v-0.1l0.1-0.1v0.1h0.1V51h0.1\n' +
            '\t\t\tl0,0c0.1-0.1,0.2,0,0.4-0.1v-0.2h0.5v-0.2h0.2v-0.2h0.2v-0.2h-0.1C412.1,50.3,412.3,50.1,412.2,50.1"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="416.5" y="38.3" transform="matrix(0.9998 -1.919676e-02 1.919676e-02 0.9998 -0.6594 8.0054)" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M401.9,38.4c-0.1,0,0,0.2-0.2,0.1v0.2h0.2V38.4z"/>\n' +
            '\t\t<path class="st4" d="M523.7,48.8L523.7,48.8L523.7,48.8l-0.2-0.1v-0.1h0.2V48.8L523.7,48.8z M522.9,48.6h-0.2v-0.2h0.2V48.6z\n' +
            '\t\t\t M522.7,48.9L522.7,48.9L522.7,48.9l-0.2,0.1v-0.1h-0.1v-0.2h0.2V48.9L522.7,48.9z M522.1,48.4h-0.2v0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tl0.2-0.1l0,0h0.1l0.1-0.2h0.1V48.4z M519,50.1h-0.2V50c0.2,0.1,0-0.2,0.2-0.1V50.1z M517.8,48.9L517.8,48.9L517.8,48.9L517.8,48.9\n' +
            '\t\t\tL517.8,48.9z M517.6,50.5h0.2v0.3h-0.1v-0.1h-0.1V50.5L517.6,50.5z M517.5,48.1L517.5,48.1L517.5,48.1l-0.2,0.1l-0.2-0.1h-0.1v0.5\n' +
            '\t\t\th0.2v0.1h0.1v0.2h-0.1v0.1h-0.1v-0.2h-0.1l-0.1-0.1l-0.1,0.1l0,0H517v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.2l0.1-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1V48h0.1l0,0l0,0l0.1,0.1h0.1v-0.2h0.2V48h0.1V48h0.1v0.1H517.5z M517.5,50.7h-0.2v-0.1l0,0v-0.1c0.2,0.1,0-0.2,0.1-0.1v0.1\n' +
            '\t\t\th0.1V50.7L517.5,50.7z M517.2,50.5H517v-0.3h0.2V50.5z M516.5,50.5h-0.2v-0.2h0.2V50.5z M515.1,48.1L515.1,48.1L515.1,48.1\n' +
            '\t\t\tl-0.2,0.1v-0.1h-0.1V48c0.1,0.1,0-0.2,0.2-0.1L515.1,48.1L515.1,48.1L515.1,48.1L515.1,48.1z M514.8,48.3L514.8,48.3L514.8,48.3\n' +
            '\t\t\tl-0.2,0.1l-0.2-0.1h-0.1v-0.1c0.2,0.1,0.1-0.2,0.3-0.1L514.8,48.3L514.8,48.3L514.8,48.3z M513.1,49.7H513v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tL513.1,49.7z M513,48.2L513,48.2L513,48.2L513,48.2L513,48.2z M512.4,48.7h-0.2v-0.2h0.2V48.7z M512,47.2h-0.2v-0.1L512,47.2\n' +
            '\t\t\tL512,47.2z M511.3,40.8L511.3,40.8l-0.1-0.2l0,0v-0.1l0,0l0.1,0.1h0.1L511.3,40.8L511.3,40.8z M511.2,41H511v-0.1L511.2,41\n' +
            '\t\t\tL511.2,41z M511,41.3L511,41.3l-0.1,0.2h-0.1v-0.2L511,41.3L511,41.3L511,41.3L511,41.3z M511,41.5L511,41.5L511,41.5L511,41.5\n' +
            '\t\t\tL511,41.5z M510.9,48L510.9,48L510.9,48l-0.2,0.1v-0.2L510.9,48L510.9,48z M510.4,47.3L510.4,47.3l-0.1-0.2h0.1V47.3z M510.3,41.5\n' +
            '\t\t\tL510.3,41.5l-0.1,0.2h-0.1v-0.2H510.3L510.3,41.5z M510.1,46.6h-0.2v-0.1h-0.1v-0.2c0.2,0,0-0.2,0.2-0.1v0.1h0.1V46.6z\n' +
            '\t\t\t M509.7,45.1L509.7,45.1c-0.1-0.2,0-0.3-0.1-0.5h-0.1v-0.2h0.2V45.1L509.7,45.1z M511.7,42.6h0.2v0.1L511.7,42.6L511.7,42.6z\n' +
            '\t\t\t M517.2,42.1v0.3H517v-0.3H517.2z M512.1,42.3h0.2v0.1h0.1v-0.1h0.2v-0.1l0.2-0.1l-0.1-0.1h-0.1v-0.2h0.2V42h0.2v0.2h0.2V42\n' +
            '\t\t\tl0.2-0.1l-0.2-0.1H513v-0.1H513v-0.1h-0.1v-0.2h0.2v0.2l0.1-0.1v0.2h0.1v-0.1h-0.1v-0.2h0.2v0.1h0.1v-0.2h0.2v0.2h0.2v-0.2h0.2\n' +
            '\t\t\tl0.1,0.1l0.1-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.2v0.1h-0.1l-0.1-0.1h-0.1v-0.2h0.1v-0.1h0.1v-0.1h0.4v0.2c-0.1,0-0.2-0.1-0.2,0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.4V41h0.2v-0.1c0.1,0,0.2,0,0.3,0v-0.1l0.1-0.1v-0.1l0.1-0.1h0.2v0.2h-0.1v0.1h0.1v0.1h0.5v-0.2h0.2v0.2h0.2v0.2\n' +
            '\t\t\th0.5v-0.2h0.5v0.2h0.1V41h0.5l0,0h-0.1v0.1h-0.8v0.2h-0.2v0.5h-0.3v-0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv0.4h0.2v0.1h0.1v0.1h0.1v0.2h0.3v0.2h-0.2v0.1h0.2v0.2h0.1v-0.1h0.2l0.1,0.2h0.1v0.1h-0.1v0.1h-0.2v-0.1h-0.1l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H516l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.8v0.2h0.1v-0.1h0.2v0.2h-0.1\n' +
            '\t\t\tv0.1H515v-0.1h-0.1v-0.1l-0.1,0.1v0.1h-0.1v0.1h-0.5v-0.1h-0.1v-0.1h-0.8v-0.3h-0.3v0.5h-0.4l-0.2-0.1h-0.1v0.1h-0.2l-0.1-0.1\n' +
            '\t\t\th-0.1v0.1H512v-0.2h-0.1v0.1h-0.1L512.1,42.3L512.1,42.3L512.1,42.3z M514.9,38.7L514.9,38.7L514.9,38.7L514.9,38.7L514.9,38.7z\n' +
            '\t\t\t M515.4,38.8h0.2v0.3h-0.2V38.8z M515.7,39h0.5v-0.2h-0.2v-0.2h0.5v0.2l-0.1,0.1l0.1,0.1h0.1c0,0.1,0,0.2,0.1,0.1h0.1v0.2h-0.1\n' +
            '\t\t\tl0,0h-0.2l-0.1-0.1h-0.1v0.2h-0.1v0.1h-0.2v-0.2h-0.2v-0.1h-0.1C515.8,39.1,515.8,39,515.7,39L515.7,39L515.7,39L515.7,39z\n' +
            '\t\t\t M517.8,40.4L517.8,40.4l0.1,0.2h-0.1V40.4z M518.2,41.4L518.2,41.4l0.1-0.2h-0.1v-0.1h0.2l0.1,0.3h0.1v0.1h-0.1v0.1l-0.2,0.1v0.1\n' +
            '\t\t\tH518v-0.1h0.1v-0.1L518.2,41.4L518.2,41.4z M518.2,39.7h0.2v0.2h-0.2V39.7z M518.4,43.2h-0.3l-0.1-0.1h-0.1V43h0.1v-0.2h0.1v0.1\n' +
            '\t\t\th0.1V43h0.2L518.4,43.2L518.4,43.2z M518.1,43.5h-0.5v-0.2h0.5V43.5z M516.6,43.3h-0.2v-0.2h0.2V43.3z M516.1,43.9h-0.2v-0.2h0.2\n' +
            '\t\t\tV43.9z M515.4,42.8L515.4,42.8l-0.1-0.2h0.1V42.8z M515.4,44.2L515.4,44.2L515.4,44.2l-0.2,0.1v-0.1h-0.1v-0.1L515.4,44.2\n' +
            '\t\t\tL515.4,44.2z M513.8,44.4l-0.2,0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1H513.8L513.8,44.4z M513.3,44.4L513.3,44.4L513.3,44.4L513.3,44.4\n' +
            '\t\t\tL513.3,44.4z M518.4,42.4h0.2v0.2h-0.2L518.4,42.4L518.4,42.4L518.4,42.4z M518.7,42.1h0.2v0.2h-0.2V42.1z M518.9,42.3h0.2v0.2\n' +
            '\t\t\th-0.1L518.9,42.3L518.9,42.3L518.9,42.3z M518.9,41.6h0.2v0.1L518.9,41.6L518.9,41.6z M519.1,42.1c0.2,0.1,0.2-0.1,0.2-0.1v0.2\n' +
            '\t\t\th-0.1v0.1h-0.2V42.1z M525.3,49.2V49h-0.1v-0.1h-0.1V49l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1H525v-0.2h-0.1v-0.1h-0.5v0.1h-0.1V49h-0.1\n' +
            '\t\t\tV49h-0.2v-0.1H524c0-0.1,0-0.2,0-0.4h0.2v-0.1h0.1v-0.1h0.3v0.1l0,0v0.1h-0.1v0.2h0.3v0.2h0.3v-0.2H525v-0.1h-0.1v-0.1h0.1v-0.3\n' +
            '\t\t\th-0.7v-0.1h-0.2V48h-0.1v-0.1l0,0c0,0.2,0,0.3-0.1,0.5h-0.2v-0.1h-0.2v0.1h-0.1v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v0.1h-0.1\n' +
            '\t\t\tv0.2h-0.3v-0.1h-0.1v-0.2h-0.1v-0.1h-0.2V48h-0.4v0.1H522v0.1H522v0.3h-0.1v0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2V48h-0.1V48\n' +
            '\t\t\th-0.1v0.2h-0.1l-0.1-0.1h-0.2v0.1H521v0.2h0.1v0.2H521v0.2h0.1l0.2,0.1h-0.1v0.1L521,49V49h0.1v0.1h0.1c0,0.1,0,0.2,0,0.3H521v0.1\n' +
            '\t\t\tH521c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.7h-0.1v-0.1l0.2-0.1v-0.3h-0.2V48h-0.1V48h-0.2V48h-0.1v-0.2h-0.1v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0.1-0.4,0.1v-0.2h-0.2V48h-0.5v0.2h-0.1v0.1h-0.1v-0.1h-0.3v0.2h0.1v0.1h-0.2v-0.2h-0.2v0.2h-0.2V48h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.7v-0.1l0,0l-0.1-0.1h-0.4v0.2h-0.6v-0.1h-0.1v-0.1h-0.9v-0.2h-0.2v0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.4v0.4h-0.1l-0.1-0.1h-0.1v-0.2H514l-0.1-0.1h-0.4v-0.2h0.3v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1l-0.1-0.1h-0.1l-0.1-0.1H513l-0.1-0.1h-0.1c-0.1-0.2-0.4,0-0.5-0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tH512v-0.1H512v-0.2h0.1v-0.3H512v-0.2h-0.1v-0.1h-0.1v-0.2h0.2v-0.3h0.2V45h0.2v-0.3h0.1l0.2,0.1h0.1v-0.1h0.2v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.2,0v-0.1l-0.3-0.5c0.2,0,0.1,0.2,0.1,0.4h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.1v-0.2h0.2v0.2h-0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.3v0l0.1-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v-0.2h0.1v-0.2h0.2v-0.1l0.2-0.1V44h0.1v-0.1l0.1-0.1V44h0.2\n' +
            '\t\t\tv0.4h-0.2v0.3h0.2v-0.2h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.9v-0.1l0.1-0.1v-0.1h0.1V44h0.1v-0.1l0.2-0.1v-0.3h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v-0.1h0.1v-0.2c0.2,0,0.4,0,0.5,0v0.5h0.5v-0.2h0.4v0.2h0.2v-0.2h0.1V44h0.1l0.1,0.2h0.1\n' +
            '\t\t\tc0-0.2,0-0.3,0-0.5h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.5h-0.2v0.1h-0.1v-0.1h-0.1v-0.1h0.2v-0.2h0.1l0.1,0.1h0.2l0,0l0.1-0.1v0.1\n' +
            '\t\t\th0.2l0,0l0.1-0.1v-0.1h0.1V43h0.1v0.1h0.2v-0.2h0.1v0.1h0.1l0.1,0.1h-0.1v0.2h0.2v-0.6h-0.1v-0.2l0,0v-0.1h-0.1v-0.2h0.2V42h-0.2\n' +
            '\t\t\tv-0.1h-0.2V42h-0.1v-0.2h0.2v-0.1l0.1-0.1v0.1h0.3v-0.2h-0.2v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.2l0,0\n' +
            '\t\t\tv-0.1h-0.1v-0.1h0.1l0.1,0.1h0.2v-0.1h0.1l0.2,0.1h0.1v-0.1h-0.1V41h-0.2v-0.1h-0.1v-0.2h-0.2v-0.6h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H519l-0.1-0.1h-0.2v0.2h0.2v0.4h-0.1l-0.1-0.1h0.2v0.1l-0.1,0.1v-0.1h-0.1c0-0.2,0-0.3,0-0.4h-0.2\n' +
            '\t\t\tv-0.5h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v0.1h-0.1v0.2h0.1v0.1h0.2v0.2h-0.1v0.1l-0.1,0.1v-0.1h-0.3V40h-0.1v-0.1h-0.1v-0.2h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.2-0.1-0.2h-0.2v-0.2h0.1V39h-0.3v-0.2h-0.5V39l-0.1,0.1v-0.2h-0.1l-0.1-0.1h-0.1V39h-0.3v-0.1H516v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1v0.1h-0.1v-0.1h-0.1v0.2h-0.1v0.1c-0.1,0.1-0.3,0-0.5,0v-0.1h0.1V39H515V39l-0.1,0.1v-0.5h-0.1v0.1h-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.1v-0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v0.2h-0.1v-0.1H514v0.2h-0.7v0.3h-0.2v-0.1H513v0.1H513\n' +
            '\t\t\tl-0.1,0.2h-0.1l-0.1-0.1h-0.1v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.3,0v0.2H512v0.2h-0.2v0.1l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tv0.2h0.2v-0.2l0.1-0.1v-0.1h0.1V40h0.1v-0.1h0.1v-0.3h0.3v0.2H512v0.2h0.2v0.2H512v0.2h0.1v0.1h0.1v0.1h-0.1v0.1H512v-0.1h-0.2\n' +
            '\t\t\tv0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.1h-0.1v-0.1h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.1H511v0.1l-0.2,0.1v0.6h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v-0.1h-0.2v0.1l-0.1,0.1l-0.1-0.1h-0.3v0.1l-0.1,0.1V42h0.1v0.2h-0.1v0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.1h-0.1v0.1h0.1\n' +
            '\t\t\tv0.1l-0.1,0.1v-0.4c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h-0.2v0.2h0.1c0.1,0,0.2,0,0.1,0.1h0.1v0.1h-0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.3,0v0.5h-0.1v0.3h0.1v-0.1h0.2v0.2h-0.1l0,0\n' +
            '\t\t\th-0.2v0.1h-0.1v0.5h0.1l0.1,0.2h0.1v-0.2h0.1V45h0.1l0.1,0.1h0.1l0.1,0.1h0.1l0.1,0.1h-0.1v0.1l-0.2,0.1l0,0h-0.1v0.4h-0.1v0.2\n' +
            '\t\t\th0.2v0.2h-0.3v0.6h0.6v0.1h0.2V47h-0.1v0.2h0.1v0.1h0.1l0.1,0.1c0.1,0,0.2,0,0.2,0v0.5h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.2h-0.2v0.1h-0.1v0.2h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1V48h0.1V48h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.4v0.1h0.1v0.1h0.1c0.1,0.1,0,0.3,0,0.4h0.4V49h0.1V49h0.1v0.1h0.1v0.1h-0.1v0.2h0.3v-0.2h0.2V49h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.3v-0.3H512v0.2H512v0.1l-0.1,0.1v-0.2h-0.1v-0.1h-0.1v-0.2h0.2v0.3h0.1v0.1h0.2v-0.1l0.1-0.1l0.1,0.1\n' +
            '\t\t\th0.1v0.1h-0.1v0.1l-0.1,0.1V49h0.2v0.1h0.1c0,0.2,0.4,0,0.5,0.1v0.2H513v0.1H513v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.2v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.2h0.1v-0.1h0.1l0.1,0.2h0.1v0.1h0.1V50l0.1-0.1c0.2,0,0.1,0.2,0.2,0.2h0.1v-0.1l0.1-0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.1c0.1-0.1,0.2,0,0.3,0v0.1h0.2v-0.1h0.1v-0.1h-0.1v-0.2h0.3v0.2h0.2v0.2h0.1v0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.2h-0.2v0.2h0.5v-0.4h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.1v0.1h0.1V50h0.1v0.2h-0.4v0.3h0.2v-0.1l0.1-0.1\n' +
            '\t\t\tv0.1h0.1v0.2h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.3v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1V50h-0.1v0.1h-0.6\n' +
            '\t\t\tv-0.2h0.1v-0.2h-0.2v-0.2h0.1c0.1,0,0.1,0.1,0.1,0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.1h0.2v0.2h0.4V50h-0.1v0.2h0.1l0.1,0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1v-0.1h0.2v0.2h0.4v-0.1l0.1-0.1v-0.1h0.2v-0.4h-0.1v-0.2h-0.2v-0.1H518v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h0.1c0.1,0,0.2,0,0.2,0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1l0.1,0.1h0.4v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.5v-0.1l0.1-0.1v-0.1h-0.1v-0.2h-0.1v0.2h-0.1v0.1h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h0.2V49h0.1l0.1,0.1h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.2h0.1V49h0.1V49h0.1c0.1,0.1,0.1,0.3,0,0.5h-0.1v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1l0.1,0.2h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.4v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h0.1v-0.1l0.1-0.1v0.1h0.3v-0.2h0.3v-0.2h0.2\n' +
            '\t\t\tV49h0.1l0.2,0.1h0.1v-0.2h0.1v-0.1h0.1l0,0l0.1-0.1v-0.2h0.2v0.9h0.1v-0.1h-0.2l0.1-0.2h0.1v0.1h0.1v-0.1h0.2v0.2H523v0.1h0.1v0.1\n' +
            '\t\t\th0.2v0.1h0.1l0.1,0.2h0.1v0.1h0.1v-0.1h0.1v0.1h0.1V50h0.1v0.1h0.1v0.2h0.1v-0.2h0.1V50c0.1-0.1,0.3-0.1,0.5,0v0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h-0.1v-0.2h0.2v-0.1h0.1v-0.1h-0.5v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v0.2h0.2v-0.1h0.1v-0.1h0\n' +
            '\t\t\tC525.1,49.4,525.2,49.3,525.3,49.2L525.3,49.2L525.3,49.2z"/>\n' +
            '\t\t<rect x="404.2" y="38.7" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<polygon class="st4" points="451.9,39 451.7,39 451.7,39 451.7,39 451.7,39.1 451.9,39.1 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="468" y="39.1" transform="matrix(0.9985 -5.451013e-02 5.451013e-02 0.9985 -1.441 25.5715)" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="475.7" y="39.4" transform="matrix(0.9996 -2.841070e-02 2.841070e-02 0.9996 -0.9305 13.5326)" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<rect x="435.6" y="40" class="st4" width="0.2" height="0.3"/>\n' +
            '\t\t<polygon class="st4" points="443.2,40.7 443.5,40.7 443.5,40.5 443.4,40.5 443.4,40.4 443.3,40.4 443.3,40.4 443.2,40.4 \n' +
            '\t\t\t443.1,40.6 443.1,40.6 443.1,40.6 443.1,40.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="442.6,40.8 442.7,40.8 442.7,40.8 442.7,40.7 442.7,40.6 442.7,40.6 442.7,40.6 442.5,40.6 \n' +
            '\t\t\t442.5,40.7 442.6,40.7 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="455.8,40.5 455.7,40.5 455.7,40.7 455.6,40.7 455.6,40.8 455.8,40.8 455.8,40.6 455.8,40.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="499.3,41.2 499.3,41.1 499.2,41.1 499.2,41.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="403.7,41.9 403.9,41.9 403.9,41.6 403.7,41.6 \t\t"/>\n' +
            '\t\t<rect x="514.6" y="42.2" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="520.3,42.3 520.3,42.2 520.3,42.2 520.3,42.3 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="466.9,43.6 467,43.5 467,43.5 466.8,43.5 466.8,43.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="509.4,43.9 509.5,43.9 509.5,43.9 509.6,43.8 509.6,43.7 509.5,43.7 509.5,43.6 509.3,43.6 \n' +
            '\t\t\t509.3,43.8 509.3,43.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="473.2,44.2 473.2,44.2 473.2,44.4 473.4,44.4 473.4,44.2 473.4,44.2 473.4,44.2 473.4,44.2 \n' +
            '\t\t\t473.4,44.1 473.5,44 473.5,44.2 473.7,44.2 473.7,43.9 473.3,43.9 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="519,44 519.1,44 519.1,43.9 519.2,43.9 519.2,43.8 519,43.8 \t\t"/>\n' +
            '\t\t<path class="st4" d="M421,44.6L421,44.6L421,44.6c-0.2-0.1-0.1,0.1-0.2,0v0.2h0.2V44.6z"/>\n' +
            '\t\t<polygon class="st4" points="466.9,44.3 466.8,44.3 466.8,44.4 466.9,44.4 \t\t"/>\n' +
            '\t\t<rect x="516.1" y="44.3" class="st4" width="0.7" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M435.3,44.8h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.1v-0.2h-0.1L435.3,44.8L435.3,44.8L435.3,44.8z"\n' +
            '\t\t\t/>\n' +
            '\t\t<polygon class="st4" points="476.9,44.9 477,44.9 477,44.9 477.1,44.8 477.1,44.7 477,44.7 477,44.6 476.8,44.6 476.8,44.8 \n' +
            '\t\t\t476.9,44.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="449.4,45.1 449.5,45.1 449.5,44.9 449.3,44.9 449.3,45 449.4,45 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="457.1,45.1 457.2,45.1 457.2,45.1 457.2,45 457.2,44.9 457.1,44.9 \t\t"/>\n' +
            '\t\t<path class="st4" d="M450,45.2c-0.2-0.1-0.1,0.2-0.2,0.1v0.1h0.1l0.1,0.2h0.4v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.2H450V45.2z"/>\n' +
            '\t\t<path class="st4" d="M458.2,45.6h0.2v-0.2h-0.1v-0.1c-0.2,0,0,0.2-0.2,0.1L458.2,45.6L458.2,45.6L458.2,45.6z"/>\n' +
            '\t\t<polygon class="st4" points="493.6,45.9 493.7,45.9 493.7,45.8 493.6,45.8 493.6,45.7 493.4,45.7 493.3,45.8 493.3,45.9 \n' +
            '\t\t\t493.2,45.9 493.2,45.9 493.1,45.9 493.1,46.1 493.1,46.1 493.2,46.2 493.5,46.3 493.5,46.2 493.6,46.1 493.6,46.2 493.7,46.2 \n' +
            '\t\t\t493.7,46.3 493.6,46.3 493.6,46.3 493.4,46.4 493.4,46.5 493.7,46.5 493.7,46.6 493.8,46.6 493.8,46.5 493.9,46.5 493.9,46 \n' +
            '\t\t\t493.6,46 \t\t"/>\n' +
            '\t\t<path class="st4" d="M453.1,46.2H453v0.5h0.2v-0.2h0.2v-0.2h-0.1C453,46.3,453.2,46.3,453.1,46.2"/>\n' +
            '\t\t<rect x="489.9" y="46.1" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="433.1,46.7 433.2,46.8 433.4,46.8 433.4,46.6 433.2,46.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="497.2,46.6 497.2,46.5 497.1,46.5 497.1,46.7 497.2,46.7 497.2,46.6 \t\t"/>\n' +
            '\t\t<rect x="494" y="46.6" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="455.8,47.1 455.2,47.1 455.2,47.3 455.7,47.3 \t\t"/>\n' +
            '\t\t<path class="st4" d="M456.2,47.2L456.2,47.2c-0.2-0.2-0.1,0.2-0.3,0v0.1h-0.1v0.2h0.2v-0.1l0.1-0.1v-0.2L456.2,47.2L456.2,47.2z"\n' +
            '\t\t\t/>\n' +
            '\t\t<path class="st4" d="M403,48h0.2v-0.3h-0.3v-0.2h-0.4l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.2v-0.2\n' +
            '\t\t\th0.1C403,47.7,403,47.9,403,48"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="413.3" y="47.4" transform="matrix(0.9989 -4.763005e-02 4.763005e-02 0.9989 -1.7914 19.7401)" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<polygon class="st4" points="513.9,47.2 513.9,47.3 514.4,47.3 514.4,47.3 514.3,47.3 514.3,47.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="520.6,47.8 520.6,47.8 520.6,48 520.6,48 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="399.8,48.3 399.9,48.3 399.9,48.3 400,48.3 400,48.2 399.8,48.2 \t\t"/>\n' +
            '\t\t<rect x="405.4" y="48.3" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="405.8,48.5 406,48.5 406,48.3 405.8,48.3 \t\t"/>\n' +
            '\t\t<path class="st4" d="M407.7,48.4L407.7,48.4L407.7,48.4l-0.2-0.2c-0.1,0,0,0.2-0.2,0.1v0.2h0.1v0.1h0.1v-0.2H407.7z"/>\n' +
            '\t\t<rect x="507.9" y="48" class="st4" width="0.2" height="0.1"/>\n' +
            '\t\t<rect x="411.2" y="48.4" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="448.9,48.3 448.8,48.3 448.8,48.6 448.9,48.6 \t\t"/>\n' +
            '\t\t<rect x="408.2" y="48.6" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<rect x="452.3" y="48.7" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="423.7,49.2 423.8,49.2 423.8,49 423.7,49 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="407.4" y="49.3" transform="matrix(4.819785e-02 -0.9988 0.9988 4.819785e-02 338.5583 453.9283)" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<path class="st4" d="M507.6,49.2v0.2h-0.1L507.6,49.2l-0.4,0.1v0.3h0.2v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.1h0.1V49h-0.2C507.8,49.1,507.7,49.2,507.6,49.2"/>\n' +
            '\t\t<path class="st4" d="M449.6,49.7c-0.1-0.1,0,0.2-0.2,0.1v0.2h0.2V49.7z"/>\n' +
            '\t\t<polygon class="st4" points="522.3,49.7 522.3,49.8 522.4,49.8 522.4,49.9 522.5,49.9 522.5,49.8 522.6,49.8 522.6,49.9 \n' +
            '\t\t\t522.7,49.9 522.7,49.7 522.4,49.7 \t\t"/>\n' +
            '\t\t<rect x="427.9" y="50.1" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M458.9,50.1c-0.2-0.1,0,0.2-0.2,0.1v0.1h0.2L458.9,50.1L458.9,50.1L458.9,50.1z"/>\n' +
            '\t\t<rect x="459.3" y="50.1" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M522.6,50.1L522.6,50.1L522.6,50.1L522.6,50.1V50h-0.1L522.6,50.1h-0.2v0.1l-0.1,0.1v-0.2h-0.2v0.5h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.2v-0.2h0.3v-0.2h-0.3V50.1z"/>\n' +
            '\t\t<polygon class="st4" points="522.9,50 522.7,50 522.7,50.1 523,50.1 523,50.1 522.9,50.1 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="415.4,50.8 415.5,50.8 415.5,50.4 415.4,50.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="517.9,50.3 517.9,50.3 517.9,50.2 517.9,50.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="415.8,50.5 415.8,50.5 415.8,50.8 415.8,50.8 415.8,50.6 415.8,50.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="444.8,50.6 444.8,50.6 444.7,50.5 444.4,50.5 444.4,50.6 444.5,50.6 444.5,50.7 444.6,50.7 \n' +
            '\t\t\t444.6,50.8 444.7,50.8 444.7,50.9 444.8,50.9 444.8,50.8 444.8,50.8 444.8,50.8 444.8,50.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="521.8,50.5 521.8,50.5 521.7,50.4 521.6,50.4 521.6,50.4 521.5,50.5 521.5,50.6 521.6,50.6 \n' +
            '\t\t\t521.6,50.7 522,50.7 522,50.4 521.8,50.4 \t\t"/>\n' +
            '\t\t<path class="st4" d="M518.6,50.6L518.6,50.6L518.6,50.6l-0.2-0.1v-0.1c-0.1,0-0.1,0.2-0.2,0.1v0.3h0.2v-0.1h0.2v0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv0.2h0.1V51h0.1v-0.2h0.2V51h-0.1v0.1h0.2v-0.2h0.2v-0.1h0.1v-0.2L518.6,50.6L518.6,50.6z"/>\n' +
            '\t\t<path class="st4" d="M523.2,50.4c-0.2-0.1,0,0.2-0.2,0.1v0.1h0.1v0.1h0.2L523.2,50.4L523.2,50.4L523.2,50.4z"/>\n' +
            '\t\t<polygon class="st4" points="402.6,51 402.7,51 402.7,50.9 402.6,50.9 \t\t"/>\n' +
            '\t\t<path class="st4" d="M429.1,51c-0.1,0,0,0.2-0.2,0.1v0.2h0.1v0.1h0.2L429.1,51L429.1,51L429.1,51z"/>\n' +
            '\t\t<polygon class="st4" points="429.2,51.1 429.3,51.1 429.3,51.2 429.4,51.2 429.4,51 429.2,51 \t\t"/>\n' +
            '\t\t<path class="st4" d="M429.7,51.1V51h-0.2v0.3h-0.2v0.2l0,0c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.2v-0.3H429.7z"/>\n' +
            '\t\t<path class="st4" d="M444.4,51.1L444.4,51.1L444.4,51.1L444.4,51.1h0.2v-0.1C444.4,51,444.5,51.2,444.4,51.1"/>\n' +
            '\t\t<polygon class="st4" points="457.5,51.2 457.5,51.3 457.8,51.3 457.8,51.1 457.6,51.1 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="405.1" y="51.5" transform="matrix(1 -9.909103e-03 9.909103e-03 1 -0.4907 4.0194)" class="st4" width="0.5" height="0.2"/>\n' +
            '\t\t<rect x="406.4" y="51.4" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="406.6,51.5 406.8,51.5 406.8,51.4 406.6,51.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="480.6,51.4 480.8,51.4 480.8,51.2 480.6,51.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="452.9,51.6 452.9,51.6 452.9,51.7 452.7,51.7 452.7,51.8 452.8,51.8 452.8,51.8 453,51.7 453,51.4 \n' +
            '\t\t\t452.9,51.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="453.1,51.6 453.1,51.6 453.1,51.4 453.1,51.4 \t\t"/>\n' +
            '\t\t<rect x="453" y="51.8" class="st4" width="0.1" height="0.1"/>\n' +
            '\t</g>\n' +
            '</g>\n' +
            '</svg>\n';

    }

    getShortbookSvgImage = (palete_colour,dominant_colour) => {
        return '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<!-- Generator: Adobe Illustrator 23.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n' +
            '<svg version="1.1" width="558" height="680" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '\t viewBox="0 0 558 680" style="enable-background:new 0 0 558 680;" xml:space="preserve">\n' +
            '<style type="text/css">\n' +
            '\t.st0{fill:'+palete_colour+';}\n' +
            '\t.st1{fill:'+dominant_colour+';}\n' +
            '\t.st2{enable-background:new    ;}\n' +
            '\t.st3{fill:#061922;}\n' +
            '\t.st4{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}\n' +
            '</style>\n' +
            '<g id="Notebook">\n' +
            '\t<g id="Lower_Border_Curve">\n' +
            '\t\t<path class="st0" d="M64.7,95H0V85h64.7c14.9,0,32.9-7.4,51.9-15.3C140,60,166.5,49,194,49h364v10H194.1\n' +
            '\t\t\tc-26,0-51.7,10.7-74.3,20.1C99.9,87.3,81.2,95,64.7,95z"/>\n' +
            '\t</g>\n' +
            '\t<path id="Upper_Curve" class="st1" d="M558,54H194.1C145,54,99.2,90,64.7,90H0V0h558V54z"/>\n' +
            '\t<g id="Lower__Border_Curve">\n' +
            '\t\t<path class="st0" d="M363.9,631H0v-10h363.9c26,0,51.7-10.7,74.3-20.1c19.8-8.2,38.4-15.9,55.1-15.9H558v10h-64.7\n' +
            '\t\t\tc-14.9,0-32.9,7.4-51.9,15.3C418,620,391.5,631,363.9,631z"/>\n' +
            '\t</g>\n' +
            '\t<path id="Lower_Curve" class="st1" d="M0,626h363.9c49.1,0,94.9-36,129.4-36H558v90H0V626z"/>\n' +
            '</g>\n' +
            '<g class="st2">\n' +
            '\t<g>\n' +
            '\t\t<rect x="391.1" y="27" class="st3" width="141.8" height="31.9"/>\n' +
            '\t\t<path class="st4" d="M417.4,33.9h-0.2v-0.2h0.2V33.9z M417.2,32.5h-0.2v-0.1L417.2,32.5L417.2,32.5z M416.9,35.4v0.2h-0.1\n' +
            '\t\t\tL416.9,35.4L416.9,35.4z M416.5,36.3h-0.2v-0.1L416.5,36.3L416.5,36.3z M416.2,37.7h-0.2v-0.2h0.2V37.7z M416.2,39.8h-0.3v-0.1\n' +
            '\t\t\tl0.1-0.1h0.2C416.2,39.7,416.2,39.8,416.2,39.8z M416,41L416,41l-0.1,0.2h-0.2v-0.1h-0.1v0.1h-0.2v-0.2h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tc0.1,0,0.2,0,0.2-0.1h0.1C415.9,40.7,415.9,40.8,416,41L416,41L416,41z M415.9,42.9L415.9,42.9L415.9,42.9l0.1,0.2l-0.1,0.1v0.1\n' +
            '\t\t\th-0.2v-0.1h-0.1v-0.1l0.1-0.1L415.9,42.9L415.9,42.9z M415.8,43.9L415.8,43.9L415.8,43.9l-0.2,0.1v-0.1h-0.1v-0.2h0.1v-0.2h0.1\n' +
            '\t\t\tv0.1h0.1V43.9z M415.5,31.3v-0.2h0.2v0.2H415.5z M415.7,31.8c0.2,0,0.1-0.2,0.2-0.1v0.2l-0.1,0.1V32h-0.2L415.7,31.8L415.7,31.8\n' +
            '\t\t\tL415.7,31.8z M415.9,39.4c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1l0,0L415.9,39.4L415.9,39.4z M415.4,41.1h-0.2V41h0.2V41.1z\n' +
            '\t\t\t M415.4,43.6h-0.2v-0.2h0.2V43.6z M415.5,46.5v0.2h-0.3v-0.2H415.5z M415.4,44.9L415.4,44.9l0.2-0.1v0.1h0.1v0.1h-0.1V45h-0.1v0.2\n' +
            '\t\t\th-0.2V44.9z M415.2,47.6L415.2,47.6L415.2,47.6l0.1,0.2h-0.1v0.1H415v-0.1h-0.1l-0.1-0.2h-0.1v0.2h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.1,0.2-0.1v0.1h0.2v-0.1h0.1v0.2h0.1L415.2,47.6L415.2,47.6z M415,48.4v-0.2h0.1L415,48.4L415,48.4z M415.1,49.3\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1v0.2h0.2v0.3h-0.2V50h0.1v0.1h-0.1v0.1h-0.1v-0.1h-0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.1h0.1v-0.2h0.1V49.3z M415.1,48.9c0.2,0.1,0-0.2,0.2-0.1V49h-0.2V48.9z M414.8,50.8h-0.3v-0.2h0.2v-0.2l0,0h0.1\n' +
            '\t\t\th0.1V50.8z M414.6,51.1h-0.2v-0.2h0.2V51.1z M414.4,50.3L414.4,50.3l-0.1-0.2h-0.1v0.1h-0.1v0.2h-0.1c0-0.1,0-0.2-0.1-0.1h-0.1\n' +
            '\t\t\tv0.2h-0.2v-0.8h0.2l0.1,0.1h0.1v0.1h0.1v0.1h0.2V50l0,0v0.1h0.1L414.4,50.3h0.2v0.2h-0.2C414.4,50.4,414.5,50.2,414.4,50.3\n' +
            '\t\t\t M413.7,48.9h0.2V49h-0.2V48.9z M413.9,44.6L413.9,44.6L413.9,44.6l-0.1-0.2c0.2,0.1,0-0.1,0.2-0.1l0.1,0.1h0.1v0.2H413.9z\n' +
            '\t\t\t M413.7,44.1L413.7,44.1L413.7,44.1L413.7,44.1l-0.2,0.1v-0.2h0.1v-0.2h-0.1v-0.1l0,0v-0.1l0.1-0.1h0.2v0.1h0.1v0.1h0.1v0.2\n' +
            '\t\t\tl-0.1,0.1L413.7,44.1L413.7,44.1z M414.1,48.9L414.1,48.9l0.1,0.2h-0.1V48.9z M414.1,41.8h0.2V42h-0.2V41.8z M414.4,38.6\n' +
            '\t\t\tL414.4,38.6l0.1-0.2l0.1-0.1h0.2v0.2h-0.1v0.2h-0.2v-0.1h-0.1V38.6z M414.4,37.4v-0.2h0.2v0.2H414.4z M414.8,46.7v0.2h-0.2v-0.2\n' +
            '\t\t\tH414.8z M414.9,46.7c0.2,0.1,0-0.2,0.2-0.1v0.2h0.1V47H415V47h-0.1V46.7z M415.1,33.6L415.1,33.6L415.1,33.6L415.1,33.6\n' +
            '\t\t\tL415.1,33.6z M415.4,48.9h0.2V49h-0.2V48.9z M413.6,45.8L413.6,45.8L413.6,45.8l-0.2,0.1v-0.2h0.1L413.6,45.8L413.6,45.8\n' +
            '\t\t\tL413.6,45.8z M415.4,31.1L415.4,31.1L415.4,31.1L415.4,31.1v0.3h0.1l0.2,0.1h0.1v0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.2v0.5h0.1v0.1v0.1\n' +
            '\t\t\th0.1v0l0.1-0.1v0.1l-0.1,0.1v0.1h0.1c0.1,0.1,0.1,0.2,0,0.4h-0.1v0.1h-0.2l-0.1,0.2h-0.3v0.2h0.1v0.3h-0.1v0.2h0.2V34h-0.2v0.2\n' +
            '\t\t\th0.1v0.2h-0.1v0.1h0.1v0.2h-0.2v0.2h0.1v-0.1h0.2V35h-0.1v0.1l-0.2,0.1c0,0.2,0,0.3,0,0.5h-0.2v0.2h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v-0.1h0.1v-0.3h0.2c0,0.2,0,0.3,0,0.4h-0.1v0.1c0,0.1-0.2,0-0.2,0.1v0.2h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.4h-0.2v0.1c-0.1,0.1-0.2,0-0.4,0V37h-0.1v0.1h-0.2v0.4h0.2v0.1h0.1v0.1h0.1v0.2h-0.1v0.1h-0.1V38h0.1V38h0.1v0.3\n' +
            '\t\t\th-0.1l-0.1-0.2h-0.1v0.2h0.1v0.2h-0.2v0.2h0.1v0.1h-0.2v0.1l-0.1,0.1v0.1h0.1V39H414v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.2h-0.2v0.2\n' +
            '\t\t\th-0.2v0.3c0.1,0,0.2,0,0.2,0v0.2h-0.1v0.2h-0.3v0.5h0.2v-0.4h0.2c0,0.2,0,0.3,0,0.4H414v0.1h-0.2V41h0.2v0.2h-0.2v0.5h-0.2v0.6\n' +
            '\t\t\th-0.2v0.5h0.2v-0.1h0.1v-0.2h-0.1v0h0.2v-0.2h0.1v-0.1h0.2v0.3h-0.1v0.5h-0.1v0.1h-0.2l0,0h-0.1v0.1h-0.1l0,0l-0.1,0.1v0.2h0.1\n' +
            '\t\t\tl0.1,0.1l-0.1,0.1v0.1h0.1l0.1,0.1h0.1v0.1h-0.1V44h-0.1v0.1h0.1v0.1h-0.1v0.2h0.2v0.2h-0.2v0.2h0.1v0.1h0.1v-0.1h0.1l0.2,0.1\n' +
            '\t\t\th-0.1v0.2l-0.3,0.1V45h0.2v0.2h-0.2v0.2h0.2v-0.2h0.1v0.1c0.2,0,0.1,0.2,0.1,0.3h0.1v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2v-0.1h-0.1v0.2h-0.2v0h-0.1v0.2h0.1v0.1h-0.1v0.1h0.1v0.2h0.1v0.2h0.2v-0.2h-0.1V46h0.1\n' +
            '\t\t\tc0.1,0,0.1,0,0.1,0.1h0.1v0.1h0.1v0.2h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1c-0.1,0.1-0.3,0-0.4,0.1l0,0h-0.1v0.1h0.1V47h-0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.2V47h0.1l0.2,0.1h0.1v0.1h-0.2v0.6h-0.2v-0.1h-0.1v-0.1h-0.2v0.1l-0.1,0.1v0.1h0.2v0.3h0.1v-0.1h0.2v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v0.2h-0.2v0.3h0.2c0,0.2,0,0.3,0,0.4h-0.1v0.2h0.1l0.1,0.1h0.1v0.2h-0.1v0.2h0.2V50h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.2,0.4l0,0c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v0.1h0.1V51h0.1v0.1h0.1v0.1h0.1v0.1h0.5v0.2h0.4v-0.1h0.1l0,0\n' +
            '\t\t\tl0.1-0.1v-0.1l0.1-0.1V51h-0.1c-0.1-0.3-0.1-0.6,0-0.9h0.1v0.2l0.1-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v0.1h0.1v0.1h0.1v0.2\n' +
            '\t\t\th0.2v-0.4H416v-0.1h-0.1v-0.2h0.1v-0.1h-0.3v-0.1h-0.1v-0.1h0.1v-0.1h-0.1v-0.1h0.1v-0.1h0.2v0.2h-0.1v0.2h0.2v-0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.4H416V49h-0.1V49l0,0v-0.1h-0.1v-0.1h-0.5v-0.2h0.1v-0.1h-0.1v-0.2h-0.2v-0.2h0.2v-0.1l0.1-0.1V48h0.3v0.3h0.3v-0.2h-0.2v-0.3\n' +
            '\t\t\th-0.2v-0.5h-0.2v-0.1h-0.1v-0.2h0.2v0.1h0.1v-0.4h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.2v-0.2h-0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.9h0.1\n' +
            '\t\t\tl0.1,0.1h-0.1v-0.1h0.1v-0.1h-0.1V45h-0.1l-0.1-0.1h0.1v-0.2h-0.2v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.3h0.2v-0.1h0.1v0.2\n' +
            '\t\t\th0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2h-0.1v-0.2h0.2c0-0.2,0-0.3,0-0.4h0.2v-0.2h-0.1v-0.1h-0.1c0-0.2,0-0.5,0-0.8H416l0,0h-0.1v0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1h0.2c0-0.1,0-0.2,0-0.2h0.1c0.2,0,0.1,0.2,0.2,0.4h0.2v-0.3h0.2v-1h-0.2v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1c0-0.2,0-0.3,0-0.5h0.2v-0.4h-0.1v-0.2h0.2v-0.1l0.1-0.1V39h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1c-0.1-0.2,0-0.3,0-0.4\n' +
            '\t\t\th-0.1v-0.2h0.1V38h-0.1V38h0.1v-0.1h0.2v0.2h-0.1v0.1h0.2v-0.1l0.1-0.1V38h0.1V38h0.2v-0.2h-0.2c0-0.2,0-0.3,0-0.4h0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.4c0-0.2,0-0.3,0-0.4h0.2v-0.2h0.2v-0.2h0.2v-0.2h0.1l0,0l0.1-0.1V36h0.1v-0.1h0.1v-0.2h-0.1v-0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.5H417v0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.2h0.1v-0.2h0.2v-0.1h0.1l0.1,0.1h0.1v-0.2h0.1V35h-0.1v0.2h-0.3V35h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.2h0.1v-0.3h-0.3v-0.1H417v-0.2h0.2v0.1h0.1v-0.1h0.1V34l0.1-0.1v-0.1h0.1v-0.2h0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tc0-0.2,0-0.5,0-0.8h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.1h0.1c0-0.2,0-0.3,0-0.4h0.1V32h-0.1v-0.1h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h0.1\n' +
            '\t\t\tv-0.1h0.2l-0.1-0.2h-0.2l-0.1-0.2h-0.1h-0.3v-0.1l-0.2-0.2l-0.2,0.1l-0.2-0.1h-0.2l-0.1,0.2l-0.3-0.1h-0.3v0.2h-0.2L415.4,31.1z"\n' +
            '\t\t\t/>\n' +
            '\t\t<polygon class="st4" points="415.1,32.6 415.2,32.6 415.2,32.5 415.2,32.5 415.1,32.5 415.1,32.5 415,32.6 415,32.7 415.1,32.7 \t\t\n' +
            '\t\t\t"/>\n' +
            '\t\t<path class="st4" d="M507.6,47.7L507.6,47.7L507.6,47.7l-0.2,0.1v0.1h-0.1v-0.2l0.1-0.1L507.6,47.7L507.6,47.7z M507.5,48.5h0.2\n' +
            '\t\t\tv0.2h-0.2V48.5z M507.2,47.1L507.2,47.1l-0.1-0.2h0.1V47.1z M505.3,49.7L505.3,49.7L505.3,49.7l-0.2,0.1v-0.2c0.2,0,0-0.2,0.2-0.1\n' +
            '\t\t\tL505.3,49.7L505.3,49.7L505.3,49.7L505.3,49.7z M505.1,50.2L505.1,50.2l-0.1,0.2H505l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\tC505.1,50.3,504.8,50.1,505.1,50.2L505.1,50.2z M504.9,49.9L504.9,49.9L504.9,49.9L504.9,49.9h-0.2v-0.1c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tV49.9l0.2-0.1v0.1H504.9z M504.3,47.6h-0.2v0.1l-0.1,0.1v0.1h-0.2v-0.1h0.1v-0.1h0.1v-0.2L504.3,47.6L504.3,47.6z M504.1,50.5\n' +
            '\t\t\th-0.4v-0.3h0.2v-0.1h0.1v-0.2h0.1l0.1,0.1h0.1L504.1,50.5z M503.5,47.9L503.5,47.9L503.5,47.9l-0.2,0.1v-0.1h-0.1v-0.2h0.2V47.9z\n' +
            '\t\t\t M502.1,51.1H502V51h0.2V51.1z M501.9,48.3L501.9,48.3L501.9,48.3l-0.2,0.1v-0.2L501.9,48.3L501.9,48.3z M499.7,51h-0.5v-0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.1h0.2v0.1h-0.1v0.2h0.1V51h0.1l0,0L499.7,51L499.7,51z M498.9,50.4L498.9,50.4L498.9,50.4l-0.2,0.2v0.1h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.3l-0.1-0.1h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.2v0.1h0.3L498.9,50.4L498.9,50.4z M497.5,40.7L497.5,40.7\n' +
            '\t\t\tl-0.1,0.2h-0.3v0.3h-0.2v-0.1h-0.1v-0.2h-0.1V41h-0.2v-0.3c0.2,0,0.3,0,0.4-0.1v-0.1l0.1-0.1h0.2v0.1h0.1v0.2H497.5L497.5,40.7\n' +
            '\t\t\tL497.5,40.7L497.5,40.7z M496.4,38.1L496.4,38.1l0.1-0.2h0.2v0.2H496.4z M496.5,41.3L496.5,41.3l-0.1,0.2h-0.2v-0.3l0.1-0.1h0.2\n' +
            '\t\t\tv0.1h0.1V41.3z M497.2,44.6h-0.2v0.2H497v-0.1h-0.1v-0.2C497.2,44.7,497,44.4,497.2,44.6L497.2,44.6z M495.6,41.1L495.6,41.1\n' +
            '\t\t\tL495.6,41.1l-0.2,0.1l-0.1-0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1l0.1-0.1V41c0.1,0,0.3,0.1,0.2-0.1h0.2L495.6,41.1L495.6,41.1\n' +
            '\t\t\tz M494.8,40.8h-0.2v-0.1L494.8,40.8L494.8,40.8z M494.8,41.4L494.8,41.4l-0.1-0.2h0.1V41.4z M494.6,41.3h-0.2v-0.1L494.6,41.3\n' +
            '\t\t\tL494.6,41.3z M494.3,41.3L494.3,41.3L494.3,41.3l-0.2,0.2v0.1h-0.2l-0.1-0.1l-0.1,0.1v0.1h-0.2l-0.1-0.2h-0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tl0.1-0.1h0.2v0.3h0.2l0.1-0.1l0.2-0.1v-0.1h0.1v-0.1h0.1L494.3,41.3L494.3,41.3L494.3,41.3L494.3,41.3z M498.4,43.9\n' +
            '\t\t\tc0.2,0,0-0.2,0.2-0.1v0.4h-0.2V43.9z M498.6,42.8c0.2,0.1,0-0.2,0.2-0.1v0.2h0.1V43h-0.2V42.8z M498.6,41.6L498.6,41.6L498.6,41.6\n' +
            '\t\t\tl0.2,0.1v0.2h-0.2L498.6,41.6L498.6,41.6z M498.8,43.5h-0.2v-0.2h0.1L498.8,43.5L498.8,43.5L498.8,43.5z M498.8,40.8h0.2v0.2\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1L498.8,40.8L498.8,40.8z M499.1,33.3v-0.2h0.2v0.1h0.2v0.1h-0.1v0.1H499.1z M499.2,33.5H499v-0.1L499.2,33.5\n' +
            '\t\t\tL499.2,33.5z M500.6,31.8h0.2v0.1L500.6,31.8L500.6,31.8L500.6,31.8L500.6,31.8L500.6,31.8z M500.7,33.5L500.7,33.5l0.1-0.2h0.2\n' +
            '\t\t\tv-0.1l0.1-0.1l0,0h0.1v-0.1c0.2,0.1,0.1-0.1,0.2-0.1v0.2l-0.1,0.1l0,0h-0.1v0.1H501v0.2h0.1v0.1H501v-0.1H500.7l0.1,0.2h-0.1V33.5\n' +
            '\t\t\tz M500.2,40L500.2,40l0.1,0.2h-0.1V40z M500.6,39.8L500.6,39.8L500.6,39.8L500.6,39.8L500.6,39.8z M500.7,39.8L500.7,39.8\n' +
            '\t\t\tL500.7,39.8L500.7,39.8L500.7,39.8z M500.9,37.3L500.9,37.3l0.1-0.2h0.5v0.2c-0.1,0-0.2,0-0.3,0.1v0.1h0.1v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.2-0.1h-0.1v0.1h-0.1L500.9,37.3L500.9,37.3z M502.4,39.2c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h-0.1v0.1h-0.2V39.2z M504.3,38.1\n' +
            '\t\t\tc0.2,0.1,0-0.1,0.2-0.1v0.2h-0.2V38.1z M501,47.8L501,47.8l0.1,0.2H501V47.8z M508.6,47.3h-0.2v-0.2h-0.1v0.1h-0.2v-0.1H508v0.3\n' +
            '\t\t\th-0.2v-0.3h-0.2v0.2h-0.1v-0.1h-0.1v-0.1l0.1-0.1V47h0.1v-0.3h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.2v-0.5h-0.2v-0.2h-0.1v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.2V46l0.1-0.1v-0.1h-0.5V46h-0.3v-0.1H507V46h-0.1v0.2h0.1l0.2,0.1h0.1v0.1h0.2v-0.1h0.1V46h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.1h0.1v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.3v0.2h-0.3v0.2H507v-0.1l0,0l0,0h-0.3v-0.2h0.1v-0.2h-0.2\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1v-0.1h-0.1c-0.1-0.1,0-0.2,0-0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.1v-0.1h-0.2v-0.1H506v0.1h-0.1v0.2h-0.2v-0.1\n' +
            '\t\t\th-0.2v0.5c-0.2,0-0.1-0.2-0.1-0.4h-0.1v-0.1h-0.1v0.1h-0.1v0.2h0.1l0.1,0.1h-0.2V47l-0.1,0.1V47h-0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2\n' +
            '\t\t\tH505c-0.2,0-0.1-0.2-0.1-0.2h-0.1V47c-0.2,0.1-0.4,0-0.5,0v-0.1h-0.1V47h-0.1v0.2h-0.1L504,47h-0.5v0.1l-0.1,0.1v-0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h0.1v0.2h-0.2v0.2h-0.4v-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.1h0.1v0.2h0.5V48c-0.2,0.1-0.3,0-0.5,0V48\n' +
            '\t\t\tc-0.1,0.1-0.3,0-0.4,0.1v0.1h-0.2c0-0.1,0-0.2,0-0.2h0.1l0.2,0.1h0.2v-0.4h-0.2v0.2h-0.3V48h0.1v0.2h-0.3v0.1h-0.2v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.4v-0.1c0.1-0.1,0.3,0,0.4-0.1v-0.2h0.1v-0.2h0.1l0.1,0.1h0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1h-0.4v0.2h-0.7\n' +
            '\t\t\tv0.2h-0.2v0.2h0.1V48h-0.3v-0.1h-0.1V48h-0.2V48H500v0.1h-0.2v-0.2h-0.1v-0.1h-0.2v0.1h-0.2v-0.2h0.6v-0.1h0.2v-0.2h-0.3v0.2h-0.3\n' +
            '\t\t\tv-0.2h-0.2v-0.1h-0.1v-0.1H499v0.2h-0.2c-0.2,0-0.1-0.2-0.1-0.3h-0.2V47h-0.2l0.1-0.2h0.2v-0.7h-0.1c0-0.1,0-0.2,0-0.4h0.1v-0.2\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.1h-0.1v-0.2h-0.1v-0.2h0.1v0.2h0.1v0.2h0.1v-0.1h0.1v-0.4h-0.1l-0.1-0.1h-0.1v-0.1l0.2-0.1c0-0.3,0-0.7,0-1h0.2\n' +
            '\t\t\tv-0.6h0.1v-0.3h0.1v-0.1h-0.2v0.2h-0.1v0.1h-0.1v-0.2h0.1v-0.1l0.2-0.1v-0.3h0.1v-0.7h0.1v-0.1H499v-0.2h0.1v-0.1h0.2V41h0.1l0,0\n' +
            '\t\t\tl0.1-0.1l0.1,0.1l0,0h0.1l0,0c0-0.1,0.2,0,0.2-0.1v-0.2h-0.1v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.4,0v-0.1h0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.3,0,0.5,0v-0.2h-0.1v-0.2h0.2v0.1h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2H501v-0.1h0.1l0.2,0.1h0.2v0.1h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tV40h-0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.2h-0.2v-0.2h0.1l0.1,0.1h0.2c0-0.1,0-0.2,0-0.2h0.5v0.1l-0.1,0.1l0,0l-0.1,0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1l0.1-0.1v-0.1h0.1v-0.2h-0.1V39h-0.1l-0.1-0.1h0.2v-0.2h-0.1v-0.2h0.2v0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.2h0.1v-0.1h-0.1l-0.1-0.1H503V38h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.1h0.1l0.1,0.1h0.2V38h0.1V38h0.1v0.2h0.1V38\n' +
            '\t\t\th0.1v-0.5h0.1c0,0.2,0,0.3,0,0.5h0.1v0.2h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1l0,0c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h0.1v-0.1h0.2\n' +
            '\t\t\tv0.2h-0.2V39h0.3v-0.2h0.1l0,0l0.1-0.1v-0.1c0.1-0.1,0.2,0,0.2,0c0-0.1,0-0.2,0-0.2h0.1v-0.1h0.1V38h0.2v-0.3h-0.2v-0.2h-0.2v-0.2\n' +
            '\t\t\th0.3V37h-0.2v0.2h-0.2v-0.4h-0.1v-0.1h0.2l-0.1-0.2h-0.1l0,0l-0.1,0.1v0.2h0.1V37h0.1c0.1,0.2,0.1,0.4,0,0.6h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2H504c0-0.2,0-0.3,0-0.5h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.3c0,0.2,0,0.3,0,0.5h-0.4V37\n' +
            '\t\t\th0.1v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1l-0.1-0.2h0.1v0.1h-0.1v0.2h0.1V37h-0.1V37l-0.1,0.1v0.1h-0.2v0.2h-0.2v-0.2h-0.1v0.1H502v-0.1\n' +
            '\t\t\th-0.1v0.1h-0.3v-0.1h0.1V37l0.1-0.1v-0.1h0.1v-0.1l0.1-0.1v0.1h0.2v-0.2h-0.3v0.1h-0.3v-0.1h-0.2v0.2h-0.1v0.1l-0.1,0.1V37H501\n' +
            '\t\t\tv-0.2h-0.2v0.1l-0.1,0.1l-0.1-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.3h0.1V36h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.1l0.1-0.1v0.1h0.3v-0.2h-0.1v-0.1h0.1v0.1h-0.2v-0.3h0.5v-0.1h0.1v-0.1h0.2v-0.1H501V35h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1c0-0.1,0-0.2,0-0.3h0.1v-0.1h0.1l0.1,0.1l0,0v0.1h0.2v-0.2h-0.1c0-0.2,0-0.3,0-0.5h0.1l0,0h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h0.1l0.2,0.1h0.1v-0.1h0.1V33h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.3v-0.2H501v-0.2h-0.1l-0.1-0.1c0.1-0.1,0.2,0,0.3-0.1\n' +
            '\t\t\tv-0.3H501l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.8v-0.2h0.2v-0.1h0.1V31l0.1-0.1l0,0h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1l-0.1-0.2h-0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1l-0.1-0.1h0v0.3h-0.2v0.3h-0.2v0.2h0.1v0.2h-0.2v0.2h0.2V32h-0.2v0.1h0.1v0.1h0.2\n' +
            '\t\t\tl0,0h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.2h-0.1l0,0l-0.1,0.1v-0.1h-0.1v-0.2h0.2v-0.2h-0.1l0,0h-0.1v0.2h-0.2v0.8h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h-0.1v0.1h-0.2v0.2h0.1c0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1c0.1,0.1,0,0.2,0.1,0.2h0.2v-0.4h-0.2v-0.4h0.3v0.2h0.2\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1V34l-0.1,0.1v0.6H499v-0.2h-0.2v0.2h-0.2v0.2h-0.2V35h-0.1v-0.1h-0.2v0.2h-0.2v0.2h0.3v0.4h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2v0.2h-0.1l-0.1,0.8h-0.3v0.2h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1V37H498v0.2h0.2v0.2H498v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0-0.3,0v-0.1h0.2v-0.2h-0.1V37h-0.2l0,0l-0.3,0.2v0.1h0.1v0.2h-0.2v0.2h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1v-0.1H497v0.1\n' +
            '\t\t\th-0.1V38h-0.1V38h-0.1v-0.2h-0.5V38h-0.5v0.2h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.2v0.2h-0.2\n' +
            '\t\t\tv-0.2h-0.2v0.1l-0.1,0.1v-0.1H495v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.2h-0.1v0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.2h-0.1v-0.1H494v0.1c-0.2,0.1-0.4,0-0.5,0v-0.1h-0.1v0.2h-0.2v0.1l-0.1,0.1v0.1h0.1V39\n' +
            '\t\t\th0.1l0.1,0.1h0.1l0.1,0.1c0,0.1-0.2,0-0.3,0.1v0.1h0.1v0.1h-0.1v0.9H493v0.2h0.1v0.1h0.1v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1\n' +
            '\t\t\th-0.1v0.4h0.1v0.1h0.1v0.1l-0.1,0.1v0.3h0.5v-0.1l0.1-0.1v0.2h0.1l0.1,0.1h0.1l0.1,0.1l-0.2,0.1v0.1h-0.1v0.1h0.3V42h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.2h0.3v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.2h0.2v-0.2h0.1v-0.1h0.1v-0.1h0.1v0.1h0.1v-0.1h0.2v-0.1h0.1l0.1,0.1h0.1v0.1\n' +
            '\t\t\tH496v0.2h0.2v-0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0,0v0.1h0.1l0.1,0.1h-0.1V42h-0.2v0.1h0.1l0.1,0.1h0.1l0.1,0.1h0.2v-0.1\n' +
            '\t\t\th0.1v-0.1h0.1v0.2h0.2v0.2h-0.2v-0.1h-0.1v0.2H497v0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v0.2h0.1v0.2h-0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0,0.2,0,0.2,0.1h0.1v0.1h-0.1v0.2h0.3v0.2h-0.4v-0.3h-0.2V43l-0.1,0.1v0.1h0.1c0,0.2,0.1,0.4,0,0.5h-0.1v0.1h0.2v0.2h-0.2V44\n' +
            '\t\t\tl-0.1,0.1v0.1h0.3v0.1h0.1v0.3h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.9h0.2c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.3\n' +
            '\t\t\tv-0.4h0.2v-0.2h-0.1v-0.2h0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v0.2h0.1v0.1h0.1v-0.1h0.1v0.1h0.2c0,0.1,0,0.2,0,0.2h-0.4V46h0.3v0.2\n' +
            '\t\t\th-0.3v0.2h0.3v0.3h0.1l0.1,0.1h0.1v0.1l-0.1,0.1V47h-0.1v-0.2h-0.2V47h-0.2v-0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\th0.1v0.2h-0.1V47h0.1v0.1h0.1V47h0.1v-0.1h0.1l0.1,0.2h0.1v0.1c0.2,0,0,0.2,0.1,0.3h0.2v-0.2c0.1,0,0.2,0,0.2,0v0.2h-0.4v0.1l0,0\n' +
            '\t\t\tv0.1h0.1c0.1,0.2,0.1,0.5,0,0.7c0.1,0,0.2,0,0.2,0v0.2h-0.2v0.2h-0.1v-0.1h-0.2v-0.3h-0.2v0.2h-0.2v0.2h0.1v0.1h0.1l0.1,0.1h0.1\n' +
            '\t\t\tv0.1h0.1V49h0.1V49h0.1v0.2h0.1l0.1,0.1h0.2v-0.1h0.1v0.2h0.2v-0.1h0.1l0.1,0.1h0.2V50c-0.1,0-0.2,0-0.2,0v-0.1h-0.2v0.3h0.6v0.2\n' +
            '\t\t\th-0.4v0.1h0.1v0.1h0.2l0,0l0.1-0.1l0.1,0.1h0.2v0.2h-0.2v0.2h0.3v-0.2h0.3v0.3l0,0v0.1l0,0v0.1h0.2v-0.1h0.1l0.1,0.2h0.1v0.1h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.1h0.1V51h0.1l0.1,0.1h0.1v0.2h0.2v-0.2h-0.1v-0.2h0.2v-0.2c0.1,0,0.2,0,0.2,0v0.2h0.2v0.2h-0.2v0.1h0.1v0.1h0.2v-0.2\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.2h0.1V51h0.1c0.1,0.1,0,0.2,0,0.2h0.2v-0.5h-0.2v-0.2h0.5v0.2h-0.2v0.2h0.1V51h0.1v0.1h0.8\n' +
            '\t\t\tV51h0.1l0,0h0.2v-0.2h-0.1v-0.2h0.1v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.2h0.1v-0.2h0.1v-0.1h0.1\n' +
            '\t\t\tv0.2h0.1v0.1h0.1v-0.2h0.5v0.2h0.1v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1l0.1-0.1v-0.2h-0.2v-0.2h0.4v0.3h0.2v-0.1l0.1-0.1v-0.2h0.1\n' +
            '\t\t\tv0.1h0.2V50h0.2v-0.2h0.4v-0.1h0.1v-0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.4h-0.3v-0.2h0.2V49h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.3h0.1\n' +
            '\t\t\tv0.1h0.1v0.2h-0.2v0.4h0.2V50h0.2v-0.1h0.1v-0.1h0.1v-0.1h-0.2v-0.5h0.1v-0.1l0.1-0.1l0,0h0.1v0.2h0.1v0.1h0.1V49h0.1V49l0.1-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.1h0.3v-0.1h-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2h0.2v-0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.5h0.3v-0.2h-0.7\n' +
            '\t\t\tv-0.1h-0.1v0.1h-0.2V48h0.2V48l0.1-0.1v-0.2h0.2v-0.2h0.2v0.1h0.1l0.1,0.1h0.1v-0.2h-0.1v-0.2L508.6,47.3L508.6,47.3l-0.2,0\n' +
            '\t\t\tL508.6,47.3z"/>\n' +
            '\t\t<polygon class="st4" points="499.4,41.1 499.5,41.1 499.5,41 499.5,41 499.4,41 \t\t"/>\n' +
            '\t\t<rect x="414.6" y="34.9" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="414.5,36.3 414.4,36.3 414.4,36.4 414.5,36.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="414.6,36.9 414.8,36.9 414.8,36.8 414.8,36.7 414.8,36.7 414.8,36.7 414.8,36.6 414.4,36.6 \n' +
            '\t\t\t414.4,36.7 414.5,36.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="503.3,36.7 503.1,36.7 503.1,36.8 503.3,36.8 \t\t"/>\n' +
            '\t\t<path class="st4" d="M432.3,46.8L432.3,46.8l-0.1-0.2h0.2L432.3,46.8L432.3,46.8z M432.3,47.1h-0.2v0.2h0.2v0.1l-0.1,0.1l0,0l0,0\n' +
            '\t\t\tv-0.1h-0.3v-0.2h0.1v-0.1h-0.1V47L432,47h0.4L432.3,47.1z M431.8,46h0.2v0.1h0.1v0.2h-0.2V46z M431.2,46H431v-0.2h0.2V46z\n' +
            '\t\t\t M431,46.3L431,46.3l-0.1,0.2h-0.4v-0.1h0.1v-0.1c0.1,0,0.3,0.1,0.2-0.1L431,46.3L431,46.3z M430.6,48.3h-0.2V48h0.1v0.1h0.1\n' +
            '\t\t\tC430.6,48.1,430.6,48.3,430.6,48.3z M430.6,49.4h-0.2v0.2h-0.2v0.2h-0.2v-0.1H430v-0.2h0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.5l0.1-0.1h0.2v0.2h-0.2V49h0.2c0.1,0.1-0.1,0.3,0.1,0.2h0.1V49.4z M430.3,50.1h-0.2V50h0.2V50.1z M430,49.2h-0.3V49h0.2V49\n' +
            '\t\t\th0.1v-0.2h0.2V49H430V49.2z M429.6,46.4L429.6,46.4L429.6,46.4L429.6,46.4L429.6,46.4z M430.1,47.5L430.1,47.5L430.1,47.5\n' +
            '\t\t\tL430.1,47.5L430.1,47.5z M429.6,46.2h-0.2v-0.1c-0.1,0-0.2,0-0.2,0l-0.1-0.1H429v-0.2h0.2v0.1h0.4V46h0.1L429.6,46.2L429.6,46.2z\n' +
            '\t\t\t M429.6,49L429.6,49L429.6,49L429.6,49L429.6,49z M429.4,46.6h-0.2v-0.2h0.2V46.6z M429.4,49.9L429.4,49.9L429.4,49.9l-0.2-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.2h0.1l0.1,0.1h0.1L429.4,49.9z M428.8,46.2h-0.2v-0.3h0.2V46.2z M428.5,46.1L428.5,46.1L428.5,46.1l-0.2-0.1\n' +
            '\t\t\tv-0.2h0.2V46.1z M428.4,49L428.4,49L428.4,49l-0.2,0.1v-0.2L428.4,49L428.4,49z M428.2,46.3h-0.2v-0.1L428.2,46.3L428.2,46.3z\n' +
            '\t\t\t M428.1,45.9L428.1,45.9l0.1,0.2h-0.1V45.9z M427.5,48.5L427.5,48.5L427.5,48.5l-0.2,0.1v-0.2h0.2V48.5z M427.2,43l-0.2-0.1h-0.1\n' +
            '\t\t\tV43h-0.2v-0.5h0.1v-0.1l0.2-0.1v-0.1c0.2,0.1,0-0.1,0.2-0.1v0.1h0.1v0.2l-0.1,0.1v0.1h0.1v0.1h0.2v0.2L427.2,43L427.2,43z\n' +
            '\t\t\t M426.8,41.7L426.8,41.7L426.8,41.7L426.8,41.7L426.8,41.7z M426.5,45.7h-0.2v0.1h-0.1v0.1h0.1V46h-0.2v0.2h0.1v0.1l-0.1,0.1v0\n' +
            '\t\t\th-0.2c0-0.1,0-0.2-0.1-0.2h-0.1v0.2l-0.1,0.1v0.1h-0.1l0,0l-0.1,0.1l0,0h-0.2v0.1h-0.2v-0.2h-0.1v-0.2l-0.1,0.1v0h-0.5v-0.1h-0.1\n' +
            '\t\t\tv-0.2h-0.1v0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1l0,0H424v0.1h-0.1v0.1h-0.1v-0.1h-0.2c0-0.1,0.1-0.2-0.1-0.2l-0.1,0.1l0,0h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.1v-0.1h-0.1V46l0.1-0.1v-0.1h0.1v-0.1h0.1v-0.2h0.2v-0.1l0.1-0.1v-0.1h-0.3v-0.1h-0.1v-0.1\n' +
            '\t\t\tc0.1,0,0.3,0.1,0.3-0.1v-0.1h0.1l0,0h0.1v-0.4h-0.2v0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1l-0.1-0.1h-0.1v-0.2c0.2,0,0.5,0,0.8,0v-0.1\n' +
            '\t\t\tl0.1-0.1V44h-0.1v-0.1h0.1v-0.2H424v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.1v0.1h0.2v-0.1h0.1v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.2V42h0.2\n' +
            '\t\t\tv0.1h0.2v0.2h-0.2v0.2h0.4v0.1h0.1v0.1h0.2v0.6h0.2v0.2h0.4v0.1h0.2v0.2l-0.1,0.1v0.1h-0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0.1,0.1h0.1v0.2h0.3V44H426v0.2h0.2v0.1h0.1v0.1H426v0.2h0.1v0.1h0.1v0.2h0.2v-0.2h0.2V45H426v0.3h0.5v0.2h0.1\n' +
            '\t\t\tL426.5,45.7L426.5,45.7z M424.8,48.7L424.8,48.7L424.8,48.7L424.8,48.7L424.8,48.7z M423.9,48.6L423.9,48.6L423.9,48.6L423.9,48.6\n' +
            '\t\t\tL423.9,48.6z M423.4,48.6L423.4,48.6l-0.1,0.2h-0.1v0.1H423v-0.2l0.1-0.1v-0.1l0.1-0.1h0.2V48.6z M423,45.8L423,45.8l-0.2-0.1\n' +
            '\t\t\tv-0.1l0.1-0.1h0.3v0.2h-0.1v0.1H423z M423.8,43.2L423.8,43.2l0.1,0.2h-0.1V43.2z M424,43.1L424,43.1L424,43.1L424,43.1l0.1-0.2\n' +
            '\t\t\tl0.1-0.1l-0.1-0.1H424v-0.2h0.2v0.5L424,43.1L424,43.1z M423.8,39.4h0.2l0.1,0.1h0.1v0.1h0.1v0.2l-0.1,0.1V40h-0.1v0.1h-0.1v-0.4\n' +
            '\t\t\th-0.2L423.8,39.4L423.8,39.4z M425.8,40L425.8,40L425.8,40L425.8,40L425.8,40z M422.7,45.8L422.7,45.8L422.7,45.8L422.7,45.8\n' +
            '\t\t\tL422.7,45.8z M421.8,49.3h-0.2v-0.2h0.2L421.8,49.3L421.8,49.3L421.8,49.3z M421.9,49.7h-0.2v-0.2h0.2V49.7z M421.6,49.8h-0.2\n' +
            '\t\t\tv-0.2h0.2V49.8z M421.3,45.6h-0.2v-0.2h0.2V45.6z M421.3,45.9h-0.2v-0.1L421.3,45.9L421.3,45.9z M420.2,49.5H420v-0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.2l-0.1,0.1V50h-0.1v-0.7h0.2l0.1,0.1h0.1v-0.2h0.1c0,0.1-0.1,0.2,0.1,0.2h0.1C420.2,49.4,420.2,49.5,420.2,49.5z\n' +
            '\t\t\t M420.2,47.8L420.2,47.8l-0.1-0.3h0.1V47.8z M421,46L421,46l-0.1-0.2h0.1V46z M422.5,42.9L422.5,42.9L422.5,42.9l-0.2,0.1v-0.3\n' +
            '\t\t\th0.2C422.5,42.7,422.5,42.9,422.5,42.9z M433.5,47h-0.4v-0.4H433v0.2h-0.1v-0.1h-0.2l0,0h-0.1v-0.1h-0.1v-0.1h0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.2-0.1v-0.2h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.3V46h-0.2v-0.3h-0.5v0.1l-0.1,0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2l-0.1-0.2H432v0.1H432v0.2h-0.2v0.2h0.1l0.1,0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v0.1h0.1l0.1,0.1h-0.2v-0.5h-0.5v-0.1H431v0.2\n' +
            '\t\t\tH431v0.1h-0.3v0.1l-0.1,0.1l0,0h-0.1v-0.1h-0.2v0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.2H430v-0.1c-0.5,0-0.9,0-1.3,0v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.2v-0.2h-0.2v0.1h-0.1v0.1H428v-0.1h-0.2v0.2h-0.1l-0.1-0.1h-0.2v-0.1h-0.1v-0.1h-0.1v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1\n' +
            '\t\t\th0.1v-0.5h0.1v-0.1l0.1-0.1v0.1h0.2v-0.3h-0.4v-0.1h-0.1v-0.1h-0.1V44h-0.1v-0.2h0.1v-0.1h-0.2v-0.2h0.2l0,0l0.1-0.1v-0.1h0.1\n' +
            '\t\t\tv-0.6h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h-0.2v-0.2h0.1v-0.7h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.1H427v0.2h-0.2v0.2h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h-0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2\n' +
            '\t\t\th0.1c0.1,0.1,0,0.2,0,0.3h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.1v-0.1h-0.1c0-0.2,0-0.3,0-0.5h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.2h-0.1l0,0h-0.2v-0.2h-0.1c0-0.2,0-0.3,0-0.5h0.1l0.2,0.1h0.1v0.1h-0.1v0.2h0.2v-0.3h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.2V39H426V39h0.1v-0.1H426v-0.2h0.1v-0.1h0.1v0.1h0.2v-0.3h-0.2v-0.2h-0.4v-0.4h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.4v-0.2h-0.4l-0.1,0.1v0.1l-0.2,0.1v0.2h0.1l0.1,0.1h0.1v-0.1h0.1h0h0.2v-0.1h0.1\n' +
            '\t\t\tv0.1h0.1v0.3h-0.2v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.2h-0.2v0.1h0.1l0.1,0.1h0.1v0.1h-0.1V39h-0.1V39h-0.2v-0.2h-0.2V39h-0.2\n' +
            '\t\t\tv0.2h0.2v0.2h-0.2v0.2h-0.2v0.4h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1l0,0l-0.1,0.1v0.1h-0.2v0.2h0.1v0.2h0.1v0.1h0.1v0.2h-0.2V41h0.1\n' +
            '\t\t\tv0.1l-0.1,0.1v0.1h-0.1v0.1h0.1v0.2h-0.1l-0.1-0.1H423v-0.1h-0.2v0.2h-0.2v0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1V42h-0.1l0.1,0.1\n' +
            '\t\t\th-0.1v0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.2h-0.1v-0.1h-0.2v0.3h-0.2v0.5h0.2V43l0.1-0.1V43h0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1l0.1,0.1\n' +
            '\t\t\tl-0.1,0.1v0.2h-0.1v0.1h-0.2c0,0.2,0,0.3,0,0.5h-0.1v0.2h-0.3v0.1H422v0.2h-0.2v-0.4h0.2V44h0.2v-0.5H422v0.3h-0.5v-0.1h-0.1V44\n' +
            '\t\t\th0.2v0.2h-0.2v0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.3h0.2v-0.1h0.1v0.1h0.1c0.1,0.1,0.1,0.3,0,0.5H421v0.1h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1v0.2h-0.1l0.1,0.1h0.1V46h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v0.1l-0.2,0.1l0,0h-0.1\n' +
            '\t\t\tv0.1h-0.2v-0.3h-0.2v0.2h-0.1l0,0h-0.1v0.1h-0.2V47h0.1v0.2h-0.1v0.1h-0.2v0.2h0.1v0.1h-0.1v0.2h0.2V48h0.1v0.2h-0.1l0,0h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1l-0.1,0.1v0.1h-0.1c0,0.2,0,0.3,0,0.4h-0.2v-0.1h-0.1V49h-0.1v0.2h-0.2v0.2h-0.2v0.2h0.3v0.3h-0.2v0.4h0.2v0.5h-0.2\n' +
            '\t\t\tv0.2h0.3v-0.4h0.5c0,0.1,0,0.2,0,0.2h-0.1v0.2H420v0.2h0.1l0.2,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1v0.2h0.2v-0.1h0.1v-0.1h0.2v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.2h0.2v-0.3h-0.2v-0.2H421v-0.2h0.1V51H421v-0.1h-0.1v-0.2h0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.2V51h0.3v-0.1\n' +
            '\t\t\th0.1v0.2h0.1V51h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v-0.2h0.1v-0.1h0.1v-0.1c0.1-0.1,0.3,0,0.4-0.1v-0.2h0.2v-0.2H422v-0.7h0.2v-0.2h0.2\n' +
            '\t\t\tv-0.2h0.1v-0.2l0.1-0.1v-0.2h-0.1l-0.1-0.1l0.1-0.1l0,0h0.1v-0.2h-0.1v-0.1h0.1V48l0.1-0.1V48h0.1v0.2h-0.1v0.2h0.1v0.1l-0.1,0.1\n' +
            '\t\t\tv0.2h0.1v0.1h0.1V49h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2V49h0.1V49l0.1-0.1v-0.2h0.2v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.4,0v0.1h0.1c0.1,0.1,0,0.2,0,0.2h0.1V49h0.2V49h0.1V49h0.2c0-0.2,0-0.3,0-0.4h0.1v0.1h0.1v0.2h0.2V49h0.2v-0.2\n' +
            '\t\t\th0.3v-0.2h-0.7v-0.2h0.1v-0.2h0.1v0.2h0.2c0-0.1,0-0.2,0-0.2h0.1v-0.1h0.1v0.1h0.2v-0.2h0.2v0.3h-0.1v0.2h0.1v0.1h0.5v0.2h0.2\n' +
            '\t\t\tv-0.5h0.1v-0.1l0.1-0.1v0.1h0.2v0.2h0.3v0.2h0.1c0.2,0,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.2V49h0.3v0.2h-0.3v0.2h0.5\n' +
            '\t\t\tv-0.2h0.2v0.4h0.1v0.1h0.1v0.1h0.1v0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1V50l-0.1,0.1v0.1h-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0,0.4h0.2v-0.2h0.2c0.2,0,0.1,0.2,0.1,0.2h0.1l0,0c0.1-0.1,0.2-0.1,0.3,0v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1l0,0\n' +
            '\t\t\tc0.1-0.1,0.3-0.1,0.4-0.1v-0.2h0.2v-0.2h-0.2v0.2c-0.2,0-0.3,0-0.5,0v-0.2h0.2v-0.1h0.1l0,0c0.1-0.1,0.2,0,0.4-0.1v-0.2h0.2v-0.2\n' +
            '\t\t\th-0.1v-0.1c0-0.1,0.2-0.1,0.3-0.1v-0.2h0.4V49h-0.2v-0.3H431v-0.2h0.1v-0.1H431l-0.1-0.1h-0.2v-0.2h0.1V48h0.1v0.1h0.3v-0.5h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1h0.1v-0.1c0.1-0.1,0.3-0.1,0.5,0v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v-0.1h0.1v-0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\th0.1v0.1h0.4v-0.1l0.1-0.1V47C433.3,47,433.5,47,433.5,47l0.1-0.5h-0.2L433.5,47z"/>\n' +
            '\t\t<path class="st4" d="M478.6,49.9L478.6,49.9L478.6,49.9L478.6,49.9l-0.2-0.1v-0.2l0,0h-0.1v-0.1h0.1v0.1l0,0l0,0l0,0h0.1v-0.1h0.2\n' +
            '\t\t\tL478.6,49.9L478.6,49.9z M478.5,50.8L478.5,50.8L478.5,50.8l-0.2-0.1v-0.1h0.2V50.8z M478.9,50.3L478.9,50.3l0.1,0.2h-0.1V50.3z\n' +
            '\t\t\t M478.1,50.5h-0.2v-0.1L478.1,50.5L478.1,50.5z M477.5,48.5L477.5,48.5l-0.1-0.2h-0.1v-0.2h0.2V48.5z M477.5,50.8L477.5,50.8\n' +
            '\t\t\tL477.5,50.8l-0.2-0.1v-0.1h0.2V50.8z M477.3,48h-0.2v-0.4h0.2V48z M477.3,50.7L477.3,50.7L477.3,50.7l-0.2-0.1v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tV50.7z M476.7,45.5h0.2v0.1L476.7,45.5L476.7,45.5z M476.5,49.4L476.5,49.4l-0.1,0.2h-0.1v-0.2L476.5,49.4L476.5,49.4z\n' +
            '\t\t\t M476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1L476.3,41.1z M476.5,43.8h0.2v0.2h-0.1V44h-0.1v-0.1h-0.1\n' +
            '\t\t\tC476.5,43.9,476.5,43.8,476.5,43.8z M476.5,42.1h0.2v0.1L476.5,42.1L476.5,42.1z M476.1,40.4L476.1,40.4L476.1,40.4L476.1,40.4\n' +
            '\t\t\tL476.1,40.4z M476,48.3h-0.2V48h0.1v0.1h0.1V48.3z M475.7,47h-0.2v-0.2h0.2V47z M475.5,44h-0.2c0-0.1,0.1-0.3-0.1-0.2h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1v0.1h0.2V44z M475.2,39.6h0.2v0.1L475.2,39.6L475.2,39.6z M475.1,40.6L475.1,40.6L475.1,40.6L475.1,40.6\n' +
            '\t\t\tL475.1,40.6z M474.2,42.8L474.2,42.8L474.2,42.8L474.2,42.8L474.2,42.8z M474.2,43.1L474.2,43.1l-0.1-0.2h0.1V43.1z M474,43.1\n' +
            '\t\t\th-0.2V43L474,43.1L474,43.1z M473.9,43.5L473.9,43.5L473.9,43.5l-0.2-0.1v-0.1h0.2V43.5z M472.9,44.2h-0.2v-0.2h0.1L472.9,44.2\n' +
            '\t\t\tL472.9,44.2L472.9,44.2z M472.2,42.7h-0.4v-0.1h-0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.2v0.2h0.1v0.1h0.1V42.7z M472.2,44.7H472v-0.2h0.2\n' +
            '\t\t\tV44.7z M471.9,42.9L471.9,42.9l-0.1,0.2h-0.1V43h-0.1v-0.1H471.9L471.9,42.9z M471.3,42.8h-0.2v-0.2h0.2V42.8z M471.1,43.5H471\n' +
            '\t\t\tv-0.2h0.1L471.1,43.5L471.1,43.5L471.1,43.5z M471,46.1h-0.4v-0.2h0.1v-0.2h0.2v0.1h-0.1v0.2c0.1,0,0.2,0,0.2,0V46.1z M469.8,45.7\n' +
            '\t\t\tL469.8,45.7l-0.1,0.2h-0.2v-0.1l0.1-0.1H469.8L469.8,45.7z M469.3,46.2h-0.2V46h0.2V46.2z M468.4,48L468.4,48L468.4,48l-0.2,0.1\n' +
            '\t\t\tV48c0.2,0.1,0-0.2,0.2-0.1V48z M468.2,45.6L468.2,45.6L468.2,45.6L468.2,45.6L468.2,45.6z M468.1,40.2L468.1,40.2L468.1,40.2\n' +
            '\t\t\tl-0.2-0.1v-0.1h-0.1V40h-0.1v-0.2h0.2v0.1h0.1V40h0.1V40.2z M468,46.2h-0.2v-0.1L468,46.2L468,46.2z M467.8,47h-0.2v-0.1L467.8,47\n' +
            '\t\t\tL467.8,47z M467.8,47.6L467.8,47.6L467.8,47.6L467.8,47.6L467.8,47.6z M467.5,46v-0.2h-0.1v-0.1h0.1v-0.3h0.2V46H467.5z M467.5,45\n' +
            '\t\t\tL467.5,45L467.5,45l0.2,0.1v0.1h-0.2V45z M467.5,39.4L467.5,39.4L467.5,39.4l0.2,0.1v0.1h-0.1v0.1h-0.1V39.4z M467.3,45.7\n' +
            '\t\t\tL467.3,45.7L467.3,45.7l-0.2,0.1c0-0.1,0.1-0.2-0.2-0.2h-0.1v0.1h-0.1v-0.1h-0.1v-0.4h0.2l0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tC467.3,45.6,467.3,45.7,467.3,45.7z M467.2,46.3H467v-0.2h0.2V46.3z M466.9,46.1L466.9,46.1l-0.1,0.2l0,0l-0.1-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tL466.9,46.1L466.9,46.1L466.9,46.1z M466.7,44.6v-0.2h0.1v-0.1h0.1v-0.5h0.1v0.1h0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1H466.7z\n' +
            '\t\t\t M466.5,43.5v-0.2h-0.3v-0.2h0.3c0.1-0.2,0-0.3,0-0.4h-0.2v-0.2h0.2v-0.2h0.2v0.1h-0.1v0.1h0.1v0.1h0.2v0.1l0,0v0.7h0.1v-0.2h0.2\n' +
            '\t\t\tv0.1h0.1v0.2h-0.1v0.2h-0.2v0.1h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.2H466.5z M466.6,44.1L466.6,44.1L466.6,44.1l-0.2,0.1v-0.1h-0.3\n' +
            '\t\t\tv-0.4c0.2,0.1,0.1-0.2,0.2-0.1v0.3h0.3V44.1z M466.5,38.7L466.5,38.7L466.5,38.7L466.5,38.7L466.5,38.7z M466.6,38h0.2v0.2h-0.1\n' +
            '\t\t\tL466.6,38L466.6,38L466.6,38z M466.9,43.1L466.9,43.1L466.9,43.1L466.9,43.1L466.9,43.1z M467,40.4L467,40.4L467,40.4L467,40.4\n' +
            '\t\t\tL467,40.4z M465.8,41h-0.2v-0.2h0.1v-0.2h0.1V41z M465.7,43.8h-0.2v-0.2h0.2V43.8z M465.5,41.7L465.5,41.7L465.5,41.7l-0.2,0.1\n' +
            '\t\t\tv-0.2h0.1v-0.2h0.1V41.7z M465.4,45h-0.2v-0.2h0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1C465.4,44.6,465.4,45,465.4,45z M465.1,44h0.2v0.2\n' +
            '\t\t\th-0.2V44z M465,41.8h-0.2v-0.2h0.1L465,41.8L465,41.8L465,41.8z M464.7,45.9l-0.2,0.1V46h-0.1v-0.1h-0.1v-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tl0.1,0.1L464.7,45.9L464.7,45.9L464.7,45.9L464.7,45.9z M464.4,46.3L464.4,46.3L464.4,46.3L464.4,46.3L464.4,46.3z M464.2,41.4\n' +
            '\t\t\tL464.2,41.4l-0.1,0.2h-0.1v-0.2H464.2L464.2,41.4z M464.1,46.6L464.1,46.6L464.1,46.6L464.1,46.6L464.1,46.6z M463.1,50.1\n' +
            '\t\t\tL463.1,50.1L463.1,50.1l-0.2,0.1l-0.2-0.1h-0.1v-0.1h-0.1v-0.2h0.1v0.1h0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1L463.1,50.1L463.1,50.1z\n' +
            '\t\t\t M462.7,43.7L462.7,43.7L462.7,43.7L462.7,43.7L462.7,43.7z M462.5,44.2h-0.2v-0.2h0.1L462.5,44.2L462.5,44.2L462.5,44.2z\n' +
            '\t\t\t M462.3,45.9h-0.2v-0.1H462v-0.2h0.2v0.2L462.3,45.9L462.3,45.9z M461.9,47.4L461.9,47.4l-0.1-0.2h0.1V47.4z M461.7,48.3\n' +
            '\t\t\tL461.7,48.3l-0.1,0.2h0.1v0.2h-0.1V49h-0.1c0-0.1,0.1-0.3-0.1-0.3v0.2h-0.2v-0.1l0.1-0.1v0.1l0.2-0.1v-0.1h0.1v-0.4h0.1\n' +
            '\t\t\tL461.7,48.3L461.7,48.3L461.7,48.3z M461.5,49.4l-0.2,0.1l0,0h-0.2v0.1h-0.1v-0.1l0.1-0.1v-0.1l0.1-0.1L461.5,49.4L461.5,49.4z\n' +
            '\t\t\t M461.3,50.1h-0.2v-0.1L461.3,50.1L461.3,50.1z M478.7,50.1h0.2v-0.2h-0.1v-0.2h-0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.1h-0.2\n' +
            '\t\t\tv0.2h-0.2v-0.2h0.2v-0.1h-0.1v-0.1h-0.2V49h-0.2c0-0.1,0-0.2,0-0.4h0.2v-0.2h-0.2v0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.3-0.1-0.5h-0.2\n' +
            '\t\t\tV48h-0.1v-0.2h0.1v-0.1h0.2v-0.2h-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.1V47l0.1-0.1v-0.2H477v-0.1h-0.2v-0.1h-0.1v-0.2h0.4v0.2h0.2\n' +
            '\t\t\tv-0.2h-0.1v-0.1h0.2v-0.2h-0.1l-0.1-0.1h-0.1V46h0.1v-0.2h-0.2v-0.5h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\tc0.2-0.1,0.4,0,0.5,0V45h-0.3v0.1h-0.1V45h-0.1v-0.2h0.1v-0.2h-0.2v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.2,0v-0.2h-0.1v-0.2h0.1\n' +
            '\t\t\tc0.1,0,0.1,0.1,0.1,0.1h0.1v0.1h-0.1v0.2h0.3v-0.8h-0.4v-0.1h-0.1v-0.1h0.1v-0.2h0.1v-0.5h0.2v-0.2h0.2v-0.2H477v-0.7h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.1h-0.2v0.2h-0.1c-0.1-0.1,0-0.2,0-0.4h0.1v-0.2h0.1V41h-0.2v-0.2h0.1v-0.2h-0.2v-0.1h0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tc-0.1,0-0.2-0.1-0.1-0.1h-0.1v-0.1h-0.2v-0.1h-0.2v-0.2h0.1l0.2,0.1l0,0v-0.2h0.1v-0.2h-0.1v0.2c-0.2,0,0-0.2-0.1-0.3H476\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h-0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.1h0.1v-0.3h0.1v-0.1l0.2-0.1l0,0h0.1v-0.1h-0.4v0.2h-0.1v-0.1\n' +
            '\t\t\th-0.1v0.1l-0.1,0.1l0,0l-0.1,0.1v-0.1h-0.1v0.2h-0.1v0.2h0.1V40l-0.1,0.1v0.2h0.1v0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v0.3h0.1v0.1h-0.1v0.1h-0.1v0.2h0.1v0.1l-0.2,0.1v0.2h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv0.1h-0.1v0.2h-0.1v-0.1h-0.1V41h-0.1l0,0c-0.1,0.1-0.2,0-0.3,0v0.2H473v0.1l-0.1,0.1v0.2h-0.1l-0.1-0.1h-0.5v0.2h-0.2\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.4H472v-0.2h-0.2v0.1l-0.1,0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.2v0.2h-0.1v0.1h-0.1v0.1l-0.2,0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h-0.1v0.1H471v-0.1h-0.1v-0.1h-0.1v0.2h-0.1v0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.4v0.1H470v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h-0.1v0.1l-0.1,0.1v-0.1h-0.2v0.2h-0.2v-0.1h-0.4v0.2h0.1v0.1h0.1l0.1,0.1h-0.1v0.3h-0.2v-0.1h-0.1c-0.1,0-0.1,0-0.1-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v0h0.2v-0.2h-0.1v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.1v0.1h-0.1V44l0,0v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.2h-0.1l-0.1-0.1h-0.1v-0.1h0.1v-0.2h0.1v-0.1h0.1V43h-0.1v-0.2h0.1v-0.3h-0.1v-0.1h0.1v-0.1h0.2v-0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.2v-0.2h0.1v-0.6h-0.1v-0.2h-0.1v-0.1h0.1v-0.1h0.1c0.1,0.1,0,0.2,0,0.2h0.1v-0.1l0.1-0.1v-0.1h-0.1c-0.1-0.2,0-0.3,0-0.5h-0.1\n' +
            '\t\t\tv0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h0.1v-0.2h-0.2v-0.2h-0.1v-0.2H468v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1V39h0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1V39h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.2h-0.1v0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.3,0-0.4h-0.1v0.1h-0.1v0.2\n' +
            '\t\t\th-0.2v0.1l-0.2,0.1v0.1h-0.2v-0.1h0.1v-0.1l0.2-0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1H467v-0.2h0.2V38H467V38h-0.1v-0.2h0.1v-0.2h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1l-0.1-0.1c-0.2,0,0,0.2-0.2,0.1v0.1l-0.1,0.1v0.1h-0.1v0.1l-0.1-0.3v0.2h-0.1v0.1h-0.1V38h-0.1l0,0H466v0.2h-0.1\n' +
            '\t\t\tv0.1h-0.1v0.1h0.1v0.2h-0.2v0.1h-0.1v0.1h0.1v0.1h-0.1l0,0l-0.2,0.3v0.5h-0.1v0.1h-0.1v0.3h-0.1v0.2h-0.1v0.1h0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th-0.1v0.1h-0.1v-0.1h-0.2v0.2h0.1v0.1l-0.1,0.1v0.2h0.1V41h-0.1v0h-0.2v0.1h0.1v0.2h-0.2v0.1v0.1c0,0.2,0,0.3,0,0.4\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0c0-0.1,0-0.2,0-0.2h0.1v-0.1l0.1-0.1v-0.3h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1c0,0.1,0,0.2,0,0.2h-0.2v-0.2h0.1\n' +
            '\t\t\tv-0.2h0.1v-0.2h-0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.2-0.2v-0.1\n' +
            '\t\t\tv-0.2h-0.2v-0.1h-0.1l-0.1-0.1h-0.5v0.1h-0.1v0.2H463v0.1h-0.2v0.2h-0.1v0.1l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1l-0.3,0.1v0.2h0.1v0.1\n' +
            '\t\t\th-0.1v0.2h0.1l0.1,0.1h0.1v0.1l-0.1,0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0v0.2h0.1v0.2h-0.2v0.1h0.1v0.1h0.2v0.2h-0.1v0.1h0.1v0.2h-0.1\n' +
            '\t\t\tv0.2h0.2v-0.1h0.1v-0.1l0.1-0.1c0.1,0.2,0.1,0.3,0,0.5h-0.1v0.1h-0.1v0.1h-0.1V43l-0.1,0.1v0.1h0.1v0.2h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l-0.1,0.8H462v0.4h-0.2v0.2h0.1c0.2,0,0.1,0.2,0.1,0.4h0.2v0.2h-0.5v0.2h0.2v0.2h-0.2v0.2h0.2v0.2h-0.2v0.2h0.1v0.1h-0.1\n' +
            '\t\t\tv0.1c0,0.1-0.2,0-0.2,0.1v0.2c0.1,0,0.2,0,0.2,0v0.2h-0.1l0,0l-0.1,0.1V47h0.1v0.1l-0.1,0.1v0.2h0.1v0.1h0.2v0.2h-0.2v0.1h-0.1\n' +
            '\t\t\tv0.1h0.1V48h-0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.8h-0.1v0.2h-0.1v0.1H461v0.2h-0.1l0.1,0.2h0.1v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.2h0.1l0.1,0.1h0.1v0.1h0.1l0.1,0.1h-0.1v0.3h0.1l0.2,0.1h-0.2v0.1h0.1l0.2,0.1h0.2v0.1h0.1v0.1h0.2v-0.1c0-0.1,0.2,0,0.2,0\n' +
            '\t\t\tv-0.2h-0.1v-0.1l0.1-0.1V51h0.2c0-0.1,0-0.2,0-0.2h0.4v-0.3h0.2v-0.5h0.1l0,0c0-0.1,0.1-0.1,0.2-0.1v-0.1h0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tl-0.3,0v-0.2h0.2v-0.1h0.1v-0.1l0.1-0.1c0.1,0,0.2,0,0.2,0.1l0,0l0.1-0.7h0.3v-0.2h0.2V48h-0.1v-0.2h0.3v-0.5h-0.2v0.1l-0.1,0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.4,0v-0.1h0.1v-0.1l0.1-0.1V47h0.1v-0.1c0.2-0.1,0-0.3,0.1-0.5h0.2l0,0l0.1-0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1c0.1-0.1,0.2,0,0.3,0V46h0.1l0,0l0.1-0.1v-0.6h0.2v-0.2h0.2v-0.8h0.1v-0.1h0.1v-0.1h0.5v0.4h0.2v0.2h-0.1v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.1v0.2h0.2v0.2h-0.2v0.2h0.2v0.2h-0.1v0.2h0.1v0.1h0.1v-0.1h0.1v-0.2h0.1v0.1h0.1v0.2h-0.2v0.1l-0.1,0.1v0.3h0.1\n' +
            '\t\t\tc0,0.2,0,0.2,0,0.4h-0.1v0.2h0.1l0.1,0.1h0.1V47h-0.1v0.2h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.3c0,0.2,0,0.3,0,0.5h-0.1v0.2h0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3\n' +
            '\t\t\tv0.1h0.1l0.1,0.1h0.3l0,0l0.1-0.1l0,0l0.1-0.1l0,0h0.1v-0.2h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.2l0,0l0.1-0.1V48h-0.1v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.1l-0.1-0.1h0.1v-0.1l0.1-0.1v-0.2h0.7v-0.2h-0.2V47h-0.1V47l0.1-0.1v-0.2h-0.2v-0.2h0.3v0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1c0,0.1,0,0.2,0,0.2h0.2v-0.3h0.1c0.2,0,0.1,0.2,0.2,0.3h0.1v-0.1h0.1v-0.2h0.1v0.1h0.2v-0.2h0.2v-0.9h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1l0.1,0.2h0.1v-0.1l0.1-0.1v0.1h0.1v-0.2h0.1v-0.2h-0.2v-0.1h-0.1v-0.1l0.1-0.1V45h-0.2v-0.2\n' +
            '\t\t\th0.1l0.1,0.1h0.1V45h0.5v-0.2h-0.5v-0.2h0.7v0.1h0.1v-0.2h0.1v-0.1l0.1-0.1v0.1h0.2v-0.2h-0.2v-0.2h0.1l0,0h0.1v-0.1l0.2-0.1v-0.3\n' +
            '\t\t\th-0.1v-0.2h0.2v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1l0.1-0.1c0.1,0.1,0,0.2,0,0.4h0.1v0.1h0.1c0,0.1,0,0.2,0,0.2h0.3\n' +
            '\t\t\tv-0.2h0.2v-0.1H474v-0.2h0.2v-0.1l0.1-0.1v-0.1l0,0v0.1h0.2v-0.2h-0.2V43h0.2v0.1h0.1V43l0.1-0.1l0.1,0.1h0.2v0.2h-0.2v0.1h-0.1\n' +
            '\t\t\tl0,0l-0.1,0.1v0.3h0.2v0.2h0.1v0.1h0.1V44h0.1v-0.2h0.1l0,0l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.2v0.2h-0.1v0.2h0.1v0.1h-0.1v0.2\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v0.1c0,0.1-0.1,0-0.2,0.1l0,0h-0.1v0.1l-0.1,0.1l0,0h-0.1v0.2h0.1l0.2,0.1h0.1v0.1h-0.1v0.8h0.2v0.9\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.2h-0.3V48h0.1v0.1h0.2v0.6h0.1l0.1,0.1l-0.1,0.1V49h-0.1V49h0.1v0.1h0.1l0.2,0.1h0.1v0.1h0.1\n' +
            '\t\t\tv0.2h-0.1v0.3h0.1v0.1h0.1v-0.1h0.1v0.1h0.1v0.2h-0.2v0.2h0.6v0.1h0.1v0.1h0.2v0.3h0.1c0.2,0,0.1,0.2,0.1,0.2c0.1,0,0.2,0,0.2,0\n' +
            '\t\t\tv0.1h0.1v0.2h0.1v-0.2h0.1l0,0c0.2-0.1,0.4,0,0.6,0v0.1h0.1V51h0.1v-0.1h0.2V51h0.2v-0.3h0.2v-0.5h-0.3L478.7,50.1z"/>\n' +
            '\t\t<path class="st4" d="M468.4,40.5L468.4,40.5L468.4,40.5z"/>\n' +
            '\t\t<polygon class="st4" points="468.4,40.5 468.5,40.5 468.5,40.5 \t\t"/>\n' +
            '\t\t<path class="st4" d="M493,47.3h-0.2v-0.1h-0.3v-0.2h0.1V47h0.1V47h0.2v0.1h0.1v0.1h0.1L493,47.3L493,47.3z M492.5,46.7h0.2v0.1\n' +
            '\t\t\tL492.5,46.7L492.5,46.7z M492.3,47.1L492.3,47.1L492.3,47.1L492.3,47.1L492.3,47.1z M492,47.3h-0.2v-0.2h0.2L492,47.3L492,47.3\n' +
            '\t\t\tL492,47.3z M491.4,47h-0.2v-0.1L491.4,47L491.4,47z M491.1,47.6H491v-0.1L491.1,47.6L491.1,47.6z M491.1,48H491V48L491.1,48\n' +
            '\t\t\tL491.1,48z M491,48.2h-0.2v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H491L491,48.2z M491,48.7h0.2v0.2H491V48.7z\n' +
            '\t\t\t M491.2,49.7V50H491v-0.2C491.2,49.8,491,49.7,491.2,49.7 M491.2,49h0.2v0.1l-0.1,0.1v0.1h-0.1L491.2,49L491.2,49z M491.2,48.7\n' +
            '\t\t\tL491.2,48.7L491.2,48.7L491.2,48.7L491.2,48.7z M491.3,49.7h0.2v0.2h-0.2V49.7z M490.4,46.3h-0.2v0.1l-0.2,0.1l0,0h-0.1v-0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1l-0.1-0.1h-0.1v-0.4h0.4V46h0.1v0.1h0.2L490.4,46.3L490.4,46.3z M488.9,49.5h-0.3v-0.1h-0.1v-0.1h0.1v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1c0-0.1,0.1-0.2-0.2-0.2l0,0v-0.2h0.1v0.1h0.1c0,0.1-0.1,0.2,0.2,0.2h0.1l0.1,0.1h0.1v0.1h0.1v0.2h0.2L488.9,49.5\n' +
            '\t\t\tL488.9,49.5z M488.7,48.9L488.7,48.9L488.7,48.9L488.7,48.9L488.7,48.9z M487.9,42.1h-0.2V42h-0.1v-0.1c0.1,0,0.1-0.1,0.1-0.1h0.2\n' +
            '\t\t\tv0.1h0.1V42.1z M487.6,43.7L487.6,43.7L487.6,43.7h-0.3v-0.2h0.2L487.6,43.7L487.6,43.7L487.6,43.7z M487.5,46.4h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1H487v-0.1h-0.1v-0.1c-0.1,0-0.2,0-0.3,0v0.1h0.1v0.1h0.2v0.1l-0.1,0.1l0,0l-0.2,0.1v0.1h0.1l0.1,0.1h0.1v0.2h-0.1v-0.1\n' +
            '\t\t\th-0.2v-0.1h-0.1v-0.2h-0.1v-0.1h-0.1v-0.1l0.1-0.1l0,0h0.1v0.1h0.2v-0.2h-0.2V46h-0.2v0.1h-0.1v0.1H486v0.2h0.2v0.1H486l-0.1-0.1\n' +
            '\t\t\th-0.1v0.2h-0.1v0.1h-0.1c0-0.1,0.1-0.3-0.2-0.2l-0.1,0.1v0h-0.2v-0.2c-0.1,0-0.2,0-0.2,0v-0.1h-0.1v0.2l-0.1,0.1l0,0h-0.2v0.2\n' +
            '\t\t\tl-0.1,0.1v0.1h-0.2v-0.1h0.1v-0.2h-0.2v-0.1h-0.1v-0.2l-0.1,0.1v0.1c-0.1,0-0.3,0-0.3,0v0.1l-0.1,0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2\n' +
            '\t\t\th-0.1l-0.1-0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1v-0.2h0.1V46h-0.1v-0.2l0.1-0.1v-0.1h0.1v0.1l0.1-0.1v-0.1h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tv-0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.2c0.1,0,0.2,0,0.2-0.1v-0.1h-0.1v-0.2l0.1-0.1v-0.1h0.1c0-0.2,0-0.3,0-0.5h-0.1v-0.2h0.4v-0.2\n' +
            '\t\t\th-0.1v-0.1h0.2v-0.1h0.1v-0.2h-0.2c0-0.1,0.1-0.3-0.1-0.3h-0.1v-0.5h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th0.2v-0.2h0.5v0.3h-0.1v0.1h0.1v0.1c0.2,0,0.3,0,0.5,0v-0.1h0.1v0.1h0.1v0.2h-0.2v-0.1l-0.1,0.1v0.1H486c0,0.2,0,0.3,0,0.4h0.2\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.1h0.2v0.4h-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1v0.1h-0.2v0.1l-0.2,0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.2h-0.1l0.1,0.1h0.1l0.1,0.1h0.1v0.2h-0.1v0.2h0.1l0.1,0.1l0.1-0.1v-0.1h0.3c0.1,0.1-0.1,0.2,0.1,0.2h0.1v0.3h0.2\n' +
            '\t\t\tL487.5,46.4z M487.1,47.8L487.1,47.8L487.1,47.8L487.1,47.8L487.1,47.8z M486.8,46.9L486.8,46.9L486.8,46.9L486.8,46.9L486.8,46.9\n' +
            '\t\t\tz M484.5,43.5L484.5,43.5L484.5,43.5l0.2,0.1v0.2h-0.2V43.5z M484.8,42.4L484.8,42.4L484.8,42.4L484.8,42.4L484.8,42.4z\n' +
            '\t\t\t M485.1,40.8h0.2c0,0.1-0.1,0.2,0.1,0.2h0.1v-0.2h0.2v0.1h0.1v0.1h0.1v0.4h-0.5v-0.2h0.1l-0.2-0.1h-0.1V41h-0.1L485.1,40.8\n' +
            '\t\t\tL485.1,40.8z M486,39.6L486,39.6L486,39.6L486,39.6L486,39.6z M486.2,39.5h0.2v0.2h-0.2V39.5z M486.4,39.2h0.2v0.1L486.4,39.2\n' +
            '\t\t\tl0.1,0.2h-0.1V39.2z M486.5,38.4L486.5,38.4l0.1,0.2h-0.1V38.4z M486.6,38.7c0.2,0.1,0-0.2,0.2-0.1V39h-0.1V39h-0.1V38.7z\n' +
            '\t\t\t M487.5,41.6c0.2,0.1,0-0.2,0.2-0.1v0.2L487.5,41.6L487.5,41.6z M483.4,48.3L483.4,48.3L483.4,48.3l-0.2,0.1v-0.2h0.1L483.4,48.3\n' +
            '\t\t\tL483.4,48.3L483.4,48.3z M483,43.3L483,43.3l-0.1-0.2h0.1V43.3z M482.9,48.7L482.9,48.7L482.9,48.7l-0.2,0.2l0,0h-0.2V49l-0.2,0.1\n' +
            '\t\t\tv0.1h-0.2V49h0.1v-0.2h-0.1v-0.2h0.1l0.1,0.1h0.1l0.1,0.1l0.1-0.1v-0.1h0.2v-0.2h0.2L482.9,48.7L482.9,48.7z M482.7,49.3h-0.2\n' +
            '\t\t\tv-0.1L482.7,49.3L482.7,49.3z M482.5,45.9v0.2h-0.1L482.5,45.9L482.5,45.9z M482.1,44.8L482.1,44.8L482.1,44.8L482.1,44.8H482\n' +
            '\t\t\tv-0.1L482.1,44.8v-0.4h0.2v0.1h0.1v0.1h-0.1v0.2H482.1z M482,49.6L482,49.6L482,49.6l-0.2,0.1v-0.2L482,49.6L482,49.6z\n' +
            '\t\t\t M481.8,49.4h0.2v0.1L481.8,49.4L481.8,49.4z M482.7,48.1L482.7,48.1L482.7,48.1L482.7,48.1L482.7,48.1z M481.7,50.9L481.7,50.9\n' +
            '\t\t\tl-0.2,0.1v-0.2L481.7,50.9L481.7,50.9L481.7,50.9z M481.7,51.4h-0.2v0.1h-0.1v-0.2l0.1-0.1h0.2V51.4z M481.2,46.7H481v-0.1\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1V46.7z M480.6,49.7h-0.2v0.3l-0.1,0.1v0.1h-0.1c0-0.1,0-0.2,0-0.2h-0.1v-0.2l0.1-0.1v-0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1l-0.1-0.1h-0.1v-0.2h0.1v-0.1l0.1-0.1h0.2v0.2l-0.1,0.1v0h0.4L480.6,49.7L480.6,49.7z M480.6,50.4h-0.2v-0.2h0.2V50.4z\n' +
            '\t\t\t M480.3,49h0.2V49L480.3,49L480.3,49z M480.5,49L480.5,49l0.1,0.2h-0.1V49z M493.6,46.6h-0.3v0.1h-0.1v-0.3h0.2l0,0h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1v0.2H493v0.2h-0.1v-0.1h-0.1l-0.1-0.2h-0.3v-0.2h0.1v-0.1h-0.1c-0.1,0-0.1,0-0.1-0.1h-0.1l-0.1-0.1c0.2-0.1,0.3,0,0.5,0v-0.5\n' +
            '\t\t\th-0.1l0,0h-0.1v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.1h-0.2v0.2h0.1v0.1h0.1v0.1h-0.1l0,0l-0.1,0.1l-0.1-0.1H492\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.2-0.3l0,0v0.1h-0.3v-0.1h-0.1v0.2h-0.1l0,0h-0.1v0.1h-0.2v0.2h-0.2v-0.2h-0.5v0.2h0.1v0.1c-0.1,0.1-0.2,0-0.3,0\n' +
            '\t\t\tv-0.2h0.1v-0.1h-0.2l0,0H490v0.1c-0.1,0.1-0.3,0-0.5,0v-0.2h-0.1l-0.1-0.1h-0.1v0.1h-0.1v0.1l-0.1,0.1l0,0h-0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.1v-0.2h0.1v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2H488v-0.1h-0.1V45h0.1v-0.2h-0.2v-0.2h0.2\n' +
            '\t\t\tv-0.2h0.2v-0.2h0.1v0.1h0.2v-0.2h-0.1c-0.1-0.1-0.1-0.2-0.1-0.3h-0.1v-0.1l0.2-0.1l0,0h0.1v-0.1h-0.1v-0.1h-0.1v0.1l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.1v0.1l-0.1,0.1v0.2h0.1V44c0,0.1-0.2,0-0.2,0.1v-0.7h0.1v-0.2h0.2l0,0l0.1-0.1v-0.1h-0.1L488,43h-0.1v-0.1c-0.1,0-0.2,0-0.2,0\n' +
            '\t\t\tv-0.2h0.2V42h-0.1c-0.2,0-0.1-0.2-0.1-0.3h-0.2v-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1v-0.2h-0.1v-0.2h0.1v-0.2h-0.1v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h0.1v-0.5H487v-0.5h-0.2v0.4h-0.2c0-0.2,0-0.3,0-0.4h0.1v-0.1h0.1v-0.2h0.2v-0.2h-0.3v-0.2h0.3V39h-0.3v-0.2h-0.2v-0.2\n' +
            '\t\t\th0.1v-0.2h-0.2v-0.1h-0.1v-0.1h-0.1c0-0.1,0-0.2,0-0.2h0.2V38h-0.1V38h-0.1V38h-0.2V38H486V38h-0.1v-0.1h0.1v-0.2h-0.2v-0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.2l-0.1,0.1v0.1l-0.1,0.1v0.1c-0.1,0.1-0.2,0-0.4,0V38l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.3h-0.1v0.1l-0.1,0.1v0.1h0.2v-0.1\n' +
            '\t\t\th0.1v0.2h-0.2V39h-0.1V39h0.1v0.1h0.1l0.1,0.1c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h-0.1v0.1l-0.2,0.1v0.2c0.1,0,0.2,0,0.2,0v0.1\n' +
            '\t\t\th-0.1v0.1h-0.2V40h0.1v0.2h-0.2v0.1l-0.1,0.1v0.1H484v0.4h-0.2c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.3v0.2h-0.3v0.2h0.1v0.1h0.1l0.1,0.1\n' +
            '\t\t\th-0.1V42l-0.1,0.1v0.1h0.2v-0.1h0.2v0.2H484v0.1l-0.1,0.1v-0.1h-0.5v-0.1h-0.2v0.2h0.1v0.2h-0.1v-0.1h-0.2v0.3h0.2v-0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1l-0.2,0.1v0.1h-0.1l0,0c-0.1,0.1-0.3,0-0.4,0v0.2h0.1l0.1,0.1h-0.1v0.1h-0.1v0.1h0.1v0.1h0.1l0.1,0.1h-0.2v0.5h0.1v0.1\n' +
            '\t\t\th-0.1v0.1h-0.2v-0.2h-0.1v-0.1h-0.1v0.1l-0.2,0.1v0.2h-0.2v-0.1H482v0.1H482l0,0c0,0.1-0.1,0-0.2,0.1v0.2h0.3V45H482\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v0.2h-0.1v0.1l-0.2,0.1v0.1h0.1l0.1,0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v-0.5l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.2V45H481v0.2h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.1h0.1v0.2h-0.3l0,0h-0.2v-0.1h-0.1v0.1\n' +
            '\t\t\tH481v0.1H481l0,0l-0.1,0.1v0.3h0.1v0.1h0.4v0.2H481v-0.1h-0.1v0.2l-0.1,0.1l0,0l-0.1,0.1l0,0h-0.1v0.1h0.1v0.2h-0.2v0.1l0,0V47\n' +
            '\t\t\th0.2v-0.2h0.3V47h0.1V47H481v0.1c-0.1,0.1-0.2,0-0.3,0v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.2H481v0.1c0,0.1-0.2,0-0.2,0.1V48\n' +
            '\t\t\th0.2v0.2h-0.1v0.2h-0.1v0.2h-0.3v-0.2h-0.2v0.1h-0.1v0.1h0.1v0.1l-0.1,0.1v0.2H480v0.1h0.1V49h-0.2v0.5h-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1l-0.1,0.1v0.1H480V50h0.1v0.1h0.1v0.2h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.2h0.1v0.1h0.2v0.2h0.2v0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0.1,0.5h0.1l0.2,0.1l0,0v0.1h0.1v0.2h0.4v-0.2h0.2v-0.5H482l-0.1-0.1l0.1-0.1v-0.1h0.1v-0.2h0.2v-0.4h0.3V50h-0.1\n' +
            '\t\t\tv-0.1h-0.2v0.3h-0.3v-0.1h-0.1c0-0.1,0-0.2,0-0.4h0.2v-0.2h0.2v-0.2h0.2v-0.2h0.1v0.1h0.1v0.1h0.2v-0.2h0.1v-0.1L483,49V49h-0.2\n' +
            '\t\t\tv-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h0.1l0.1,0.1h0.1l0,0h0.1c0.1,0,0.2,0.1,0.1,0.1h0.1l0.1,0.1h0.4v-0.2h-0.1v-0.1h-0.1\n' +
            '\t\t\tv0.1h-0.2v-0.2h0.6v0.2h-0.1v0.1h0.1v0.1c0.1,0,0.2,0,0.2,0V49h0.2c0-0.1,0-0.2,0-0.2h0.1v0.1h0.2v-0.2h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.3-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v0.2h-0.1v0.1h0.1v0.1h1v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.2h0.3\n' +
            '\t\t\tv-0.2H487v-0.2h-0.3v-0.2h-0.5V48h-0.2v0.2h0.1l0.1,0.1c0,0.1-0.1,0-0.2,0.1v0.2h0.2v0.2h-0.3v-0.3h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1\n' +
            '\t\t\tl0.1-0.1V48h0.1l0.1,0.1h0.2V48h0.1v-0.1l0.1-0.1v-0.2h0.1c0.1,0,0.1,0.1,0.1,0.1h0.1v0.1h0.1v0.1h0.1l0,0l0.1-0.1v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.3,0v0.2h-0.1v0.2h0.2V48l0.1-0.1l0.2,0.1l-0.1,0.1v0.1l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1c0.1-0.1,0.2,0,0.4,0v0.1\n' +
            '\t\t\th0.1v0.1h0.1v-0.1h0.2v0.4h0.2v0.4h0.1l0.1,0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.1v-0.2h0.1\n' +
            '\t\t\tv-0.1h0.1v0.1h0.2v-0.1h0.1v0.1h0.1V50H489v0.2h0.1c0.2-0.1,0.1,0.2,0.2,0.2s0.2,0,0.2,0v0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1v0.2\n' +
            '\t\t\th-0.1v0.2h0.1l0.1,0.1h0.1v0.2h0.1v0.2h0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v-0.2h0.2v-0.2h-0.2v-0.2h0.6v0.5h0.4v-0.1h-0.2v-0.2h0.1\n' +
            '\t\t\tv0.2h0.1V51h0.1v-0.1h0.2v-0.1H491v-0.1H491v-0.1h0.2v-0.4h0.2V50h0.1v0.1h0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1\n' +
            '\t\t\tc0-0.1,0.2,0,0.2-0.1v-0.2h-0.3v-0.1h-0.2v0.2h-0.2v-0.2h0.1v-0.1l0.1-0.1v-0.1h0.1l0.1,0.1h0.1v-0.2h0.1v-0.1l0.1-0.1v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v-0.1h0.1v-0.1H492V49h0.2v-0.2H492v0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.2h-0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1l0.1-0.1v-0.2\n' +
            '\t\t\th-0.1l-0.1-0.1H491v-0.2h0.1l0.1,0.1h0.2v-0.1h-0.1v-0.1h-0.1V48h0.1v0h-0.1v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1V48h0.2v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1h0.2v0.2h0.3v-0.2h-0.1l-0.1-0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v-0.1l0.1-0.1l0.2,0.1h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v0.1h0.1v-0.1L493,47v-0.2h0.1l0.1,0.1h0.1v-0.2h0.2v-0.1L493.6,46.6L493.6,46.6c-0.2,0-0.2,0-0.3,0v-0.2h0.2v-0.1h-0.1\n' +
            '\t\t\tL493.6,46.6z"/>\n' +
            '\t\t<polygon class="st4" points="501.1,37.4 501,37.4 501,37.5 501.1,37.5 \t\t"/>\n' +
            '\t\t<path class="st4" d="M446.2,48L446.2,48l-0.1,0.2h-0.2V48l0.1-0.1L446.2,48L446.2,48z M446.1,47.3L446.1,47.3L446.1,47.3\n' +
            '\t\t\tL446.1,47.3L446.1,47.3z M445.8,49.7L445.8,49.7l-0.1,0.2h-0.1v-0.2L445.8,49.7L445.8,49.7z M445.2,50.1L445.2,50.1L445.2,50.1\n' +
            '\t\t\tl-0.2,0.1v-0.1H445V50L445.2,50.1C445.2,50,445.2,50.1,445.2,50.1z M443.8,51.3h-0.4v-0.2h0.1v-0.2h0.2V51h-0.2v0.2h0.2\n' +
            '\t\t\tC443.8,51.1,443.8,51.3,443.8,51.3z M443.2,51.4H443v0.1h-0.5v0.1h-0.2v-0.2c0.1,0,0.3,0.1,0.3-0.1v-0.1h0.2v-0.1h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.1h0.2c0,0.1-0.1,0.3,0.1,0.3h0.1L443.2,51.4L443.2,51.4L443.2,51.4z M441.2,49.4H441v-0.2c0.2,0.1,0-0.2,0.2-0.1V49.4z\n' +
            '\t\t\t M440.9,49.6L440.9,49.6L440.9,49.6l-0.6,0.1v-0.2h0.2v0.1C440.6,49.5,440.7,49.6,440.9,49.6L440.9,49.6L440.9,49.6L440.9,49.6\n' +
            '\t\t\tL440.9,49.6L440.9,49.6z M440.8,51.8L440.8,51.8L440.8,51.8l-0.2,0.1v-0.1h-0.2v-0.1l0.1-0.1h0.2L440.8,51.8L440.8,51.8\n' +
            '\t\t\tL440.8,51.8z M439.5,49.4L439.5,49.4L439.5,49.4L439.5,49.4L439.5,49.4z M439.2,51.4L439.2,51.4L439.2,51.4L439.2,51.4L439.2,51.4\n' +
            '\t\t\tz M438.9,51.4L438.9,51.4L438.9,51.4l-0.2-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1C438.9,51.2,438.9,51.4,438.9,51.4z M438.8,50.8\n' +
            '\t\t\tL438.8,50.8h-0.2v-0.2h0.2L438.8,50.8L438.8,50.8z M438.2,50.8L438.2,50.8L438.2,50.8l-0.5,0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tl0.1,0.1h0.1v-0.1h0.2V50.8z M436.4,49.7h-0.3v-0.2h0.3V49.7z M442.5,44.9h-0.2l0,0H442.5L442.5,44.9z M442.3,47h-0.2l-0.1-0.1\n' +
            '\t\t\tH442v-0.1h0.3V47z M442,44.6L442,44.6L442,44.6l-0.2-0.1v-0.1h0.2V44.6z M441.7,47L441.7,47L441.7,47l-0.2,0.1V47h-0.1v-0.2H441\n' +
            '\t\t\tv-0.2h0.2v0.1h0.5V47z M440.9,46.6L440.9,46.6L440.9,46.6l-0.2,0.1v-0.2c0.2,0.1,0-0.2,0.2-0.1L440.9,46.6L440.9,46.6L440.9,46.6z\n' +
            '\t\t\t M439.9,43.5c-0.1,0-0.2-0.1-0.2,0.1v0.1h-0.2v-0.2C439.8,43.5,439.6,43.3,439.9,43.5L439.9,43.5z M438.6,43.4h-0.2v0.1h-0.1v-0.2\n' +
            '\t\t\tc0.2,0.1,0-0.2,0.2-0.1V43.4z M437.5,45.5h-0.2v-0.1L437.5,45.5L437.5,45.5z M437.1,42.7L437.1,42.7L437.1,42.7l-0.2,0.1l-0.1-0.1\n' +
            '\t\t\tl0,0v-0.1L437.1,42.7L437.1,42.7z M436.8,42.5L436.8,42.5L436.8,42.5L436.8,42.5L436.8,42.5z M434.8,42.6h-0.3v-0.2h0.3V42.6z\n' +
            '\t\t\t M434.8,44.2h-0.2V44h0.2V44.2z M437.6,41.5L437.6,41.5L437.6,41.5L437.6,41.5L437.6,41.5z M438.8,41.1h0.2v0.2h-0.2V41.1z\n' +
            '\t\t\t M439.6,40.9h0.5v0.2h-0.4L439.6,40.9L439.6,40.9L439.6,40.9z M440,38.7L440,38.7L440,38.7L440,38.7L440,38.7z M441.5,40.4\n' +
            '\t\t\tL441.5,40.4L441.5,40.4L441.5,40.4L441.5,40.4z M441.5,38.6h0.2v0.1L441.5,38.6L441.5,38.6z M441.5,38.3h0.4v0.2h-0.4V38.3z\n' +
            '\t\t\t M442.3,40.2L442.3,40.2L442.3,40.2L442.3,40.2L442.3,40.2z M446.4,47.7c-0.2,0-0.1-0.2-0.1-0.3h-0.1v-0.2h-0.1\n' +
            '\t\t\tc-0.1-0.2,0-0.4,0-0.6h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.1v0.1h-0.2v-0.1h-0.2v0.2h-0.1v0.1h-0.1v-0.1h-0.2l0,0h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.2v-0.2h-0.1v-0.1h0.1V46h0.5v-0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v-0.1H445l0,0h-0.1v0.1c-0.1,0.1-0.3,0-0.5,0v-0.3\n' +
            '\t\t\th-0.2v-0.1H444v-0.1h-0.1v-0.1h-0.1v-0.1h0l-0.1-0.1h-0.3v-0.2h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.2h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.4v0.1h-0.1v0.1l-0.2,0.1v0.2h-0.2V45h-0.1v-0.1h-0.1v-0.2h0.1v-0.1h-0.1v-0.1H442v-0.2h-0.4v-0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.2v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.2h-0.1l-0.1-0.1h-0.1l-0.1-0.1H441v-0.1H441l-0.1-0.1h-0.1l-0.1-0.2l0,0v0.1h-0.2V44\n' +
            '\t\t\th0.2v-0.1l0,0v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.2v-0.1h-0.1v-0.1H440v-0.1h-0.1v-0.1h-0.4v0.1l-0.1-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th-0.1l0,0l-0.2,0.1v0.2H439l0,0h-0.3V43h-0.2l0,0l-0.1,0.1V43h-0.1v-0.2l0,0v0.1h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.3v0.2\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.1h-0.1v-0.1h-0.1l-0.1-0.2h-0.1v-0.1h-0.3v-0.1h-0.2v-0.2c0.1,0,0.2,0,0.2,0v0.1h0.2v-0.1h-0.1v-0.2h0.2\n' +
            '\t\t\tV42l0.1-0.1v-0.1h-0.1v-0.2h0.1v-0.1h0.1l0.2,0.1l-0.1,0.1v0l0,0v0.1c0.1,0,0.2,0,0.2,0V42h0.2v-0.2h0.4v-0.1l0.1-0.1v-0.1\n' +
            '\t\t\tc-0.2-0.1-0.1-0.2-0.1-0.4h-0.2v-0.1h0.1v-0.1h0.3v0.5h0.4v-0.1h0.1v-0.1l0.1-0.1l0,0h0.1v-0.1l0.2-0.1v-0.1h-0.1v-0.2h0.1V41h0.1\n' +
            '\t\t\tc0,0.1,0,0.2,0,0.2h0.2v-0.1h0.1v0.1h0.1v0.2h0.2v-0.1l0.1-0.1v-0.2h0.1v0.2h0.1v0.1h0.1v-0.1l0.1-0.1c0.1,0,0.2,0.1,0.1,0.1h0.1\n' +
            '\t\t\tv-0.1l0.1-0.1v-0.2h-0.1v-0.1c0-0.1,0.1,0,0.2-0.1v-0.1h0.1v-0.2h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.1h0.1v0.1h0.2v-0.2\n' +
            '\t\t\tH441l0.1,0.2H441v-0.2h0.8v0.1h0.1v0.1h0.5v-0.2h-0.1v-0.2h0.1v-0.1h0.1v-0.1c0.1,0,0.2,0,0.2,0v0.1h0.2v-0.1l0.1-0.1v-0.1l0,0\n' +
            '\t\t\th-0.2h-0.1l-0.1-0.1h0.2v-0.1h0.1V40l0.1-0.1V40h0.1v0.1h0.4v-0.2h0.2l0,0h0.1v-0.2h0.1v-0.1h0.1v-0.1l0.1-0.1l0,0h0.1v-0.2h-0.1\n' +
            '\t\t\tv-0.1h0.2V39h-0.1V39h-0.1v-0.1h-0.1c0-0.2,0-0.5,0-0.7H444l-0.1-0.1h-0.1V38l0,0V38h-0.1v-0.1h-0.1l-0.1-0.1h-0.2l-0.1,0.1V38\n' +
            '\t\t\th-0.2v-0.1h0.1V38h-0.1l-0.2-0.1h-0.2V38h-0.1l-0.1-0.1h-0.1l0-0.1h-0.2v0.2h-0.2V38H442v-0.2h-0.5V38h-0.2v0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1l0.1,0.1c-0.1,0.1-0.3,0-0.4,0.1v0.1h-0.1v-0.1H441v-0.1h-0.3v0.1l-0.1,0.1c-0.1-0.1,0-0.2,0-0.3\n' +
            '\t\t\th-0.3v0.2h-0.5v0.1c0.2,0.1,0.1,0.3,0.1,0.5h-0.2v-0.4h-0.2v0.3h-0.2V39h-0.1V39h0.1v0.1h-0.1l0,0c-0.1,0.1-0.3,0.1-0.4,0V39h0.3\n' +
            '\t\t\tv-0.4h-0.1v-0.1h-0.1v0.1H439v0.1h0.1v0.2h-0.9V39h-0.2c0,0.2,0,0.3,0,0.4H438v0.1h-0.1v-0.1l-0.3,0.1v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.1-0.1,0-0.3,0-0.4h-0.3v0.2H437v0.2h0.1v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.2h-0.2v0.2h-0.2v0.2h0.1v0.1\n' +
            '\t\t\th0.1l0.1,0.1h0.1v0.2h-0.2v0.1h-0.1l-0.2-0.1l0.1-0.1v-0.2h-0.2v0.5h0.1v0.1h-0.1l-0.1-0.1h-0.1l-0.1-0.1h-0.1v0.1l-0.1,0.1v-0.1\n' +
            '\t\t\th-0.1c0-0.2,0-0.3,0-0.4h-0.2v0.6h-0.5v0.9h0.2v-0.2h-0.1v-0.1h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1l0.1,0.1h0.1v0.1h0.2v0.2h-0.1V42\n' +
            '\t\t\th-0.2v-0.1h-0.1V42h-0.2v-0.1h-0.1v0.3h-0.4v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v0.1h0.1v0.2h-0.2V43H434l0,0l-0.1,0.1v0.2h0.2v0.2\n' +
            '\t\t\tH434v0.1h0.1l0.1,0.1h0.2v-0.3h-0.1v-0.1l0.1-0.1v-0.3h0.1v0.1h0.1l0.2,0.1l-0.1,0.1v0.5h0.2v0.2h-0.1v0.2h-0.2v0.5l0,0l0.1,0.1\n' +
            '\t\t\th0.2v0.3h0.2v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h-0.1v-0.2h0.5v0.1h0.1l0.1,0.1h0.3v0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1h0.2v0.1h0.1v0.3h-0.3v0.2h0.1v0.1h0.1v0.2h0.2v-0.2h0.1v0.1h0.5v-0.1h0.1v0.1h0.1v0.2h0.4v-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.5v-0.1h0.1v-0.2h-0.1c0-0.1,0-0.2,0-0.4h0.2v0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.6v0.3h0.2V46l0.1-0.1v-0.1h-0.1v-0.2h0.1l0.2,0.1h0.2v-0.1l0.1-0.1v0.2h-0.2v0.4h0.1v-0.1\n' +
            '\t\t\tc0.2-0.1,0.4,0,0.5,0v0.2h0.5v0.1h0.1v0.1h0.1v-0.1h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.3v0.2h0.2v-0.1h0.1l0.1,0.2h0.1V47h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v0.1h0.3v-0.1l0.1-0.1v0.1h0.1v-0.2h0.1v-0.1h0.1l0.1,0.2h0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1V47h0.3v-0.2h0.1V47h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h0.1v0.1h0.1v0.2h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.1l-0.2,0.1V48h0.1V48h0.2v0.2H444v0.1h-0.2v-0.2h0.1v0.6h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.4v0.2h0.2V49h-0.3v-0.2c-0.1,0-0.2,0-0.2,0v-0.1h-0.1v-0.1h-0.4v0.2h-0.2V49h0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.4v0.1h-0.1v-0.1h-0.1l-0.1-0.2h-0.3v-0.1h-0.1V49h-0.1v0.3h-0.1v-0.1h-0.4V49h0.1v-0.2h-0.5V49h-0.2v-0.2h-0.1l-0.1,0.2h-0.1\n' +
            '\t\t\tV49h-0.2V49h0.1v0.1h0.2V49c0.1-0.1,0.3-0.1,0.5,0v0.1h0.1v0.1c-0.2,0.1-0.3,0-0.5,0v0.1c-0.1,0.1-0.2,0.1-0.4,0v-0.1h-0.2V49\n' +
            '\t\t\th-0.1V49h-0.1V49l-0.1,0.1l-0.1-0.1h-0.1c-0.2,0-0.1-0.1-0.1-0.2h-0.5l0,0c0,0.1-0.2,0-0.2,0.1V49h-0.1c-0.2,0-0.1-0.2-0.1-0.3\n' +
            '\t\t\th-0.3v-0.2h-0.2v0.1l-0.1-0.1v-0.2h-0.1v-0.1h-0.1v0.1h-0.2V48h-0.5v-0.1h-0.1v-0.1h-0.2c0.2-0.3-0.4-0.1-0.5-0.2v-0.1h0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1v0.2h-0.1l0,0l-0.1,0.1v0.1h-0.1v0.1l-0.1-0.1l0,0h-0.2v0.8h0.1v0.1h0.1v-0.2h0.1v-0.1h0.1\n' +
            '\t\t\tc0.1,0.2,0,0.3,0.1,0.5h0.4v0.2h0.2v0.2h-0.2V49h-0.1v0.1h-0.2v0.1h-0.1c0-0.1,0-0.2,0-0.2h-0.2V49l-0.1,0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v-0.1h0.1l0.1,0.1h0.1v0.1l-0.2,0.1v0.1H436v0.1h0.1v0.1l0,0v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2,0,0.1,0.1,0.1,0.2h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.2v-0.2l0,0v-0.2h-0.1v-0.1h0.2v0.4h0.1c0.2,0,0.1,0.2,0.1,0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0.1-0.1l0.1,0.1l0,0v0.1h-0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.2h-0.1v-0.1H437v0.1\n' +
            '\t\t\tl-0.1,0.1l-0.1,0.1l0,0v-0.2h-0.1v0.1l-0.1,0.1v0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2l0,0v0.1h0.1v-0.1h0.1c0.2,0,0.1,0.2,0.1,0.2\n' +
            '\t\t\tc0.1,0,0.2,0,0.2,0v0.1h0.1v0.1h0.2v-0.2h0.3v0.3h0.2v-0.3h0.1v-0.1l0.1-0.1v-0.1h0.3v0.3h-0.2v0.2h0.1c0.1-0.1,0.1,0,0.2,0.1h0.1\n' +
            '\t\t\tv0.1h0.1l0,0h0.1v0.1h0.3l0,0h0.1V52h0.1v0.1h0.1v-0.2h0.1v-0.2h0.2v0.1h0.1v0.1h0.1v-0.1h0.1l0.2,0.1h0.1v-0.1h0.1l0.2,0.1h0.1\n' +
            '\t\t\tV52h0.1v-0.1l0.1-0.1l0.1,0.1h0.1V52h0.4v-0.1h0.1l0,0l0.1-0.1v0h0.1v-0.1h0.1v0.1h0.2v-0.2h0.1v-0.1h0.1l0.1,0.2h0.2v-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2l0,0v-0.2h0.1l0.1,0.1h0.2v-0.1h0.1l0.1,0.2h0.1V52h0.1v-0.1c0-0.1,0.1,0,0.2-0.1c0-0.2,0-0.3,0-0.5h0.3\n' +
            '\t\t\tv0.1h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2c0-0.1,0-0.2,0-0.2h0v-0.1h0.2c0-0.2,0-0.3,0-0.5h0.3v-0.1h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tc0-0.1,0-0.2,0-0.4h0.5v-0.2h0.1l0.2,0.1h0.4v-0.1l0.1-0.1v0.1h0.1V50l0.1-0.1v-0.2h0.2v0.5h0.2v-0.4h0.1l0.2,0.1h0.1v-0.2h0.1\n' +
            '\t\t\tv-0.1h0.1v-0.4h-0.2v-0.2h0.1V49h0.1v-0.1h0.1v-0.1l0.1-0.1v-0.1h-0.2v0.2h-0.1v0.1H446V49h-0.2v-0.2h0.1v-0.1h0.1v-0.2h0.1v-0.1\n' +
            '\t\t\tl0.2-0.1v-0.1l0.1-0.1v0.4h0.1v-0.1h-0.3v-0.2h0.4V48h-0.1C446.4,47.9,446.4,47.8,446.4,47.7"/>\n' +
            '\t\t<polygon class="st4" points="414.1,37.9 414.2,37.9 414.1,37.9 414.1,38 414.1,38 \t\t"/>\n' +
            '\t\t<path class="st4" d="M414.3,37.9L414.3,37.9C414.1,37.7,414.2,37.9,414.3,37.9L414.3,37.9z"/>\n' +
            '\t\t<path class="st4" d="M459.7,49.7L459.7,49.7L459.7,49.7L459.7,49.7c-0.1,0.1-0.2,0.1-0.3,0.1v0.1h-0.2v0.2h0.1V50\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.4,0v0.1h0.1V50h0.1L459.7,49.7L459.7,49.7L459.7,49.7z"/>\n' +
            '\t\t<path class="st4" d="M457.9,48.7h-0.2v-0.1l0,0v-0.1h0.1l-0.1-0.1h-0.1v-0.1h0.1v0.1h0.2V48.7z M458,50.5h-0.3v-0.1\n' +
            '\t\t\tc0.1,0,0.3,0.1,0.2-0.1h0.1V50.5z M457.5,50.8h-0.4v-0.1L457.5,50.8L457.5,50.8z M457.2,48.8h0.2v0.1h0.1V49h-0.1V49h-0.2V48.8z\n' +
            '\t\t\t M454.9,49.2L454.9,49.2L454.9,49.2L454.9,49.2L454.9,49.2z M454.7,51.5L454.7,51.5L454.7,51.5L454.7,51.5L454.7,51.5z\n' +
            '\t\t\t M454.4,51.4L454.4,51.4L454.4,51.4L454.4,51.4L454.4,51.4z M454.3,51.6L454.3,51.6L454.3,51.6L454.3,51.6L454.3,51.6z\n' +
            '\t\t\t M451.9,49.2h-0.2V49c0.2,0.1,0-0.2,0.2-0.1V49.2z M451.7,49L451.7,49L451.7,49l-0.2,0.1c0-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2h0.3\n' +
            '\t\t\tC451.7,48.8,451.7,49,451.7,49z M451.2,51.1H451v-0.4c0.2,0.1,0-0.2,0.2-0.1V51.1z M450.7,48.4h-0.2v0.3h-0.3v-0.2l0.1-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1l-0.1-0.1H450v-0.2c0.2,0.1,0.1-0.2,0.2-0.1v0.2h0.1v0.1h0.1v-0.1h0.2L450.7,48.4L450.7,48.4L450.7,48.4z\n' +
            '\t\t\t M450.4,50L450.4,50l-0.1-0.3h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1V50z M457.9,47.7h-0.2v-0.1L457.9,47.7L457.9,47.7z M457.4,45.6\n' +
            '\t\t\th-0.2v-0.1L457.4,45.6L457.4,45.6z M455.9,46.5h-0.2v-0.1h-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1V46.5z M455,46.6L455,46.6\n' +
            '\t\t\tL455,46.6l-0.2,0.1l-0.1-0.1h-0.1v0.2h-0.2c-0.1-0.1,0.1-0.2-0.1-0.2h-0.1v-0.2h0.2v-0.1c0.2,0.1,0-0.2,0.2-0.1v0.1h0.1v0.1h0.1\n' +
            '\t\t\tv0.1h0.1V46.6z M453.5,43.7h-0.2v-0.2h0.2V43.7z M452.4,45.6L452.4,45.6L452.4,45.6l-0.2,0.1v-0.2h0.2V45.6z M452.3,45.9h-0.2\n' +
            '\t\t\tv-0.2h0.2V45.9z M452,45.6h-0.2v0.1h-0.1v-0.1h-0.1c0-0.1,0.1-0.3-0.1-0.2h-0.1v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1h0.1\n' +
            '\t\t\tc0,0.1-0.1,0.2,0.1,0.2h0.1V45.6z M451.4,43.2l-0.2-0.1h-0.1V43l0.1-0.1h0.2L451.4,43.2l0.2-0.1v0.1H451.4z M451.7,43.2h0.2v0.2\n' +
            '\t\t\th-0.2V43.2z M451.2,43.1H451v-0.2h0.2V43.1z M451,45.3L451,45.3L451,45.3L451,45.3L451,45.3z M450.4,44.6h-0.2v-0.2h0.2V44.6z\n' +
            '\t\t\t M450.3,42.1h-0.2V42h0.2V42.1z M449.6,44.6l-0.2,0.1v0.1h-0.3v-0.1h0.1v-0.1c0.1,0,0.2,0,0.2-0.1L449.6,44.6\n' +
            '\t\t\tC449.6,44.5,449.6,44.6,449.6,44.6z M449.2,42.8L449.2,42.8l0.1,0.2h-0.1V42.8z M449.1,44.2h-0.2v-0.2h0.2V44.2z M448.8,44.6\n' +
            '\t\t\tL448.8,44.6L448.8,44.6L448.8,44.6L448.8,44.6z M448.6,43.6L448.6,43.6L448.6,43.6l-0.2,0.1v0.1h0.1v0.2l-0.1,0.1l0,0h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.1v-0.2h0.2v-0.2l0.1-0.1L448.6,43.6L448.6,43.6z M448.1,42.8L448.1,42.8l-0.1-0.2h0.1V42.8z M451.3,41.4L451.3,41.4\n' +
            '\t\t\tL451.3,41.4L451.3,41.4L451.3,41.4z M451.5,41.4L451.5,41.4L451.5,41.4L451.5,41.4L451.5,41.4z M452,41.3h0.3v0.2H452V41.3z\n' +
            '\t\t\t M454.3,40.7L454.3,40.7L454.3,40.7l0.2,0.1v0.1h-0.2V40.7z M456.8,39.2L456.8,39.2L456.8,39.2L456.8,39.2L456.8,39.2z M456.8,38\n' +
            '\t\t\th0.2V38L456.8,38L456.8,38z M457.2,39h0.2v0.2h-0.2V39z M457.5,38.8L457.5,38.8L457.5,38.8L457.5,38.8L457.5,38.8z M457.7,38.9\n' +
            '\t\t\th0.2v0.2h-0.2V38.9z M459.1,46.6c0.2,0,0.1-0.2,0.2-0.1l0.1,0.1h0.1v0.1h-0.1v0.1h-0.2L459.1,46.6z M460,47.2L460,47.2L460,47.2\n' +
            '\t\t\tl-0.2,0.1v-0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1v0.1h-0.2v-0.4c-0.1,0-0.2,0-0.2,0v-0.1h-0.1V47h-0.1V47h0.5v-0.5h-0.2l0,0\n' +
            '\t\t\tc-0.1,0.1-0.3,0.1-0.4,0v-0.1H459v-0.1h0.1v-0.1l0.1-0.1v0.1h0.2v-0.1l0.1-0.1v-0.1h-0.2v-0.1h-0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v0.1h-0.4l0,0h-0.1v0.2h-0.1v-0.1h-0.3v-0.1H458v-0.1l0.1-0.1v-0.2h-0.2v-0.1h-0.2v0.1h-0.1V45h-0.2v0.1h-0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v0.1h-0.2l0,0l-0.1,0.1v-0.1h-0.2v-0.5H457v-0.1h-0.2v-0.1h-0.1v-0.2h-0.1v0.1c0,0.1-0.2,0-0.3,0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v-0.1h-0.2v-0.1h0.1v-0.2h-0.1l-0.1-0.1h-0.1v0.1h-0.2v-0.2h-0.2v-0.1h-0.1l-0.1-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2\n' +
            '\t\t\tV44l-0.1,0.1v-0.2h-0.1v-0.1h-0.1V44h-0.1v0.1h-0.1c0-0.2-0.4-0.1-0.5-0.1v-0.1h-0.2v-0.1h-0.1v-0.1c-0.2,0-0.1-0.2-0.1-0.3\n' +
            '\t\t\tl-0.6-0.2v-0.1H453v-0.1H453V43h-0.5v0.1l-0.1,0c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1v-0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.4,0v-0.1h-0.4\n' +
            '\t\t\tv-0.2h-0.2v-0.3h-0.1v-0.1h0.1v-0.1h0.1V42h0.2l0,0c0.2-0.1,0.5,0,0.9,0v-0.2h0.2v-0.1h0.1v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2h-0.1v-0.1h-0.1v-0.1h0.1l0.1,0.1h0.2l0,0h0.1v0.2h-0.1v0.1h0.1v0.1h0.2\n' +
            '\t\t\tv-0.1h0.1v-0.1l0.2-0.3v-0.1h0.1v-0.1h0.2v0.1h-0.1V41H454v0.1h0.1v0.1h0.4V41h0.2v-0.3h0.4v0.1h0.1l0.1,0.1h0.2v-0.2h0.2v-0.2\n' +
            '\t\t\th0.2v-0.1h0.2v0.1h0.1v0.1h0.2c0.2,0,0.1,0.2,0.1,0.4h0.2v-0.2h0.2v-0.2h-0.2v-0.2h0.3v0.1h-0.2v0.1h0.1v0.1h0.2v-0.2h0.3v0.1\n' +
            '\t\t\th-0.1v0.2h0.2v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.2v-0.1h-0.1v-0.2c0.1,0,0.2,0,0.2,0V40h0.2v-0.2h0.2\n' +
            '\t\t\tv-1.2h-0.1c-0.1-0.1,0-0.2,0-0.3h-0.1v-0.2h-0.1V38h-0.1v-0.1h-0.2v-0.1h-0.1v-0.1H457l-0.1,0.1V38h-0.1V38l-0.2,0.1v0.1h-0.2\n' +
            '\t\t\tv-0.1h-0.1l-0.1-0.2H456V38h-0.1l-0.1-0.1h-0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.2v0.2h-0.1V38h-0.1v-0.2h-0.1l0,0h-0.1V38\n' +
            '\t\t\th-0.1V38H455v0.1h0.1v0.1l-0.1,0.1v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1v-0.2h-0.6v-0.2H454v0.2h-0.2v0.4h-0.1v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0-0.4,0V39l-0.1,0.1l0,0l-0.2-0.1v-0.1H453l0,0l-0.1,0.1v-0.1h-0.1v-0.2h0.1v-0.1l0.1-0.1v-0.2h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v0.2h-0.2v0.1l-0.1,0.1v0.1l0,0c0,0.1,0,0.2,0,0.4h-0.1c-0.2,0-0.1-0.2-0.1-0.2H452v0.1H452v0.1h0.1v0.1H452v0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2v0.1h-0.2v-0.2H451v0.2h-0.2v0.2c0.1,0,0.2,0,0.2,0v0.1h-0.5l0,0l-0.1,0.1v-0.1h-0.1v-0.2h-0.2v0.1h-0.1v0.4h0.1V40l-0.1,0.1\n' +
            '\t\t\tv0.1c-0.1,0.1-0.3,0-0.5,0V40h-0.2v0.2h-0.3v0.2h0v0.1h-0.1v0.1l-0.1,0.1v-0.2H449v-0.1h-0.1v0.2h-0.2v0.2h0.5v-0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v-0.1h0.2v0.2h-0.1v0.1h-0.1V41h-0.1v-0.1h-0.2v-0.1h-0.1v-0.1h-0.7v0.2h0.1V41h-0.1v0.1\n' +
            '\t\t\tl-0.2,0.1v0.4l0,0l0.2,0.1h0.1v0.1c-0.1,0.1-0.3,0.1-0.5,0v-0.2h0.1v-0.1h-0.1l-0.1-0.1h-0.1c0,0.1,0,0.2-0.2,0.2v1.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v0.1h0.1V43h-0.1v0.2h-0.1v0.1l0,0c0.2,0,0.1,0.2,0.2,0.3h0.2v0.7h0.2V44h0.1v0.1h0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h0.1\n' +
            '\t\t\tc0.1,0.1,0,0.2,0.1,0.3h0.1v0.1h-0.1v0.1l-0.2,0.1v0.2h0v0.1h-0.2v0.2h0.3v-0.2h0.1c0.2,0,0.1,0.1,0.1,0.2c0.1,0,0.2,0,0.2,0v0.1\n' +
            '\t\t\th0.1V45h0.2v-0.2h-0.1v-0.2h0.1v0.2c0.1-0.1,0.2,0,0.4,0l0,0h0.1l0,0l0.1-0.1v0.1h0.1v0.1h0.1v-0.1h0.1v-0.2h-0.1v-0.1h0.1v-0.2\n' +
            '\t\t\th-0.2v-0.2h0.2v0.4h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.2h0.2v-0.2h0.1v0.1h0.1v0.2h-0.1v0.1h0.1v-0.1l0.1-0.1v0.2h0.1v0.2h-0.1\n' +
            '\t\t\tv0.1h-0.2v0.2h0.1l0.1,0.1l0,0v-0.1h0.1v-0.2h0.4v0.5h0.1v0.1h0.1v0.2h0.4v-0.2h0.1c0.2,0,0.1,0.2,0.1,0.4h0.5v-0.1h0.1V46\n' +
            '\t\t\tc0.1-0.1,0.3,0,0.4-0.1v-0.2h-0.2v-0.2h0.1l0.2,0.1h0.2v0.1h0.2v0.2h-0.2v0.2h0.1v0.1h0.2v-0.4h0.3V46l0,0v0.2h0.1l0.2,0.1h-0.1\n' +
            '\t\t\tv0.1c0,0.1-0.2,0-0.2,0.1v0.1l0,0l0.2,0.1h0.1v0.1h0.4V47h0.5v-0.2h-0.1v-0.1h0.1v-0.1c0.1-0.1,0.3,0,0.4,0v-0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.8v0.1h0.1v-0.1c0-0.1,0.1,0,0.2-0.1v-0.1h0.1v-0.1h0.2v0.2h-0.1v0.2h0.1l0.1,0.1h0.1L457,47h0.1v0.1h0.1\n' +
            '\t\t\tv0.1h0.1v0.1h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v0.1h0.1l0.1,0.1h0.2V48l0.1-0.1l0.1,0.1h0.1V48h-0.1v0.1h-0.2V48l0,0v0.1\n' +
            '\t\t\th-0.2v0.1h0.1v0.2h-0.2v0.1h0.1v0.1h0.1l0.1,0.1h0.2v0.2h-0.1v0.1h-0.1v-0.1h-0.2v-0.1h-0.1v-0.2h-0.2v0.1H457v0.1l-0.2,0.2v0.2\n' +
            '\t\t\th-0.1V49h-0.2v-0.2h-0.2v-0.2h-0.3v0.5H456v0.1h-0.2v-0.1h-0.1v-0.1h-0.1v-0.2h-0.2V49h-0.2v0.3h-0.2v-0.2h-0.1V49h-0.1V49H455V49\n' +
            '\t\t\th-0.2v0.2h-0.1v-0.1h-0.1v-0.1h-0.2v0.1h-0.1l-0.1-0.1h-0.2v0.1h-0.2V49h-0.2v0.2h-0.2V49h-0.1V49h-0.1v0.2h0.1v0.1h-0.1v0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1V49h0.1v-0.2h-0.6V49h-0.2v0.2h-0.1l-0.1-0.1h-0.2V49h-0.1v0.2h-0.1v0.1h-0.1c-0.1-0.2,0-0.3,0-0.5H452\n' +
            '\t\t\tc-0.2,0-0.1-0.1-0.1-0.2h-0.3v-0.2h0.1v-0.1h-0.2v-0.1H451v0.1H451v-0.1h-0.1v-0.2h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h0.2V48h-0.3v-0.2\n' +
            '\t\t\tH450v0.5h-0.1l-0.1-0.1h-0.1l-0.1-0.1h0.1v-0.3h-0.7v-0.1h0.1v-0.1h0.2v-0.4h-0.2v-0.2l0,0v0.1H449v0.1h0.1v0.2H449v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1l0.1,0.1h0.1V48h0.1V48h0.1c0.1,0.2,0,0.3,0,0.5h-0.3v0.1h-0.1v0.1h-0.1v0.1l-0.1,0v0.1h0.1V49h-0.2v0.1h-0.1v0.1\n' +
            '\t\t\th-0.1v0.4h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.2v-0.2h0.4v-0.1l0.1-0.1v-0.2h0.1v0.1h0.2v-0.2h-0.1l-0.1-0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.2,0.2h0.2v0.1h0.1v0.1l-0.2,0.1v0.3h0.1v-0.1h0.1v-0.2h0.1v0.2h0.1v0.2h-0.1v0.1h-0.2v-0.1h-0.3v0.1l-0.1,0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.1v0.1l-0.1,0.1v0.2h0.1c0.2,0,0.1,0.2,0.1,0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.2v0.1h0.1l0.1,0.1h0.6v0.1h0.1v0.1h0.2v-0.2h-0.2v-0.1c-0.1,0-0.2,0-0.2,0v-0.2h0.2v-0.2h0.1v0.1h0.3\n' +
            '\t\t\tv-0.2h0.5v0.2h0.3v-0.1l0.1-0.1v-0.1l0.2-0.1v-0.1h0.2v0.1H453v0.2h0.1l0.1,0.1l0,0v0.1v0.2v0.1H453l-0.1-0.1h-0.7v0.2h-0.2v0.3\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3v-0.1h0.1c0-0.2,0-0.3,0-0.5h0.1l0.2,0.1h0.1l0,0h0.1v0.1h0.2v-0.1h0.3v0.1h-0.1v0.1h0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1c0.2-0.1,0.5,0,0.6,0v-0.1l0.1-0.1v0.1h0.1l0.2,0.1h-0.2v0.2h0.1v0.1h-0.1v0.1l-0.2,0.2v-0.2h-0.1v-0.1l0.1-0.1v-0.1\n' +
            '\t\t\th-0.1v0.1h-0.2v0.1h-0.5v0.2h-0.1v0.2h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.3v-0.1h0.1v0.1l0,0v0.2h0.1v-0.1h0.6v-0.2h-0.2v-0.1\n' +
            '\t\t\tl0.2-0.1v-0.1h0.1l0.1,0.1h0.1v-0.1h0.1v-0.1h-0.2v-0.1c0.1-0.1,0.3,0,0.5,0v0.2h-0.1v0.2H455v0.1h-0.1v0.2h0.1v0.1h0.1v-0.1h0.2\n' +
            '\t\t\tv0.1h0.1v-0.2h0.1l0.1,0.1h0.1l0,0h0.1v-0.2h0.1v0.1h0.1v0.2h0.2v-0.4h-0.7v-0.1c0.2-0.1,0.5,0,0.6,0v-0.1l0.1-0.1v-0.1h0.3v0.2\n' +
            '\t\t\th0.2v-0.1l0.1-0.1v0.1c0.1,0,0.2,0,0.2,0v0.1h-0.1l0,0h-0.2v0.1l-0.1,0.1v0.1h-0.1v-0.1h-0.2v0.2h0.2v-0.1h0.1v0.1h0.1v0.2h0.1\n' +
            '\t\t\tv-0.1l0.1-0.1v-0.1h-0.1v-0.2h0.5v-0.2h0.2v-0.2h-0.1V51h-0.1v0.1H457V51h-0.1v-0.2h0.9l0,0l0.1-0.1v-0.1l0.1-0.1l0.1,0.1h0.1\n' +
            '\t\t\tl0.1,0.2h0.2v-0.1h0.1l0.2,0.1l0,0v-0.1h0.1v-0.1h-0.1v-0.2h0.6v-0.2h-0.7v-0.2h-0.1v0.1h-0.2v-0.1h-0.1v0.1h0.1v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tl0.2,0.1h0.2v-0.1l0.1-0.1V50h0.1l0.1,0.1h0.1V50h0.2v-0.1h-0.1v-0.1H459l-0.1-0.1l0.1-0.1v-0.1h0.2v-0.2h0.2l0,0h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1l0.2,0.1h0.1v0.1h-0.1v0.1l0,0h0.2v-0.2h0.1v-0.2h-0.1l-0.1-0.1h0.2v-0.1L460,49V49h-0.1v-0.1h-0.1c0-0.1,0-0.2,0-0.4h0.1\n' +
            '\t\t\tv-0.1h0.1v-0.2h-0.1V48h0.2v-0.2H460l-0.1-0.1h-0.1v-0.2h0.1v-0.1l0.2-0.1L460,47.2L460,47.2L460,47.2z"/>\n' +
            '\t\t<path class="st4" d="M412.1,50.5H412v-0.2h0.2V50.5z M411.8,50.2L411.8,50.2l-0.1,0.2h0.1v0.2h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\tc-0.1,0-0.2,0-0.2,0v-0.1h0.1v-0.1h-0.1V50h0.2v0.2l0.1-0.1V50h0.2V50.2z M411.5,49.7L411.5,49.7L411.5,49.7L411.5,49.7\n' +
            '\t\t\tL411.5,49.7z M411.2,50.6H411v-0.1h-0.1v-0.1h0.3V50.6z M410.8,50.7h-0.2v-0.2h0.2V50.7z M410.2,50.9L410.2,50.9l-0.1,0.2H410V51\n' +
            '\t\t\th-0.1v-0.1C410.1,51,409.9,50.8,410.2,50.9L410.2,50.9L410.2,50.9L410.2,50.9z M409.6,50.6v0.2h-0.2v-0.2H409.6v-0.3h0.2\n' +
            '\t\t\tc0,0.1-0.1,0.2,0.1,0.2h0.1v0.2C409.9,50.6,409.6,50.6,409.6,50.6z M409.6,49.7h0.3v0.2l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1V49.7z M409.2,48.9h-0.4v-0.2h0.4V48.9z M407.1,51.1h-0.3V51c0.1,0,0.2,0.1,0.2-0.1v-0.1c0.2,0.1,0-0.2,0.2-0.1\n' +
            '\t\t\tC407.1,50.8,407.1,51.1,407.1,51.1z M406.7,49.1L406.7,49.1l-0.1,0.2h-0.2v-0.1h-0.1v-0.1h-0.1v-0.1h0.1V49l0.1-0.1v-0.1h0.2v-0.2\n' +
            '\t\t\th0.2V49L406.7,49.1L406.7,49.1z M405.6,51.1h-0.2v-0.2h0.1v0.1h0.1V51.1z M404.7,49L404.7,49L404.7,49l-0.2,0.1V49h-0.1V49h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h0.5V49z M404.2,51.1h-0.2v-0.2H404v-0.1h0.2C404.2,50.8,404.2,51.1,404.2,51.1z M403.8,48.9v-0.2h0.2v0.2H403.8z\n' +
            '\t\t\t M403.1,48.4H403v-0.1L403.1,48.4L403.1,48.4z M402.9,50.3h-0.4v-0.1l0.1-0.1h0.2L402.9,50.3L402.9,50.3L402.9,50.3z M401.3,49.6\n' +
            '\t\t\th-0.2v-0.2h0.2V49.6z M401.1,46.2L401.1,46.2h-0.2v-0.7h0.2c0,0.1-0.1,0.3,0.1,0.3v0.1h0.1V46L401.1,46.2z M401,49.6h-0.2v-0.3\n' +
            '\t\t\th0.2V49.6z M400.5,40.4h-0.2v-0.2h0.2V40.4z M400.3,41.1h-0.2V41h0.2V41.1z M400.3,47.8L400.3,47.8l-0.1-0.2h0.1V47.8z M400,44.2\n' +
            '\t\t\th-0.2v-0.2h0.1L400,44.2L400,44.2L400,44.2z M399.7,42.5L399.7,42.5L399.7,42.5l-0.2,0.1v-0.2c0.2,0.1,0-0.1,0.2-0.1V42.5z\n' +
            '\t\t\t M399.7,46.9h-0.2v-0.2h0.2V46.9z M399.5,45.7h-0.2v-0.2h0.2V45.7z M399.3,44.6L399.3,44.6l-0.1-0.2h0.1V44.6z M402.1,42h0.2v0.1\n' +
            '\t\t\tL402.1,42L402.1,42z M402.4,39.1h0.2v0.1l-0.1,0.1v0.1h-0.1V39.1z M402.5,38.7h0.2v0.1L402.5,38.7L402.5,38.7z M402.6,39.8v-0.2\n' +
            '\t\t\th0.1L402.6,39.8L402.6,39.8z M402.7,41.6L402.7,41.6L402.7,41.6l0.1,0.3h-0.2v-0.2h-0.1v-0.2H402.7z M402.8,41.5h0.2v0.1\n' +
            '\t\t\tL402.8,41.5L402.8,41.5z M402.8,38.7h0.2v0.1l-0.1,0.1v0.1h-0.1L402.8,38.7L402.8,38.7L402.8,38.7z M403.1,41.4L403.1,41.4\n' +
            '\t\t\tl0.1,0.2h-0.1V41.4z M403.7,38.7h0.2V39h-0.2V38.7z M404.3,39.1h0.2v0.2h-0.1L404.3,39.1L404.3,39.1L404.3,39.1z M405,41.7\n' +
            '\t\t\tL405,41.7L405,41.7L405,41.7L405,41.7z M405.5,42.4L405.5,42.4l0.1,0.2h-0.1V42.4z M405.7,43.2h0.2v0.3h-0.1v-0.1h-0.1V43.2z\n' +
            '\t\t\t M406,43.7L406,43.7L406,43.7L406,43.7L406,43.7z M406.1,40.1h0.2v0.1h0.1v0.2h0.1v0.1h0.2l0.1,0.1h0.1v0.1h-0.2v-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.2l-0.1-0.2h-0.1V40.1z M406.8,44.4L406.8,44.4L406.8,44.4L406.8,44.4L406.8,44.4z M406.8,41.8c0.2,0,0-0.2,0.2-0.1v0.1h0.1\n' +
            '\t\t\tl0.1,0.1h0.1V42h-0.2v-0.1H407L406.8,41.8L406.8,41.8L406.8,41.8z M406.4,44.5L406.4,44.5L406.4,44.5L406.4,44.5L406.4,44.5z\n' +
            '\t\t\t M407.5,43.9L407.5,43.9L407.5,43.9L407.5,43.9L407.5,43.9z M412.2,50.1H412v-0.2h-0.3v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.3h-0.1v-0.1h-0.1v0.2h0.1v0.2H411v0.1H411v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.2v-0.2h0.3v0.1h0.1\n' +
            '\t\t\tv0.2h0.1v-0.1h0.1v-0.1l0.2-0.1v-0.1h-0.3v-0.1h-0.1V49l0.1-0.1v-0.2h-0.6v0.1l-0.1,0.1V49H410v0.2h0.1v0.1h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.2h-0.1V49h-0.2V49h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H409v-0.2h0.2v-0.2H409v0.2h-0.1v0.1l-0.1,0.1v-0.1h-0.1v0.1h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1l0,0h-0.1v-0.2h0.1v0.1l-0.1,0.1V49c-0.2,0.1-0.3,0-0.5,0v-0.5h-0.2v0.8h-0.1v0.1h-0.1v0.1h-0.1v0.2l-0.3-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1v-0.2h-0.2v-0.3h0.2v-0.2h-0.1v-0.1h-0.1l-0.1-0.2h-0.2v0.1c-0.2,0.1-0.4,0-0.6,0v-0.1h-0.1v0.1h-0.1v0.2h0.2V49h-0.2\n' +
            '\t\t\tv-0.2h-0.2v0.2h-0.1l-0.1-0.1h-0.1v-0.1h-0.1V49h-0.1v0.1h-0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1V49h0.2v-0.3h-0.2v0.2h-0.1\n' +
            '\t\t\tV49c-0.1,0.1-0.2,0-0.4,0v-0.2h-0.1l-0.1-0.1h0.1v-0.2h0.1l0,0h0.1v0.1h0.1v0.1l0.1-0.1v0.2h0.1v0.1h0.1v-0.6h-0.2v0.1H405v-0.2\n' +
            '\t\t\th-0.1V48h-0.1v0.1l-0.1,0.1v0.1h0.1v0.3h-0.2v-0.2h-0.1v-0.1h-0.1v-0.1H404v0.2h-0.2v-0.2h-0.1v0.1l-0.1,0.1v0.3h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1l0.2-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1H403v0.1h-0.2v-0.1h-0.2v-0.2h-0.2v0.1h-0.2v-0.1\n' +
            '\t\t\th-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.1V48h-0.4v-0.2h0.2l0,0l0.1-0.1v-0.2H402v-0.1h-0.1v-0.1h-0.4v-0.1h-0.1v-0.1h-0.1V47h-0.1V47\n' +
            '\t\t\th-0.1c0-0.4,0-0.5,0-0.7h0.1v-0.1h0.1v-0.3h-0.1v-0.1h-0.1v-0.2h-0.1v-0.1H401v-0.2h0.1v-0.1h0.1v-0.2H401v-0.2h0.1v-0.2H401v-0.2\n' +
            '\t\t\th0.1v0.1h0.1v-0.1l0.2-0.1v-0.2h-0.1l-0.1-0.2h-0.1V44h0.2v-0.8h0.1V43h0.1c0.1,0.1,0,0.3,0.1,0.4h0.1v-0.1l0.1-0.1v-0.2h0.2v-0.2\n' +
            '\t\t\th-0.1v-0.1l0.1-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h0.2v-0.1h0.1v-0.1h0.2v-0.1l0.1-0.1v0.2h0.2v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1h0.1V42\n' +
            '\t\t\th-0.1v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.5v-0.1l0.1-0.1v-0.2h-0.1v-0.2h0.1v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h0.1l0.1,0.1h0.2v-0.2\n' +
            '\t\t\th0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.1l0.1-0.1v0.1h0.1l0.1,0.1h0.2v0.2h-0.2v-0.1h-0.1v-0.1h-0.1v0.3h0.1v0.1h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.1v-0.1h0.1v0.1h0.1v-0.1h0.1v-0.2h0.1v0.1h0.2l0,0h0.1l0.1,0.1h0.1v0.3h-0.1v0.1h0.2v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.1c0,0.2,0,0.3,0,0.5h-0.2v0.2h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.1v0.1h0.1v0.1h-0.1v0.1h0.1v0.1h0.2v0.2\n' +
            '\t\t\th-0.1v0.1h0.1l0.1,0.1h0.1v0.1c0,0.1-0.1,0-0.2,0.1v0.3h-0.1v0.1h0.1v0.1h-0.1v0.1h-0.1v0.2h0.2v-0.2h0.2v0.5h0.2v-0.1h0.1v0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.3h0.6v0.1h0.1V45h0.2v-0.1c0-0.1,0.2,0,0.2-0.1v-0.2h-0.2v0.2c0-0.1,0.2,0,0.3-0.1v-0.2h-0.1v-0.1h-0.1v-0.2\n' +
            '\t\t\th0.3v-0.4h0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.2h-0.1v-0.2h-0.1v-0.2h0.1l0.1,0.1h0.1v0.1h0.1V43h-0.1v-0.1h-0.1\n' +
            '\t\t\tc-0.1-0.1,0-0.3,0-0.5h0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.2v-0.1h0.1v-0.3h-0.1v-0.1h-0.1v-0.1h-0.1c-0.1-0.1,0-0.2,0-0.2\n' +
            '\t\t\tH407V41h-0.1v-0.3h0.1v-0.2c-0.2,0-0.1-0.2-0.1-0.3h-0.5v-0.1h-0.1V40h-0.1v-0.2h0.2v-0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2H406v0.2\n' +
            '\t\t\th-0.3v-0.1h-0.2l0,0h-0.3v-0.1h-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h-0.2V39h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.3H405v-0.1h-0.1\n' +
            '\t\t\tV39h0.1v-0.1h-0.1v-0.1h-0.1c0,0.1,0,0.2,0,0.2h-0.1v0.1l-0.1,0.1c-0.1-0.1,0-0.2-0.1-0.4h-0.2V39c-0.2,0-0.3,0-0.5,0v-0.3h0.1\n' +
            '\t\t\tv-0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v0.2h-0.2v0.2h-0.3v-0.2h-0.1l0,0h0.2v-0.1h-0.2v-0.2h-0.3v0.2h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.5V39h-0.4v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h-0.1l0,0h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc0,0.2,0,0.3,0,0.5H401v-0.1H401v-0.1h-0.2v0.2h0.1v0.2h-0.1v0.1h0.1v0.1h0.1v-0.1h0.1v0.1h0.1v-0.2h0.1v-0.1h0.1v-0.2h0.2v0.2\n' +
            '\t\t\th-0.1v0.1h-0.2v0.4h-0.1v0.1H401l-0.1-0.1h-0.1v-0.1h-0.2v0.2h-0.2v-0.3h-0.2v0.1h-0.1v0.4h0.1v0.1l-0.1,0.1v0.1h-0.1v0.1H400v0.1\n' +
            '\t\t\th0.1l0.2,0.1h0.1v0.2h-0.2v0.1h-0.1l-0.1-0.2h-0.1v0.2h-0.1v0.1l-0.2,0.1v0.2h-0.2v0.5h0.2v-0.1l0.1-0.1v-0.1h-0.1v-0.2h0.1V41\n' +
            '\t\t\th0.2v0.1h-0.1v0.1h-0.1v0.2h0.1l0.1,0.1h0.1v-0.2h0.1c0.1,0.1,0.1,0.2,0,0.4H400v0.1h-0.1v0.2h-0.1v0.1h-0.1v0.1h-0.5v0.2h0.1\n' +
            '\t\t\tl0.1,0.1h0.1v0.1h-0.1v0.1h-0.1v0.1h-0.1v0.2h-0.2v0.1H399v0.1h0.1l0.1,0.1h0.1v0.2h-0.1v-0.1h-0.3v0.1h0.1V43h0.1l0.1,0.1H399\n' +
            '\t\t\tv0.1c0,0.1-0.1,0-0.2,0.1v0.1h0.1v0.1h0.1l0.2,0.1h0.1v-0.1h0.1v-0.2c0.1,0,0.2,0,0.2,0v0.1h0.1c0.1,0.2,0.1,0.3,0,0.5h-0.1v0.2\n' +
            '\t\t\th0.1v0.2h-0.1c-0.2,0-0.1-0.2-0.1-0.2h-0.1v-0.2h0.1v-0.2h-0.2v0.2h-0.2v-0.2h-0.3v0.1h0.1c0.2,0,0.1,0.2,0.1,0.2h0.2V44H399v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.1h-0.1v0.4H399v0.2h0.1c0.1,0.1,0.1,0.3,0,0.5h-0.2v0.3h0.2v-0.1h0.1v0.2h0.1v0.1h-0.1v0.4h0.1v0.2H399v0.2h0.1\n' +
            '\t\t\tv0.3H399v0.2h0.2v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1V47h0.1v0.1h0.1v0.2h0.1V47h0.1l0.2,0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.1h0.1\n' +
            '\t\t\tv0.2h-0.2V48h0.7v0.2h-0.1v0.1h-0.2v0.2h0.1v0.1h0.1v-0.1h0.1v0.1l0,0v0.2h0.1v0.1h0.2v0.2h-0.1v0.3h-0.2v0.3h0.2v0.1h0.1v0.1h0.5\n' +
            '\t\t\tv0.1h0.1v0.1h0.1l0.1,0.2h0.4v-0.1h0.2v0.7h0.1c0.2,0,0.1,0.1,0.1,0.2h0.2v-0.1l0.2-0.1v-0.1h0.1v0.1h0.3v0.1h0.1v0.2h-0.2v0.2\n' +
            '\t\t\th0.1v0.1h0.1v-0.1c0.1-0.1,0.2,0,0.4,0v0.1h0.2v-0.1h0.1V51h-0.2v-0.2h0.1l0.2,0.1h0.1c0.2,0,0.1,0.1,0.1,0.2h0.1v0.1h0.1\n' +
            '\t\t\tc0.1,0.1,0,0.2,0,0.3h0.4v-0.3h0.1v-0.1h0.1c0.1,0.1,0.1,0.2,0.1,0.4h0.2v-0.3h0.1v-0.1h0.1v0.1h0.2v-0.1h0.3v0.2h0.9v-0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.2,0.2h0.5v0.3h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.3v-0.8h-0.1v-0.2h0.2v-0.1h0.1v-0.1h-0.1v-0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tv0.1h0.1v0.1h-0.1v0.1h0.1v0.1h0.1c0.1,0.2,0,0.5,0,0.8h0.2v-0.1h0.1v-0.2h0.1c0.2-0.1,0.1,0.2,0.1,0.2h0.1v0.1h0.1v0.1h0.2v-0.1\n' +
            '\t\t\th0.1l0,0h0.1v-0.2h-0.2v0.1h-0.1v-0.1h-0.1l-0.1-0.1l0.1-0.1V51h0.1v-0.2h-0.2v0.1h-0.2v-0.1h-0.1c-0.1-0.1-0.1-0.2,0-0.4h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.3v0.1h0.1c0.1,0,0.2,0,0.1,0.1h0.1v0.1h0.1V51h0.1l0.1,0.1h0.2V51l0.1-0.1l0.2,0.1h0.2v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.1c0.1-0.1,0.2,0,0.3,0v-0.2h0.1v-0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v0.2h0.1v0.1h0.2V51h0.1v-0.1l0.1-0.1v0.1h0.1V51h0.1\n' +
            '\t\t\tl0,0c0.1-0.1,0.2,0,0.4-0.1v-0.2h0.5v-0.2h0.2v-0.2h0.2v-0.2h-0.1C412.1,50.3,412.3,50.1,412.2,50.1"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="416.5" y="38.3" transform="matrix(0.9998 -1.919676e-02 1.919676e-02 0.9998 -0.6594 8.0054)" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M401.9,38.4c-0.1,0,0,0.2-0.2,0.1v0.2h0.2V38.4z"/>\n' +
            '\t\t<path class="st4" d="M523.7,48.8L523.7,48.8L523.7,48.8l-0.2-0.1v-0.1h0.2V48.8L523.7,48.8z M522.9,48.6h-0.2v-0.2h0.2V48.6z\n' +
            '\t\t\t M522.7,48.9L522.7,48.9L522.7,48.9l-0.2,0.1v-0.1h-0.1v-0.2h0.2V48.9L522.7,48.9z M522.1,48.4h-0.2v0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tl0.2-0.1l0,0h0.1l0.1-0.2h0.1V48.4z M519,50.1h-0.2V50c0.2,0.1,0-0.2,0.2-0.1V50.1z M517.8,48.9L517.8,48.9L517.8,48.9L517.8,48.9\n' +
            '\t\t\tL517.8,48.9z M517.6,50.5h0.2v0.3h-0.1v-0.1h-0.1V50.5L517.6,50.5z M517.5,48.1L517.5,48.1L517.5,48.1l-0.2,0.1l-0.2-0.1h-0.1v0.5\n' +
            '\t\t\th0.2v0.1h0.1v0.2h-0.1v0.1h-0.1v-0.2h-0.1l-0.1-0.1l-0.1,0.1l0,0H517v-0.1h-0.1v-0.1h-0.1l-0.1-0.1h-0.1v-0.2l0.1-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1V48h0.1l0,0l0,0l0.1,0.1h0.1v-0.2h0.2V48h0.1V48h0.1v0.1H517.5z M517.5,50.7h-0.2v-0.1l0,0v-0.1c0.2,0.1,0-0.2,0.1-0.1v0.1\n' +
            '\t\t\th0.1V50.7L517.5,50.7z M517.2,50.5H517v-0.3h0.2V50.5z M516.5,50.5h-0.2v-0.2h0.2V50.5z M515.1,48.1L515.1,48.1L515.1,48.1\n' +
            '\t\t\tl-0.2,0.1v-0.1h-0.1V48c0.1,0.1,0-0.2,0.2-0.1L515.1,48.1L515.1,48.1L515.1,48.1L515.1,48.1z M514.8,48.3L514.8,48.3L514.8,48.3\n' +
            '\t\t\tl-0.2,0.1l-0.2-0.1h-0.1v-0.1c0.2,0.1,0.1-0.2,0.3-0.1L514.8,48.3L514.8,48.3L514.8,48.3z M513.1,49.7H513v-0.2h0.1v0.1h0.1\n' +
            '\t\t\tL513.1,49.7z M513,48.2L513,48.2L513,48.2L513,48.2L513,48.2z M512.4,48.7h-0.2v-0.2h0.2V48.7z M512,47.2h-0.2v-0.1L512,47.2\n' +
            '\t\t\tL512,47.2z M511.3,40.8L511.3,40.8l-0.1-0.2l0,0v-0.1l0,0l0.1,0.1h0.1L511.3,40.8L511.3,40.8z M511.2,41H511v-0.1L511.2,41\n' +
            '\t\t\tL511.2,41z M511,41.3L511,41.3l-0.1,0.2h-0.1v-0.2L511,41.3L511,41.3L511,41.3L511,41.3z M511,41.5L511,41.5L511,41.5L511,41.5\n' +
            '\t\t\tL511,41.5z M510.9,48L510.9,48L510.9,48l-0.2,0.1v-0.2L510.9,48L510.9,48z M510.4,47.3L510.4,47.3l-0.1-0.2h0.1V47.3z M510.3,41.5\n' +
            '\t\t\tL510.3,41.5l-0.1,0.2h-0.1v-0.2H510.3L510.3,41.5z M510.1,46.6h-0.2v-0.1h-0.1v-0.2c0.2,0,0-0.2,0.2-0.1v0.1h0.1V46.6z\n' +
            '\t\t\t M509.7,45.1L509.7,45.1c-0.1-0.2,0-0.3-0.1-0.5h-0.1v-0.2h0.2V45.1L509.7,45.1z M511.7,42.6h0.2v0.1L511.7,42.6L511.7,42.6z\n' +
            '\t\t\t M517.2,42.1v0.3H517v-0.3H517.2z M512.1,42.3h0.2v0.1h0.1v-0.1h0.2v-0.1l0.2-0.1l-0.1-0.1h-0.1v-0.2h0.2V42h0.2v0.2h0.2V42\n' +
            '\t\t\tl0.2-0.1l-0.2-0.1H513v-0.1H513v-0.1h-0.1v-0.2h0.2v0.2l0.1-0.1v0.2h0.1v-0.1h-0.1v-0.2h0.2v0.1h0.1v-0.2h0.2v0.2h0.2v-0.2h0.2\n' +
            '\t\t\tl0.1,0.1l0.1-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.2v0.1h-0.1l-0.1-0.1h-0.1v-0.2h0.1v-0.1h0.1v-0.1h0.4v0.2c-0.1,0-0.2-0.1-0.2,0.1\n' +
            '\t\t\tv0.1h0.1v0.1h0.4V41h0.2v-0.1c0.1,0,0.2,0,0.3,0v-0.1l0.1-0.1v-0.1l0.1-0.1h0.2v0.2h-0.1v0.1h0.1v0.1h0.5v-0.2h0.2v0.2h0.2v0.2\n' +
            '\t\t\th0.5v-0.2h0.5v0.2h0.1V41h0.5l0,0h-0.1v0.1h-0.8v0.2h-0.2v0.5h-0.3v-0.1h-0.1v0.2h-0.1v0.1h-0.1v-0.1h-0.1v0.1h-0.1l-0.1-0.1h-0.1\n' +
            '\t\t\tv0.4h0.2v0.1h0.1v0.1h0.1v0.2h0.3v0.2h-0.2v0.1h0.2v0.2h0.1v-0.1h0.2l0.1,0.2h0.1v0.1h-0.1v0.1h-0.2v-0.1h-0.1l-0.1-0.1h-0.1v-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H516l-0.1-0.1h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1h-0.8v0.2h0.1v-0.1h0.2v0.2h-0.1\n' +
            '\t\t\tv0.1H515v-0.1h-0.1v-0.1l-0.1,0.1v0.1h-0.1v0.1h-0.5v-0.1h-0.1v-0.1h-0.8v-0.3h-0.3v0.5h-0.4l-0.2-0.1h-0.1v0.1h-0.2l-0.1-0.1\n' +
            '\t\t\th-0.1v0.1H512v-0.2h-0.1v0.1h-0.1L512.1,42.3L512.1,42.3L512.1,42.3z M514.9,38.7L514.9,38.7L514.9,38.7L514.9,38.7L514.9,38.7z\n' +
            '\t\t\t M515.4,38.8h0.2v0.3h-0.2V38.8z M515.7,39h0.5v-0.2h-0.2v-0.2h0.5v0.2l-0.1,0.1l0.1,0.1h0.1c0,0.1,0,0.2,0.1,0.1h0.1v0.2h-0.1\n' +
            '\t\t\tl0,0h-0.2l-0.1-0.1h-0.1v0.2h-0.1v0.1h-0.2v-0.2h-0.2v-0.1h-0.1C515.8,39.1,515.8,39,515.7,39L515.7,39L515.7,39L515.7,39z\n' +
            '\t\t\t M517.8,40.4L517.8,40.4l0.1,0.2h-0.1V40.4z M518.2,41.4L518.2,41.4l0.1-0.2h-0.1v-0.1h0.2l0.1,0.3h0.1v0.1h-0.1v0.1l-0.2,0.1v0.1\n' +
            '\t\t\tH518v-0.1h0.1v-0.1L518.2,41.4L518.2,41.4z M518.2,39.7h0.2v0.2h-0.2V39.7z M518.4,43.2h-0.3l-0.1-0.1h-0.1V43h0.1v-0.2h0.1v0.1\n' +
            '\t\t\th0.1V43h0.2L518.4,43.2L518.4,43.2z M518.1,43.5h-0.5v-0.2h0.5V43.5z M516.6,43.3h-0.2v-0.2h0.2V43.3z M516.1,43.9h-0.2v-0.2h0.2\n' +
            '\t\t\tV43.9z M515.4,42.8L515.4,42.8l-0.1-0.2h0.1V42.8z M515.4,44.2L515.4,44.2L515.4,44.2l-0.2,0.1v-0.1h-0.1v-0.1L515.4,44.2\n' +
            '\t\t\tL515.4,44.2z M513.8,44.4l-0.2,0.1v0.1h-0.1l-0.1-0.1h-0.1v-0.1H513.8L513.8,44.4z M513.3,44.4L513.3,44.4L513.3,44.4L513.3,44.4\n' +
            '\t\t\tL513.3,44.4z M518.4,42.4h0.2v0.2h-0.2L518.4,42.4L518.4,42.4L518.4,42.4z M518.7,42.1h0.2v0.2h-0.2V42.1z M518.9,42.3h0.2v0.2\n' +
            '\t\t\th-0.1L518.9,42.3L518.9,42.3L518.9,42.3z M518.9,41.6h0.2v0.1L518.9,41.6L518.9,41.6z M519.1,42.1c0.2,0.1,0.2-0.1,0.2-0.1v0.2\n' +
            '\t\t\th-0.1v0.1h-0.2V42.1z M525.3,49.2V49h-0.1v-0.1h-0.1V49l-0.1,0.1v0.1h0.1v0.2h-0.1v0.1H525v-0.2h-0.1v-0.1h-0.5v0.1h-0.1V49h-0.1\n' +
            '\t\t\tV49h-0.2v-0.1H524c0-0.1,0-0.2,0-0.4h0.2v-0.1h0.1v-0.1h0.3v0.1l0,0v0.1h-0.1v0.2h0.3v0.2h0.3v-0.2H525v-0.1h-0.1v-0.1h0.1v-0.3\n' +
            '\t\t\th-0.7v-0.1h-0.2V48h-0.1v-0.1l0,0c0,0.2,0,0.3-0.1,0.5h-0.2v-0.1h-0.2v0.1h-0.1v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v0.1h-0.1\n' +
            '\t\t\tv0.2h-0.3v-0.1h-0.1v-0.2h-0.1v-0.1h-0.2V48h-0.4v0.1H522v0.1H522v0.3h-0.1v0.2h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2V48h-0.1V48\n' +
            '\t\t\th-0.1v0.2h-0.1l-0.1-0.1h-0.2v0.1H521v0.2h0.1v0.2H521v0.2h0.1l0.2,0.1h-0.1v0.1L521,49V49h0.1v0.1h0.1c0,0.1,0,0.2,0,0.3H521v0.1\n' +
            '\t\t\tH521c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.7h-0.1v-0.1l0.2-0.1v-0.3h-0.2V48h-0.1V48h-0.2V48h-0.1v-0.2h-0.1v0.1\n' +
            '\t\t\tc-0.1,0.1-0.2,0.1-0.4,0.1v-0.2h-0.2V48h-0.5v0.2h-0.1v0.1h-0.1v-0.1h-0.3v0.2h0.1v0.1h-0.2v-0.2h-0.2v0.2h-0.2V48h-0.2v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.1h-0.7v-0.1l0,0l-0.1-0.1h-0.4v0.2h-0.6v-0.1h-0.1v-0.1h-0.9v-0.2h-0.2v0.2h-0.2v0.1h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.1-0.1-0.2h-0.4v0.4h-0.1l-0.1-0.1h-0.1v-0.2H514l-0.1-0.1h-0.4v-0.2h0.3v-0.2h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1\n' +
            '\t\t\tv-0.1h-0.1l-0.1-0.1h-0.1l-0.1-0.1H513l-0.1-0.1h-0.1c-0.1-0.2-0.4,0-0.5-0.1v-0.1l0.1-0.1v-0.2h-0.1v-0.1h-0.1v-0.1h-0.1v-0.1\n' +
            '\t\t\tH512v-0.1H512v-0.2h0.1v-0.3H512v-0.2h-0.1v-0.1h-0.1v-0.2h0.2v-0.3h0.2V45h0.2v-0.3h0.1l0.2,0.1h0.1v-0.1h0.2v-0.1\n' +
            '\t\t\tc0.1-0.1,0.2,0,0.2,0v-0.1l-0.3-0.5c0.2,0,0.1,0.2,0.1,0.4h0.1c0.2-0.1,0.1,0.2,0.2,0.2h0.1v-0.2h0.2v0.2h-0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.3v0l0.1-0.1v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v-0.2h0.1v-0.2h0.2v-0.1l0.2-0.1V44h0.1v-0.1l0.1-0.1V44h0.2\n' +
            '\t\t\tv0.4h-0.2v0.3h0.2v-0.2h0.1v-0.1l0.1-0.1v-0.2h0.1v0.1h0.9v-0.1l0.1-0.1v-0.1h0.1V44h0.1v-0.1l0.2-0.1v-0.3h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v-0.1h0.1v-0.2c0.2,0,0.4,0,0.5,0v0.5h0.5v-0.2h0.4v0.2h0.2v-0.2h0.1V44h0.1l0.1,0.2h0.1\n' +
            '\t\t\tc0-0.2,0-0.3,0-0.5h0.1c0.2,0,0.1,0.2,0.1,0.3h0.2v-0.5h-0.2v0.1h-0.1v-0.1h-0.1v-0.1h0.2v-0.2h0.1l0.1,0.1h0.2l0,0l0.1-0.1v0.1\n' +
            '\t\t\th0.2l0,0l0.1-0.1v-0.1h0.1V43h0.1v0.1h0.2v-0.2h0.1v0.1h0.1l0.1,0.1h-0.1v0.2h0.2v-0.6h-0.1v-0.2l0,0v-0.1h-0.1v-0.2h0.2V42h-0.2\n' +
            '\t\t\tv-0.1h-0.2V42h-0.1v-0.2h0.2v-0.1l0.1-0.1v0.1h0.3v-0.2h-0.2v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.1c-0.1,0.1-0.2,0.1-0.3,0v-0.2l0,0\n' +
            '\t\t\tv-0.1h-0.1v-0.1h0.1l0.1,0.1h0.2v-0.1h0.1l0.2,0.1h0.1v-0.1h-0.1V41h-0.2v-0.1h-0.1v-0.2h-0.2v-0.6h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2\n' +
            '\t\t\th-0.1v-0.1h-0.1v-0.1h-0.1v-0.1H519l-0.1-0.1h-0.2v0.2h0.2v0.4h-0.1l-0.1-0.1h0.2v0.1l-0.1,0.1v-0.1h-0.1c0-0.2,0-0.3,0-0.4h-0.2\n' +
            '\t\t\tv-0.5h-0.1l-0.1-0.1h-0.1v-0.1h-0.2v0.1h-0.1v0.2h0.1v0.1h0.2v0.2h-0.1v0.1l-0.1,0.1v-0.1h-0.3V40h-0.1v-0.1h-0.1v-0.2h-0.1\n' +
            '\t\t\tc-0.2,0.1-0.1-0.2-0.1-0.2h-0.2v-0.2h0.1V39h-0.3v-0.2h-0.5V39l-0.1,0.1v-0.2h-0.1l-0.1-0.1h-0.1V39h-0.3v-0.1H516v-0.1h-0.1\n' +
            '\t\t\tl-0.1-0.2h-0.1v0.1h-0.1v-0.1h-0.1v0.2h-0.1v0.1c-0.1,0.1-0.3,0-0.5,0v-0.1h0.1V39H515V39l-0.1,0.1v-0.5h-0.1v0.1h-0.1v-0.1h-0.1\n' +
            '\t\t\tv-0.2h-0.2c0,0.1,0,0.2,0,0.2h-0.1v-0.2h-0.1v-0.1h-0.1v0.1l-0.1,0.1v0.2h-0.1v-0.1H514v0.2h-0.7v0.3h-0.2v-0.1H513v0.1H513\n' +
            '\t\t\tl-0.1,0.2h-0.1l-0.1-0.1h-0.1v-0.2h-0.1v0.1c-0.1,0.1-0.2,0-0.3,0v0.2H512v0.2h-0.2v0.1l-0.1,0.1v0.1h-0.1v0.2h-0.1v0.1l-0.1,0.1\n' +
            '\t\t\tv0.2h0.2v-0.2l0.1-0.1v-0.1h0.1V40h0.1v-0.1h0.1v-0.3h0.3v0.2H512v0.2h0.2v0.2H512v0.2h0.1v0.1h0.1v0.1h-0.1v0.1H512v-0.1h-0.2\n' +
            '\t\t\tv0.1h-0.1l-0.1-0.1h-0.1v-0.1h-0.1v0.1h-0.1v0.1h-0.1v-0.1h-0.2v0.1h-0.1v0.1l-0.1,0.1v0.1H511v0.1l-0.2,0.1v0.6h-0.1v0.1\n' +
            '\t\t\tl-0.1,0.1v-0.1h-0.2v0.1l-0.1,0.1l-0.1-0.1h-0.3v0.1l-0.1,0.1V42h0.1v0.2h-0.1v0.1h0.1c0,0.1,0,0.2,0,0.4h-0.1v0.1h-0.1v0.1h0.1\n' +
            '\t\t\tv0.1l-0.1,0.1v-0.4c-0.1,0.1-0.2,0-0.3,0v0.2h0.1v0.1h-0.2v0.2h0.1c0.1,0,0.2,0,0.1,0.1h0.1v0.1h-0.1v0.2h0.1\n' +
            '\t\t\tc0.2,0,0.1,0.2,0.1,0.2h0.1v0.1h0.1l0.1,0.1l-0.1,0.1v0.1h-0.1v0.1c-0.1,0.1-0.2,0-0.3,0v0.5h-0.1v0.3h0.1v-0.1h0.2v0.2h-0.1l0,0\n' +
            '\t\t\th-0.2v0.1h-0.1v0.5h0.1l0.1,0.2h0.1v-0.2h0.1V45h0.1l0.1,0.1h0.1l0.1,0.1h0.1l0.1,0.1h-0.1v0.1l-0.2,0.1l0,0h-0.1v0.4h-0.1v0.2\n' +
            '\t\t\th0.2v0.2h-0.3v0.6h0.6v0.1h0.2V47h-0.1v0.2h0.1v0.1h0.1l0.1,0.1c0.1,0,0.2,0,0.2,0v0.5h-0.1c-0.2,0.1-0.1-0.1-0.1-0.2h-0.2v-0.1\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.2h-0.2v0.1h-0.1v0.2h0.1v0.1h0.1l0.1,0.1h0.1v0.1h0.1v0.1h0.1V48h0.1V48h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.2,0.2h0.4v0.1h0.1v0.1h0.1c0.1,0.1,0,0.3,0,0.4h0.4V49h0.1V49h0.1v0.1h0.1v0.1h-0.1v0.2h0.3v-0.2h0.2V49h-0.1\n' +
            '\t\t\tc-0.2,0-0.1-0.2-0.1-0.2h-0.3v-0.3H512v0.2H512v0.1l-0.1,0.1v-0.2h-0.1v-0.1h-0.1v-0.2h0.2v0.3h0.1v0.1h0.2v-0.1l0.1-0.1l0.1,0.1\n' +
            '\t\t\th0.1v0.1h-0.1v0.1l-0.1,0.1V49h0.2v0.1h0.1c0,0.2,0.4,0,0.5,0.1v0.2H513v0.1H513v0.1h-0.1v0.1l-0.1,0.1v0.1h-0.2v0.1h0.1v0.1h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.1v-0.2h0.1v-0.1h0.1l0.1,0.2h0.1v0.1h0.1V50l0.1-0.1c0.2,0,0.1,0.2,0.2,0.2h0.1v-0.1l0.1-0.1v-0.2\n' +
            '\t\t\th-0.1v-0.1h0.1v-0.1c0.1-0.1,0.2,0,0.3,0v0.1h0.2v-0.1h0.1v-0.1h-0.1v-0.2h0.3v0.2h0.2v0.2h0.1v0.1l-0.1,0.1v0.1h-0.1l-0.1-0.1\n' +
            '\t\t\th-0.1v-0.1h-0.1v0.2h-0.2v0.2h0.5v-0.4h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.1v0.1h0.1V50h0.1v0.2h-0.4v0.3h0.2v-0.1l0.1-0.1\n' +
            '\t\t\tv0.1h0.1v0.2h0.1v-0.1h0.1c0.2-0.1,0.1,0.1,0.2,0.2h0.3v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.2v-0.1l0.1-0.1v-0.1h-0.1V50h-0.1v0.1h-0.6\n' +
            '\t\t\tv-0.2h0.1v-0.2h-0.2v-0.2h0.1c0.1,0,0.1,0.1,0.1,0.1h0.1v-0.1l0.1-0.1v0.1h0.1v0.1h0.2v0.2h0.4V50h-0.1v0.2h0.1l0.1,0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.1v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1v-0.1h0.2v0.2h0.4v-0.1l0.1-0.1v-0.1h0.2v-0.4h-0.1v-0.2h-0.2v-0.1H518v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h0.1c0.1,0,0.2,0,0.2,0.1h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1l0.1,0.1h0.4v-0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1\n' +
            '\t\t\th0.1v0.1h0.5v-0.1l0.1-0.1v-0.1h-0.1v-0.2h-0.1v0.2h-0.1v0.1h-0.2v-0.2h0.1v-0.2h-0.1v-0.1h0.2V49h0.1l0.1,0.1h0.1v0.1h0.1v0.1\n' +
            '\t\t\th0.1v0.2h0.1V49h0.1V49h0.1c0.1,0.1,0.1,0.3,0,0.5h-0.1v0.1h0.1l0.1,0.1h0.2v-0.1l0.1-0.1l0.1,0.2h0.1v0.1h0.1v-0.1l0.1-0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.2,0.1,0.2h0.4v-0.1h0.1v-0.1h-0.1v-0.1h-0.1v0.1h-0.2v-0.1h-0.1v-0.1h0.1v-0.1l0.1-0.1v0.1h0.3v-0.2h0.3v-0.2h0.2\n' +
            '\t\t\tV49h0.1l0.2,0.1h0.1v-0.2h0.1v-0.1h0.1l0,0l0.1-0.1v-0.2h0.2v0.9h0.1v-0.1h-0.2l0.1-0.2h0.1v0.1h0.1v-0.1h0.2v0.2H523v0.1h0.1v0.1\n' +
            '\t\t\th0.2v0.1h0.1l0.1,0.2h0.1v0.1h0.1v-0.1h0.1v0.1h0.1V50h0.1v0.1h0.1v0.2h0.1v-0.2h0.1V50c0.1-0.1,0.3-0.1,0.5,0v0.2h0.1v-0.1\n' +
            '\t\t\tl0.1-0.1v-0.2h-0.1v-0.2h0.2v-0.1h0.1v-0.1h-0.5v-0.3h0.1c0.2,0,0.1,0.2,0.1,0.3h0.3v0.2h0.2v-0.1h0.1v-0.1h0\n' +
            '\t\t\tC525.1,49.4,525.2,49.3,525.3,49.2L525.3,49.2L525.3,49.2z"/>\n' +
            '\t\t<rect x="404.2" y="38.7" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<polygon class="st4" points="451.9,39 451.7,39 451.7,39 451.7,39 451.7,39.1 451.9,39.1 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="468" y="39.1" transform="matrix(0.9985 -5.451013e-02 5.451013e-02 0.9985 -1.441 25.5715)" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="475.7" y="39.4" transform="matrix(0.9996 -2.841070e-02 2.841070e-02 0.9996 -0.9305 13.5326)" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<rect x="435.6" y="40" class="st4" width="0.2" height="0.3"/>\n' +
            '\t\t<polygon class="st4" points="443.2,40.7 443.5,40.7 443.5,40.5 443.4,40.5 443.4,40.4 443.3,40.4 443.3,40.4 443.2,40.4 \n' +
            '\t\t\t443.1,40.6 443.1,40.6 443.1,40.6 443.1,40.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="442.6,40.8 442.7,40.8 442.7,40.8 442.7,40.7 442.7,40.6 442.7,40.6 442.7,40.6 442.5,40.6 \n' +
            '\t\t\t442.5,40.7 442.6,40.7 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="455.8,40.5 455.7,40.5 455.7,40.7 455.6,40.7 455.6,40.8 455.8,40.8 455.8,40.6 455.8,40.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="499.3,41.2 499.3,41.1 499.2,41.1 499.2,41.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="403.7,41.9 403.9,41.9 403.9,41.6 403.7,41.6 \t\t"/>\n' +
            '\t\t<rect x="514.6" y="42.2" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="520.3,42.3 520.3,42.2 520.3,42.2 520.3,42.3 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="466.9,43.6 467,43.5 467,43.5 466.8,43.5 466.8,43.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="509.4,43.9 509.5,43.9 509.5,43.9 509.6,43.8 509.6,43.7 509.5,43.7 509.5,43.6 509.3,43.6 \n' +
            '\t\t\t509.3,43.8 509.3,43.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="473.2,44.2 473.2,44.2 473.2,44.4 473.4,44.4 473.4,44.2 473.4,44.2 473.4,44.2 473.4,44.2 \n' +
            '\t\t\t473.4,44.1 473.5,44 473.5,44.2 473.7,44.2 473.7,43.9 473.3,43.9 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="519,44 519.1,44 519.1,43.9 519.2,43.9 519.2,43.8 519,43.8 \t\t"/>\n' +
            '\t\t<path class="st4" d="M421,44.6L421,44.6L421,44.6c-0.2-0.1-0.1,0.1-0.2,0v0.2h0.2V44.6z"/>\n' +
            '\t\t<polygon class="st4" points="466.9,44.3 466.8,44.3 466.8,44.4 466.9,44.4 \t\t"/>\n' +
            '\t\t<rect x="516.1" y="44.3" class="st4" width="0.7" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M435.3,44.8h-0.2v0.2h0.1c0.2-0.1,0.1,0.1,0.1,0.2h0.1v0.1h0.1v-0.2h-0.1L435.3,44.8L435.3,44.8L435.3,44.8z"\n' +
            '\t\t\t/>\n' +
            '\t\t<polygon class="st4" points="476.9,44.9 477,44.9 477,44.9 477.1,44.8 477.1,44.7 477,44.7 477,44.6 476.8,44.6 476.8,44.8 \n' +
            '\t\t\t476.9,44.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="449.4,45.1 449.5,45.1 449.5,44.9 449.3,44.9 449.3,45 449.4,45 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="457.1,45.1 457.2,45.1 457.2,45.1 457.2,45 457.2,44.9 457.1,44.9 \t\t"/>\n' +
            '\t\t<path class="st4" d="M450,45.2c-0.2-0.1-0.1,0.2-0.2,0.1v0.1h0.1l0.1,0.2h0.4v-0.2h0.1v-0.1h-0.1v-0.1h-0.2v0.2H450V45.2z"/>\n' +
            '\t\t<path class="st4" d="M458.2,45.6h0.2v-0.2h-0.1v-0.1c-0.2,0,0,0.2-0.2,0.1L458.2,45.6L458.2,45.6L458.2,45.6z"/>\n' +
            '\t\t<polygon class="st4" points="493.6,45.9 493.7,45.9 493.7,45.8 493.6,45.8 493.6,45.7 493.4,45.7 493.3,45.8 493.3,45.9 \n' +
            '\t\t\t493.2,45.9 493.2,45.9 493.1,45.9 493.1,46.1 493.1,46.1 493.2,46.2 493.5,46.3 493.5,46.2 493.6,46.1 493.6,46.2 493.7,46.2 \n' +
            '\t\t\t493.7,46.3 493.6,46.3 493.6,46.3 493.4,46.4 493.4,46.5 493.7,46.5 493.7,46.6 493.8,46.6 493.8,46.5 493.9,46.5 493.9,46 \n' +
            '\t\t\t493.6,46 \t\t"/>\n' +
            '\t\t<path class="st4" d="M453.1,46.2H453v0.5h0.2v-0.2h0.2v-0.2h-0.1C453,46.3,453.2,46.3,453.1,46.2"/>\n' +
            '\t\t<rect x="489.9" y="46.1" class="st4" width="0.1" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="433.1,46.7 433.2,46.8 433.4,46.8 433.4,46.6 433.2,46.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="497.2,46.6 497.2,46.5 497.1,46.5 497.1,46.7 497.2,46.7 497.2,46.6 \t\t"/>\n' +
            '\t\t<rect x="494" y="46.6" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="455.8,47.1 455.2,47.1 455.2,47.3 455.7,47.3 \t\t"/>\n' +
            '\t\t<path class="st4" d="M456.2,47.2L456.2,47.2c-0.2-0.2-0.1,0.2-0.3,0v0.1h-0.1v0.2h0.2v-0.1l0.1-0.1v-0.2L456.2,47.2L456.2,47.2z"\n' +
            '\t\t\t/>\n' +
            '\t\t<path class="st4" d="M403,48h0.2v-0.3h-0.3v-0.2h-0.4l-0.1,0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1l0.1,0.1h0.1v0.1h-0.1v0.2h0.2v-0.2\n' +
            '\t\t\th0.1C403,47.7,403,47.9,403,48"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="413.3" y="47.4" transform="matrix(0.9989 -4.763005e-02 4.763005e-02 0.9989 -1.7914 19.7401)" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<polygon class="st4" points="513.9,47.2 513.9,47.3 514.4,47.3 514.4,47.3 514.3,47.3 514.3,47.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="520.6,47.8 520.6,47.8 520.6,48 520.6,48 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="399.8,48.3 399.9,48.3 399.9,48.3 400,48.3 400,48.2 399.8,48.2 \t\t"/>\n' +
            '\t\t<rect x="405.4" y="48.3" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="405.8,48.5 406,48.5 406,48.3 405.8,48.3 \t\t"/>\n' +
            '\t\t<path class="st4" d="M407.7,48.4L407.7,48.4L407.7,48.4l-0.2-0.2c-0.1,0,0,0.2-0.2,0.1v0.2h0.1v0.1h0.1v-0.2H407.7z"/>\n' +
            '\t\t<rect x="507.9" y="48" class="st4" width="0.2" height="0.1"/>\n' +
            '\t\t<rect x="411.2" y="48.4" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="448.9,48.3 448.8,48.3 448.8,48.6 448.9,48.6 \t\t"/>\n' +
            '\t\t<rect x="408.2" y="48.6" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<rect x="452.3" y="48.7" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="423.7,49.2 423.8,49.2 423.8,49 423.7,49 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="407.4" y="49.3" transform="matrix(4.819785e-02 -0.9988 0.9988 4.819785e-02 338.5583 453.9283)" class="st4" width="0.1" height="0.1"/>\n' +
            '\t\t<path class="st4" d="M507.6,49.2v0.2h-0.1L507.6,49.2l-0.4,0.1v0.3h0.2v-0.2h0.1v0.1h0.1v0.1h0.1v-0.1l0.1-0.1v-0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv-0.1h0.1V49h-0.2C507.8,49.1,507.7,49.2,507.6,49.2"/>\n' +
            '\t\t<path class="st4" d="M449.6,49.7c-0.1-0.1,0,0.2-0.2,0.1v0.2h0.2V49.7z"/>\n' +
            '\t\t<polygon class="st4" points="522.3,49.7 522.3,49.8 522.4,49.8 522.4,49.9 522.5,49.9 522.5,49.8 522.6,49.8 522.6,49.9 \n' +
            '\t\t\t522.7,49.9 522.7,49.7 522.4,49.7 \t\t"/>\n' +
            '\t\t<rect x="427.9" y="50.1" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M458.9,50.1c-0.2-0.1,0,0.2-0.2,0.1v0.1h0.2L458.9,50.1L458.9,50.1L458.9,50.1z"/>\n' +
            '\t\t<rect x="459.3" y="50.1" class="st4" width="0.3" height="0.2"/>\n' +
            '\t\t<path class="st4" d="M522.6,50.1L522.6,50.1L522.6,50.1L522.6,50.1V50h-0.1L522.6,50.1h-0.2v0.1l-0.1,0.1v-0.2h-0.2v0.5h0.1\n' +
            '\t\t\tc0.2-0.1,0.1,0.1,0.1,0.2h0.2v-0.2h0.3v-0.2h-0.3V50.1z"/>\n' +
            '\t\t<polygon class="st4" points="522.9,50 522.7,50 522.7,50.1 523,50.1 523,50.1 522.9,50.1 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="415.4,50.8 415.5,50.8 415.5,50.4 415.4,50.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="517.9,50.3 517.9,50.3 517.9,50.2 517.9,50.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="415.8,50.5 415.8,50.5 415.8,50.8 415.8,50.8 415.8,50.6 415.8,50.6 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="444.8,50.6 444.8,50.6 444.7,50.5 444.4,50.5 444.4,50.6 444.5,50.6 444.5,50.7 444.6,50.7 \n' +
            '\t\t\t444.6,50.8 444.7,50.8 444.7,50.9 444.8,50.9 444.8,50.8 444.8,50.8 444.8,50.8 444.8,50.8 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="521.8,50.5 521.8,50.5 521.7,50.4 521.6,50.4 521.6,50.4 521.5,50.5 521.5,50.6 521.6,50.6 \n' +
            '\t\t\t521.6,50.7 522,50.7 522,50.4 521.8,50.4 \t\t"/>\n' +
            '\t\t<path class="st4" d="M518.6,50.6L518.6,50.6L518.6,50.6l-0.2-0.1v-0.1c-0.1,0-0.1,0.2-0.2,0.1v0.3h0.2v-0.1h0.2v0.1h0.1v-0.1h0.1\n' +
            '\t\t\tv0.2h0.1V51h0.1v-0.2h0.2V51h-0.1v0.1h0.2v-0.2h0.2v-0.1h0.1v-0.2L518.6,50.6L518.6,50.6z"/>\n' +
            '\t\t<path class="st4" d="M523.2,50.4c-0.2-0.1,0,0.2-0.2,0.1v0.1h0.1v0.1h0.2L523.2,50.4L523.2,50.4L523.2,50.4z"/>\n' +
            '\t\t<polygon class="st4" points="402.6,51 402.7,51 402.7,50.9 402.6,50.9 \t\t"/>\n' +
            '\t\t<path class="st4" d="M429.1,51c-0.1,0,0,0.2-0.2,0.1v0.2h0.1v0.1h0.2L429.1,51L429.1,51L429.1,51z"/>\n' +
            '\t\t<polygon class="st4" points="429.2,51.1 429.3,51.1 429.3,51.2 429.4,51.2 429.4,51 429.2,51 \t\t"/>\n' +
            '\t\t<path class="st4" d="M429.7,51.1V51h-0.2v0.3h-0.2v0.2l0,0c0.2-0.1,0.1,0.1,0.2,0.2h0.2v-0.2h0.2v-0.3H429.7z"/>\n' +
            '\t\t<path class="st4" d="M444.4,51.1L444.4,51.1L444.4,51.1L444.4,51.1h0.2v-0.1C444.4,51,444.5,51.2,444.4,51.1"/>\n' +
            '\t\t<polygon class="st4" points="457.5,51.2 457.5,51.3 457.8,51.3 457.8,51.1 457.6,51.1 \t\t"/>\n' +
            '\t\t\n' +
            '\t\t\t<rect x="405.1" y="51.5" transform="matrix(1 -9.909103e-03 9.909103e-03 1 -0.4907 4.0194)" class="st4" width="0.5" height="0.2"/>\n' +
            '\t\t<rect x="406.4" y="51.4" class="st4" width="0.2" height="0.2"/>\n' +
            '\t\t<polygon class="st4" points="406.6,51.5 406.8,51.5 406.8,51.4 406.6,51.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="480.6,51.4 480.8,51.4 480.8,51.2 480.6,51.2 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="452.9,51.6 452.9,51.6 452.9,51.7 452.7,51.7 452.7,51.8 452.8,51.8 452.8,51.8 453,51.7 453,51.4 \n' +
            '\t\t\t452.9,51.4 \t\t"/>\n' +
            '\t\t<polygon class="st4" points="453.1,51.6 453.1,51.6 453.1,51.4 453.1,51.4 \t\t"/>\n' +
            '\t\t<rect x="453" y="51.8" class="st4" width="0.1" height="0.1"/>\n' +
            '\t</g>\n' +
            '</g>\n' +
            '</svg>\n';
    }

    clearAllDesign = () => {
        this.setState({
            files:[],
            converted_images:[],
            formatted_preview_images: [],
            canvas_array:[],
            canvas_fill:false,
            progress:0,
            file_upload:false
        },()=>{
            this.props.clearAllDesignsFromStore('clear');
        })
    }

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-quantity');
    }
    saveAndContinue = e => {

        // let completed = true;

        // let response = this.props.getNotebookImages('getAllImages');
        // let notebook_images = response.payload.notebook_images;

        // let user_selected_images = notebook_images;


        // if(user_selected_images.length === 0){
        //     cogoToast.error("Please select images",{ position: 'top-center'});
        // }

        // for(let i=0;i<user_selected_images.length;i++){

        //     if(user_selected_images[i].is_empty_image === true){
        //         completed = false;
        //     }

        //     if(i === user_selected_images.length-1){
        //         this.setState({
        //             files:notebook_images
        //         },()=>{
        //             if(this.state.checkout_complete_error === false){
        //                 this.uploadImagetoServer(completed);
        //             } else {
        //                 this.AddDesignToCart();
        //             }
        //         });


        //     }
        // }

    };

    uploadImagetoServer = (completed) => {
        if(completed === true){
            this.setState({
                loading:true,
                file_upload:false,
                progress:0,
                loading_msg:""
            })

            let scope = this;
            let obj ={}
            let userDesignId='';
            for(let i=0;i<this.state.files.length;i++){
                if(this.state.files[i]){
                    obj[i+''] = {
                        'image_name':this.state.files[i].image_name,
                        'dominant_colour':this.state.files[i].dominant_colour.replace(/[^\d,]/g, '').split(','),
                        'palette_colour':this.state.files[i].palete_colour.replace(/[^\d,]/g, '').split(','),
                    }
                }
            }

            if(localStorage.getItem('userDesignId')){
                userDesignId = localStorage.getItem('userDesignId');
            }
            const variables = {
                input:JSON.stringify(obj),
                userDesignId:userDesignId
            }

            var data = new FormData();
            data.append("query", "mutation CreateColorPickerMutation(\n  $input: JSONString!\n  $userDesignId: String\n) {\n  imageUpload(input: $input, userDesignId: $userDesignId) {\n    message\n    userDesign {\n      id\n      userDesignId\n    }\n  }\n}");
            data.append("variables", JSON.stringify(variables));
            this.state.files.map((file,index) => {
                let image_name = file.image_name;
                if(file.is_empty_image === false){
                    data.append(image_name, this.state.files[index])
                }

            });
            let token = localStorage.getItem('user_token');

            if(token !== null && token !== undefined && token !== ""){

                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'JWT '+token
                    },
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        scope.setState({
                            progress:percentCompleted
                        })
                    }
                };

            } else {

                var config = {
                    headers: {
                        'Accept': 'application/json'
                    },
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        scope.setState({
                            progress:percentCompleted
                        })
                    }
                };
            }



            axios.post(api, data, config)
                .then(function (response) {
                    if(response.data && response.data.data.imageUpload !== null){
                        localStorage.setItem('userDesignId',response.data.data.imageUpload.userDesign.userDesignId);
                        cogoToast.success("Your Designs are uploaded Successfully",{ position: 'top-center'});
                        scope.AddDesignToCart();
                        scope.setState({
                            loading:false,
                            loading_msg:'',
                            progress:0
                        })
                    }

                })
                .catch(function (err) {
                    cogoToast.error("Your Images are not uploaded,Please try again",{ position: 'top-center'});
                    scope.setState({
                        loading:false,
                        loading_msg:'',
                        progress:0
                    })
                });


        }else {
            cogoToast.error("Please choose remaining images",{ position: 'top-center'});

        }


    }

    AddDesignToCart = () => {

            let specification = {
                // "SKU": "",
                "pages": this.props.selected_page,
                "size": this.props.selected_size,
                // "MRP": "",
                "ruling_type": this.props.selected_ruling,
                // "order_no": "",
                "binding_type": this.props.selected_binding
            }

            let response = this.props.getNotebookImages('getAllImages');

            if(response.payload.designed_canvas.length > 0){

                this.setState({
                    canvas_array:response.payload.designed_canvas
                },() => {
                    this.addCanvasDasToCart(specification);
                })

            }


    }

    // addDimensionToImages = (specification) => {
    //
    //     let preview_images = this.state.files;
    //
    //     for(let i=0;i<preview_images.length;i++){
    //         let scope = this;
    //         let img = document.createElement("img")
    //         img.setAttribute("src", preview_images[i].preview_url);
    //         setTimeout(function(){
    //             preview_images[i]['dimension'] = [img.width,img.height];
    //             if(i === preview_images.length-1){
    //                 scope.setState({
    //                     files:preview_images
    //                 },() =>{
    //                     scope.addImagesToCart(specification);
    //                 })
    //
    //             }
    //
    //         },0)
    //     }
    // }

    // addImagesToCart = (specification) => {
    //     this.setState({
    //         loading:true,
    //         loading_msg:'Loading'
    //     })
    //     let scope=this;
    //
    //     let checkout_id ;
    //
    //     if(this.props.cart_data.checkout_id !== undefined && this.props.cart_data.checkout_id !== ''){
    //         checkout_id = this.props.cart_data.checkout_id;
    //     } else {
    //         checkout_id = '';
    //     }
    //
    //     CreateAddImagesToCartCustomiserMutation(this.state.files,specification,checkout_id, (response) => {
    //
    //         if(response.customizerData !==null){
    //
    //             this.setState({
    //                 loading:false,
    //                 loading_msg:''
    //             })
    //
    //             let StoreCartDataFormate = {
    //                 lines:response.customizerData.checkout.lines,
    //                 checkout_id:response.customizerData.checkout.id,
    //                 subtotalPrice:response.customizerData.checkout.subtotalPrice,
    //                 totalPrice:response.customizerData.checkout.totalPrice,
    //                 checkoutQuantity:response.customizerData.checkout.checkoutQuantity
    //             }
    //
    //             scope.props.sendCartDatasToStore(
    //                 StoreCartDataFormate
    //             );
    //             scope.context.addCartData(
    //                 StoreCartDataFormate
    //             )
    //             cogoToast.success("Design Added to cart",{ position: 'top-center'});
    //             localStorage.removeItem('userDesignId');
    //
    //
    //             scope.props.history.push('/checkout');
    //         } else {
    //             cogoToast.error("Design not Added to cart",{ position: 'top-center'});
    //
    //         }
    //
    //     },function (err) {
    //         this.setState({
    //             loading:false,
    //             loading_msg:''
    //         })
    //         cogoToast.error("Design not Added to cart",{ position: 'top-center'});
    //
    //     })
    //
    // }

    addCanvasDasToCart = (specification) => {

        let scope=this;
        let checkout_id ;

        if(this.props.cart_data.checkout_id !== undefined && this.props.cart_data.checkout_id !== ''){
            checkout_id = this.props.cart_data.checkout_id;
        } else {
            checkout_id = '';
        }



        CreateAddToCartCustomiserMutation(this.state.canvas_array,specification,checkout_id, (response) => {

            if(response.customizerData !== null && response.customizerData.checkout !== null){

                let StoreCartDataFormate = {
                    lines:response.customizerData.checkout.lines,
                    checkout_id:response.customizerData.checkout.id,
                    subtotalPrice:response.customizerData.checkout.subtotalPrice,
                    totalPrice:response.customizerData.checkout.totalPrice,
                    checkoutQuantity:response.customizerData.checkout.checkoutQuantity
                }

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                )
                cogoToast.success("Design Added to cart",{ position: 'top-center'});

                scope.sendAddToCartProductDetailstoGA(response.customizerData.checkout.lines);


                setTimeout(
                    function() {
                        localStorage.removeItem('userDesignId');

                        scope.props.history.push('/checkout');
                    }
                        .bind(this),
                    3000
                );



            } else {
                cogoToast.error("Design not Added to cart",{ position: 'top-center'});

            }

        },function (err) {
            scope.setState({
                loading:false,
                loading_msg:'',
                checkout_complete_error:true
            })
            cogoToast.error("Design not Added to cart",{ position: 'top-center'});

        })

    };
    sendAddToCartProductDetailstoGA = (products) => {
        const variables = {
            size: this.props.selected_size,
            bindingType: this.props.selected_binding,
            pages: this.props.selected_page,
            rulingType: this.props.selected_ruling,
        };

        fetchQuery(environment, GetSKUBySpecification, variables,{force:false})
            .then(data => {
                if(data.notebookSku.length > 0){
                    let sku = data.notebookSku[0].SKU;
                    let index = products.findIndex(x => x.variant.sku === sku);
                    let product = products[index];
                    if(window.dataLayer) {
                        window.dataLayer.push({
                            "event": "addToCart",
                            "ecommerce": {
                                "currencyCode": "INR",
                                "add": {
                                    "products": [{
                                        "id": product.variant.sku,
                                        "name": product.variant.name,
                                        "price": product.variant.priceOverride * this.props.selected_quantity,
                                        "category": product.variant.product.category ? product.variant.product.category.name : "Customized Notebooks",
                                        "quantity": this.props.selected_quantity,

                                    }]
                                }
                            }
                        });
                    }

                }
            });
        // ReactGA.plugin.execute(
        //     'ec',
        //     'addProduct',
        //     cliked_product
        // );
        //
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'add'
        // );


    }


    render() {
        return(

            <div>
                <div className="design_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Box component="div" style={{textAlign: 'center'}}>
                                <QuantityCarousel CarouselIndicatorType="carousel" size="fullscreen">
                                    <img src={"https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/user_design1.png"}/>
                                    <img src={"https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/user_design2.png"}/>
                                    <img src={"https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/user_design3.png"}/>
                                </QuantityCarousel>
                            </Box>
                        </Grid>
                        <Grid item xs={5} className="design_question_part">
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS

                                </h4>
                                <div className="question_and_info">
                                    <p className="question_desktop">6) Upload Your Designs</p>
                                    <div className="info_class">
                                        <p><img src={Information_Icon}/></p>
                                        <p>Tap on the image to add text</p>
                                    </div>
                                </div>
                                <p className="image_upload_warning">Note: Images size should not exceed 2MB.</p>

                                <LoadingScreen
                                    loading={this.state.loading}
                                    bgColor='#ffffffbf'
                                    spinnerColor='#000'
                                    textColor='#676767'
                                    logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                                    text={this.state.file_upload === true? this.state.loading_msg:<Progress type="circle" percent={this.state.progress}    theme={
                                        {
                                            error: {
                                                symbol: this.state.progress + '%',
                                                trailColor: '#ff673361',
                                                color: '#ff6733'
                                            },
                                            default: {
                                                symbol: this.state.progress + '%',
                                                trailColor: '#ff673361',
                                                color: '#ff6733'
                                            },
                                            active: {
                                                symbol: this.state.progress + '%',
                                                trailColor: '#ff673361',
                                                color: '#ff6733'
                                            },
                                            success: {
                                                symbol: this.state.progress + '%',
                                                trailColor: '#ff673361',
                                                color: 'green'
                                            }
                                        }
                                    }  />}
                                >
                                    <FileUploadForm
                                        addFile={this.addFile}
                                        files={this.state.files}
                                        FormattedFiles={this.state.formatted_preview_images}
                                        clearAllDesign = {this.clearAllDesign}
                                        canvasArray={this.state.canvas_array}
                                        loading = {this.state.loading}
                                        canvas_fill={this.state.canvas_fill}
                                        loading_msg={this.state.loading_msg}
                                        converted_images={this.state.converted_images}
                                    />
                                </LoadingScreen>
                            </Box>
                        </Grid>
                        <Grid item xs={3} className="design_progress_part">
                            <VerticalLinearStepper current_active_step="5"/>
                        </Grid>
                    </Grid>
                </div>
                <Container maxWidth={"xl"} className="button_section_desktop">
                    <Box component="div" className="btn_section">
                        <Button onClick={this.back} > <Icon className="fa fa-arrow-left "
                                                            style={{fontSize: 16, margin: "0 15px"}}/> Back</Button>
                        <Button disabled={true} onClick={this.saveAndContinue} className="continue_btn_desktop">CHECKOUT<Icon
                            className="fa fa-arrow-right " style={{fontSize: 16, margin: "0 15px"}}/> </Button>
                    </Box>
                </Container>
                {
                    this.state.files.map((images, index) => {

                        let id = index;
                        return (
                            <div  key={index} style={{display:'none'}}>
                                <canvas  ref={(ref) => this.canvasRefs[`canvas${id}`] = ref} height={this.state.canvas_height} width={this.state.canvas_width} key={index} id={index} className="canvas_section"

                                />
                            </div>
                        )

                    })
                }


            </div>

        );
    }
}



const mapStateToProps = state => ({
    files: state.specifications.notebook_images,
    selected_quantity: parseInt(state.specifications.notebook_quantity),
    selected_page: state.specifications.notebook_page,
    selected_size: state.specifications.notebook_size,
    selected_ruling: state.specifications.notebook_ruling,
    selected_binding: state.specifications.notebook_binding,
    cart_data: state.CartReducer.cart_data,
    size:state.specifications.notebook_size,
});

const mapDispatchToProps = dispatch => ({
    sendImagesToStore: selected_images => dispatch(addNotebookImages(selected_images)),
    getNotebookImages: text => dispatch(getNotebookImages(text)),
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendCanvasToStore: canvas => dispatch(SetAllCanvas(canvas)),
    clearAllDesignsFromStore: text => dispatch(ClearAllDesigns(text))


})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(DesignsDesktopComponent);

