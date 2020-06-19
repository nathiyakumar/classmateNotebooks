import React from "react";
import "./VoucherList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { vouchersAddPath, vouchersPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import DeleteVouchersMutation from "../../../../mutations/DeleteVouchersMutation";
import LoadingScreen from "react-loading-screen";

const getVoucherList = graphql`
  query  VoucherListQuery{
     listOfVouchers{
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
      }
  }
`;



const headCells = [
    { id: 'code',   label: 'Code' },
    { id: 'minAmountSpent',   label: 'Min. Spent' },
    { id: 'startDate',   label: 'Starts' },
    { id: 'endDate',   label: 'Ends' },
    { id: 'discountValue',   label: 'Discount Value' },
    { id: 'usageLimit',   label: 'Usage Limit' },
];


class VoucherList extends React.Component{
    state={
        voucher_list:[],
        loading:false,
        filterData:[]
    };

    componentDidMount(){
        this.getVoucherList();
    }

    getVoucherList = () =>{
        let variables = {};
        this.setState({
            loading:true
        });

        fetchQuery(environment, getVoucherList, variables)
            .then(data => {
                if(data.listOfVouchers !== null && data.listOfVouchers.length > 0){
                    this.FormateTableData(data.listOfVouchers);
                } else {
                    this.setState({
                        voucher_list:[],
                        filterData:[],
                        loading:false
                    })
                }

            });
    };
    FormateTableData = (voucherList) => {
        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < voucherList.length; i++) {

            let value
            if(voucherList[i].discountValueType ==="FIXED" || voucherList[i].discountValueType ==="fixed"){
                value="Rs."+voucherList[i].discountValue
            }
            else if(voucherList[i].discountValueType ==="PERCENTAGE" || voucherList[i].discountValueType ==="percentage"){
                value=voucherList[i].discountValue+"%"
            }
            else{
                value=voucherList[i].discountValue
            }
            dataFormate = {
                id: voucherList[i].id,
                code: voucherList[i].code,
                usageLimit: voucherList[i].usageLimit,
                startDate: voucherList[i].startDate,
                endDate: voucherList[i].endDate,
                discountValue: value,
                minAmountSpent: voucherList[i].minAmountSpent,
                type: voucherList[i].type
            };
            datas.push(dataFormate)

        }
        this.setState({
            voucher_list: datas,
            filterData:datas,
            loading:false
        })

    };


    deleteVouchers = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
        DeleteVouchersMutation(selected_rows, (response) => {
            if(response.deleteVoucher !== null && response.deleteVoucher.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteVoucher.message, { position: 'top-center'});
                scope.getVoucherList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleVoucherSearch = (searchText) => {
        const {voucher_list} = this.state;
        let filteredData = voucher_list.filter(value => {
            return (
                value.code.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        this.setState({
            filterData:filteredData
        })

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
                    <div className="vouchers_list_component">
                        <Container maxWidth={"lg"} className={"vouchers_list_container"}>
                            <div className="vouchers_list_top_section">
                                <h5 className="component_title">Vouchers</h5>
                                <Button variant="contained" className="admin_create_vouchers_btn" onClick={()=>{
                                    this.props.history.push(vouchersAddPath);
                                }}>Create Voucher</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.voucher_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={vouchersPath}
                                deleteRows={this.deleteVouchers}
                                handleSearch={this.handleVoucherSearch}
                                filterData={this.state.filterData}
                            />
                        </Container>
                    </div>
                    </LoadingScreen>
                </AdminDashboardIndex>
            </div>
        );
    }
}
export default VoucherList
