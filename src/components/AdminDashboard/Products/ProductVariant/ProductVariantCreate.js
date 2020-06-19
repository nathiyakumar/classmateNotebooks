import React from "react";
import "./ProductVariantCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import {productPath, productVariantAddPath, productVariantEditPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import ProductVariantDetails from "./ProductVariantDetails";
import Grid from "@material-ui/core/Grid";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import cogoToast from "cogo-toast";
import CreateProductVariantMutation from "../../../../mutations/CreateProductVariantMutation";

const getSingleProductById = graphql`
    query ProductVariantCreateSingleProductByIdQuery($id:ID!){
         product(id:$id){
                id
                name
                images(first:1){
                  edges{
                    node{
                      url
                    }
                  }
                }
                productType{
                  id
                  variantAttributes(first:100){
                    edges{
                      node{
                        id
                        slug
                        name
                        values(first:100){
                          edges{
                            node{
                              id
                              name
                              slug
                            }
                          }
                        }
                      }
                    }
                  }
                }
                variants(first:100){
                  edges{
                    node{
                      id
                      name
                      sku
                      images{
                        url
                      }
                    }
                  }
                } 
         }
    }
`;

class ProductVariantCreate extends React.Component{

    state={
      value:0,
      product_id:'',
      product_name:'',
      selling_price_override:'',
      cost_price_override:'',
      inventory:0,
      sku:'',
      variant_attribute_list:[],
      selected_variant_attributes:[],
      valueErrors:{},
      variants_list:[],
    };

    handleTabChange = (newValue,variant_id) => {
        this.setState({
            value:newValue,
        },()=>{
            this.goToSelectedVariant(variant_id);
        });
    };

    componentWillMount(){
        this.setState({
            product_id:this.props.match.params.id
        });
        this.getShingleProductData();
    }
    getShingleProductData = () => {

        let variables = {
            id:this.props.match.params.id
        };

        fetchQuery(environment, getSingleProductById, variables)
            .then(data => {
                if(data.product !== null){
                    let variant_attribute_list = [];
                    let variants_list = [];
                    if(data.product.productType && data.product.productType.variantAttributes.edges.length > 0){

                        data.product.productType.variantAttributes.edges.map((item,index)=>{
                            let values_array = [];
                            if(item.node.values && item.node.values.edges.length > 0){
                                item.node.values.edges.map((values_item,values_index)=>{
                                    values_array[values_index] = {id:values_item.node.id,name:values_item.node.name}
                                });
                            }
                            variant_attribute_list[index] = {
                                id: item.node.id,
                                name: item.node.name,
                                slug:item.node.slug,
                                values: values_array
                            };
                        });

                    }
                    if(data.product.variants.edges.length > 0){
                        data.product.variants.edges.map((item,index) =>{
                            variants_list[index] = {
                                id:item.node.id,
                                name:item.node.name,
                                image_url:item.node.images[0]?item.node.images[0].url:''
                            }
                        });

                    }
                    this.setState({
                        product_name:data.product.name,
                        variant_attribute_list:variant_attribute_list,
                        variants_list:variants_list,
                        value:variants_list.length
                    })
                } else {
                    this.setState({
                        product_name:"",
                        variant_attribute_list:[],
                        variants_list:[],
                        value:0
                    })
                }

            });

    };

    GoBack = () => {
        this.props.history.push(productPath(this.state.product_id));
    };
    handleAttributeChange = (e,index,list) => {
        let value;
        let selected_attributes = this.state.selected_variant_attributes.slice();
        let selected_value_index = list.values.findIndex(function (data) {
            return data.id === e.target.value;
        });
        value = {...list};
        value.values = [list.values[selected_value_index]];
        selected_attributes[index] = value;
        this.setState({
            selected_variant_attributes:selected_attributes
        });
    };
    handleTextFeildChanges = (e,feild) => {
        this.setState({[feild]:e.target.value})
    };
    handleSubmit = () => {
        let error = {};
        // if(this.state.selected_variant_attributes.length === 0){
        //     error = {
        //         field: "selected_variant_attributes",
        //         message: "This field cannot be blank."
        //     };
        //     this.setState({
        //         valueErrors:error
        //     })
        // } else
            if(this.state.sku === ""){
            error = {
                field: "sku",
                message: "This field cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }  else {
            this.setState({
                valueErrors:{}
            });
            let input_data = {
                costPrice:this.state.cost_price_override,
                quantity:parseInt(this.state.inventory),
                priceOverride:this.state.selling_price_override,
                sku:this.state.sku
            };
            if(this.state.selected_variant_attributes.length > 0){
                let attribute_object = {};
                this.state.selected_variant_attributes.map((item) => {
                    attribute_object[item.name] = item.values[0].name;
                });
                input_data['attributes'] = JSON.stringify(attribute_object);
            }

            let scope = this;
            CreateProductVariantMutation(this.state.product_id,input_data, (response) => {
                if(response.createProductVariant !== null && response.createProductVariant.message !== null){
                    cogoToast.success("Product Variant Created Successfully", { position: 'top-center'});
                    scope.GoBack();                }

            },function (err) {
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };
    goToSelectedVariant = (variant_id) =>{
        if(variant_id !== "new"){
            this.props.history.push(
                productVariantEditPath(this.state.product_id,variant_id)
            );
        } else {
            this.props.history.push(
                productVariantAddPath(this.state.product_id)
            );
        }

    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"products"}>
                    <div className="product_variant_create_form_component">
                        <form>
                            <Container maxWidth={"lg"} className={"product_variant_create_form_container"}>
                                <AppHeader  title={this.state.product_name} onBack={this.GoBack}/>
                                <PageHeader title={"Add Variant"}/>
                                <Grid>

                                        <ProductVariantDetails
                                            data={this.state}
                                            onChangeAttribute={this.handleAttributeChange}
                                            onChange={this.handleTextFeildChanges}
                                            valueErrors={this.state.valueErrors}
                                            handleTabChange={this.handleTabChange}
                                            onProductVariantEdit={this.goToSelectedVariant}
                                            action="add"
                                        />


                                </Grid>
                            </Container>
                        </form>
                        <SaveButtonBar
                            onCancel={this.GoBack}
                            onSave={this.handleSubmit}
                        />
                    </div>
                </AdminDashboardIndex>
            </div>
        );
    }
}

export default ProductVariantCreate;
