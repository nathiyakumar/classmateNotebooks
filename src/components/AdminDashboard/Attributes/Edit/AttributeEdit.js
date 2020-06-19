import React from "react";
import "./AttributeEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import {
    attributeEditUrl,
    attributeListUrl,
    isSelected,
    updateAtIndex
} from "../../../../Core/util";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import AttributeDetails from "../AttributeDetails";
import AttributeValues from "../AttributeValues";
import {withRouter} from "react-router-dom";
import AttributeValueEditDialog from "../AttributeValueEditDialog/AttributeValueEditDialog";
import qs from "qs";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import cogoToast from "cogo-toast";
import UpdateAttributeMutation from "../../../../mutations/UpdateAttributeMutation";
import FormSpacer from "../../FormSpacer";
import LoadingScreen from "react-loading-screen";


const getSingleAttribute = graphql`
    query AttributeEditQuery($attributeId: ID!){
      singleAttribute(attributeId: $attributeId){
        name
        slug
        values(first:100){
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


function areValuesEqual(a,b) {
    return a.value === b.value;
}

class AttributeEdit extends React.Component{

    state={
        attribute_form_data:{
            name:"",
            slug:"",
        },
        attribute_list:[],
        valueErrors:{},
        attribute_id:"",
        loading:false
    };

    componentWillMount(){
        this.setState({
            attribute_id:this.props.match.params.id
        });
        this.getSingleAttributeData();
    }

    getSingleAttributeData = () => {
        let variables = {
            attributeId:this.props.match.params.id
        };
        this.setState({
            loading:true
        });

        fetchQuery(environment, getSingleAttribute, variables)
            .then(data => {
                if(data.singleAttribute !== null){
                    let attribute_form_data = {...this.state.attribute_form_data};
                    let attribute_list = [];
                    attribute_form_data.name = data.singleAttribute.name;
                    attribute_form_data.slug = data.singleAttribute.slug;
                    data.singleAttribute.values.edges.map((item,index) => {
                        attribute_list[index] =  {id:item.node.id,value:item.node.name}
                    });
                    this.setState({
                        attribute_form_data:attribute_form_data,
                        attribute_list:attribute_list,
                        loading:false
                    })
                } else {
                    this.setState({
                        attribute_form_data:this.emptyFormData(),
                        attributes_list:[],
                        loading:false
                    })
                }

            });
    };
    emptyFormData = () => {
        return {
            name:"",
            slug:"",
        };
    };

    GoBack = () => {
        this.props.history.push(attributeListUrl);
    };

    handleTextFeildChanges = (e,feild) => {
        let attribute_form_data = this.state.attribute_form_data;
        attribute_form_data[feild] = e.target.value;
        this.setState({
            attribute_form_data:attribute_form_data
        });
    };
    openModal = (action, valueId) => {
        // let params = this.props.match.params;
        this.props.history.push(
            attributeEditUrl({
                // ...params,
                action,
                id: valueId
            })
        );
    };
    closeModal = () => {
        let params = this.props.match.params;
        this.props.history.push(
            attributeEditUrl({
                ...params,
                action: undefined,
                id: undefined
            })
        );

    };
    removeValue = (id) => {
        let tmp_attribute_list = this.state.attribute_list.slice();
        let index = tmp_attribute_list.findIndex(x => x.id === parseInt(id));
        tmp_attribute_list.splice(index, 1);
        this.setState({
            attribute_list:tmp_attribute_list
        })
    };
    handleValueCreate = (data) => {
        let error = {};
        let found = this.state.attribute_list.find(function (element) {
            return element.value === data.value;
        });
        if(data.value === ""){
            error = {
                field: "value",
                message: "The attribute's name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }else if(found){
            error = {
                field: "value",
                message: "A value named "+data.value+" already exists"
            };
            this.setState({
                valueErrors:error
            })

        }else {
            this.setState(
                prevState => {
                    if(prevState.attribute_list.length === 0){
                        data.id=0;
                    } else {
                        data.id = parseInt(prevState.attribute_list.length+1);
                    }
                    return {
                        attribute_list: [
                            ...this.state.attribute_list,
                            data
                        ],
                        valueErrors:{}
                    };
                },
                () => this.closeModal()
            );
        }
    };

    handleValueUpdate = (input) => {
        let error = {};
        if (isSelected(input, this.state.attribute_list, areValuesEqual)) {
            error = {
                field: "value",
                message: "A value named "+input.name+" already exists"
            };
            this.setState({
                valueErrors:error
            })
        } else {
            let params_values = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            let index = this.state.attribute_list.findIndex(x => x.id === parseInt(params_values.id));
            this.setState({
                attribute_list:updateAtIndex(input, this.state.attribute_list, index)
            });
            this.closeModal();
        }

    };

    getCurrentAttributeValue = (id) => {
        return this.state.attribute_list.find(function (element) {
            return  element.id.toString() === id;
        });
    };

    handleSubmit = () => {
        let error = {};
        if(this.state.attribute_form_data.name === ""){
            error = {
                field: "name",
                message: "The attribute's name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else if(this.state.attribute_form_data.slug === ""){
            error = {
                field: "slug",
                message: "The attribute's slug cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else if(this.state.attribute_list.length < 1){
            cogoToast.error("The attribute's values cannot be blank.", { position: 'top-center'});
            this.setState({
                valueErrors:{}
            })
        } else {
            this.setState({
                valueErrors:{},
                loading:true
            });

            let input_data = {...this.state.attribute_form_data};
            let formatted_values = [];
            this.state.attribute_list.map((item,index) => {
                formatted_values[index] = {value:item.value}
            });
            input_data['values'] = formatted_values;
            let scope = this;
            UpdateAttributeMutation(this.state.attribute_id, input_data, (response) => {
                if(response.updateAttribute !== null && response.updateAttribute.attributes !== null){
                    scope.setState({
                       loading:false
                    });
                    cogoToast.success("Attributes Created Successfully", { position: 'top-center'});
                    scope.GoBack();                }

            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };


    render() {
        let params_values = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
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
                    <div className="attributeeditform_component">
                        <form>
                            <Container maxWidth={"lg"} className={"attributeeditform_container"}>
                                <AppHeader  title={"ATTRIBUTES"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.attribute_form_data.name}/>
                                <Grid>
                                    <AttributeDetails
                                        data={this.state.attribute_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                    />
                                    <FormSpacer />
                                    <AttributeValues
                                        title="Attribute Values"
                                        onValueAdd={() => this.openModal("add-value")}
                                        data={this.state.attribute_list}
                                        removeValue={this.removeValue}
                                        onValueUpdate={id => this.openModal("edit-value", id)}
                                    />
                                    {
                                        params_values.action === "add-value" && (
                                            <AttributeValueEditDialog
                                                attributeValue={null}
                                                open={params_values.action === "add-value"}
                                                onClose={this.closeModal}
                                                onSubmit={this.handleValueCreate}
                                                valueErrors={this.state.valueErrors}
                                            />
                                        )
                                    }

                                    {
                                        params_values.action === "edit-value" && (
                                            <AttributeValueEditDialog
                                                attributeValue={this.getCurrentAttributeValue(params_values.id)}
                                                open={params_values.action === "edit-value"}
                                                onClose={this.closeModal}
                                                onSubmit={this.handleValueUpdate}
                                                valueErrors={this.state.valueErrors}
                                            />
                                        )
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

export default withRouter(AttributeEdit);
