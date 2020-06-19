import React from "react";
import "./ShippingMethodEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {shippingSection, shippingZonePath} from "../../../../Core/util";
import ShippingMethodDetails from "../ShippingMethodDetails";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import LoadingScreen from "react-loading-screen";
import CreateShippingMethodMutation from "../../../../mutations/CreateShippingMethodMutation";
import UpdateShippingMethodMutation from "../../../../mutations/UpdateShippingMethodMutation";

const getShippingZoneList = graphql`
    query ShippingMethodEditZoneListQuery{
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
const getSingleShippingMethod = graphql`
    query ShippingMethodEditSingleShippingMethodQuery($shippingMethodId:ID!){
         singleShippingMethod(shippingMethodId:$shippingMethodId){
            name
            productTypes
            price
            type   
            shippingZone{
              id
              name
            }
            charges
            gstInPercent
    
         }
    }
`;

class ShippingMethodEdit extends React.Component {
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

            isEdit: false
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
        filterData:[],
        shippingMethodId: "",
        valueErrors: {},
        loading: false,
        shippingZoneId: "",
        get_response: false,

    };

    componentWillMount() {
        this.getSingleShippingMethod();
        this.setState({
            shippingMethodId: this.props.match.params.id
        });


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
                        shipping_form_data: shipping_form_data,

                    })
                } else {
                    this.setState({
                        shipping_form_data: {},

                    })
                }

            });

    };
    getSingleShippingMethod = () => {
        this.setState({
            loading:true
        })
        let variables = {
            shippingMethodId: this.props.match.params.id
        };

        fetchQuery(environment, getSingleShippingMethod, variables)
            .then(data => {

                if (data.singleShippingMethod !== null) {

                    let shipping_form_data = {...this.state.shipping_form_data};
                    shipping_form_data.name = data.singleShippingMethod.name;
                    shipping_form_data.productTypes.customized = JSON.parse(data.singleShippingMethod.productTypes).customized;
                    shipping_form_data.productTypes.nonCustomized = JSON.parse(data.singleShippingMethod.productTypes).non_customized;
                    shipping_form_data.price = data.singleShippingMethod.price;
                    shipping_form_data.type = data.singleShippingMethod.type;
                    shipping_form_data.shippingZone = data.singleShippingMethod.shippingZone ? data.singleShippingMethod.shippingZone : {};
                    shipping_form_data.charges = data.singleShippingMethod.charges ? data.singleShippingMethod.charges : 0;
                    shipping_form_data.gstInPercent = data.singleShippingMethod.gstInPercent ? data.singleShippingMethod.gstInPercent : 0;
                    shipping_form_data.isEdit = true;

                    this.setState({
                        shipping_form_data: shipping_form_data,
                        shippingZoneId: data.singleShippingMethod.shippingZone ? data.singleShippingMethod.shippingZone.id : "",
                        get_response: true,
                        loading:false
                    })
                } else {
                    this.setState({
                        shipping_form_data: {},
                        loading:false
                    })
                }

            });

    };
    GoBack = () => {
        this.props.history.push(shippingZonePath(this.state.shippingZoneId));
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
        } else if (this.state.shipping_form_data.shippingZone === {}) {
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
                // type: shipping_form_data.type,
                price: JSON.parse(shipping_form_data.price),
                gstInPercent: JSON.parse(shipping_form_data.gstInPercent),
                charges: JSON.parse(shipping_form_data.charges),
                shippingMethodId: this.state.shippingMethodId,
            };

            let scope = this;
            UpdateShippingMethodMutation(input_data, (response) => {

                if (response.updateShippingMethod !== null && response.updateShippingMethod.shippingMethod !== null) {

                    scope.setState({
                        loading: false
                    });
                    cogoToast.success("Shipping Method Updated Successfully", {position: 'top-center'});
                    scope.props.history.push(shippingZonePath(this.state.shippingZoneId));
                    // scope.GoBack();
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
                                    <PageHeader title={this.state.shipping_form_data.name}/>
                                    <Grid>
                                        {
                                            this.state.get_response === true && (<ShippingMethodDetails
                                                    data={this.state.shipping_form_data}
                                                    onChange={this.handleTextFeildChanges}
                                                    valueErrors={this.state.valueErrors}
                                                    onChangeCheckbox={this.handleCheckboxChanges}
                                                    onChangeSelect={this.handleSelectChanges}
                                                    action="add"
                                                    filterData={this.state.filterData}
                                                />
                                            )}
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

export default ShippingMethodEdit;
