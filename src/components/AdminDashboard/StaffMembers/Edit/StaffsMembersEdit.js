import React from "react";
import "./StaffsMembersEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {staffMemberSection} from "../../../../Core/util";
import StaffMembersDetails from "../StaffMembersDetails";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import graphql from "babel-plugin-relay/macro";
import environment from "../../../../Environment";
import {fetchQuery} from "react-relay";
import cogoToast from "cogo-toast";
import UpdateStaffMemebersMutation from "../../../../mutations/UpdateStaffMemebersMutation";

// const getSingleStaffMembers = graphql`
//   query StaffsMembersEditSingleStaffMembersQuery($userId : ID!){
//       singleStaffUserView(userId: $userId){
//         id
//         firstName
//         lastName
//         email
//         isAdmin
//         mobileNumber
//       }
//   }
// `;
//
const getSingleStaffMembers = graphql`
  query  StaffsMembersEditSingleStaffUserViewQuery($userId : ID!){
     singleStaffUserView(userId : $userId){
         id
        firstName
        lastName
        email
        isAdmin
        mobileNumber
     }
  }
`;


class StaffsMembersEdit extends React.Component{
    state={
        staff_member_form_data:{
            firstName:"",
            lastName:"",
            mobileNumber:"",
            email:"",
            isAdmin:false,
            isEdited:true
        },
        valueErrors:{},
        userId:"",
        staff_name:""

    };
    componentWillMount(){




        this.setState({
            userId:this.props.match.params.id
        });
    };
    componentDidMount() {

        this.getSingleStaffMembers();
    }



    emptyFormData = () => {
        return {

            firstName:"",
            lastName:"",
            mobileNumber:"",
            email:"",
            isAdmin:false,
            isEdited:true
        };
    };

    getSingleStaffMembers = () => {

        let variables = {
            userId :this.props.match.params.id
        };
        let staff_members_form_data = {...this.state.staff_members_form_data};

        fetchQuery(environment, getSingleStaffMembers, variables)
            .then(data => {

                if(data.singleStaffUserView !== null){

                    staff_members_form_data = {

                        firstName:data.singleStaffUserView.firstName,
                        lastName:data.singleStaffUserView.lastName,
                        mobileNumber:data.singleStaffUserView.mobileNumber,
                        email:data.singleStaffUserView.email,
                        isAdmin:data.singleStaffUserView.isAdmin,
                        isEdited:true

                    };


                    this.setState({
                        staff_name:data.singleStaffUserView.firstName,
                        staff_member_form_data:staff_members_form_data,
                        // getResponse:true,
                        // isEditing:true

                    })
                } else {
                    this.setState({
                        staff_member_form_data:this.emptyFormData(),
                    })
                }

            });
    };
    GoBack = () => {
        this.props.history.push(staffMemberSection);
    };
    handleTextFeildChanges = (e,feild) => {
        let error = {}
        if (feild === "mobileNumber") {
            if (!/^[0-9]+$/.test(e.target.value)) {
                error = {
                    field: feild,
                    message: "Please enter only number."
                };
                this.setState({
                    valueErrors: error
                })
            } else {
                this.setState({
                    valueErrors: error
                })
            }
        } else if (feild === "email") {
            if (!/[^@]+@[^@]+\.[a-zA-Z]{2,}/.test(e.target.value)) {
                error = {
                    field: feild,
                    message: "Please enter valid email."
                };
                this.setState({
                    valueErrors: error
                })
            } else {
                this.setState({
                    valueErrors: error
                })
            }

        }
        let value=  e.target.value;
        let staff_member_form_data = this.state.staff_member_form_data;
        staff_member_form_data[feild] =value;
        this.setState({
            staff_member_form_data:staff_member_form_data
        });
    };
    handleCheckboxChanges = (e,feild) => {
        let staff_member_form_data = this.state.staff_member_form_data;
        staff_member_form_data[feild] = e.target.checked;
        this.setState({
            staff_member_form_data:staff_member_form_data
        });
    };

    handleSubmit = () => {
        let error = {};
        if(this.state.staff_member_form_data.firstName === ""){
            error = {
                field: "firstName",
                message: "The First Name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }
        else if(this.state.staff_member_form_data.lastName === ""){
            error = {
                field: "lastName",
                message: "The Last Name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }
        else if(this.state.staff_member_form_data.mobileNumber === ""){
            error = {
                field: "mobileNumber",
                message: "The Mobile Number cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }
        else if(this.state.staff_member_form_data.email === ""){
            error = {
                field: "email",
                message: "The Email cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }


        else {
            this.setState({
                valueErrors:{}
            });
            let staff_member_form_data={...this.state.staff_member_form_data} ;


            let input_data = {
                name:staff_member_form_data.name,
                firstName:staff_member_form_data.firstName,
                lastName:staff_member_form_data.lastName,
                email:staff_member_form_data.email,
                isAdmin:staff_member_form_data.isAdmin,
                mobileNumber:staff_member_form_data.mobileNumber

            };

            let scope = this;
            UpdateStaffMemebersMutation(this.state.userId,input_data, (response) => {
                if(response.updateStaffMember !== null){

                    cogoToast.success("Staff Member Updated Successfully", { position: 'top-center'});
                    scope.GoBack();
                }

            },function (err) {
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };
    render() {

        return (
            <div>
                <AdminDashboardIndex active_page={"configuration"}>
                    <div className="staff_member_edit_component">
                        <form>
                            <Container maxWidth={"lg"} className={"staff_member_edit_container"}>
                                <AppHeader  title={"STAFF MEMBERS"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.staff_name}/>
                                <Grid>

                                    <StaffMembersDetails
                                        data={this.state.staff_member_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        // handleImageUpload={this.handleImageUpload}
                                        // RemoveImage={this.RemoveImage}
                                        onChangeCheckbox={this.handleCheckboxChanges}
                                        // onChangeSelect={this.handleSelectChanges}
                                        // onChangeDate={this.handleDateChanges}
                                    />

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

export default StaffsMembersEdit;
