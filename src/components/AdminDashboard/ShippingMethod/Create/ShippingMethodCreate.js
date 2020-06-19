import React from "react";
import "./ShippingMethodCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {shippingSection} from "../../../../Core/util";
import ShippingMethodDetails from "../ShippingMethodDetails";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import LoadingScreen from "react-loading-screen";
import CreateShippingMethodMutation from "../../../../mutations/CreateShippingMethodMutation";

const getShippingZoneList = graphql`
    query ShippingMethodCreateShippingZoneListQuery{
         shippingZones(first:100){
             edges{
                node{
                    id
                    name
                }
             }
         }
    }
`;

class ShippingMethodCreate extends React.Component {
    state = {
        shipping_form_data: {
            name: "",
            productTypes: {
                customized: false,
                nonCustomized: false
            },
            price: 0,
            gstInPercent: 0,
            charges: 0,
            minimumOrderPrice: 0,
            shippingZone: {},
            maximumOrderPrice: 0,
            type: "PRODUCT_TYPE_BASED",
            shippingZoneList: [],
            isEdit :false
            //
            // description:"",
            // category_image:PlaceholderImage,
            // seoTitle:'',
            // seoDescription:'',
            // isSubcategory:false,
            // parent:'',
            // parent_category_list:[],
            // selected_parent_category:{}
        },

        valueErrors: {},
        loading: false

    };

    componentWillMount() {
        this.getShippingZoneList();
    };

    getShippingZoneList = () => {

        let variables = {};

        fetchQuery(environment, getShippingZoneList, variables)
            .then(data => {
                if (data.shippingZones !== null && data.shippingZones.edges.length > 0) {
                    let shipping_form_data = {...this.state.shipping_form_data};
                    shipping_form_data['shippingZoneList'] = data.shippingZones.edges;

                    this.setState({
                        shipping_form_data: shipping_form_data
                    })
                } else {
                    this.setState({
                        shipping_form_data: {}
                    })
                }

            });

    };
    GoBack = () => {
        this.props.history.push(shippingSection);
    };
    handleTextFeildChanges = (e, feild) => {
        let shipping_form_data = this.state.shipping_form_data;
        shipping_form_data[feild] = e.target.value;
        this.setState({
            shipping_form_data: shipping_form_data
        });
    };
    handleCheckboxChanges = (e, feild) => {
        let shipping_form_data = this.state.shipping_form_data;
        shipping_form_data.productTypes[feild] = e.target.checked;
        this.setState({
            shipping_form_data: shipping_form_data
        });
    };
    handleSelectChanges = (e, feild, list) => {
        let shipping_form_data = this.state.shipping_form_data;
        let selected_index = list.findIndex(function (data) {
            return data.node.id === e.target.value;
        });
        shipping_form_data[feild] = list[selected_index].node;

        this.setState({
            shipping_form_data: shipping_form_data,
        })

    };
    handleSubmit = () => {
        let error = {};
        if (this.state.shipping_form_data.name === "") {
            error = {
                field: "name",
                message: "The Shipping Method's name cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        }
       else if (this.state.shipping_form_data.shippingZone === {}) {
            error = {
                field: "shippingZone",
                message: "The Shipping Zone  name cannot be blank."
            };
            this.setState({
                valueErrors: error
            })
        } else {
            this.setState({
                valueErrors: {},
                loading: true
            });
            let shipping_form_data = {...this.state.shipping_form_data};
            let input_data = {
                name: shipping_form_data.name,
                productTypes: shipping_form_data.productTypes,
                type: shipping_form_data.type,
                price: shipping_form_data.price,
                gstInPercent: shipping_form_data.gstInPercent,
                charges: shipping_form_data.charges,
                shippingZone: shipping_form_data.shippingZone.id ? shipping_form_data.shippingZone.id : "",
            };

            let scope = this;
            CreateShippingMethodMutation(input_data, (response) => {
                if (response.createShippingMethod !== null && response.createShippingMethod.shippingMethod !== null) {
                    scope.setState({
                        loading: false
                    });
                    cogoToast.success("Shipping Method Created Successfully", {position: 'top-center'});
                    scope.GoBack();
                }

            }, function (err) {
                scope.setState({
                    loading: false
                });
                cogoToast.error(err, {position: 'top-center'});
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
                        <div className="shipping_create_component">
                            <form>
                                <Container maxWidth={"lg"} className={"shipping_create_container"}>
                                    <AppHeader title={"SHIPPING"} onBack={this.GoBack}/>
                                    <PageHeader title={"Create New Shipping Method"}/>
                                    <Grid>
                                        <ShippingMethodDetails
                                            data={this.state.shipping_form_data}
                                            onChange={this.handleTextFeildChanges}
                                            valueErrors={this.state.valueErrors}
                                            onChangeCheckbox={this.handleCheckboxChanges}
                                            onChangeSelect={this.handleSelectChanges}
                                            action="add"
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

export default ShippingMethodCreate;
