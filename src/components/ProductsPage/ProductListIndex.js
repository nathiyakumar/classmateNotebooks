import React from "react";
import graphql from "babel-plugin-relay/macro";

import ProductList from "./ProductList";

import {QueryRenderer} from 'react-relay';
import environment from "../../Environment";

import Loader from "../Loader/Loader";

import Media from "react-media";
import { small_screen } from '../../variables';
import MobileProductList from "./MobileProductsPage/MobileProductList";


const ProductListIndexQuery = graphql`
          query ProductListIndexQuery {
              products{
                 id
                name
                price
              masterSku
               featuredImage{
                url
              }
                category{
                  id
                  name
                }
                images(first:1){
                  edges{
                    node{
                      url
                    }
                  }
                }
               variants(first:1){
                edges{
                  node{
                    id
                    name
                     costPrice
                    priceOverride
                    stockQuantity
                  }
                }
              }
            
              }
          }
        `;


class ProductListIndex extends React.Component{
    render() {
        return (
            <div>
                <QueryRenderer
                    environment={environment}
                    query={ProductListIndexQuery}
                    variables={{}}
                    render={({error, props}) => {

                        if (!props) {
                            return <div>
                                <Loader />
                            </div>;
                        }
                        return (
                            <div>
                                <Media query={{maxWidth:small_screen}} render={() =>
                                    (
                                        <MobileProductList products_list={props} title="OUR RANGE OF STATIONERY PRODUCTS"/>
                                    )}
                                />
                                <Media query={{minWidth:small_screen}} render={() =>
                                    (
                                        <ProductList products_list={props} title="OUR RANGE OF STATIONERY PRODUCTS"/>
                                    )}
                                />

                            </div>
                        );
                    }}
                />

            </div>
        );
    }
}

export default ProductListIndex;
