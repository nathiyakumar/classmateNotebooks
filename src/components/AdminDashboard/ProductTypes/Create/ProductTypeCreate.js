import React from "react";
import "./ProductTypeCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import {productTypeSection} from "../../../../Core/util";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import ProductTypeDetails from "../ProductTypeDetails";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import cogoToast from "cogo-toast";
import CreateProductTypeMutation from "../../../../mutations/CreateProductTypeMutation";
import LoadingScreen from "react-loading-screen";

class ProductTypeCreate extends React.Component{
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
        loading:false
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
            let scope = this;
            CreateProductTypeMutation(input_data, (response) => {
                if(response.createProductType !== null && response.createProductType.product !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Product Type Created Successfully", { position: 'top-center'});
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
                    <div className="producttypeform_component">
                        <form>
                            <Container maxWidth={"lg"} className={"producttypeform_container"}>
                                <AppHeader  title={"Product Types\n"} onBack={this.GoBack}/>
                                <PageHeader title={"Create Product Type"}/>
                                <Grid>
                                   <ProductTypeDetails
                                       data={this.state.product_type_form_data}
                                       onChangeFeild={this.handleTextFeildChanges}
                                       onChangeCheckbox={this.handleCheckboxChanges}
                                       valueErrors={this.state.valueErrors}
                                       action="ADD"
                                   />
                                    <SaveButtonBar
                                        onCancel={this.GoBack}
                                        onSave={this.handleSubmit}
                                    />
                                </Grid>
                            </Container>
                        </form>
                    </div>
                    </LoadingScreen>
                </AdminDashboardIndex>
            </div>
        );
    }
}
export default ProductTypeCreate;
