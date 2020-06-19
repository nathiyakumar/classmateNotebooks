import React from "react";
import "./StaffMembersList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {staffMemberAddPath, staffMemberPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import DeleteStaffMembersMutation from "../../../../mutations/DeleteStaffMembersMutation";
import LoadingScreen from "react-loading-screen";
// import DeleteVouchersMutation from "../../../../mutations/DeleteVouchersMutation";

const getStaffMembersList = graphql`
  query  StaffMembersListQuery{
     listStaffUsers{
        id
        isAdmin
        firstName
        email
     }
  }
`;



const headCells = [

    { id: 'staff_name',   label: 'Name' },
    { id: 'email',   label: 'Email' },
    { id: 'isAdmin',   label: 'IsAdmin' },

];


class StaffMembersList extends React.Component{
    state={
        staff_member_list:[],
        loading:false,
        filterData:[]
    };

    componentDidMount(){
        this.getStaffMembersList();
    }

    getStaffMembersList = () =>{
        let variables = {};
        this.setState({
            loading:true
        });

        fetchQuery(environment, getStaffMembersList, variables)
            .then(data => {
                if(data.listStaffUsers !== null && data.listStaffUsers.length > 0){
                    this.FormateTableData(data.listStaffUsers);
                } else {
                    this.setState({
                        staff_member_list:[],
                        filterData:[],
                        loading:false
                    })
                }

            });
    };
    FormateTableData = (staffmemberList) => {

        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < staffmemberList.length; i++) {
            dataFormate = {
                id: staffmemberList[i].id,
                staff_name: staffmemberList[i].firstName,
                email: staffmemberList[i].email,
                isAdmin:staffmemberList[i].isAdmin + "" ,

            };
            datas.push(dataFormate)

        }
        this.setState({
            staff_member_list: datas,
            filterData:datas,
            loading:false
        })

    };


    deleteStaffMembers = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
        DeleteStaffMembersMutation(selected_rows, (response) => {
            if(response.deleteStaffMember !== null && response.deleteStaffMember.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteStaffMember.message, { position: 'top-center'});
                scope.getStaffMembersList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleStaffMembersSearch = (searchText) => {
        const {staff_member_list} = this.state;
        let filteredData = staff_member_list.filter(value => {
            return (
                value.staff_name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.email.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        this.setState({
            filterData:filteredData
        })

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
                    <div className="staff_member_list_component">
                        <Container maxWidth={"lg"} className={"staff_member_list_container"}>
                            <div className="staff_member_list_top_section">
                                <h5 className="component_title">Staff Members</h5>
                                <Button variant="contained" className="admin_create_staff_member_btn" onClick={()=>{
                                    this.props.history.push(staffMemberAddPath);
                                }}>Create Staff Member</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.staff_member_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={staffMemberPath}
                                deleteRows={this.deleteStaffMembers}
                                handleSearch={this.handleStaffMembersSearch}
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
export default StaffMembersList
