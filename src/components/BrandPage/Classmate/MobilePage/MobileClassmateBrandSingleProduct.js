import React from "react";
import './MobileClassmateBrandSingleProduct.css'
import {Typography} from "@material-ui/core";
import Slider from "react-slick";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MobileNavbar from "../../../NavBar/MobileNavbar";
import graphql from "babel-plugin-relay/macro";
import CartContext from "../../../CartProvider/cart-context";
import {getGraphqlIdFromDBId} from "../../../../Core/util";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import {AddToCart} from "../../../../Actions/non_customiser_action";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import MetaWrapper from "../../../../Meta/MetaWrapper";

const singleProduct = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/MblSingleProd.png";
const PlaceholderImg = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook canvas placeholder.svg";


const getProductById = graphql`
    query MobileClassmateBrandSingleProductQuery($productId:ID!){
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



class MobileClassmateBrandSingleProduct  extends React.Component{
    static contextType = CartContext;
    constructor(props) {
        super(props);
        this.state = {
            images: [{src:singleProduct},{src:singleProduct},{src:singleProduct},{src:singleProduct}],
            currentIndex: 0,
            product_id:'',
            productVariant:{},
            product_attributes:{},
            product_type_attributes:[],
            available_for_pincode:false,
            pincode:'',
            availability_msg:'',
            expanded_panel1:true,
            expanded_panel2:true,
        }
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
    handleChange = (panel)  => {
        this.setState({
            [panel]:!this.state[panel]
        })
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,

        };
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
                                <div className="mobile_single_product_component">
                                    <MobileNavbar />
                                    <div className="MblSinglePage">
                                        <Typography className="text1">{this.state.productVariant && this.state.productVariant.category?this.state.productVariant.name:null}</Typography>
                                        <Typography className="MblSinglePageTitle" variant="h6">{this.state.productVariant.name}</Typography>
                                        <Typography style={{color:"#A3A3A3", fontSize:"14px",fontWeight: '400',marginTop:'10px'}}>SKU#: {this.state.productVariant.masterSku}</Typography>

                                        <span style={{display: 'flex'}}>
                                            <Typography variant="h5" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px',fontWeight:' 600'}}>Rs {this.state.productVariant?this.state.productVariant.price:''}  </Typography>
                                        </span>
                                        <div>

                                            {
                                                this.state.productVariant.images && this.state.productVariant.images.edges.length>0?
                                                    <div>
                                                        {
                                                            <Slider {...settings}>
                                                                {
                                                                    this.state.productVariant.images.edges.map((image, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <img src={image.node.url}  id="productImg1" style={{width:'100%'}} />
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </Slider>
                                                        }
                                                    </div>

                                                    :(
                                                        <Slider {...settings}>
                                                            <div align={"center"}>
                                                                <img src={PlaceholderImg} id="productImg1" style={{width:'60%'}} />
                                                            </div>
                                                        </Slider>
                                                    )
                                            }

                                        </div>
                                        <div className="MblBottom">
                                            <div className="mobile_expansion_panel_section">
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
                                                <div className="single_product_page_btn_section">
                                                    {
                                                        this.state.productVariant.flipkartLink && (
                                                            <a href={this.state.productVariant.flipkartLink} target="_blank">
                                                                <div className="MobileFlipkartBtn social_btn" >
                                                                    <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/flipkart_icon.png"/>
                                                                </div>
                                                            </a>

                                                        )
                                                    }
                                                    {
                                                        this.state.productVariant.amazonLink && (
                                                            <a href={this.state.productVariant.amazonLink}  target="_blank">
                                                                <div className="MobileAmazonBtn social_btn">
                                                                    <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/available-at-amazon.png"/>
                                                                </div>
                                                            </a>

                                                        )
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="FixedBtn">
                                        <button className="addPackBtn">
                                            BY ON CLASSMATESHOP
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    }
                </CartContext.Consumer>
            </MetaWrapper>
        )
    }
}



const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
});


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
});




export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(MobileClassmateBrandSingleProduct);
