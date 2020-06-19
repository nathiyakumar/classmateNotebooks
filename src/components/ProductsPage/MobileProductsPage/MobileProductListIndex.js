import React from "react";
import graphql from "babel-plugin-relay/macro";

import ProductList from "../ProductList";

import {QueryRenderer} from 'react-relay';
import environment from "../../../Environment";
// import {Link} from "react-router-dom";
// import ProductItem from "./ProductItem";
// import Box from "@material-ui/core/Box";

import Loader from "../../Loader/Loader";




const ProductListIndexQuery = graphql`
          query MobileProductListIndexQuery {
              products{
                 id
                name
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
                    priceOverride
                  }
                }
              }
            
              }
          }
        `


class MobileProductListIndex extends React.Component{
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
                                <ProductList products_list={props} title="OUR RANGE OF PRODUCTS"/>
                            </div>
                        );
                    }}
                />

            </div>
        );
    }
}

export default MobileProductListIndex;
