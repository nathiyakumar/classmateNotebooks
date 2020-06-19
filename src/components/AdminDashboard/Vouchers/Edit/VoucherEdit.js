import React from "react";
import "./VoucherEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {vouchersSection} from "../../../../Core/util";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import VoucherDetails from "../VoucherDetails";
import UpdateVoucherMutation from "../../../../mutations/UpdateVoucherMutation";
import LoadingScreen from "react-loading-screen";


const getProductsList = graphql`
    query VoucherEditProductsListQuery{
        listOfProducts{
           id
          name
        }
    }
`;
const getCategoryList = graphql`
  query VoucherEditCategoryListQuery{
  categorys{
   id
   name
     
  }
  }
`;
const getSingleVoucher = graphql`
  query VoucherEditSingleVoucherQuery($voucherId : ID!){
  singleVoucher(voucherId:$voucherId){
     id
    name
    code
    usageLimit
    startDate
    endDate
    discountValueType
    applyOncePerOrder
    discountValue
    minAmountSpent
    maxDiscountValue
    type
    isActive
   products(first:10){
    edges{
      node{
        id
        name
      }
    }
  }
  categories(first:10){
    edges{
      node{
        id
        name
      }
    }
  }
    collections(first:10){
    edges{
      node{
        id
        name
      }
    }
  }
  }
  }
`;


class VoucherEdit extends React.Component{
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
        voucher_id:'',
        voucher_name:"",
        getResponse:false,

        isDateEditedStart:false,
        isDateEditedEnd:false,
        loading:false

    };
    componentWillMount(){


        // let date = this.dateToYMD(new Date());
        let formdata = {...this.state.voucher_form_data};
        // formdata["publicationDate"] = date;
        this.setState({
            voucher_form_data:formdata
        });
        this.setState({
            voucher_id:this.props.match.params.id
        });
    };
    componentDidMount() {

        this.getProductList();
    }

    dateToYMD = (date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };

    emptyFormData = () => {
        return {
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
        };

    };
    getProductList = () => {

        let variables = {};

        fetchQuery(environment, getProductsList, variables)
            .then(data => {

                if(data.listOfProducts !== null && data.listOfProducts.length > 0){
                    let voucher_form_data = {...this.state.voucher_form_data};
                    voucher_form_data["product_list"] = data.listOfProducts;
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
                    },()=>{
                        this.getSingleVoucher();
                    })
                } else {
                    this.setState({
                        voucher_form_data:{}
                    })
                }

            });

    };
    getSingleVoucher = () => {
        let variables = {
            voucherId :this.props.match.params.id
        };
        let voucher_form_data = {...this.state.voucher_form_data};
        this.setState({
           loading:true
        });


        fetchQuery(environment, getSingleVoucher, variables)
            .then(data => {
                if(data.singleVoucher !== null){

                    let products = [];
                    let categories = [];
                    // let collections = [];
                    data.singleVoucher.products.edges.map((item,index) =>{
                        products[index] = item.node;
                    });
                    data.singleVoucher.categories.edges.map((item,index) =>{
                        categories[index] = item.node;
                    });
                    // data.singleVoucher.collections.edges.map((item,index) =>{
                    //     collections[index] = item.node;
                    // });
                    let discountType
                    if(data.singleVoucher.discountValueType === "fixed"){
                        discountType = "FIXED"
                    }
                    else if(data.singleVoucher.discountValueType === "percentage"){
                        discountType = "PERCENTAGE"
                    }
                    else{
                        discountType =data.singleVoucher.discountValueType
                    }

                    let voucherType
                    if(data.singleVoucher.type === "value"){
                        voucherType = "VALUE"
                    }
                    else if(data.singleVoucher.type === "product"){
                        voucherType = "PRODUCT"
                    }
                    else if(data.singleVoucher.type === "category"){
                        voucherType = "CATEGORY"
                    }
                    else{
                        voucherType=data.singleVoucher.type
                    }

                    voucher_form_data = {
                        discount_name: data.singleVoucher.name,
                        discount_code: data.singleVoucher.code,
                        discount_type: discountType,
                        discount_value:data.singleVoucher.discountValue,
                        discount_uses:data.singleVoucher.usageLimit,
                        startDate: data.singleVoucher.startDate,
                        endDate: data.singleVoucher.endDate,
                        MaxDiscountVal:data.singleVoucher.maxDiscountValue,
                        MinAmntSpend:data.singleVoucher.minAmountSpent,
                        isActive:data.singleVoucher.isActive,
                        voucher_type: voucherType,
                        products:products,
                        categories: categories,
                        // collections: collections,
                        product_list:voucher_form_data.product_list,
                        category_list:voucher_form_data.category_list,
                        applyOncePerOrder:data.singleVoucher.applyOncePerOrder


                    };


                    this.setState({
                        voucher_name:data.singleVoucher.name,
                        voucher_form_data:voucher_form_data,
                        getResponse:true,
                        loading:false


                    })
                } else {
                    this.setState({
                        voucher_form_data:this.emptyFormData(),
                        collection_image_file:null,
                        loading:false
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
    handleDateChanges = (value,feild) => {

        let voucher_form_data = this.state.voucher_form_data;
        voucher_form_data[feild] = value;
        this.setState({
            voucher_form_data:voucher_form_data,
            isDateEdited : true
        });
        if(feild === "startDate"){
            this.setState({
                isDateEditedEnd:true
            })
        }
        else if(feild === "endDate"){
            this.setState({
                isDateEditedStart:true
            })
        }
    };
    handleCheckboxChanges = (e,feild) => {
        let voucher_form_data = this.state.voucher_form_data;
        voucher_form_data[feild] = e.target.checked;
        this.setState({
            voucher_form_data:voucher_form_data
        });
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

            let endDate;
            let startDate;
           if(this.state.isDateEditedEnd === true){
                endDate = this.dateToYMD(voucher_form_data.endDate);
           }
           else{
               endDate = voucher_form_data.endDate

           }
           if(this.state.isDateEditedStart === true){
                startDate = this.dateToYMD(voucher_form_data.startDate);
            }
           else{
                startDate = voucher_form_data.startDate
           }


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
                "categories": categories,
                'isActive' : voucher_form_data.isActive,
                "applyOncePerOrder":voucher_form_data.applyOncePerOrder

            };
            let scope = this;
            console.log("VoucherDetails", VoucherDetails);


            UpdateVoucherMutation(this.state.voucher_id ,VoucherDetails, (response) => {
                if(response.updateVoucher !== null ){
                    scope.setState({
                       loading:false
                    });
                    cogoToast.success("Voucher Updated Successfully", { position: 'top-center'});
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
                    <div className="voucher_edit_component">
                        <form>
                            <Container maxWidth={"lg"} className={"voucher_edit_container"}>
                                <AppHeader  title={"VOUCHERS"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.voucher_name}/>
                                <Grid>
                                    {this.state.getResponse === true ?
                                        <VoucherDetails
                                            data={this.state.voucher_form_data}
                                            onChange={this.handleTextFeildChanges}
                                            valueErrors={this.state.valueErrors}
                                            handleImageUpload={this.handleImageUpload}
                                            RemoveImage={this.RemoveImage}
                                            onChangeCheckbox={this.handleCheckboxChanges}
                                            onChangeSelect={this.handleSelectChanges}
                                            onChangeDate={this.handleDateChanges}
                                            isEditing={this.state.isEditing}
                                        /> :null
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

export default VoucherEdit;
