import React from "react";
import './MobileProductList.css';
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import MobileProductGridView from "./MobileProductGridView";
import MobileProductListView from "./MobileProductListView";
import Box from "@material-ui/core/Box";
import CartContext from "../../CartProvider/cart-context";
// import ReactGA from "react-ga";
import 'intersection-observer';



const gridIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/gridIcon.svg";
const ListIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Listicon.svg";


class MobileProductList extends React.Component{

    state = {
        pageviews:true,
        products_list:[]
    }

    componentDidMount(){

        if (this.props.products_list.products.edges) {

            let products_list = [];

            this.props.products_list.products.edges.map((item,index)=>{
                products_list[index]={
                    "id": item.masterSku,
                    "name": item.name,
                    "price": item.price,
                    "category": item.category.name?item.category.name:"classmate",
                    "position": index,
                    "list": "LEP List"
                }

            });
            this.setState({
                products_list:products_list
            },()=>{
                this.sendImpressionToGA();
            });
        } else {
            let products_list = [];
            this.props.products_list.products.map((item,index)=>{
                products_list[index]={
                    "id": item.masterSku,
                    "name": item.name,
                    "price": item.price,
                    "category": item.category.name?item.category.name:"classmate",
                    "position": index,
                    "list": "LEP List"
                }

            });
            this.setState({
                products_list:products_list
            },()=>{
                this.sendImpressionToGA();
            });
        }

        // let elements = document.querySelectorAll('.single_product');
        //
        // let options = {
        //     threshold: [1.0]
        // };
        //
        // let  observer = new IntersectionObserver(this.onChange, options);
        //
        // for (let elm of elements) {
        //     observer.observe(elm);
        // }


    }
    sendImpressionToGA = () => {
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "Products View",
                "ecommerce": {
                    "currencyCode": "INR",
                    "impressions": this.state.products_list,
                }
            });
        }
    };
    // onChange(entry){
    //     // console.log(entry);
    //     entry.forEach((change) => {
    //
    //         // let productId = change.target.getAttribute("id");
    //         let productName = change.target.getAttribute("name");
    //         let productCategory = change.target.getAttribute("category");
    //         let productSku = change.target.getAttribute("sku");
    //         let productPosition = change.target.getAttribute("position");
    //
    //         // ReactGA.plugin.execute(
    //         //     'ec',
    //         //     'addImpression',
    //         //     {
    //         //         'id': productSku,
    //         //         'name': productName,
    //         //         'category': productCategory,
    //         //         'position': productPosition,
    //         //
    //         //     }
    //         // );
    //
    //
    //     });
    // }

    GetGridView = (view) => {
        this.setState({
            pageviews: !view
        });
    };
    sortedProducts = (array) => {
        return array.slice().sort((a, b) => (
                b.variants.edges.length > 0? b.variants.edges[0].node.stockQuantity:0)
            -
            (a.variants.edges.length > 0 ? a.variants.edges[0].node.stockQuantity:0)
        )
    }

    render() {
        let products;

        if( this.props.products_list.products.edges){
            products = this.props.products_list.products.edges;
        } else{
            products  = this.sortedProducts(this.props.products_list.products);
        }

        return (

            <CartContext.Consumer>
                {
                    CartProvider => {
                        return(

                            <div className="mobile_product_list">
                                <Container maxWidth={"xl"} className="product_list_container">
                                    <span className="MblProductTitle">
                                        <Typography variant="h6" className="mobile_product_list_title">
                                           {this.props.title}
                                        </Typography>
                                        <img src={this.state.pageviews ? gridIcon : ListIcon }
                                            onClick={(event) => this.GetGridView(this.state.pageviews)} alt="pageviews"/>
                                    </span>
                                    {this.state.pageviews  ? (
                                            <>
                                                {
                                                    products.length === 0?(
                                                        <div className="empty_msg">Products Not Available</div>
                                                    ) :(
                                                        <Box component="div" className="mobile_products-list__products__grid">
                                                            {
                                                                products.map((product,index) => {
                                                                    let self_product;
                                                                    if(product.node){
                                                                        self_product =  product.node;
                                                                    } else {
                                                                        self_product= product;
                                                                    }

                                                                    return (

                                                                        <>
                                                                            {
                                                                                self_product.variants.edges.length > 0?(
                                                                                    <div className="single_product"
                                                                                         id={self_product.id}
                                                                                         name={self_product.name}
                                                                                         category={self_product.category.name}
                                                                                         sku={self_product.masterSku}
                                                                                         position={index}
                                                                                         key={index}
                                                                                    >
                                                                                        <MobileProductGridView product={self_product}  position={index} key={index} CartProvider={CartProvider}/>
                                                                                    </div>
                                                                                )

                                                                                    :null
                                                                            }

                                                                        </>
                                                                    );
                                                                })
                                                            }
                                                        </Box>
                                                    )
                                                }
                                            </>
                                        ) :
                                        (
                                            <>
                                                {
                                                    products.length === 0?(
                                                        <div className="empty_msg">Products Not Available</div>
                                                    ) :(
                                                        <Box component="div">
                                                            {
                                                                products.map((product,index) => {
                                                                    let self_product;
                                                                    if(product.node){
                                                                        self_product =  product.node;
                                                                    } else {
                                                                        self_product= product;
                                                                    }

                                                                    return (

                                                                        <div key={index}>
                                                                            {
                                                                                self_product.variants.edges.length > 0?(
                                                                                    <div className="single_product"
                                                                                         id={self_product.id}
                                                                                         name={self_product.name}
                                                                                         category={self_product.category.name}
                                                                                         sku={self_product.masterSku}
                                                                                         position={index}

                                                                                    >
                                                                                        <MobileProductListView product={self_product} position={index} key={index} CartProvider={CartProvider}/>
                                                                                    </div>
                                                                                    )

                                                                                    :null
                                                                            }

                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </Box>
                                                    )
                                                }
                                            </>
                                        )
                                        }
                                </Container>
                            </div>

                        )

                    }

                }
            </CartContext.Consumer>


        );
    }
}

export default MobileProductList;
