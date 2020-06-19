import React from "react";
import "./CustomerList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { customersAddPath, customersPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import DeleteCustomerMutation from "../../../../mutations/DeleteCustomerMutation";
import LoadingScreen from "react-loading-screen";

const getCustomerList = graphql`
  query CustomerListQuery{
  users{
    id
    firstName
    lastName
    mobileNumber
    email  
    defaultBillingAddress{
      country{
        country
      }
    }
  }
  }

`;



const headCells = [
    { id: 'customer_name',   label: 'Customer Name' },
    { id: 'email',   label: 'Customer Email' },
    { id: 'number',   label: 'Mobile Number' },
];

class CustomerList extends React.Component{
    state={
        customer_list:[],
        loading:false,
        filterData:[]
    };

    componentDidMount(){
        this.getCustomersList();
    }

    getCustomersList = () =>{
        let variables = {};
        this.setState({
           loading:true
        });

        fetchQuery(environment, getCustomerList, variables)
            .then(data => {

                if(data.users !== null && data.users.length > 0){
                    this.FormateTableData(data.users);
                } else {
                    this.setState({
                        customer_list:[],
                        loading:false,
                        filterData:[],
                    })
                }

            });
    };
    FormateTableData = (customerList) => {

        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < customerList.length; i++) {


            dataFormate = {
                id: customerList[i].id,
                customer_name: customerList[i].firstName ,
                email: customerList[i].email,
                number: customerList[i].mobileNumber
            };
            datas.push(dataFormate)

        }
        this.setState({
            customer_list: datas,
            filterData:datas,
            loading:false
        })

    };


    deleteCustomers = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
            DeleteCustomerMutation(selected_rows, (response) => {

                if(response.deleteUser !== null && response.deleteUser.message !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Customer Removed Successfully", { position: 'top-center'});
                    scope.getCustomersList();
                }

            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })


    };
    handleCustomerSearch = (searchText) => {
        const {customer_list} = this.state;
        let filteredData = customer_list.filter(value => {
            return (
                value.customer_name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.email.toLowerCase().includes(searchText.toLowerCase()) ||
                value.number.toLowerCase().includes(searchText.toLowerCase())

            );
        });
        this.setState({
            filterData:filteredData
        })

    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"customers"}>
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="customer_list_component">
                        <Container maxWidth={"lg"} className={"customer_list_container"}>
                            <div className="customer_list_top_section">
                                <h5 className="component_title">Customers</h5>
                                <Button variant="contained" className="admin_create_customer_btn" onClick={()=>{
                                    this.props.history.push(customersAddPath);
                                }}>Create Customer</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.customer_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={customersPath}
                                deleteRows={this.deleteCustomers}
                                handleSearch={this.handleCustomerSearch}
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
export default CustomerList
