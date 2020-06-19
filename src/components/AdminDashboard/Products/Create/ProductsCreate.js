import React from "react";
import "./ProductsCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import {productsSection,productPath} from "../../../../Core/util";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import ProductDetails from "../ProductDetails";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import cogoToast from "cogo-toast";
import CreateProductMutation from "../../../../mutations/CreateProductMutation";
import LoadingScreen from "react-loading-screen";


const getCategoryList = graphql`
    query ProductsCreateCategoryListQuery{
         categorys{
            id
            name
            branding
         }
    }
`;

const getProductTypesList = graphql`
    query ProductsCreateProductTypesListQuery{
          listOfProductType{
            id
            name
            productAttributes(first:100){
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
                        value
                      }
                    }
                  }
                }
              }
            }
          }
    }
`;

const getCollectionList = graphql`
    query ProductsCreateCollectionListQuery{
          listOfCollections{
            id
            name
          }
    }
`;

class ProductsCreate extends React.Component{
    state={
        product_form_data:{
            name:"",
            description:"",
            chargeTaxes:false,
            price:0,
            masterSku:"",
            taxRate:"",
            isActive:false,
            isFeatured:false,
            length:0,
            height:0,
            width:0,
            weight:0,
        },
        category_list: [],
        all_category_list:[],
        producttypes_list: [],
        collection_list: [],
        selected_product_type:{},
        selected_category:{},
        selected_collection:[],
        attributes_basedon_product_type:[],
        selected_attributes:[],
        valueErrors:{},
        loading:false,
        branding:false,
        amazonLink:"",
        flipkartLink:"",
        classmateShopLink:""
    };
    componentWillMount(){
        this.getCategoryList();
        this.getProductTypesList();
        this.getCollectionList();
    };
    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.categorys !== null && data.categorys.length > 0){

                    let category_list;
                    category_list = data.categorys.filter(l => {
                        return l.branding === false;
                    });

                    this.setState({
                        all_category_list:data.categorys,
                        category_list:category_list
                    })
                } else {
                    this.setState({
                        category_list:[],
                        all_category_list:[]
                    })
                }

            });

    };
    getProductTypesList = () => {

        let variables = {};

        fetchQuery(environment, getProductTypesList, variables)
            .then(data => {
                if(data.listOfProductType !== null && data.listOfProductType.length > 0){

                    this.setState({
                        producttypes_list:data.listOfProductType
                    })
                } else {
                    this.setState({
                        producttypes_list:[]
                    })
                }

            });

    };
    getCollectionList = () => {

        let variables = {};

        fetchQuery(environment, getCollectionList, variables)
            .then(data => {
                if(data.listOfCollections !== null && data.listOfCollections.length > 0){

                    this.setState({
                        collection_list:data.listOfCollections
                    })
                } else {
                    this.setState({
                        collection_list:[]
                    })
                }

            });

    };

    handleTextFeildChanges = (e,feild) => {
        if(feild === "amazonLink" || feild === "flipkartLink" || feild === "classmateShopLink"){

            this.setState({
                [feild]: e.target.value
            });
        } else {
            let product_form_data = {...this.state.product_form_data};
            product_form_data[feild] = e.target.value;
            this.setState({
                product_form_data:product_form_data
            });
        }

    };

    handleCheckboxChanges = (e,feild) => {
        if(feild === "branding"){
            this.setState({
                branding:e.target.checked
            },()=>{
                this.FilterCategorys();
            });

        } else {
            let product_form_data = this.state.product_form_data;
            product_form_data[feild] = e.target.checked;
            this.setState({
                product_form_data:product_form_data
            });
        }

    };
    FilterCategorys = ()=>{
        let category_list = [];
        category_list = this.state.all_category_list.filter(l => {
            return l.branding === this.state.branding;
        });
        this.setState({
            category_list:category_list
        })

    };
    handleRadioButtonChanges = (e,feild) => {
        let product_form_data = this.state.product_form_data;
        product_form_data[feild] = (e.target.value === 'true');
        this.setState({
            product_form_data:product_form_data
        });
    };
    handleSelectChanges = (e,feild,list) => {
        let value;
        let attributes_basedon_product_type = [];
        if(feild === "selected_collection"){
            let selected_collection = this.state.selected_collection.slice();
            let selected_collection_index = selected_collection.findIndex(function (data) {
                return data.id === list.id;
            });
            if(e.target.checked){
                selected_collection.push(list);

            } else {
                selected_collection.splice(selected_collection_index, 1);
            }
            value = selected_collection;
        }  else {
            let selected_index = list.findIndex(function (data) {
                return data.id === e.target.value;
            });
            value = list[selected_index];
            if(feild === "selected_product_type"){
                value.productAttributes.edges.map((item,index)=>{
                    let values_array = [];
                    if(item.node.values && item.node.values.edges.length > 0){
                        item.node.values.edges.map((values_item,values_index)=>{
                            values_array[values_index] = {id:values_item.node.id,name:values_item.node.name,value:values_item.node.value}
                        });
                    }
                    attributes_basedon_product_type[index] = {
                        id: item.node.id,
                        name: item.node.name,
                        slug:item.node.slug,
                        values: values_array
                    };
                });

                this.setState({
                    attributes_basedon_product_type:attributes_basedon_product_type
                })
            }
        }

        this.setState({ [feild]: value });


    };
    handleAttributeChange = (e,index,list) => {
        
        let value;
        let selected_attributes = this.state.selected_attributes.slice();
            let selected_value_index = list.values.findIndex(function (data) {
                return data.id === e.target.value;
            });
            value = {...list};
            value.values = [list.values[selected_value_index]];
            let selected_attribute_index = selected_attributes.findIndex(function (data) {
                return data.id === value.id;
            });
            if(selected_attribute_index > -1){
    
                selected_attributes[selected_attribute_index] = value;
            } else {
                selected_attributes.push(value);
            }
    
            this.setState({
                selected_attributes:selected_attributes
            });

            console.log(this.state);


    };

    GoBack = () => {
        this.props.history.push(productsSection);
    };

    handleSubmit = () => {
        let error = {};
        if(this.state.product_form_data.chargeTaxes === true){
            if(this.state.product_form_data.taxRate === ""){
                error = {
                    field: "taxRate",
                    message: "The product's taxRate cannot be blank."
                };
                this.setState({
                    valueErrors:error
                })
            }
        }
        if(this.state.product_form_data.name === ""){
            error = {
                field: "name",
                message: "The product's name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else if(this.state.product_form_data.description === ""){
            error = {
                field: "description",
                message: "The product's description cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }else if(this.state.product_form_data.price < 1){
            error = {
                field: "price",
                message: "The product's price cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }else if(this.state.product_form_data.masterSku === ""){
            error = {
                field: "masterSku",
                message: "The product's SKU cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else if(Object.keys(this.state.selected_product_type).length === 0){
                error = {
                    field: "product_type",
                    message: "The product's type cannot be blank."
                };
                this.setState({
                    valueErrors:error
                })
        }else if(Object.keys(this.state.selected_category).length === 0){
            error = {
                field: "category",
                message: "The product's category cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }else {
            this.setState({
                valueErrors:{},
                loading:true
            });
            let input_data = {...this.state.product_form_data};
            input_data['productType'] = this.state.selected_product_type.id;
            input_data['category'] = this.state.selected_category.id;
            if(this.state.selected_collection.length > 0){
                let collection_ids = [];
               this.state.selected_collection.map((item,index) => {
                   collection_ids[index] = item.id;
               });
                input_data['collection'] = collection_ids;
            }
            if(this.state.selected_attributes.length > 0){
                let attribute_object = {};
                this.state.selected_attributes.map((item) => {
                    attribute_object[item.name] = item.values[0].value;
                });
                input_data['attributes'] = JSON.stringify(attribute_object);
            }
            if(this.state.branding === true){
                input_data["amazonLink"] = this.state.amazonLink;
                input_data["flipkartLink"] = this.state.flipkartLink;
                input_data["classmateShopLink"] = this.state.classmateShopLink;
            }
            let scope = this;
            CreateProductMutation(input_data, (response) => {
                if(response.createProducts !== null && response.createProducts.singleProduct !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Product Created Successfully", { position: 'top-center'});
                    scope.props.history.push(productPath(response.createProducts.singleProduct.id));
                }


            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"products"} >
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="product_create_form_component">
                        <form>
                            <Container maxWidth={"lg"} className={"product_create_form_container"}>
                                <AppHeader  title={"PRODUCTS"} onBack={this.GoBack}/>
                                <PageHeader title={"Create New Product"}/>
                                <Grid>
                                    <ProductDetails
                                        data={this.state}
                                        onChange={this.handleTextFeildChanges}
                                        onChangeCheckbox={this.handleCheckboxChanges}
                                        onChangeRadio={this.handleRadioButtonChanges}
                                        onChangeSelect={this.handleSelectChanges}
                                        onChangeAttribute={this.handleAttributeChange}
                                        valueErrors={this.state.valueErrors}
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
                    </LoadingScreen>
                </AdminDashboardIndex>
            </div>
        );
    }
}
export default ProductsCreate;
