import React from "react";
import "./CollectionsCreate.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {collectionSection} from "../../../../Core/util";
import CollectionDetails from "../CollectionDetails";
import cogoToast from "cogo-toast";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import axios from "axios";
import {api} from "../../../../serviceApi";
import LoadingScreen from "react-loading-screen";

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";

class CollectionsCreate extends React.Component{
    state={
        collection_form_data:{
            name:"",
            description:"",
            collection_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isPublished:false,
            products:[],
            publicationDate:"",
            product_list:[]
        },
        valueErrors:{},
        collection_image_file:null,
        loading:false
    };
    componentWillMount(){
        let date = this.dateToYMD(new Date());
        let formdata = {...this.state.collection_form_data};
        formdata["publicationDate"] = date;
        this.setState({
            collection_form_data:formdata
        })
    };

    GoBack = () => {
        this.props.history.push(collectionSection);
    };
    handleTextFeildChanges = (e,feild) => {
        let value;
        if(feild === "publicationDate"){
            value = this.dateToYMD(e);
        }
        else{
            value=  e.target.value;
        }
        let collection_form_data = this.state.collection_form_data;
        collection_form_data[feild] =value;
        this.setState({
            collection_form_data:collection_form_data
        });
    };
    dateToYMD = (date) => {
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };

    handleCheckboxChanges = (e,feild) => {
        let collection_form_data = this.state.collection_form_data;
        collection_form_data[feild] = e.target.checked;
        this.setState({
            collection_form_data:collection_form_data
        });
    };
    handleImageUpload = (e) => {

        let file = e.target.files[0];
        let reader = new FileReader();
        // let url = reader.readAsDataURL(file);

        let collection_form_data = this.state.collection_form_data;


        reader.onloadend = function (e) {
            collection_form_data['collection_image'] = [reader.result];
            this.setState({
                collection_image_file:file,
                collection_form_data: collection_form_data,
            })
        }.bind(this);

    };
    RemoveImage = () => {
        let collection_form_data = this.state.collection_form_data;
        collection_form_data['collection_image'] = PlaceholderImage;

        this.setState({
            collection_form_data:collection_form_data,
        })

    };
    handleSelectChanges = (e,feild,list) => {
        let collection_form_data = this.state.collection_form_data;
        let selected_product = collection_form_data.products.slice();
        let selected_product_index = selected_product.findIndex(function (data) {
            return data.id === list.id;
        });
        if(e.target.checked){
            selected_product.push(list);

        } else {
            selected_product.splice(selected_product_index, 1);
        }

        collection_form_data[feild] = selected_product;

    };
    handleSubmit = () => {

        let error = {};
        if(this.state.collection_form_data.name === ""){
            error = {
                field: "name",
                message: "The Collection name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        }
        else {
            this.setState({
                valueErrors:{},
                loading:true
            });
            let collection_form_data={...this.state.collection_form_data} ;
            let input_data = {
                name:collection_form_data.name,
                description:collection_form_data.description,
                seoTitle:collection_form_data.seoTitle,
                seoDescription:collection_form_data.seoDescription,
                isPublished:collection_form_data.isPublished,
                publicationDate:collection_form_data.publicationDate,
            };
            let scope = this;
            const variables = {
                input: input_data,
            };

            var data = new FormData();
            data.append("query", " mutation CollectionCreateMutation(\n$input:CollectionInput!\n) {\n createCollection(\n  input: $input\n ) {\n collection{\nid\n name\n backgroundImage\n }\n}\n}");
            data.append("variables", JSON.stringify(variables));
            data.append("file", this.state.collection_image_file);


            let token = localStorage.getItem('user_token');

            if (token !== null && token !== undefined && token !== "") {

                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'JWT ' + token
                    },
                };

            } else {

                var config = {
                    headers: {
                        'Accept': 'application/json'
                    },
                };
            }

            axios.post(api, data, config)
                .then(function (response) {
                    if (response.data.data.createCollection) {
                        scope.setState({
                            loading:false
                        });

                        cogoToast.success("Collection Created Successfully", {position: 'top-center'});
                        scope.GoBack();
                    }

                })
                .catch(function (err) {
                    scope.setState({
                        loading:false
                    });
                    cogoToast.error(err, {position: 'top-center'});
                });

        }

    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"collections"}>
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="collection_create_component">

                        <form>
                            <Container maxWidth={"lg"} className={"collection_create_container"}>
                                <AppHeader  title={"COLLECTIONS"} onBack={this.GoBack}/>
                                <PageHeader title={"Create New Collection"}/>
                                <Grid>
                                    <CollectionDetails
                                        data={this.state.collection_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        handleImageUpload={this.handleImageUpload}
                                        RemoveImage={this.RemoveImage}
                                        onChangeCheckbox={this.handleCheckboxChanges}
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

export default CollectionsCreate;
