import React from "react";
import "./ProductTypeEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {productTypeEditUrl, productTypeSection} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import ProductTypeDetails from "../ProductTypeDetails";
import FormSpacer from "../../FormSpacer";
import ProductTypeAttributeList from "../ProductTypeAttributeList";
import AttributesListDialog from "../AttributesListDialog";
import qs from "qs";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import cogoToast from "cogo-toast";
import UpdateProductTypeMutation from "../../../../mutations/UpdateProductTypeMutation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import LoadingScreen from "react-loading-screen";

const getSingleProductType = graphql`
  query ProductTypeEditQuery($singleProductTypeId : ID!){
      singleProductType(singleProductTypeId:$singleProductTypeId){
        id
        name
        weight
        taxType
        taxRate
        isDigital
        isCustomizable
        isShippingRequired
        hasVariants
        productAttributes(first: 10){
          edges{
            node{
               id
              name
              slug
            }
          }
        }
        variantAttributes(first: 10){
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
`;

const getAttributeList = graphql`
  query ProductTypeEditAttributeListQuery{
      listAttribute{
        id
        name
        slug
      }
  }
`;


class ProductTypeEdit extends React.Component{

    state={
        product_type_form_data:{
            name:"",
            isDigital:false,
            isCustomizable:false,
            taxType:"FIXED",
            taxRate:0,
            isShippingRequired:false,
            weight:0,
            hasVariants:false
        },
        valueErrors:{},
        product_name:"",
        product_type_id:"",
        attributes_list:[],
        selected_product_attributes:[],
        selected_variant_attributes:[],
        formatted_attribute_list:[],
        loading:false

    };

    componentWillMount(){
        this.setState({
            product_type_id:this.props.match.params.id
        });
        this.getSingleProductTypeData();
        this.getAttributeList();
    }

    getSingleProductTypeData = () => {
        let variables = {
            singleProductTypeId:this.props.match.params.id
        };
        this.setState({
            loading:true
        });

        fetchQuery(environment, getSingleProductType, variables)
            .then(data => {
                if(data.singleProductType !== null){

                    let product_type_form_data = {...this.state.product_type_form_data};
                    let product_attributes_list = [];
                    let variant_attributes_list = [];
                    product_type_form_data.name = data.singleProductType.name;
                    product_type_form_data.isDigital = data.singleProductType.isDigital;
                    product_type_form_data.isCustomizable = data.singleProductType.isCustomizable;
                    product_type_form_data.taxType = data.singleProductType.taxType;
                    product_type_form_data.taxRate = data.singleProductType.taxRate;
                    product_type_form_data.isShippingRequired = data.singleProductType.isShippingRequired;
                    product_type_form_data.weight = data.singleProductType.weight;
                    product_type_form_data.hasVariants = data.singleProductType.hasVariants;
                    data.singleProductType.productAttributes.edges.map((item,index) => {
                        product_attributes_list[index] =  item.node;
                    });
                    data.singleProductType.variantAttributes.edges.map((item,index) => {
                        variant_attributes_list[index] =  item.node;
                    });
                    this.setState({
                        product_name:data.singleProductType.name,
                        product_type_form_data:product_type_form_data,
                        selected_product_attributes:product_attributes_list,
                        selected_variant_attributes:variant_attributes_list,
                        loading:false
                    })
                } else {
                    this.setState({
                        product_name:"",
                        product_type_form_data:this.emptyFormData(),
                        selected_product_attributes:[],
                        selected_variant_attributes:[],
                        loading:false
                    })
                }

            });
    };
    getAttributeList = () => {
        let variables = {

        };

        fetchQuery(environment, getAttributeList, variables)
            .then(data => {
                if(data.listAttribute !== null && data.listAttribute.length > 0){
                    this.setState({
                        attributes_list:data.listAttribute,
                        formatted_attribute_list:data.listAttribute
                    })
                } else {
                    this.setState({
                        attributes_list:[],
                        formatted_attribute_list:[]
                    })
                }

            });
    };


    emptyFormData = () => {
      return {
            name:"",
            isDigital:false,
            isCustomizable:false,
            taxType:"FIXED",
            taxRate:0,
            isShippingRequired:false,
            weight:0,
            hasVariants:false
        };
    };

    GoBack = () => {
        this.props.history.push(productTypeSection);
    };
    handleTextFeildChanges = (e,feild) => {
        let product_type_form_data = this.state.product_type_form_data;
        product_type_form_data[feild] = e.target.value;
        this.setState({
            product_type_form_data:product_type_form_data,
            valueErrors:{}
        });
    };
    handleCheckboxChanges = (e,feild) => {
        let product_type_form_data = this.state.product_type_form_data;
        product_type_form_data[feild] = e.target.checked;
        this.setState({
            product_type_form_data:product_type_form_data
        });
    };
    openModal = (action, type) => {
        this.props.history.push(
            productTypeEditUrl({
                action,
                type: type
            })
        );
        this.setFormattedAttributes(action, type);
    };
    closeModal = () => {
        let params = this.props.match.params;
        this.props.history.push(
            productTypeEditUrl({
                ...params,
                action: undefined,
                id: undefined
            })
        );

    };
    setFormattedAttributes = (action, type) =>{
      if(type === "PRODUCT"){
          if(this.state.selected_variant_attributes.length > 0){
              let tmp_attributes_list = this.state.attributes_list.slice();
              this.state.selected_variant_attributes.map((item)=>{
                  let selected_index = tmp_attributes_list.findIndex(x => x.id === item.id);
                  tmp_attributes_list.splice(selected_index, 1);
              });
              this.setState({
                  formatted_attribute_list:tmp_attributes_list
              })
          }
      } else if(type === "VARIANT"){
          if(this.state.selected_product_attributes.length > 0){
              let tmp_attributes_list = this.state.attributes_list.slice();
              this.state.selected_product_attributes.map((item)=>{
                  let selected_index = tmp_attributes_list.findIndex(x => x.id === item.id);
                  tmp_attributes_list.splice(selected_index, 1);
              });
              this.setState({
                  formatted_attribute_list:tmp_attributes_list
              })
          }
      }
    };
    removeValue = (id,action_type) => {
        if(action_type === "PRODUCT"){
            let tmp_selected_product_attributes = this.state.selected_product_attributes.slice();
            let index = tmp_selected_product_attributes.findIndex(x => x.id === id);
            tmp_selected_product_attributes.splice(index, 1);
            this.setState({
                selected_product_attributes:tmp_selected_product_attributes
            })
        } else if(action_type === "VARIANT"){
            let tmp_selected_variant_attributes = this.state.selected_variant_attributes.slice();
            let index = tmp_selected_variant_attributes.findIndex(x => x.id === id);
            tmp_selected_variant_attributes.splice(index, 1);
            this.setState({
                selected_variant_attributes:tmp_selected_variant_attributes
            })
        }

    };

    handleAttributesAssign = (selected_attributes,action_type) => {
        if(action_type === "PRODUCT"){
           this.setState({
               selected_product_attributes:selected_attributes
           },()=>{
               this.closeModal();
           })
        } else if(action_type === "VARIANT"){
            this.setState({
                selected_variant_attributes:selected_attributes
            },()=>{
                this.closeModal();
            })
        }

    };

    handleSubmit = () => {

        let error = {};
        if(this.state.product_type_form_data.name === ""){
            error = {
                field: "name",
                message: "The product type's name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }  else {
            this.setState({
                valueErrors:{},
                loading:true
            });
            let input_data = {...this.state.product_type_form_data};
            let product_attributes = [];
            let variant_attributes = [];
            this.state.selected_product_attributes.map((item,index) => {
                product_attributes[index] = item.id;
            });
            this.state.selected_variant_attributes.map((item,index) => {
                variant_attributes[index] = item.id;
            });
            input_data['productAttributes'] = product_attributes;
            input_data['variantAttributes'] = variant_attributes;
            let scope = this;
            UpdateProductTypeMutation(this.state.product_type_id, input_data, (response) => {
                if(response.updateProductType !== null && response.updateProductType.message !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success(response.updateProductType.message, { position: 'top-center'});
                    scope.GoBack();                }

            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })
        }
    };

    render() {
        let params_values = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        return (
            <div>
                <AdminDashboardIndex active_page={"configuration"}>
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="product_type_edit_form_component">
                        <form>
                            <Container maxWidth={"lg"} className={"product_type_edit_form_container"}>
                                <AppHeader  title={"Product Types\n"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.product_name}/>
                                <Grid>
                                    <ProductTypeDetails
                                        data={this.state.product_type_form_data}
                                        onChangeFeild={this.handleTextFeildChanges}
                                        onChangeCheckbox={this.handleCheckboxChanges}
                                        valueErrors={this.state.valueErrors}
                                        action="EDIT"
                                    />
                                    <FormSpacer />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={8}>
                                            <ProductTypeAttributeList
                                                title="Product Attributes"
                                                onValueAdd={() => this.openModal("assign-attribute","PRODUCT")}
                                                data={this.state.selected_product_attributes}
                                                removeValue={this.removeValue}
                                                action_type="PRODUCT"
                                            />
                                            <FormSpacer />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.product_type_form_data.hasVariants}
                                                        onChange={(e) => this.handleCheckboxChanges(e,'hasVariants')}
                                                        value={this.state.product_type_form_data.hasVariants}
                                                    />
                                                }
                                                label="Product type uses Variant Attributes"
                                            />
                                            <FormSpacer />
                                            {
                                                this.state.product_type_form_data.hasVariants === true && (
                                                    <ProductTypeAttributeList
                                                        title="Variant Attributes"
                                                        onValueAdd={() => this.openModal("assign-attribute","VARIANT")}
                                                        data={this.state.selected_variant_attributes}
                                                        removeValue={this.removeValue}
                                                        action_type="VARIANT"
                                                    />
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                    {
                                        params_values.action === "assign-attribute" && (
                                            <AttributesListDialog
                                                action_type={params_values.type}
                                                open={params_values.action === "assign-attribute"}
                                                onClose={this.closeModal}
                                                onSubmit={this.handleAttributesAssign}
                                                attributes_list={this.state.formatted_attribute_list}
                                                selected_attributes={params_values.type === "PRODUCT" ? this.state.selected_product_attributes : this.state.selected_variant_attributes }
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

export default ProductTypeEdit;
