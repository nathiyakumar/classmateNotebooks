import React from "react";
import {Typography} from "@material-ui/core";
import './MobileCustomDesignProductList.css';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Slider from "react-slick/lib";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MobileNavbar from "../NavBar/MobileNavbar";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../Environment";
import CustomDesignProductListItem from "./CustomDesignProductListItem";
import CreateLDPAddToCartMutation from "../../mutations/CreateLDPAddToCartMutation";
import {AddToCart, saveSelectedLDPProducts} from "../../Actions/non_customiser_action";
import {compose} from "redux";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import CartContext from "../CartProvider/cart-context";
import ReactDOM from 'react-dom';
import cogoToast from 'cogo-toast';
import {addNotebookBinding, addNotebookPage, addNotebookRuling, addNotebookSize} from "../../Actions";


const getLedpProducts = graphql`
  query MobileCustomDesignProductListQuery($isAvailable:Boolean){
    licensedDesignBooks(isAvailable: $isAvailable){
        id
        name
        isAvailable
        thumbnailUrl
        category{
            id
            name
        }
    }
  }
`;

const getCategoryList = graphql`
  query MobileCustomDesignProductListCategoryListQuery($isAvailable:Boolean){
       licensedDesignBooksCategory(isAvailable: $isAvailable)
       {
            id
            name         
       }
  }
`;

const getProductsByCategory = graphql`
  query MobileCustomDesignProductListProductsByCategoryQuery(
        $categoryId:ID
        $isAvailable:Boolean){
       licensedDesignBooks(
            categoryId:$categoryId
            isAvailable: $isAvailable)
       {
            id
            name
            isAvailable
            thumbnailUrl
            category{
                id
                name
            }
       }
  }
`;

const GetSKUBySpecification = graphql`
        query MobileCustomDesignProductListNotebookSkuQuery($size:String , $bindingType:String , $pages:String , $rulingType:String ) {
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
        `;


class MobileCustomDesignProductList extends React.Component {
    static contextType = CartContext;
    constructor(props) {

        super(props);
        this.state = {
            NotebookItemCount: 1,
            NotebookItems: [],
            bottom: false,
            selected: 'Avengers',
            top: false,
            ThemesArray: [],
            activeIndex: 0,
            size:"",
            bind:"",
            rule:"",
            page:'',
            translate: 1,
            transition: 0.3,
            wheel: true,
            DesignImages:[],
            list :[
                {name: 'All Category'},
            ],
            index: 0,
            loadingMsg:"Designs are being populated.. Please wait.",
            remaingCount:6
        };
        this._nodes = new Map();
        this.addDesigns = this.addDesigns.bind(this);
        this.SelectSize = this.SelectSize.bind(this);
        this.SelectRuling = this.SelectRuling.bind(this);
        this.SelectBinding = this.SelectBinding.bind(this);
        this.removeItems = this.removeItems.bind(this);


    }
    componentWillReceiveProps(nextProps, nextContext){

        this.getCategoryAndProducts(nextProps);
    }

    componentWillMount() {
        this.setState({
            size:this.props.notebook_size,
            bind:this.props.notebook_binding,
            rule:this.props.notebook_ruling,
            page:this.props.notebook_page,
        })
    }
    componentDidMount() {
        this.getCategoryAndProducts(this.props);

        if(this.props.selected_ldp_products && this.props.selected_ldp_products.length > 0){
            this.setState({
                ThemesArray:this.props.selected_ldp_products,
                NotebookItems:this.listToMatrix(this.props.selected_ldp_products,6),
                NotebookItemCount:this.listToMatrix(this.props.selected_ldp_products,6).length
            })

        } else {

            this.setInitialState();

        }


    }
    setInitialState = () => {
        let ItemArray = [];
        let count = 1;
        let themesArray = [];

        let ArrayItems = [];
        for (let i = 0; i < 6; i++) {

            let itemIndex = count * i;
            ArrayItems.push({id:'', item_index: itemIndex, thumbnailUrl: ""});
            themesArray.push({id:'', item_index: itemIndex, thumbnailUrl: ""})
        }
        ItemArray.push(ArrayItems);
        this.setState({
            NotebookItems: ItemArray,
            ThemesArray: themesArray
        })

    };
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
    };
    getCategoryAndProducts = (props) => {

        const variables = {
            isAvailable:true
        };

        fetchQuery(environment, getCategoryList, variables,{force:false})
            .then(data => {
                if(data.licensedDesignBooksCategory){
                    let list = [{name: 'All Category'}];
                    for(let i=0;i<data.licensedDesignBooksCategory.length;i++){
                        list.push(data.licensedDesignBooksCategory[i]);
                    }

                    this.setState({
                        list:list
                    },()=>{
                        if(props.match.params.category){

                            const selected_category = this.state.list.filter(category => category.name === props.match.params.category);
                            let index = this.state.list.findIndex(p => p.name === props.match.params.category);

                            if(selected_category[0]&&selected_category[0].id){
                                this.getProductsByCategory(index , selected_category[0].id);
                                this.setState({
                                    selected: selected_category[0].name
                                })
                            } else {
                                this.props.history.push('/classmate-designer-notebooks');
                            }


                        } else {
                            this.getAllCategoryProducts();
                        }


                    })

                }
            });
    };

    getAllCategoryProducts() {

        const variables = {
            isAvailable:true
        };
        this.setState({
            loadingMsg:"Designs are being populated.. Please wait."
        });

        fetchQuery(environment, getLedpProducts, variables,{force:false})
            .then(data => {

                if(data.licensedDesignBooks.length !== 0){
                    this.setState({
                        DesignImages:data.licensedDesignBooks
                    })

                }
                else{
                    this.setState({
                        DesignImages:data.licensedDesignBooks,
                        loadingMsg:"Products Not Available"
                    })

                }
            });

        this.setState({index: 0});
        const node = this._nodes.get(0);
        if (node) {
            ReactDOM.findDOMNode(node).scrollIntoView({inline : 'center', behavior: 'smooth'});
            var elem =document.getElementsByClassName("active")
            if(elem.length !== 0){
                elem[0].classList.remove("active")
            }
            this._nodes.get(0).classList.add("active")
        }

    }

    addItems() {
        let ItemArray = this.state.NotebookItems;
        let themesArray = this.state.ThemesArray;
        let ArrayItems = [];
        let count = this.state.NotebookItemCount + 1;
        for (let i = 0; i < 6; i++) {
            let itemIndex
            if (ItemArray.length > 0) {
                itemIndex = (ItemArray.length * 6) + i
            }
            ArrayItems.push({id:'',item_index: itemIndex, thumbnailUrl: ""});
            themesArray.push({id:'',item_index: itemIndex, thumbnailUrl: ""})

        }
        ItemArray.push(ArrayItems);
        this.setState({
            NotebookItems: ItemArray,
            NotebookItemCount: count,
            ThemesArray: themesArray

        })
    }


    removeItems() {

        let ItemArray = this.state.NotebookItems;
        let themesArray = this.state.ThemesArray;
        if (ItemArray !== []) {
            if (ItemArray.length > 1) {
                let count = this.state.NotebookItemCount - 1;
                ItemArray.pop();
                this.setState({
                    NotebookItems: ItemArray,
                    ThemesArray: themesArray,
                    NotebookItemCount: count,

                })
            }
            if(themesArray.length > 6){
                let count = this.state.NotebookItemCount - 1;
                for (let i = 0; i < 6; i++) {

                themesArray.pop()
                }
                this.setState({
                    NotebookItems: ItemArray,
                    NotebookItemCount: count,
                    ThemesArray: themesArray

                })
            }

            this.props.sendSelectedProductsToStore(themesArray);

        }

    }
    openDrawer(event, side, open) {

        if (side === "bottom") {
            this.setState({bottom: open});
        } else {

            this.setState({top: open});
        }
    }


    selectCategory = (i , key) => {


        if(key === null){
            key = 'All Category'
        }

        this.setState({selected: key});
        if(key === 'All Category'){
            this.props.history.push('/classmate-designer-notebooks');
            this.getAllCategoryProducts();
        } else{

            let index = this.state.list.findIndex(p => p.id === key);
            let category_name = this.state.list[index].name;
            this.props.history.push('/classmate-designer-notebooks/'+category_name,{ category_id: key });
            this.getProductsByCategory(index ,key);
        }
    };
    getProductsByCategory = (i, category_id) => {

        this.setState({
            loadingMsg:"Designs are being populated.. Please wait."
        });
        const variables = {
            categoryId:category_id,
            isAvailable:true
        };

        fetchQuery(environment, getProductsByCategory, variables,{force:false})
            .then(data => {

                if(data.licensedDesignBooks.length !== 0){
                    this.setState({
                        DesignImages:data.licensedDesignBooks
                    })

                }
                else{
                    this.setState({
                        DesignImages:data.licensedDesignBooks,
                        loadingMsg:"Products Not Available"
                    })

                }
            });

        this.setState({index: i});
        const node = this._nodes.get(i);
        if (node) {
            ReactDOM.findDOMNode(node).scrollIntoView({inline : 'center', behavior: 'smooth'});
            var elem =document.getElementsByClassName("active")
            if(elem.length !== 0){
                elem[0].classList.remove("active")
            }
            this._nodes.get(i).classList.add("active")
        }


    };
    onUpdate = ({ translate }) => {

        this.setState({ translate });
    };


    SelectSize(e , size){
        this.setState({
            size : size
        },()=>{
            this.props.sendSizeToStore(size)
        })

    }
    SelectRuling(e , rule){

        this.setState({
            rule : rule
        },()=>{
            this.props.sendRulingToStore(rule)
        })

    }
    SelectBinding(e , bind){

        this.setState({
            bind : bind
        },()=>{
            this.props.sendBindingToStore(bind)
        })
    }
    SelectPage(e , page){

        this.setState({
            page : page
        },()=>{
            this.props.sendPageToStore(page)
        })
    }

    addDesigns = (e, image) => {

        let ImageArray = this.state.ThemesArray;
        let index = this.state.activeIndex;
        let ItemArrary = this.state.NotebookItems;
        for (let i = 0; i < ImageArray.length; i++) {
            if (index === i) {
                ImageArray[index].src = image.thumbnailUrl;
                ImageArray[index].id = image.id;

                let remainingcount = ImageArray.length - index - 1

                this.setState({
                    ThemesArray: ImageArray,
                    activeIndex: index + 1,
                    remaingCount: remainingcount
                },() => {
                    this.props.sendSelectedProductsToStore(ImageArray);
                })
            }


        }
        for (let j = 0; j < ItemArrary.length; j++) {
            for (let i = 0; i < ItemArrary[j].length; i++) {
                let Indexno;
                if (ItemArrary.length > 1) {
                    Indexno = (j * 6) + i
                } else {
                    Indexno = i
                }

                if (index === Indexno) {
                    ItemArrary[j][i].src = image.thumbnailUrl;

                    this.setState({
                        NotebookItems: ItemArrary,
                        activeIndex: index + 1
                    })
                }

            }
        }
        if (ImageArray.length === index + 1) {

            cogoToast.success('you have already selected ' + ImageArray.length +' designs, do you wish to change the design',{ position: 'bottom-center'});
            this.setState({
                activeIndex: index
            })

        }

        else{
            cogoToast.success("Product Added To Your Pack",{ position: 'bottom-center'});
        }



    };

    selectThumb(e, index) {

        this.setState({
            activeIndex: index
        })

    }

    ValidateProducts = () => {

        let completed = false;
        let product = {}
        let selected_products = this.state.ThemesArray;
        for(let i=0;i<selected_products.length;i++){
            if(selected_products[i].id === ""){
                completed = false;
            } else {
                completed = true;
            }
            let index = i.toString();
            product[index] = selected_products[i].id;


            if(i === selected_products.length-1){
                this.addProductToCart(completed,product);
            }
        }

    };

    addProductToCart(completed,product) {

        let specification = {
            "pages": this.state.page,
            "size": this.state.size,
            "ruling_type": this.state.rule,
            "binding_type": this.state.bind
        };

         if(specification.size === ""){
            cogoToast.error("Plesae select Notebook size", { position: 'bottom-center'});
            this.setState({top: true,
                bottom : false
            });
        }else if(specification.ruling_type === ""){
            cogoToast.error("Plesae select Notebook Ruling Type", { position: 'bottom-center'});
            this.setState({top: true,
                bottom : false
            });
        }else if(specification.binding_type === ""){
            cogoToast.error("Plesae select Notebook Binding Type", { position: 'bottom-center'});
            this.setState({top: true,
                bottom : false
            });
        }
         else if(specification.pages === ""){
             cogoToast.error("Plesae select Notebook page", { position: 'bottom-center'});
             this.setState({top: true,
                 bottom : false
             });
         }
         else if(completed === false){
            cogoToast.error("Please select remaining products", { position: 'bottom-center'});
        }

        else{

            let scope=this;

            let checkout_id ;

            if(this.props.cart_data.checkout_id !== undefined && this.props.cart_data.checkout_id !== '' && this.props.cart_data.checkout_id !== null){
                checkout_id = this.props.cart_data.checkout_id;
            } else {
                checkout_id = '';
            }

            CreateLDPAddToCartMutation(product,checkout_id,specification, (response) => {

                if(response.licensedDesignUserData !== null){

                    let StoreCartDataFormate = {
                        lines:response.licensedDesignUserData.checkout.lines,
                        checkout_id:response.licensedDesignUserData.checkout.id,
                        subtotalPrice:response.licensedDesignUserData.checkout.subtotalPrice,
                        totalPrice:response.licensedDesignUserData.checkout.totalPrice,
                        checkoutQuantity:response.licensedDesignUserData.checkout.checkoutQuantity
                    };

                    scope.props.sendCartDatasToStore(
                        StoreCartDataFormate
                    );
                    scope.context.addCartData(
                        StoreCartDataFormate
                    );

                    cogoToast.success("Product Added To Your Cart Successfully",{ position: 'bottom-center'});

                    scope.sendAddToCartProductDetailstoGA(response.licensedDesignUserData.checkout.lines);

                    setTimeout(
                        function() {
                            scope.setInitialState();
                            this.props.sendSelectedProductsToStore([]);
                        }
                            .bind(this),
                        1000
                    );

                    this.openDrawer('','bottom', false);

                } else {
                    cogoToast.error("Product not Added To Your Cart",{ position: 'bottom-center'});
                }

            },function (err) {
                cogoToast.error("Product not Added To Your Cart",{ position: 'bottom-center'});
            })

        }

    }
    sendAddToCartProductDetailstoGA = (products) => {

        const variables = {
            size: this.state.notebook_size,
            bindingType: this.state.notebook_binding,
            pages: this.state.notebook_page,
            rulingType: this.state.notebook_ruling
        };

        fetchQuery(environment, GetSKUBySpecification, variables,{force:false})
            .then(data => {
                if(data.notebookSku.length > 0){
                    let sku = data.notebookSku[0].SKU+"-LD";
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
                                        "price": product.variant.price,
                                        "category": product.variant.product.category ? product.variant.product.category.name : "Custom Design Notebooks",
                                        "quantity": product.quantity,

                                    }]
                                }
                            }
                        });
                    }

                }
            });
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
        const {activeIndex} = this.state;
        const fullList = side => (
            <div
                className="DrawerFullList"
                role="presentation"
                style={{height: "auto", padding: "20px"}}
            >

                {side === "bottom" ? (
                    <>
                        <div style={{display: "flex", paddingBottom: '8px', justifyContent: ' space-between'}}>

                            <Typography className="drawerTitle">Your Pack</Typography>
                            <button className="MblCloseBtn" onClick={(event) => {
                                this.openDrawer(event, side, false)
                            }}>
                                <i className="ri-close-line drawerTitle"/>
                            </button>
                        </div>

                        {this.state.remaingCount !==0 ? <span style={{display: "flex", color: "#F64E4E", alignItems: "center", paddingBottom: "16px"}}>

                                <i style={{fontSize: "19px", marginRight: "4px"}} className="ri-information-line"/>
                                < Typography
                                style={{textAlign: "left", font: "inherit", fontSize: "14px", fontWeight: "600"}}>Add {this.state.remaingCount} designs to the pack to place order
                                </Typography>

                        </span>   : null
                        }
                        <div className="notebookDesignContainer">
                            <Slider {...settings}>
                                {
                                    this.state.NotebookItems.map(function (items, index) {


                                        return <div key={index}>
                                            <Grid container spacing={3}>

                                                {
                                                    items.map(function (item, index) {

                                                        return <Grid item xs={4} key={index} style={{padding:'7px'}}>
                                                            <div
                                                                className={`notebookdesigns ${activeIndex === item.item_index ? "activeItem" : ""}`}
                                                                id={item.index}
                                                                onClick={(event) => {
                                                                    this.selectThumb(event, item.item_index)
                                                                }}>
                                                                <img src={item.src} alt=""/>
                                                            </div>


                                                        </Grid>

                                                    }, this)
                                                }
                                            </Grid>


                                        </div>

                                    }, this)}


                            </Slider>
                        </div>
                        <div style={{display: "flex"}}>
                            <button className="AddtoCart" id="Custom_design_add_six_more" onClick={(event) => {
                                this.addItems(event)
                            }} style={{
                                backgroundColor: "white",
                                border: "1px solid #F64E4E",
                                color: "#F64E4E",
                                marginRight: "8px",
                                padding:'10px'
                            }}>Add 6 More
                            </button>
                            {
                                this.state.NotebookItemCount > 1 ?
                                    <button style={{
                                        backgroundColor: "white",
                                        border: "1px solid #F64E4E",
                                        color: "#F64E4E",
                                        marginRight: "8px",
                                        padding:'10px'
                                    }}  id="Custom_design_remove_six_more" onClick={this.removeItems}>Remove 6 </button>
                                    : null
                            }
                            <button className="AddtoCart" onClick={this.ValidateProducts} disabled={true}>Add to Cart</button>
                        </div>

                    </>

                ) : (

                    <div className="themeVariant">
                        <p className="variantTitle">Choose Variant</p>
                        <label>Notebook Size   </label>
                        <span style={{display: "flex", marginBottom: '25px'}}>
                            <Button value="Large"  className={this.state.size === "297 x 210"?"variantBtn selectedSize":"variantBtn"} onClick={(event) => {
                                this.SelectSize(event, "297 x 210")
                            }} >Long</Button>
                            <Button className={this.state.size === "240 x 180"?"variantBtn selectedSize":"variantBtn"} onClick={(event) => {
                                this.SelectSize(event, "240 x 180")
                            }}>Short</Button>
                        </span>

                        <label>Notebook Ruling  </label>
                        <span style={{display: "flex", marginBottom: '25px'}}>
                            <Button className={this.state.rule === "Single Line"?"variantBtn selectedRule":"variantBtn"}  onClick={(event) => {
                                this.SelectRuling(event, "Single Line")
                            }}  >Ruled</Button>
                            <Button className={this.state.rule === "Unruled"?"variantBtn selectedRule":"variantBtn"} onClick={(event) => {
                                this.SelectRuling(event, "Unruled")
                            }} >UnRuled</Button>
                        </span>
                        <label>Notebook Binding </label>
                        <span style={{display: "flex", marginBottom: '25px'}}>
                            <Button className={this.state.bind === "BPCS"?"variantBtn selectedBind":"variantBtn"} onClick={(event) => {
                                this.SelectBinding(event, "BPCS")
                            }}>Center Stapled</Button>
                            <Button className={this.state.bind === "Wiro"?"variantBtn selectedBind":"variantBtn"} onClick={(event) => {
                                this.SelectBinding(event, "Wiro")
                            }}>Spiral</Button>
                        </span>
                        <label>Notebook Page </label>
                        <span style={{display: "flex", marginBottom: '25px'}}>
                            <Button className={this.state.page === "140"?"variantBtn selectedPage":"variantBtn"} onClick={(event) => {
                                this.SelectPage(event, "140")
                            }}>140 Pages</Button>
                            <Button className={this.state.page === "172"?"variantBtn selectedPage":"variantBtn"} onClick={(event) => {
                                this.SelectPage(event, "172")
                            }}>172 Pages</Button>
                        </span>

                        <div style={{textAlign:'end',padding:'0 15px'}}>
                            <button type="button" className="spec_submit_button" onClick={(event) => {
                                this.openDrawer(event, 'top', false)
                            }}>Done</button>
                        </div>

                    </div>
                )}

            </div>
        );
        return (
            <>
                <MobileNavbar />
                <div className="MblThemedNotebooks">
                    <div className="mobile_specification_part">
                        <p className="spec_title">Specifications</p>
                        <button className="spec_btn" type="button" onClick={(event) => {
                            this.openDrawer(event, 'top', true)
                        }}>Change</button>
                    </div>

                    <nav id="pnProductNav" className="pn-ProductNav">

                        <div id="pnProductNavContents" className="pn-ProductNav_Contents">
                            {this.state.list.map((item, i) => (<div className="pn-ProductNav_Link" key={i} ref={(element) => this._nodes.set(i, element)} onClick= {this.selectCategory.bind(this, i , item.id)}><a

                            >{item.name}</a></div>))}
                        </div>
                    </nav>
                    <Container style={{padding:0,marginBottom:'5.3rem'}}>
                        <Grid container spacing={0}>
                            {
                                this.state.DesignImages.length > 0 && this.state.DesignImages.map(function (item, index) {

                                    return (
                                        <CustomDesignProductListItem product={item} key={index} addDesign={this.addDesigns} />
                                    )
                                }, this)
                            }
                            {
                                this.state.DesignImages.length === 0 &&
                                <div className="mobile_empty_img">{this.state.loadingMsg}</div>
                            }
                        </Grid>
                    </Container>
                </div>
                <div>
                    <span className="FixedSpan">
                    <Typography>Classmate Notebooks Pack of {this.state.ThemesArray.length}</Typography>
                    <button className="packbtn"
                            onClick={(event) => this.openDrawer(event, 'bottom', true)}>Your Pack</button>
                    </span>
                </div>
                <Drawer anchor="bottom" open={this.state.bottom} onClose={(event) => {
                    this.openDrawer(event, 'bottom', false)
                }}>
                    {fullList('bottom')}
                </Drawer>
                <Drawer anchor="top" open={this.state.top} onClose={(event) => {
                    this.openDrawer(event, 'top', false)
                }}>
                    {fullList('top')}
                </Drawer>
            </>

        )
    }
}
const mapStateToProps = state => ({
    cart_data:state.CartReducer.cart_data,
    selected_ldp_products:state.CartReducer.selected_ldp_products,
    notebook_size: state.specifications.notebook_size,
    notebook_binding: state.specifications.notebook_binding,
    notebook_page: state.specifications.notebook_page,
    notebook_ruling: state.specifications.notebook_ruling
});
const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendSelectedProductsToStore: (product_data) => dispatch(saveSelectedLDPProducts(product_data)),
    sendPageToStore: selected_page => dispatch(addNotebookPage(selected_page)),
    sendSizeToStore: selected_size => dispatch(addNotebookSize(selected_size)),
    sendBindingToStore: selected_binding => dispatch(addNotebookBinding(selected_binding)),
    sendRulingToStore: selected_ruling => dispatch(addNotebookRuling(selected_ruling))

});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(MobileCustomDesignProductList);
