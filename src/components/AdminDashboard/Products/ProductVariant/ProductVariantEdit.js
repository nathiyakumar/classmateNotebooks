import React from "react";
import "./ProductVariantEdit.css";
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
import UpdateProductVariantMutation from "../../../../mutations/UpdateProductVariantMutation";
import ProductVariantImageDialog from "./ProductVariantImageDialog";
import UpdateProductVariantImagesMutation from "../../../../mutations/UpdateProductVariantImagesMutation";
import DeleteProductVariantImagesMutation from "../../../../mutations/DeleteProductVariantImagesMutation";

const getSingleProductVariantById = graphql`
    query ProductVariantEditSingleProductVariantByIdQuery($id:ID!){
          productVariant(id:$id){
            id    
            attributes
            quantity
            stockQuantity
            quantityAllocated
            costPrice
            images{
              id
              url
            }
            name
            priceOverride    
            product{
              id
              images(first:100){
                edges{
                  node{
                    id
                    url
                  }
                }
              }
              name
              variants(first:100){
                edges{
                  node{
                    id
                    name
                    sku
                    images{
                      id
                      url
                    }
                  }
                }
              } 
              masterSku
              quantity  
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
                            value
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }    
          }
    }
`;

class ProductVariantEdit extends React.Component{

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
      product_variant_name:'500ml',
      product_variant_id:'',
      open_modal : false,
      product_images:[],
      selected_product_images:[],
      quantityAllocated:0,
    };

    handleTabChange = (newValue,variant_id) => {
        this.setState({
            value:newValue,
            product_variant_id:variant_id
        },()=>{
            this.goToSelectedVariant(variant_id);
        });
    };


    componentWillMount(){
        this.setState({
            product_id:this.props.match.params.id,
            product_variant_id:this.props.match.params.variant_id
        });
        this.getShingleProductVariantData(this.props.match.params.variant_id);
    }
    getShingleProductVariantData = (variant_id) => {

        let variables = {
            id:variant_id
        };

        fetchQuery(environment, getSingleProductVariantById, variables)
            .then(data => {
                if(data.productVariant !== null){
                    let variant_attribute_list = [];
                    let variants_list = [];
                    let selected_variant_attributes = [];
                    let product_images = [];
                    //variant attributes list for dropdown
                    if(data.productVariant.product.productType && data.productVariant.product.productType.variantAttributes.edges.length > 0){

                        data.productVariant.product.productType.variantAttributes.edges.map((item,index)=>{
                            let values_array = [];
                            if(item.node.values && item.node.values.edges.length > 0){
                                item.node.values.edges.map((values_item,values_index)=>{
                                    values_array[values_index] = {id:values_item.node.id,name:values_item.node.name,value:values_item.node.value}
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
                    //variant list
                    if(data.productVariant.product.variants.edges.length > 0){
                        data.productVariant.product.variants.edges.map((item,index) =>{
                            variants_list[index] = {
                                id:item.node.id,
                                name:item.node.name,
                                image_url:item.node.images[0]?item.node.images[0].url:''
                            }
                        });
                    }
                    //product images list
                    if(data.productVariant.product.images.edges.length > 0){
                        data.productVariant.product.images.edges.map((item,index) =>{
                            product_images[index] = {
                                id:item.node.id,
                                url:item.node.url
                            }
                        });
                    }
                    //set selected attributes by default in dropdown
                    let selected_attributes = JSON.parse(data.productVariant.attributes);
                    Object.keys(selected_attributes).map((keyName, i)=>{
                        let selected_attribute_index = variant_attribute_list.findIndex(x => x.name === keyName);
                        if(selected_attribute_index !== -1){
                            let selected_attribute_value_index = variant_attribute_list[selected_attribute_index].values.findIndex(x => x.value === selected_attributes[keyName]);
                            selected_variant_attributes[i] = {...variant_attribute_list[selected_attribute_index]};
                            selected_variant_attributes[i].values = [variant_attribute_list[selected_attribute_index].values[selected_attribute_value_index]];
                        }

                    });
                    //set active tab
                    let selected_variant_index = variants_list.findIndex(x => x.id === variant_id);
                    this.setState({
                        product_name:data.productVariant.product.name,
                        variant_attribute_list:variant_attribute_list,
                        variants_list:variants_list,
                        value:selected_variant_index,
                        product_variant_name:variants_list[selected_variant_index].name,
                        selected_variant_attributes:selected_variant_attributes,
                        selling_price_override:data.productVariant.priceOverride,
                        cost_price_override:data.productVariant.costPrice,
                        inventory:data.productVariant.stockQuantity,
                        sku:data.productVariant.product.masterSku,
                        product_images:product_images,
                        selected_product_images:data.productVariant.images.length > 0 ?data.productVariant.images:[],
                        quantityAllocated:data.productVariant.quantityAllocated
                    })
                } else {
                    this.setState({
                        product_name:"",
                        variant_attribute_list:[],
                        variants_list:[],
                        value:0,
                        product_variant_name:'',
                        selected_variant_attributes:[],
                        selling_price_override:'',
                        cost_price_override:'',
                        inventory:0,
                        sku:'',
                        product_images:[],
                        selected_product_images:[],
                        quantityAllocated:0
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
                quantity:parseInt(this.state.inventory)+parseInt(this.state.quantityAllocated),
                priceOverride:this.state.selling_price_override,
                // sku:this.state.sku
            };
            if(this.state.selected_variant_attributes.length > 0){
                let attribute_object = {};
                this.state.selected_variant_attributes.map((item) => {
                    attribute_object[item.name] = item.values[0].name;
                });
                input_data['attributes'] = JSON.stringify(attribute_object);
            }

            let scope = this;
            UpdateProductVariantMutation(this.state.product_variant_id,input_data, (response) => {
                if(response.updateProductVariant !== null && response.updateProductVariant.message !== null){
                    cogoToast.success("Product Variant Updated Successfully", { position: 'top-center'});
                    scope.GoBack();
                }

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
            this.getShingleProductVariantData(variant_id);
        } else {
            this.props.history.push(
                productVariantAddPath(this.state.product_id)
            );
        }

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
            let selectedImages = prevState.selected_product_images.slice();
            let selectedImage = selectedImages.findIndex(function (data) {
                return data.id === image.id;
            });
            if (selectedImage > -1) {
                selectedImages.splice(selectedImage, 1);
                this.RemoveImage(image.id);
                this.onListChanged(selectedImages);
            } else {
                this.updateProductVariantImages(image);
                selectedImages.push(image);
                this.onListChanged(selectedImages);
            }
            return {
                selected_product_images: selectedImages
            };
        });
    };
    onListChanged(selected) {
        this.setState({
            selected_product_images: selected
        });
    }
    updateProductVariantImages = (image) => {
        let variant_image_ids = [image.id];
        UpdateProductVariantImagesMutation(this.state.product_variant_id,variant_image_ids, (response) => {
            if(response.uploadVariantImage !== null && response.uploadVariantImage.message !== null){
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    RemoveImage = (image_id) => {
        let scope = this;
        let index = this.state.selected_product_images.findIndex(x => x.id === image_id);
        let ids=[image_id];
        let selected_product_images = this.state.selected_product_images.slice();
        selected_product_images.splice(index, 1);

        DeleteProductVariantImagesMutation(ids, (response) => {
            if(response.deleteVariantImage !== null && response.deleteVariantImage.message !== null){
                cogoToast.success(response.deleteVariantImage.message, { position: 'top-center'});
                scope.setState({
                    selected_product_images:selected_product_images,
                });
            }
        },function (err) {
            cogoToast.error(err, { position: 'top-center'});
        });
    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"products"}>
                    <div className="product_variant_edit_form_component">
                        <form>
                            <Container maxWidth={"lg"} className={"product_variant_edit_form_container"}>
                                <AppHeader  title={this.state.product_name} onBack={this.GoBack}/>
                                <PageHeader title={this.state.product_variant_name}/>
                                <Grid>
                                    <ProductVariantDetails
                                        data={this.state}
                                        onChangeAttribute={this.handleAttributeChange}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        handleTabChange={this.handleTabChange}
                                        action="edit"
                                        openModal={this.openModal}
                                        selected_product_images={this.state.selected_product_images}
                                        RemoveImage={this.RemoveImage}
                                    />
                                    {
                                        this.state.open_modal === true && (
                                            <ProductVariantImageDialog
                                                open={this.state.open_modal}
                                                closeModal={this.closeModal}
                                                selected_product_images={this.state.selected_product_images}
                                                product_images={this.state.product_images}
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
                </AdminDashboardIndex>
            </div>
        );
    }
}

export default ProductVariantEdit;
