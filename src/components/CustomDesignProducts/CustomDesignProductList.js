import React from "react";
import './CustomDesignProductList.css'
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import $ from 'jquery'
import Navbar from "../NavBar/Navbar";
import graphql from 'babel-plugin-relay/macro';
import environment from "../../Environment";
import {fetchQuery} from 'relay-runtime';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {compose} from 'redux';
import CreateLDPAddToCartMutation from "../../mutations/CreateLDPAddToCartMutation";
import CartContext from "../CartProvider/cart-context";
import {
    addNotebookBinding,
    addNotebookPage, addNotebookRuling,
    addNotebookSize,
} from "../../Actions";
import {AddToCart,saveSelectedLDPProducts} from "../../Actions/non_customiser_action";
import DesktopFooter from "../Footer/footer";
import cogoToast from 'cogo-toast';
import CustomDesignProductListItem from "./CustomDesignProductListItem";


const noteIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/noteicon.svg";


const getLedpProducts = graphql`
  query CustomDesignProductListQuery($isAvailable:Boolean){
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
  query CustomDesignProductListCategoryListQuery($isAvailable:Boolean){
       licensedDesignBooksCategory(isAvailable: $isAvailable)
       {
            id
            name         
       }
  }
`;

const getProductsByCategory = graphql`
  query CustomDesignProductListProductsByCategoryQuery(
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
        query CustomDesignProductListNotebookSkuQuery($size:String , $bindingType:String , $pages:String , $rulingType:String ) {
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

class CustomDesignProductList extends React.Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            NotebookItemCount: 1,
            NotebookItems: [],
            open: false,
            packOf3: false,
            packOf6: false,
            DesignImages: [],
            activeIndex: 0,
            notebook_size: "",
            notebook_binding: "",
            notebook_page: "",
            notebook_ruling: "",
            categories: [],
            quantity: 6,
            loadingMsg:"Designs are being populated.. Please wait.",

        };
        this.addItems = this.addItems.bind(this);
        this.removeItems = this.removeItems.bind(this);
        this.changeEv = this.changeEv.bind(this);
        this.getAllCategoryProducts = this.getAllCategoryProducts.bind(this);
        this.ValidateProducts = this.ValidateProducts.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
    }

    changeEv(e) {
        this.setState({
            username: e.target.value
        })
    }

    componentWillReceiveProps(nextProps, nextContext){

        this.getCategoryAndProducts(nextProps);
    }

    componentWillMount() {
        this.setState({
            notebook_size: this.props.notebook_size,
            notebook_binding: this.props.notebook_binding,
            notebook_page: this.props.notebook_page,
            notebook_ruling: this.props.notebook_ruling,
        })
    }


    componentDidMount() {

       this.getCategoryAndProducts(this.props);


       if(this.props.selected_ldp_products && this.props.selected_ldp_products.length > 0){
           this.setState({
               NotebookItems:this.props.selected_ldp_products,
               NotebookItemCount:this.props.selected_ldp_products.length,
               quantity:this.props.selected_ldp_products.length,
           })
           this.setDropDown();

       } else {

           this.setInitialState();
           this.setDropDown();

       }

    }
    setInitialState = () => {
        let ItemArray = [];
        let count = 1;
        for (let i = 0; i < 6; i++) {
            let itemIndex = count * i;
            ItemArray[i] = {id: '', item_index: itemIndex, thumbnailUrl: ""};
        }
        this.setState({
            NotebookItems: ItemArray,
            NotebookItemCount: count,
            quantity:6,
        });

    };
    setDropDown = () => {
        let self = this;

        $('select').each(function () {
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next('div.select-styled');


            let select_field = $this[0].id;
            let selected_value;

            if(select_field === "size"){
                if(self.state.notebook_size === ""){
                    selected_value = $this.children('option').eq(0).text();
                } else {
                    if(self.state.notebook_size === "240 x 180"){
                        selected_value = "Short Notebook";

                    } else if(self.state.notebook_size === "297 x 210"){
                        selected_value = "Long Notebook";
                    }

                }

            }
            if(select_field === "pages"){
                if(self.state.notebook_page === ""){
                    selected_value = $this.children('option').eq(0).text();
                } else {
                    if(self.state.notebook_page === "140"){
                        selected_value = "140 Pages";

                    } else if(self.state.notebook_page === "172"){
                        selected_value = "172 Pages";
                    }
                }

            }
            if(select_field === "binding"){
                if(self.state.notebook_binding === ""){
                    selected_value = $this.children('option').eq(0).text();
                } else {
                    if(self.state.notebook_binding === "BPCS"){
                        selected_value = "Center-Stapled";
                    } else if(self.state.notebook_binding === "Wiro"){
                        selected_value = "Spiral";
                    }
                }

            }
            if(select_field === "ruling"){
                if(self.state.notebook_ruling === ""){
                    selected_value = $this.children('option').eq(0).text();
                } else {
                    if(self.state.notebook_ruling === "Single Line"){
                        selected_value = "Ruled";
                    } else if(self.state.notebook_ruling === "Unruled"){
                        selected_value = "Unruled";
                    }
                }
            }


            $styledSelect.text(selected_value);


            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function (e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function () {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });

            $listItems.click(function (e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                let value = $this.val()
                if ($this.val($(this).attr('rel'))[0].id === "size") {
                    self.setState({
                        notebook_size: value
                    },()=>{
                        self.props.sendSizeToStore(value)
                    })
                } else if ($this.val($(this).attr('rel'))[0].id === "binding") {
                    self.setState({
                        notebook_binding: value
                    },()=>{
                        self.props.sendBindingToStore(value)
                    })
                } else if ($this.val($(this).attr('rel'))[0].id === "pages") {
                    self.setState({
                        notebook_page: value
                    },()=>{
                        self.props.sendPageToStore(value)
                    })
                } else if ($this.val($(this).attr('rel'))[0].id === "ruling") {
                    self.setState({
                        notebook_ruling: value
                    },()=>{
                        self.props.sendRulingToStore(value)
                    })
                } else {

                }
                $list.hide();
                //console.log($this.val());
            });

            $(document).click(function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

    };

    getCategoryAndProducts = (props) => {

        const variables = {
            isAvailable: true
        };

        fetchQuery(environment, getCategoryList, variables,{force:false})
            .then(data => {
                if (data.licensedDesignBooksCategory) {
                    this.setState({
                        categories: data.licensedDesignBooksCategory
                    },()=>{

                        if(props.match.params.category){

                            const selected_category = this.state.categories.filter(category => category.name === props.match.params.category);
                            if(selected_category[0]&&selected_category[0].id){
                                this.getProductsByCategory(selected_category[0].id);
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
            isAvailable: true
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

    }

    addItems() {

        let ItemArray = this.state.NotebookItems;

        let count = this.state.NotebookItemCount + 1;
        let quantity = 6 * count;
        for (let i = 0; i < 6; i++) {
            let itemIndex = count * i;
            ItemArray.push({id: '', item_index: itemIndex, thumbnailUrl: ""});


        }
        this.setState({
            NotebookItems: ItemArray,
            NotebookItemCount: count,
            quantity: quantity

        })

    }

    removeItems() {

        let ItemArray = this.state.NotebookItems;
        if (ItemArray !== []) {
            if (ItemArray.length > 6) {

                let count = this.state.NotebookItemCount - 1;
                let quantity = 6 * count;
                for (let i = 0; i < 6; i++) {
                    ItemArray.pop();
                }

                this.setState({
                    NotebookItems: ItemArray,
                    NotebookItemCount: count,
                    quantity: quantity,
                    activeIndex: quantity


                },()=>{
                   this.props.sendSelectedProductsToStore(ItemArray);
                })
            }

        }

    }

    addDesign = (e, product) => {


        let ItemArray = this.state.NotebookItems;
        let index = this.state.activeIndex
        for (let i = 0; i < ItemArray.length; i++) {
            if (index === i) {
                ItemArray[index].thumbnailUrl = product.thumbnailUrl;
                ItemArray[index].id = product.id;

                this.setState({
                    NotebookItems: ItemArray,
                    activeIndex: index + 1
                },() => {
                   this.props.sendSelectedProductsToStore(ItemArray);
                })
            }

        }
        if (ItemArray.length === index + 1) {

            this.setState({
                activeIndex: index
            })
        }


    };


    ValidateProducts() {

        cogoToast.info("Currently Unavailable", {position: 'top-center'});

        
        // let completed = false;
        // let product = {}
        // let selected_products = this.state.NotebookItems;
        // for (let i = 0; i < selected_products.length; i++) {
        //     if (selected_products[i].id === "") {
        //         completed = false;
        //     } else {
        //         completed = true;
        //     }
        //     let index = i.toString();
        //     product[index] = selected_products[i].id


        //     if (i === selected_products.length - 1) {
        //         this.addProductToCart(completed, product);
        //     }
        // }

    }

    addProductToCart(completed, product) {
        let specification = {
            "pages": this.state.notebook_page,
            "size": this.state.notebook_size,
            "ruling_type": this.state.notebook_ruling,
            "binding_type": this.state.notebook_binding
        };

        if (specification.pages === "") {
            cogoToast.error("Plesae select Notebook page", {position: 'top-center'});

        } else if (specification.size === "") {
            cogoToast.error("Plesae select Notebook size", {position: 'top-center'});

        } else if (specification.ruling_type === "") {
            cogoToast.error("Plesae select Notebook Ruling Type", {position: 'top-center'});

        } else if (specification.binding_type === "") {
            cogoToast.error("Plesae select Notebook Binding Type", {position: 'top-center'});

        } else if (completed === false) {
            cogoToast.error("Please select remaining products", {position: 'top-center'});

        } else {

            let scope = this;

            let checkout_id;

            if (this.props.cart_data.checkout_id !== undefined && this.props.cart_data.checkout_id !== '' && this.props.cart_data.checkout_id !== null) {
                checkout_id = this.props.cart_data.checkout_id;
            } else {
                checkout_id = '';
            }

            CreateLDPAddToCartMutation(product, checkout_id, specification, (response) => {

                if (response.licensedDesignUserData !== null) {

                    let StoreCartDataFormate = {
                        lines: response.licensedDesignUserData.checkout.lines,
                        checkout_id: response.licensedDesignUserData.checkout.id,
                        subtotalPrice: response.licensedDesignUserData.checkout.subtotalPrice,
                        totalPrice: response.licensedDesignUserData.checkout.totalPrice,
                        checkoutQuantity: response.licensedDesignUserData.checkout.checkoutQuantity
                    };

                    scope.props.sendCartDatasToStore(
                        StoreCartDataFormate
                    );
                    scope.context.addCartData(
                        StoreCartDataFormate
                    );
                    cogoToast.success("Your customised notebooks are added to cart", {position: 'top-center'});

                    scope.sendAddToCartProductDetailstoGA(response.licensedDesignUserData.checkout.lines);

                    setTimeout(
                        function() {
                            scope.setInitialState();
                            this.props.sendSelectedProductsToStore([]);
                        }
                            .bind(this),
                        1000
                    );
                } else {
                    cogoToast.error("Design not Added to cart", {position: 'top-center'});
                }

            }, function (err) {
                cogoToast.error("Design not Added to cart", {position: 'top-center'});
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

    SelectDesign(e, category_id) {

        var elems = document.querySelectorAll(".active");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        e.target.className = "active";
        if (category_id === 'all') {
            this.props.history.push('/classmate-designer-notebooks');
            this.getAllCategoryProducts();
        } else {

            let category_name = e.target.innerText;
            this.props.history.push('/classmate-designer-notebooks/'+category_name,{ category_id: category_id });
            this.getProductsByCategory(category_id);
        }
        window.scrollTo(0, 0);

    }

    getProductsByCategory = (category_id) => {
        const variables = {
            categoryId: category_id,
            isAvailable: true
        };
        this.setState({
            loadingMsg:"Designs are being populated.. Please wait."
        });

        fetchQuery(environment, getProductsByCategory, variables,{force:false})
            .then(data => {

                if (data.licensedDesignBooks.length !== 0) {
                    this.setState({
                        DesignImages: data.licensedDesignBooks,
                    })

                }

                else{
                    this.setState({
                        DesignImages: data.licensedDesignBooks,
                        loadingMsg : "Products Not Available"
                    })
                }
            });


    };

    selectThumb(e, index) {
        this.setState({
            activeIndex: index
        })
    }

    render() {

        const {activeIndex} = this.state;

        let listItems = this.state.NotebookItems.map(function (thumbImage, index) {


            return (

                <Grid item xs={6} className="grid" key={index}>
                    <div className={`listItemDiv ${activeIndex === index ? "activeItem" : ""}`} id={index}
                         onClick={(event) => {
                             this.selectThumb(event, index)
                         }}
                    >
                        <img src={thumbImage.thumbnailUrl} alt=""/>
                    </div>
                </Grid>

            )
        }, this);
        return (
            <>
                <div className="NotebookDesignsPage">
                    <Navbar/>
                    <Grid container spacing={0} style={{marginTop: '2%', marginBottom: '3%'}}>
                        <Grid item xs={3} className="grid leftSide ">
                            <div className="leftSideDesign grid_columns">
                                <Typography className="leftSideTitle">Your Pack ({this.state.quantity})</Typography>
                                <div className="listItems">
                                    <Grid container spacing={3} className="listItems_packs">
                                        {listItems}
                                    </Grid>

                                </div>
                                <div style={{textAlign: 'center', marginTop: '15%', marginBottom: '10%'}}>
                                    <Button className="addBtn" onClick={this.addItems} id="Custom_design_add_six_more">ADD 6 MORE</Button>
                                    {
                                        this.state.quantity > 6 ?
                                            <Button className="removeBtn" onClick={this.removeItems} id="Custom_design_remove_six_more">REMOVE 6 </Button>
                                            : null
                                    }
                                    <Button className="addBtn proceedBtn" onClick={this.ValidateProducts} >ADD TO
                                        CART</Button>


                                </div>
                                <span style={{display: 'flex'}}>
                                <img src={noteIcon} alt="note"
                                     style={{width: "20px", paddingRight: '10px'}}/>
                                       <Typography className="designNote">Number of notebooks should be in multiples of 6</Typography>
                            </span>
                                <div className="filterItem">
                                    <Typography className="listItem">Category List</Typography>
                                    <List className="categoryList"
                                          component="nav"
                                          aria-labelledby="nested-list-subheader"
                                    >
                                        <div className='collapseLists'>
                                            <List component="div" disablePadding>
                                                <ListItem onClick={(e) => this.SelectDesign(e, 'all')}
                                                          className={this.props.match.params.category?"category_list_item":"active"}>
                                                    <ListItemText primary="All Category"/>
                                                </ListItem>
                                                {
                                                    this.state.categories.map((item, index) => {
                                                        return <ListItem onClick={(e) => this.SelectDesign(e, item.id)} key={index}
                                                                         className={this.props.match.params.category === item.name ?"active":"category_list_item"}>
                                                            <ListItemText primary={item.name}/>
                                                        </ListItem>
                                                    })
                                                }
                                            </List>
                                        </div>
                                    </List>


                                </div>
                            </div>

                        </Grid>
                        <Grid item xs={9} className="grid rightsideTop">
                            <div className="grid_columns">
                                <div>
                                    <Typography style={{textAlign: 'left'}}>Select Notebook Specs:</Typography>
                                    <div className="rightSideHeader">
                                        <div>

                                            <div className="dd-group">
                                                <div className="selection select">
                                                    <label htmlFor="size">Size : </label>
                                                    <select id="size" name="size">
                                                        <option disabled={true}>--Select--</option>
                                                        <option value="297 x 210">Long Notebook</option>
                                                        <option value="240 x 180">Short Notebook</option>
                                                    </select>
                                                </div>
                                                <div className="selection select" style={{width: ' 180px'}}>
                                                    <label htmlFor="binding">Binding :</label>

                                                    <select id="binding" name="binding">
                                                        <option disabled={true}>--Select--</option>
                                                        <option value="BPCS">Center-Stapled</option>
                                                        <option value="Wiro">Spiral</option>
                                                    </select>
                                                </div>

                                                <div className="selection select">
                                                    <label htmlFor="pages">Pages:</label>

                                                    <select id="pages" name="pages">
                                                        <option disabled={true}>--Select--</option>
                                                        <option value="140">140 Pages</option>
                                                        <option value="172">172 Pages</option>
                                                    </select>
                                                </div>
                                                <div className="selection select">
                                                    <label htmlFor="ruling">Ruling:</label>

                                                    <select id="ruling" name="ruling">
                                                        <option disabled={true}>--Select--</option>
                                                        <option value="Single Line">Ruled</option>
                                                        <option value="Unruled">Unruled</option>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                                <div className="rightSideDesign">
                                    <Grid container spacing={0} style={{padding: ' 32px 32px 32px 32px'}}>

                                        {
                                            this.state.DesignImages.length > 0 && this.state.DesignImages.map(function (item, index) {

                                                return (
                                                    <CustomDesignProductListItem product={item} key={index}
                                                                                 addDesign={this.addDesign}/>
                                                )
                                            }, this)
                                        }

                                        {
                                            this.state.DesignImages.length == 0 &&
                                            <div className="empty_msg">{this.state.loadingMsg}</div>
                                        }

                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <DesktopFooter/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
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
    connect(mapStateToProps, mapDispatchToProps)
)(CustomDesignProductList);
