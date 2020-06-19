import React from "react";
import "./ShippingZoneDetails.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import Button from "@material-ui/core/Button";
import SelectableTable from "../SelectableTable";
import {shippingAddPath, shippingPath} from "../../../Core/util";
import PageHeader from "../PageHeader/PageHeader";
import DeleteShippingMethodMutation from "../../../mutations/DeleteShippingMethodMutation";
import cogoToast from "cogo-toast";
import LoadingScreen from "react-loading-screen";
import AdminDashboardIndex from "../AdminDashboardIndex";


const headCells = [
    {id: 'name', label: 'Name'},
    {id: 'type', label: 'Type'},

];

class ShippingZoneDetails extends React.Component {

    state = {
        // shipping_form_data:{
        //     name:"",
        //     productTypes : {
        //         customized:false,
        //         nonCustomized:false
        //     },
        //     price:0,
        //     gstInPercent:0,
        //     charges:0,
        //     minimumOrderPrice:0,
        //     shippingZone:{},
        //     maximumOrderPrice:0,
        //     type:"PRODUCT_TYPE_BASED",
        //     shippingZoneList:[]
        //     // description:"",
        //     // category_image:PlaceholderImage,
        //     // seoTitle:'',
        //     // seoDescription:'',
        //     // isSubcategory:false,
        //     // parent:'',
        //     // parent_category_list:[],
        //     // selected_parent_category:{}
        //
        //
        // },
        shipping_Zone_form_data: {
            name: "",
            ShippingMethodList: []
        },
        filterData:[],
        loading:false

    };

    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({
            shipping_Zone_form_data: nextProps.data,

        })
    }

    componentWillMount() {
        let shipping_Zone_form_data = this.state.shipping_Zone_form_data;
        shipping_Zone_form_data["name"] = this.props.data.name;
        shipping_Zone_form_data["ShippingMethodList"] = this.props.data.ShippingMethodList;
        this.setState({
            shipping_Zone_form_data: shipping_Zone_form_data,
            loading:true
        })
        this.FormateTableData(this.props.data.ShippingMethodList);
    }
    FormateTableData = (shippingMethodList) => {
        let datas = [];
        let dataFormate = {};
        let shipping_Zone_form_data = this.state.shipping_Zone_form_data;
        for (let i = 0; i < shippingMethodList.length; i++) {

            dataFormate = {
                id: shippingMethodList[i].id,
                name: shippingMethodList[i].name,
                type: shippingMethodList[i].type,


            };
            datas.push(dataFormate)

        }
        shipping_Zone_form_data["ShippingMethodList"] = datas;
        this.setState({
            shipping_Zone_form_data: shipping_Zone_form_data,
            filterData:datas,
            loading:false
        })

    };

    deleteShippingMethodsList = (selected_rows) => {
        this.setState({
            loading:true
        })

        DeleteShippingMethodMutation(selected_rows, (response) => {
            if (response.deleteAttribute !== null && response.deleteShippingMethod.message !== null) {
                cogoToast.success(response.deleteShippingMethod.message, {position: 'top-center'});
                this.componentWillMount()
            }

        }, function (err) {
            cogoToast.error(err, {position: 'top-center'});
        })

    };
    handleVoucherSearch = (searchText) => {

        const {shipping_Zone_form_data} = this.state;
        let filteredData = shipping_Zone_form_data.ShippingMethodList.filter(value => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase())

            );
        });
        this.setState({
            filterData:filteredData
        })

    };
    render() {
        return (
            <div className="shipping_zone_detail_component">
                <LoadingScreen
                    loading={this.state.loading}
                    bgColor='#ffffffbf'
                    spinnerColor='#000'
                    textColor='#676767'
                    logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                    text="Loading"
                >
                <Card>
                    <CardTitle title={"General Information"}/>
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Shipping Method Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.shipping_Zone_form_data.name}
                            onChange={(e) => this.props.onChange(e, "name")}
                            InputProps={{
                                readOnly: true,
                            }}
                            // error={valueErrors.field === "name"?!!valueErrors.field:null}
                            // helperText={valueErrors.field === "name"?valueErrors.message:null}
                        />
                    </CardContent>
                </Card>
                <FormSpacer/>
                <PageHeader title={"Shipping Method List"}/>
                <Button variant="contained" className="shipping_create_btn"
                        onClick={() =>
                            this.props.goCreatePath()

                        }
                        edit_path={shippingAddPath}
                >Create Shipping Method</Button>
                <SelectableTable
                    table_row_data={this.state.shipping_Zone_form_data.ShippingMethodList}
                    table_head_data={headCells}
                    table_title={""}
                    edit_path={shippingPath}
                    deleteRows={this.deleteShippingMethodsList}
                    handleSearch={this.handleVoucherSearch}
                    filterData={this.state.filterData}
                />
                </LoadingScreen>
            </div>
        );
    }
}

export default ShippingZoneDetails;
