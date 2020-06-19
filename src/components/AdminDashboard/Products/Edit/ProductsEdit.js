import React from "react";
import "./ProductsEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import ProductDetails from "../ProductDetails";
import {productVariantAddPath, productsSection,productVariantEditPath,productTypePath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import {withRouter} from "react-router-dom";
import cogoToast from "cogo-toast";
import ProductVariantsList from "../ProductVariantsList";
import FormSpacer from "../../FormSpacer";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import UpdateProductMutation from "../../../../mutations/UpdateProductMutation";
import DeleteProductImageMutation from "../../../../mutations/DeleteProductImageMutation";
import DeleteProductVariantMutation from "../../../../mutations/DeleteProductVariantMutation";
import axios from "axios";
import {api} from "../../../../serviceApi";
import LoadingScreen from "react-loading-screen";
import ProductVariantImageDialog from "../ProductVariant/ProductVariantImageDialog";
import UpdateProductFeaturedImagesMutation from "../../../../mutations/UpdateProductFeaturedImagesMutation";


const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";
const getCategoryList = graphql`
    query ProductsEditCategoryListQuery{
         categorys{
            id
            name
            branding
         }
    }
`;

const getProductTypesList = graphql`
    query ProductsEditProductTypesListQuery{
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
    query ProductsEditCollectionListQuery{
          listOfCollections{
            id
            name
          }
    }
`;

const getSingleProductById = graphql`
    query ProductsEditSingleProductByIdQuery($id:ID!){
         product(id:$id){
            id
            name
            description
            chargeTaxes
            price
            masterSku
            weight
            length
            height
            width
            taxRate
            isActive
            isFeatured
            attributes
            amazonLink
            flipkartLink
            classmateShopLink
            featuredImage{
              id
              url
            }
            productType{
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
            category{
              id
              name
              branding
            }
            collections(first:100){
              edges{
                node{
                  id
                  name
                }
              }
            }  
            images(first:100){
              edges{
                node{
                  id
                  url
                }
              }
            }
            variants(first:100){
              edges{
                node{
                  id
                  name
                  sku
                  stockQuantity
                  isAvailable
                  price
                  images{
                    id
                    url
                  }
                }
              }
            }  
         }
    }
`;

class ProductsEdit extends React.Component{
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
            weight:0
        },
        product_image:[PlaceholderImage],
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
        product_name:"",
        product_id:"",
        get_response:false,
        product_variants:[],
        loading:false,
        selected_featured_image:[],
        open_modal:false,
        branding:false,
        amazonLink:"",
        flipkartLink:"",
        classmateShopLink:""
    };
    componentWillMount(){
        this.getProductTypesList();
        this.getCollectionList();
        this.getShingleProductData();
        this.setState({
            product_id:this.props.match.params.id
        })
    };
    getShingleProductData = () => {
        let variables = {
            id:this.props.match.params.id
        };

        fetchQuery(environment, getSingleProductById, variables)
            .then(data => {
                
                if(data.product !== null){
                    let collections = [];
                    let product_images = [];
                    let attributes_basedon_product_type=[];
                    let selected_product_attributes = [];

                    data.product.productType.productAttributes.edges.map((item,index)=>{
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

                    let selected_attributes = JSON.parse(data.product.attributes);

                    Object.keys(selected_attributes).map((keyName, i)=>{
                        selected_attributes[keyName] = selected_attributes[keyName].toLowerCase();
                    });

                    Object.keys(selected_attributes).map((keyName, i)=>{
                        let selected_attribute_index = attributes_basedon_product_type.findIndex(x => x.name === keyName);
                        if(selected_attribute_index !== -1){
                            let selected_attribute_value_index = attributes_basedon_product_type[selected_attribute_index].values.findIndex(x => x.value === selected_attributes[keyName]);
                            selected_product_attributes[i] = {...attributes_basedon_product_type[selected_attribute_index]};
                            selected_product_attributes[i].values = [attributes_basedon_product_type[selected_attribute_index].values[selected_attribute_value_index]];
                        }

                    });

                    let product_form_data = {
                            name:data.product.name,
                            description:data.product.description,
                            chargeTaxes:data.product.chargeTaxes,
                            price:data.product.price,
                            masterSku:data.product.masterSku,
                            taxRate:data.product.taxRate,
                            isActive:data.product.isActive,
                            isFeatured:data.product.isFeatured,
                            length:data.product.length,
                            height:data.product.height,
                            width:data.product.width,
                            weight:data.product.weight,
                        };

                    data.product.collections.edges.map((item,index) =>{
                        collections[index] = item.node;
                    });
                    data.product.images.edges.map((item,index) =>{
                        product_images[index] = {id:item.node.id, url:item.node.url};
                    });

                    this.setState({
                        product_form_data:product_form_data,
                        selected_product_type:data.product.productType,
                        selected_category:data.product.category,
                        selected_collection:collections,
                        get_response:true,
                        product_image:product_images,
                        product_variants:data.product.variants.edges,
                        attributes_basedon_product_type:attributes_basedon_product_type,
                        selected_attributes:selected_product_attributes,
                        selected_featured_image : data.product.featuredImage,
                        branding:data.product.category ? data.product.category.branding :false,
                        amazonLink:data.product.amazonLink,
                        flipkartLink:data.product.flipkartLink,
                        classmateShopLink:data.product.classmateShopLink

                    },()=>{
                        this.getCategoryList();
                    })
                } else {
                    let product_form_data={
                            name:"",
                            description:"",
                            chargeTaxes:false,
                            price:0,
                            masterSku:"",
                            weight:0,
                            taxRate:"",
                            isActive:false,
                            isFeatured:false
                        };
                    this.setState({
                        product_form_data:product_form_data,
                        selected_product_type:{},
                        selected_category:{},
                        selected_collection:[],
                        product_image:PlaceholderImage,
                        product_variants:[],
                        selected_featured_image : []
                    })
                }

            });

    };
    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.categorys !== null && data.categorys.length > 0){

                    let category_list;
                    category_list = data.categorys.filter(l => {
                        return l.branding === this.state.branding;
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
    handleImageUpload = (e) => {
        let files = e.currentTarget.files;
        const variables = {
            file:'',
            productId:this.state.product_id
        };
        let scope = this;
        let data = new FormData();
        data.append("query", "mutation ProductImageUploadMutation($file:Upload,$productId:ID!) {\n     uploadProductImages(file:$file,productId:$productId){\n      productImages{\n        id\n        url\n      }\n       message\n     }\n  }");
        data.append("variables", JSON.stringify(variables));
        for(let i=1;i<=files.length;i++){
            data.append("file"+i, files[i-1])
        }
        let token = localStorage.getItem('user_token');
        let config;
        if(token !== null && token !== undefined && token !== ""){
            config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token
                }
            };
        } else {
            config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
        }
        axios.post(api, data, config)
            .then(function (response) {
                if(response.data.data.uploadProductImages !== null && response.data.data.uploadProductImages.message !== null){
                    let product_images = scope.state.product_image.slice();
                    product_images.push({
                        id:response.data.data.uploadProductImages.productImages.id,
                        url:response.data.data.uploadProductImages.productImages.url
                    });
                    scope.setState({
                        product_image:product_images,
                    });
                    cogoToast.success(response.data.data.uploadProductImages.message, { position: 'top-center'});
                }

            })
            .catch(function (err) {
                cogoToast.error(err, { position: 'top-center'});
            });


    };
    RemoveImage = (image_id) => {
        let index = this.state.product_image.findIndex(x => x.id === image_id);
        let product_images = this.state.product_image.slice();
        let image_ids = [image_id];
        let selected_featured_image = this.state.selected_featured_image.slice();
        let selectedImage = selected_featured_image.findIndex(function (data) {
            return data.id === image_id;
        });
        if(selectedImage > -1){
            selected_featured_image = [];
        }
        let scope=this;
        DeleteProductImageMutation(image_ids, (response) => {
            if(response.deleteProductImages !== null && response.deleteProductImages.message !== null){
                product_images.splice(index, 1);
                scope.setState({
                    product_image:product_images,
                    selected_featured_image:selected_featured_image
                });
                cogoToast.success(response.deleteProductImages.message, { position: 'top-center'});
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});
        })

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
            let input_data = {
                name:this.state.product_form_data.name,
                description:this.state.product_form_data.description,
                chargeTaxes:this.state.product_form_data.chargeTaxes,
                price:this.state.product_form_data.price,
                taxRate:this.state.product_form_data.taxRate,
                isActive:this.state.product_form_data.isActive,
                isFeatured:this.state.product_form_data.isFeatured,
                length:this.state.product_form_data.length+"",
                height:this.state.product_form_data.height+"",
                width:this.state.product_form_data.width+"",
                weight:this.state.product_form_data.weight+"",
            };
            // input_data['productType'] = this.state.selected_product_type.id;
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
            UpdateProductMutation(this.state.product_id,input_data, (response) => {
                if(response.updateProduct !== null && response.updateProduct.singleProduct !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Product Updated Successfully", { position: 'top-center'});
                    scope.GoBack();
                }


            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };


    goToCreateVariant = () =>{
        this.props.history.push(
            productVariantAddPath(this.state.product_id)
        );
    };
    goToSelectedVariant = (variant_id) =>{
        this.props.history.push(
            productVariantEditPath(this.state.product_id,variant_id)
        );
    };
    onAttributesEdit = () => {

        if(Object.keys(this.state.selected_product_type).length > 0){
            this.props.history.push(
                productTypePath(this.state.selected_product_type.id)
            );
        }
    };

    removeProductVariant = (variant_id) => {

        let index = this.state.product_variants.findIndex(x => x.id === variant_id);
        let product_variants = this.state.product_variants.slice();
        product_variants.splice(index, 1);
        let scope = this;
        DeleteProductVariantMutation([variant_id], (response) => {
            if(response.deleteProductVariant !== null && response.deleteProductVariant.message !== null){
                cogoToast.success("Product Variant Removed Successfully", { position: 'top-center'});
                scope.setState({
                    product_variants:product_variants,
                });
            }

        },function (err) {
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    openModal = () => {
        this.setState({
            open_modal:true
        });
    };
    closeModal = () => {
        this.setState({
            open_modal:false
        });
    };
    onImageSelected = (image) => {
        this.setState((prevState, props) => {
            let selectedImages = prevState.selected_featured_image.slice();
            let selectedImage = selectedImages.findIndex(function (data) {
                return data.id === image.id;
            });
            if (selectedImage > -1) {
                selectedImages.splice(selectedImage, 1);
                this.onListChanged(selectedImages);
            } else {
                this.updateProductFeaturedImages(image);
                selectedImages[0] = image;
                this.onListChanged(selectedImages);
            }
            return {
                selected_featured_image: selectedImages
            };
        });
    };
    onListChanged(selected) {
        this.setState({
            selected_featured_image: selected
        });
    }
    updateProductFeaturedImages = (image) => {
        let scope=this;
        UpdateProductFeaturedImagesMutation(this.state.product_id,image.id, (response) => {
            if(response.setFeaturedImage !== null && response.setFeaturedImage.message !== null){
                scope.closeModal();
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});
        })

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
                    <div className="product_edit_form_component">
                        <form>
                            <Container maxWidth={"lg"} className={"product_edit_form_container"}>
                                <AppHeader  title={"PRODUCTS"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.product_name}/>
                                <Grid>
                                    {
                                        this.state.get_response === true && (
                                            <div>
                                                <ProductDetails

                                                    data={this.state}
                                                    onChange={this.handleTextFeildChanges}
                                                    onChangeCheckbox={this.handleCheckboxChanges}
                                                    onChangeRadio={this.handleRadioButtonChanges}
                                                    onChangeSelect={this.handleSelectChanges}
                                                    onChangeAttribute={this.handleAttributeChange}
                                                    valueErrors={this.state.valueErrors}
                                                    action="edit"
                                                    handleImageUpload={this.handleImageUpload}
                                                    RemoveImage={this.RemoveImage}
                                                    openModal={this.openModal}


                                                />
                                                <FormSpacer  />
                                                <Grid container spacing={3}  >
                                                    <Grid item xs={12} md={8}>
                                                        <ProductVariantsList
                                                            title="Variants"
                                                            data={this.state.product_variants}
                                                            onProductVariantAdd={this.goToCreateVariant}
                                                            onProductVariantEdit={this.goToSelectedVariant}
                                                            onAttributesEdit={this.onAttributesEdit}
                                                            removeProductVariant={this.removeProductVariant}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                    }
                                    {
                                        this.state.open_modal === true && (
                                            <ProductVariantImageDialog
                                                open={this.state.open_modal}
                                                closeModal={this.closeModal}
                                                selected_product_images={this.state.selected_featured_image}
                                                product_images={this.state.product_image}
                                                onImageSelected={this.onImageSelected}
                                            />
                                        )

                                    }
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
export default withRouter(ProductsEdit);
