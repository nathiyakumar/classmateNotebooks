import React from "react";
import Grid from "@material-ui/core/Grid";
import './ClassmateBrandSingleProduct.css'
import Control from "../../../SingleProductPage/Control";
import {Typography} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from "../../../NavBar/Navbar";
import {getGraphqlIdFromDBId} from '../../../../Core/util';
import environment from "../../../../Environment";
import graphql from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import CartContext from "../../../CartProvider/cart-context";
import {AddToCart} from "../../../../Actions/non_customiser_action";
import {connect} from "react-redux";
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import DesktopFooter from "../../../Footer/footer";
import MetaWrapper from "../../../../Meta/MetaWrapper";


const singleProductImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/single_product1.png'
const PlaceholderImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook canvas placeholder.svg';



const getProductById = graphql`
    query ClassmateBrandSingleProductQuery($productId:ID!){
    
         catalogueSingleProductView(productId:$productId){
            id    
            masterSku
            name
            price
            images(first:100){
              edges{
                node{
                  id
                  url
                }
              }
            }
            attributes 
            category{
              id
              name
            }
            description
             seoTitle
            seoDescription
            amazonLink
            flipkartLink
        }    
    }
`;

class ClassmateBrandSingleProduct extends React.Component{

    static contextType = CartContext;

    constructor(props) {
        super(props);

        this.state = {
            images: [{src:singleProductImg},{src:singleProductImg},{src:singleProductImg},{src:singleProductImg}],
            translateValue:0,
            currentIndex: 0,
            expanded_panel1:true,
            expanded_panel2:true,
            product_id:'',
            productVariant:{},
            product_attributes:{},
            product_type_attributes:[],
            available_for_pincode:false,
            pincode:'',
            availability_msg:'',
        };

    }

    componentWillMount() {
        let product_id = getGraphqlIdFromDBId(this.props.match.params['product_id'], "ProductVariantType");

        this.setState({
            product_id:product_id,
        });

        let variables = {
         productId:product_id
        };

        fetchQuery(environment, getProductById, variables,{force:false})
            .then(data => {
                this.setState({
                    productVariant:data.catalogueSingleProductView?data.catalogueSingleProductView:{},
                    product_attributes:data.catalogueSingleProductView?JSON.parse(data.catalogueSingleProductView.attributes):{},
                })

            });


    }


    goToNextSlide = () => {
        if (this.state.currentIndex === this.state.productVariant.images.length - 1) {
            this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }
        else{
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex + 1,
                translateValue: prevState.translateValue + -(this.slideWidth())
            }))
        }


    };
    goToPrevSlide = () => {
        if (this.state.currentIndex ===0){
            return;
        }
        else{
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex - 1,
                translateValue: prevState.translateValue + this.slideWidth()
            }))
        }

    };
    slideWidth = () => {
        return document.querySelector('.singleProduct-slide').clientWidth
    };

    handleChange = (panel)  => {
        this.setState({
            [panel]:!this.state[panel]
        })
    };




    render() {
        return(

            <MetaWrapper
                meta={{
                    description: this.state.productVariant && this.state.productVariant.seoDescription?this.state.productVariant.seoDescription:'',
                    title: this.state.productVariant && this.state.productVariant.seoTitle?this.state.productVariant.seoTitle:'',
                }}
            >

                <CartContext.Consumer>
                    {
                        CartProvider => {
                            return(
                                <>
                                    <div className="DesktopSingleProductPage">
                                        <Navbar />
                                        <Grid container spacing={0} style={{marginTop:'50px'}}>
                                            <Grid item xs={6} className="grid" style={{padding:'0px',paddingBottom:'5%',backgroundColor:'#fff'}}>
                                                <div className="productLeft">
                                                    <div className="singleProductslider">
                                                        <div className="singleProduct-slider-wrapper"
                                                             style={{
                                                                 transform: `translateX(${this.state.translateValue}px)`,
                                                                 transition: 'transform ease-out 0.45s'
                                                             }}>


                                                            {
                                                                this.state.productVariant.images && this.state.productVariant.images.edges.length>0?
                                                                    <div>
                                                                        {
                                                                            this.state.productVariant.images.edges.map((image, index) => {
                                                                                return (
                                                                                    <div className="singleProduct-slide" key={index}>
                                                                                        <img src={image.node.url}  className="singleImg" />
                                                                                    </div>
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>

                                                                    :(
                                                                        <div className="singleProduct-slide">
                                                                            <img src={PlaceholderImg}  className="singleImg" />
                                                                        </div>)
                                                            }

                                                        </div>

                                                        {
                                                            this.state.productVariant.images && this.state.productVariant.images.edges.length > 1 ?
                                                                (<div>
                                                                    <Control itemsnumber={this.state.productVariant.images.edges.length} index={this.state.currentIndex}
                                                                             handleChangeIndex={this.handleChangeIndex}/>
                                                                    <LeftArrow
                                                                        goToPrevSlide={this.goToPrevSlide}
                                                                    />
                                                                    <RightArrow
                                                                        goToNextSlide={this.goToNextSlide}
                                                                    />
                                                                </div>) : null
                                                        }



                                                    </div>

                                                    <div className="single_product_page_btn_section">
                                                         <div className="ByOnClassmateBtn social_btn" >
                                                           BY ON CLASSMATESHOP
                                                        </div>
                                                        {
                                                            this.state.productVariant.flipkartLink && (
                                                                <a href={this.state.productVariant.flipkartLink} target="_blank">
                                                                    <div className="FlipkartBtn social_btn" >
                                                                        <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/flipkart_icon.png"/>
                                                                    </div>
                                                                </a>

                                                            )
                                                        }
                                                        {
                                                            this.state.productVariant.amazonLink && (
                                                                <a href={this.state.productVariant.amazonLink}  target="_blank">
                                                                    <div className="AmazonBtn social_btn">
                                                                        <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/available-at-amazon.png"/>
                                                                    </div>
                                                                </a>

                                                            )
                                                        }


                                                    </div>
                                                </div>

                                            </Grid>

                                            <Grid item xs={6} className="grid" style={{backgroundColor:'#FF67330A',paddingBottom:'5%'}}>
                                                <div className="singleProductLeft">
                                                    <Typography className="text1">{this.state.productVariant && this.state.productVariant.category?this.state.productVariant.category.name:null}</Typography>
                                                    <Typography variant="h6" className="Title">{this.state.productVariant.name}</Typography>
                                                    <Typography style={{color:"#A3A3A3", fontSize:"14px",fontWeight: '400',marginTop:'10px'}}>SKU#: {this.state.productVariant.masterSku}</Typography>
                                                    <div style={{display: 'flex'}}>
                                                        <Typography variant="h4" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px'}}>Rs {this.state.productVariant?this.state.productVariant.price:''}  </Typography>
                                                    </div>
                                                    <div className="DesktopexpansionPanel">
                                                        <ExpansionPanel expanded={this.state.expanded_panel1} onChange={() => this.handleChange('expanded_panel1')}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography >Product Description</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    {this.state.productVariant && this.state.productVariant.description?this.state.productVariant.description:'None'}
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <ExpansionPanel expanded={this.state.expanded_panel2} onChange={() => this.handleChange('expanded_panel2')}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography >Product Details</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                {
                                                                   Object.keys(this.state.product_attributes).length > 0? Object.keys(this.state.product_attributes).map((keyName, i) => (

                                                                        <Typography key={i}>{keyName}  : {this.state.product_attributes[keyName]}</Typography>

                                                                    )):<Typography>None</Typography>
                                                                }
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>

                                                    </div>
                                                </div>

                                            </Grid>
                                        </Grid>
                                    </div>
                                    <DesktopFooter />
                                </>
                            )
                        }
                    }

                </CartContext.Consumer>
            </MetaWrapper>


        )
    }
}

const LeftArrow = (props) => {
    return (
        <div className="singleProduct-backArrow singleProduct-arrow" onClick={props.goToPrevSlide}>
            <i className="ri-arrow-left-s-line"></i>
        </div>
    );
};


const RightArrow = (props) => {
    return (
        <div className="singleProduct-nextArrow singleProduct-arrow" onClick={props.goToNextSlide}>
            <i className="ri-arrow-right-s-line"></i>
        </div>
    );
};



const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
});


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
});




export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(ClassmateBrandSingleProduct);
