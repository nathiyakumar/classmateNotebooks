import React from "react";
import "./CustomerCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {customersSection} from "../../../../Core/util";
import CustomerDetail from "../CustomerDetail";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import CreateCustomerMutation from "../../../../mutations/CreateCustomerMutation";
import LoadingScreen from "react-loading-screen";

const getCountyList = graphql`
  query CustomerCreateCountryListQuery{
      countriesList{
        code
        country
      }
  }
`;
const getStateList = graphql`
  query CustomerCreateStateListQuery{
      getStates{
      name, stateAbbr
      }
  }
`;

class CustomerCreate extends React.Component {
    state = {
        customer_form_data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            address_firstName: "",
            address_lastName: "",
            company: "",
            mobileNumber: "",
            address_line1: "",
            address_line2: "",
            city: "",
            area: "",
            pin_code: "",
            country: "",
            state: "",
            country_list: [],
            selected_country: {},
            state_list: [],
            selected_state: {}
        },
        valueErrors: {},
        loading:false

    };

    componentWillMount() {
        this.getCountyList();
        this.getStateList();
    };

    getStateList = () => {

        let variables = {};

        fetchQuery(environment, getStateList, variables)
            .then(data => {

                if (data.getStates !== null && data.getStates.length > 0) {
                    let customer_form_data = {...this.state.customer_form_data};
                    customer_form_data['state_list'] = data.getStates;

                    this.setState({
                        customer_form_data: customer_form_data
                    })
                } else {
                    this.setState({
                        customer_form_data: {}
                    })
                }


            });

    };
    getCountyList = () => {

        let variables = {};

        fetchQuery(environment, getCountyList, variables)
            .then(data => {

                if (data.countriesList !== null && data.countriesList.length > 0) {
                    let customer_form_data = {...this.state.customer_form_data};
                    customer_form_data['country_list'] = data.countriesList;

                    this.setState({
                        customer_form_data: customer_form_data
                    })
                } else {
                    this.setState({
                        customer_form_data: {}
                    })
                }


            });

    };
    GoBack = () => {
        this.props.history.push(customersSection);
    };
    handleTextFeildChanges = (e, feild) => {
        let error = {};
        if (feild === "mobileNumber" || feild === "pin_code" || feild === "phone") {
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
        let customer_form_data = this.state.customer_form_data;

        customer_form_data[feild] = e.target.value;
        this.setState({
            customer_form_data: customer_form_data
        });

    };

    handleSelectChanges = (e, feild, list) => {

        let customer_form_data = this.state.customer_form_data;
        if (feild === "selected_country") {
            let selected_index = list.findIndex(function (data) {
                return data.country === e.target.value;
            });
            customer_form_data[feild] = list[selected_index];
            customer_form_data["country"] = list[selected_index].code;
        } else if (feild === "selected_state") {
            let selected_index = list.findIndex(function (data) {
                return data.stateAbbr === e.target.value;
            });
            customer_form_data[feild] = list[selected_index];
            customer_form_data["state"] = list[selected_index].stateAbbr;
        }

        this.setState({
            customer_form_data: customer_form_data,
        })

    };
    handleSubmit = () => {
        let error = {};
        if (this.state.customer_form_data.firstName === "") {
            error = {
                field: "firstName",
                message: "First Name cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.customer_form_data.email === "") {
            error = {
                field: "email",
                message: "Email cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.customer_form_data.mobileNumber === "") {
            error = {
                field: "mobileNumber",
                message: "Mobile Number cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.customer_form_data.mobileNumber.length > 10 ||
            this.state.customer_form_data.mobileNumber.length < 10) {
            error = {
                field: "mobileNumber",
                message: "Mobile Number Length should be 10."
            };
            this.setState({
                valueErrors: error
            })
        } else if (this.state.customer_form_data.state === "") {

            error = {
                field: "state",
                message: "State cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        }
        else if (this.state.customer_form_data.pin_code === "") {

            error = {
                field: "pin_code",
                message: "Pincode cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        }else {

            this.setState({
                valueErrors: {},
                loading:true
            });
            let customer_form_data = {...this.state.customer_form_data};
            let address = {
                firstName: customer_form_data.address_firstName,
                lastName: customer_form_data.address_lastName,
                addressLine1: customer_form_data.address_line1,
                addressLine2: customer_form_data.address_line2,
                city: customer_form_data.city,
                area: customer_form_data.area,
                country: customer_form_data.country,
                state: customer_form_data.state,
                postalCode: customer_form_data.pin_code,
                phone: customer_form_data.phone
            };
            let input_data = {
                firstName: customer_form_data.firstName,
                lastName: customer_form_data.lastName,
                mobileNumber: customer_form_data.mobileNumber,
                email: customer_form_data.email,
                address: address,


            };

            let scope = this;

            CreateCustomerMutation(input_data, (response) => {

                if (response.addCustomer !== null && response.addCustomer.user !== null) {
                    scope.setState({
                        loading:false
                    });

                    cogoToast.success("Customer Created Successfully", {position: 'top-center'});
                    scope.GoBack();
                }

            }, function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, {position: 'top-center'});
            })
        }

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
                    <div className="customer_create_component">
                        <form>
                            <Container maxWidth={"lg"} className={"customer_create_container"}>
                                <AppHeader title={"CUSTOMERS"} onBack={this.GoBack}/>
                                <PageHeader title={"Add New Customer"}/>
                                <Grid>
                                    <CustomerDetail
                                        data={this.state.customer_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        // handleImageUpload={this.handleImageUpload}
                                        // RemoveImage={this.RemoveImage}
                                        // onChangeCheckbox={this.handleCheckboxChanges}
                                        onChangeSelect={this.handleSelectChanges}
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

export default CustomerCreate;
