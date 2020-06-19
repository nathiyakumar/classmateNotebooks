import React from "react";
import './ProductList.css';
import Container from "@material-ui/core/Container";
import ProductItem from "./ProductItem";
import Box from "@material-ui/core/Box";

import CartContext from "../CartProvider/cart-context";
// import ReactGA from 'react-ga';
import AOS from 'aos';
import 'intersection-observer';


class ProductList extends React.Component {

    state={
      products_list:[]
    };

    componentDidMount() {

        // for animation puspose
        AOS.init({
            duration: 1000
        });
        // for animation puspose



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

        // let options = {
        //     threshold: [1.0]
        // };

        // let observer = new IntersectionObserver(this.onChange, options);

        // for (let elm of elements) {
        //     observer.observe(elm);
        // }


    }

    sendImpressionToGA = () => {
        if(window.dataLayer){
            window.dataLayer.push({
                "event": "Products View",
                "ecommerce": {
                    "currencyCode": "INR",
                    "impressions": this.state.products_list,
                }
            });
        }

    };

    // onChange(entry) {
    //     entry.forEach((change) => {
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

    sortedProducts = (array) => {
        return array.slice().sort((a, b) => (
            b.variants.edges.length > 0? b.variants.edges[0].node.stockQuantity:0)
            -
            (a.variants.edges.length > 0 ? a.variants.edges[0].node.stockQuantity:0)
        )
    }

    render() {
        let products;
        if (this.props.products_list.products.edges) {
            products = this.props.products_list.products.edges;
        } else {
            products = this.sortedProducts(this.props.products_list.products);
        }

        return (

            <CartContext.Consumer>

                {
                    CartProvider => {
                        return (
                            <>
                                <div>
                                    <Container maxWidth={"xl"} className="product_list_container">
                                        <div className={"Page_title"} data-aos='fade-up'>
                                            <span>
                                                <strong>
                                                    <span style={{fontSize: 'x-large'}}>{this.props.title}</span>
                                                </strong>

                                            </span>
                                        </div>
                                        <div>
                                            {
                                                products.length === 0 ? (
                                                    <div className="empty_msg">Products Not Available</div>
                                                ) : (
                                                    <Box component="div" className="products-list__products__grid"
                                                         data-aos='fade-up'>
                                                        {
                                                            products.map((product, index) => {
                                                                let self_product;
                                                                if (product.node) {
                                                                    self_product = product.node;
                                                                } else {
                                                                    self_product = product;
                                                                }

                                                                return (

                                                                    <div key={index}>
                                                                        {
                                                                            self_product.variants.edges.length > 0 ? (

                                                                                <div className="single_product"
                                                                                     id={self_product.id}
                                                                                     name={self_product.name}
                                                                                     category={self_product.category.name}
                                                                                     sku={self_product.masterSku}
                                                                                     position={index}

                                                                                >
                                                                                    <ProductItem product={self_product}
                                                                                                 key={index}
                                                                                                 CartProvider={CartProvider}
                                                                                                 position={index}/>
                                                                                </div>

                                                                            ) : null
                                                                        }

                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </Box>
                                                )
                                            }
                                        </div>
                                    </Container>
                                </div>
                            </>
                        )
                    }
                }

            </CartContext.Consumer>

        );
    }
}

export default ProductList;


