import React from "react";
import "./StaffMembersCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {staffMemberSection} from "../../../../Core/util";
import cogoToast from "cogo-toast";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import StaffMembersDetails from "../StaffMembersDetails";
import CreateStaffMembersMutation from "../../../../mutations/CreateStaffMembersMutation";


class StaffMembersCreate extends React.Component {
    state = {
        staff_member_form_data: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: ""

        },
        valueErrors: {},


    };

    componentDidMount() {


    }

    GoBack = () => {
        this.props.history.push(staffMemberSection);
    };
    handleTextFeildChanges = (e, feild) => {
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
        let value = e.target.value;
        let staff_member_form_data = this.state.staff_member_form_data;
        staff_member_form_data[feild] = value;
        this.setState({
            staff_member_form_data: staff_member_form_data
        });
    };
    // handleDateChanges = (value,feild) => {
    //
    //     let voucher_form_data = this.state.voucher_form_data;
    //     voucher_form_data[feild] = value;
    //     this.setState({
    //         voucher_form_data:voucher_form_data
    //     });
    // };
    // handleSelectChanges = (e,feild, list) => {
    //
    //     let voucher_form_data = this.state.voucher_form_data;
    //     if(feild === "products"){
    //         let selected_product = voucher_form_data.products.slice();
    //         let selected_product_index = selected_product.findIndex(function (data) {
    //             return data.id === list.id;
    //         });
    //         if(e.target.checked){
    //             selected_product.push(list);
    //
    //         } else {
    //             selected_product.splice(selected_product_index, 1);
    //         }
    //
    //         voucher_form_data[feild] = selected_product;
    //     }
    //     else if(feild === "categories"){
    //         let selected_category = voucher_form_data.categories.slice();
    //         let selected_category_index = selected_category.findIndex(function (data) {
    //             return data.id === list.id;
    //         });
    //         if(e.target.checked){
    //             selected_category.push(list);
    //
    //         } else {
    //             selected_category.splice(selected_category_index, 1);
    //         }
    //
    //         voucher_form_data[feild] = selected_category;
    //     }
    //     this.setState({
    //         voucher_form_data:voucher_form_data
    //     })
    // };
    handleSubmit = () => {

        let error = {};
        if (this.state.staff_member_form_data.firstName === "") {
            error = {
                field: "firstName",
                message: "The First Name cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.staff_member_form_data.lastName === "") {
            error = {
                field: "lastName",
                message: "The Last Name cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.staff_member_form_data.mobileNumber === "") {
            error = {
                field: "mobileNumber",
                message: "The Mobile Number cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.staff_member_form_data.email === "") {
            error = {
                field: "email",
                message: "The Email cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else {

            this.setState({
                valueErrors: {}
            });
            let staff_member_form_data = {...this.state.staff_member_form_data};

            let staffDetails = {

                firstName: staff_member_form_data.firstName,
                lastName: staff_member_form_data.lastName,
                mobileNumber: staff_member_form_data.mobileNumber,
                email: staff_member_form_data.email
            };
            let scope = this


            CreateStaffMembersMutation(staffDetails, (response) => {

                if (response.addStaffMember !== null) {

                    cogoToast.success("Staff Members Created Successfully", {position: 'top-center'});
                    scope.GoBack();
                }

            }, function (err) {

                cogoToast.error(err, {position: 'top-center'});
            })

        }

    };

    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"configuration"}>
                    <div className="staff_member_create_component">
                        <form>
                            <Container maxWidth={"lg"} className={"staff_member_edit_container"}>
                                <AppHeader title={"STAFF MEMBERS"} onBack={this.GoBack}/>
                                <PageHeader title={"Create New Staff Members"}/>
                                <Grid>
                                    <StaffMembersDetails
                                        data={this.state.staff_member_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        // handleImageUpload={this.handleImageUpload}
                                        // RemoveImage={this.RemoveImage}
                                        // onChangeCheckbox={this.handleCheckboxChanges}
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

export default StaffMembersCreate;
