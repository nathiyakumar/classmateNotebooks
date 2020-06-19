import React from "react";
import "./VoucherCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {categorySection, vouchersSection} from "../../../../Core/util";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import VoucherDetails from "../VoucherDetails";
import CreateVouchersMutation from "../../../../mutations/CreateVouchersMutation";
import LoadingScreen from "react-loading-screen";


const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";

const getProductsList = graphql`
    query VoucherCreateProductsListQuery{
        listOfProducts{
           id
          name
        }
    }
`;
const getCategoryList = graphql`
  query VoucherCreateCategoryListQuery{
  categorys{
   id
   name
     
  }
  }
`;
class VoucherCreate extends React.Component{
    state={
        voucher_form_data:{
            discount_name: "",
            discount_code: "",
            discount_type: "FIXED",
            discount_value: 0,
            discount_uses: 0,
            startDate: new Date(),
            endDate: new Date(),
            MaxDiscountVal: 0,
            MinAmntSpend: 0,
            voucher_type: "VALUE",
            products: [],
            categories: [],
            // collections: [],
            product_list:[],
            category_list:[],
            isActive:false,
            applyOncePerOrder:false

        },
        valueErrors:{},
        loading:false


    };

    componentDidMount() {
        this.getProductList();

    }

    getProductList = () => {

        let variables = {};

        fetchQuery(environment, getProductsList, variables)
            .then(data => {

                if(data.listOfProducts !== null && data.listOfProducts.length > 0){
                    let voucher_form_data = {...this.state.voucher_form_data};
                    let product_list = data.listOfProducts;
                    voucher_form_data["product_list"] = product_list;
                    this.setState({
                        voucher_form_data:voucher_form_data
                    },()=>{
                        this.getCategoryList();
                    })

                }
                else {
                    this.setState({
                        voucher_form_data:{}
                    })
                }

            });

    };
    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.categorys !== null && data.categorys.length > 0){
                    let voucher_form_data = {...this.state.voucher_form_data};
                    voucher_form_data['category_list'] = data.categorys;

                    this.setState({
                        voucher_form_data:voucher_form_data
                    })
                } else {
                    this.setState({
                        voucher_form_data:{}
                    })
                }

            });

    };
    GoBack = () => {
        this.props.history.push(vouchersSection);
    };
    handleTextFeildChanges = (e,feild) => {

        let value = e.target.value;
        let voucher_form_data = this.state.voucher_form_data;
        if(feild === "isActive"){

            voucher_form_data[feild] = (value === 'true');
        }
        else{
            voucher_form_data[feild] =value;
        }
        this.setState({
            voucher_form_data:voucher_form_data
        });
    };
    handleDateChanges = (value,feild) => {

        let voucher_form_data = this.state.voucher_form_data;
        voucher_form_data[feild] = value;
        this.setState({
            voucher_form_data:voucher_form_data
        });
    };
    handleCheckboxChanges = (e,feild) => {
        let voucher_form_data = this.state.voucher_form_data;
        voucher_form_data[feild] = e.target.checked;
        this.setState({
            voucher_form_data:voucher_form_data
        });
    };
    handleSelectChanges = (e,feild, list) => {

        let voucher_form_data = this.state.voucher_form_data;
        if(feild === "products"){
            let selected_product = voucher_form_data.products.slice();
            let selected_product_index = selected_product.findIndex(function (data) {
                return data.id === list.id;
            });
            if(e.target.checked){
                selected_product.push(list);

            } else {
                selected_product.splice(selected_product_index, 1);
            }

            voucher_form_data[feild] = selected_product;
        }
        else if(feild === "categories"){
            let selected_category = voucher_form_data.categories.slice();
            let selected_category_index = selected_category.findIndex(function (data) {
                return data.id === list.id;
            });
            if(e.target.checked){
                selected_category.push(list);

            } else {
                selected_category.splice(selected_category_index, 1);
            }

            voucher_form_data[feild] = selected_category;
        }
        this.setState({
            voucher_form_data:voucher_form_data
        })
    };
    handleSubmit = () => {

        let error = {};
        if(this.state.voucher_form_data.discount_name === ""){
            error = {
                field: "discount_name",
                message: "The Discount Name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }
        else if(this.state.voucher_form_data.discount_code === ""){
            error = {
                field: "discount_code",
                message: "The Discount code cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }

        else if (this.state.voucher_form_data.discount_type === "PERCENTAGE" && this.state.voucher_form_data.discount_value === 0) {
                error = {
                    field: "discount_value",
                    message: "Discount Value Cannot be 0"
                };
                this.setState({
                    valueErrors:error
                })

            }
           else if (this.state.voucher_form_data.discount_type === "PERCENTAGE" && this.state.voucher_form_data.MaxDiscountVal === 0) {
                error = {
                    field: "MaxDiscountVal",
                    message: "Maximum Discount Value Cannot be 0"
                };
                this.setState({
                    valueErrors:error
                })
            }



        else if (this.state.voucher_form_data.MinAmntSpend === 0) {

            error = {
                field: "MinAmntSpend",
                message: "Minimum Spend Amount Cannot be 0"
            };
            this.setState({
                valueErrors:error
            })
        }


        else {

            this.setState({
                valueErrors:{},
                loading:true
            });
            let voucher_form_data={...this.state.voucher_form_data} ;

            let products =[];
            let categories = [];
            if( voucher_form_data.voucher_type ==="PRODUCT"){
                voucher_form_data.products.forEach((product) => {
                    products.push(product.id)
                });
            }
            else if( voucher_form_data.voucher_type ==="CATEGORY"){
                voucher_form_data.categories.forEach((category) => {
                    categories.push(category.id)
                });
            }
            else{
                products = [];
                categories = [];
            }

            let startDate = this.dateToYMD(voucher_form_data.startDate);
            let endDate = this.dateToYMD(voucher_form_data.endDate);
            let VoucherDetails = {
                "name": voucher_form_data.discount_name,
                "type": voucher_form_data.voucher_type,
                "startDate": startDate,
                "code": voucher_form_data.discount_code,
                "usageLimit": voucher_form_data.discount_uses,
                "endDate": endDate,
                "discountValueType": voucher_form_data.discount_type,
                "discountValue": voucher_form_data.discount_value,
                "minAmountSpent": voucher_form_data.MinAmntSpend,
                "maxDiscountValue": voucher_form_data.MaxDiscountVal,
                "products": products,
                // "collections": voucher_form_data.collections,
                "categories": categories,
                'isActive' : voucher_form_data.isActive,
                "applyOncePerOrder":voucher_form_data.applyOncePerOrder

            };
            let scope = this;
            console.log("VoucherDetails", VoucherDetails);


            CreateVouchersMutation(VoucherDetails, (response) => {
                if(response.createVoucher !== null ){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Voucher Created Successfully", { position: 'top-center'});
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
    dateToYMD = (date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"discounts"}>
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="voucher_create_component">
                        <form>
                            <Container maxWidth={"lg"} className={"voucher_create_container"}>
                                <AppHeader  title={"VOUCHERS"} onBack={this.GoBack}/>
                                <PageHeader title={"Create New Voucher"}/>
                                <Grid>
                                    <VoucherDetails
                                        data={this.state.voucher_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        // handleImageUpload={this.handleImageUpload}
                                        // RemoveImage={this.RemoveImage}
                                        onChangeCheckbox={this.handleCheckboxChanges}
                                        onChangeSelect={this.handleSelectChanges}
                                        onChangeDate={this.handleDateChanges}
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

export default VoucherCreate;
