import React from "react";
import "./CollectionEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {collectionSection} from "../../../../Core/util";
import CollectionDetails from "../CollectionDetails";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import UpdateCollectionMutation from "../../../../mutations/UpdateCollectionMutation";
import LoadingScreen from "react-loading-screen";

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";


const getProductsList = graphql`
    query CollectionEditProductsListQuery{
        listOfProducts{
           id
          name 
        }
    }
`;
const getSingleCollection = graphql`
  query CollectionEditSingleCollectionQuery($collectionId : ID){
   singleCollection(collectionId: $collectionId){
       id
        name
        description
        seoTitle
        seoDescription
        slug
         backgroundImage
         backgroundImageAlt   
         isPublished
         publicationDate
         products(first: 3){
            edges{
                node{
                  name
                  id
                }
            }
         }
    }
  }
`;


class CollectionsEdit extends React.Component{
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
        collection_id:'',
        collection_name:"",
        getResponse:false,
        isEditing:true,
        loading:false

    };
    componentWillMount(){
        let date = this.dateToYMD(new Date());
        let formdata = {...this.state.collection_form_data};
        formdata["publicationDate"] = date;
        this.setState({
            collection_form_data:formdata
        });
        this.setState({
            collection_id:this.props.match.params.id
        });
    };
    componentDidMount() {
        this.setState({
           loading:true
        },()=>{
            this.getProductList();
        });
    }

    dateToYMD = (date) => {
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    };

    emptyFormData = () => {
        return {
            name:"",
            description:"",
            category_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isBuffer:false,
            parent:'',
            parent_category_list:[],
            selected_parent_category:{},
            publicationDate:new Date(),
            product_list:[]
        };
    };
    getProductList = () => {
        let variables = {};
        fetchQuery(environment, getProductsList, variables)
            .then(data => {

                if(data.listOfProducts !== null && data.listOfProducts.length > 0){
                    let collection_form_data = {...this.state.collection_form_data};
                    collection_form_data["product_list"] = data.listOfProducts;
                    this.setState({
                        collection_form_data:collection_form_data,
                        loading:false
                    },()=>{
                        this.getSingleCollectionData();
                    })


                }
                else {
                    this.setState({
                        collection_form_data:{},
                        loading:false
                    })
                }

            });

    };
    getSingleCollectionData = () => {
        let variables = {
            collectionId :this.props.match.params.id
        };
        let collection_form_data = {...this.state.collection_form_data};

        fetchQuery(environment, getSingleCollection, variables)
            .then(data => {
                if(data.singleCollection !== null){
                    collection_form_data = {
                        name:data.singleCollection.name,
                        description:data.singleCollection.description,
                        category_image:data.singleCollection.backgroundImageUrl,
                        seoTitle:data.singleCollection.seoTitle,
                        seoDescription:data.singleCollection.seoDescription,
                        isPublished:data.singleCollection.isPublished,
                        publicationDate: data.singleCollection.publicationDate,
                        product_list:collection_form_data.product_list,
                    };

                    let selected_products =[];
                    for(let i=0; i< data.singleCollection.products.edges.length; i++){
                        selected_products.push(data.singleCollection.products.edges[i].node)
                    }
                    collection_form_data['products'] = selected_products;
                    this.setState({
                        collection_name:data.singleCollection.name,
                        collection_form_data:collection_form_data,
                        getResponse:true,
                        isEditing:true
                    })
                } else {
                    this.setState({
                        collection_form_data:this.emptyFormData(),
                        collection_image_file:null,
                    })
                }

            });
    };
    GoBack = () => {
        this.props.history.push(collectionSection);
    };
    handleTextFeildChanges = (e,feild) => {
        let value;
        if(feild === "publicationDate"){
            value = this.dateToYMD(e)
        }
        else{
            value=  e.target.value
        }
        let collection_form_data = this.state.collection_form_data;
        collection_form_data[feild] =value;
        this.setState({
            collection_form_data:collection_form_data
        });
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
                category_image_file:file,
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
    handleSelectChanges = (e,feild, list) => {
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
        this.setState({
            collection_form_data : collection_form_data
        })
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
            let products =[];
            for(let i=0; i<collection_form_data.products.length;i++){
                products.push(collection_form_data.products[i].id)
            }
            let input_data = {
                name:collection_form_data.name,
                description:collection_form_data.description,
                seoTitle:collection_form_data.seoTitle,
                seoDescription:collection_form_data.seoDescription,
                publicationDate:collection_form_data.publicationDate,
                isPublished:collection_form_data.isPublished,
                products:products
            };
            let scope = this;
            UpdateCollectionMutation(this.state.collection_id,this.state.collection_image_file,input_data, (response) => {

                if(response.updateCollection !== null){
                    scope.setState({
                       loading:false
                    });
                    cogoToast.success("Collection Updated Successfully", { position: 'top-center'});
                    scope.GoBack();
                }

            },function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            })
        }

    };
    render() {

        return (
            <div>
                <AdminDashboardIndex active_page={"collections"} >
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="collection_edit_component">
                        <form>
                            <Container maxWidth={"lg"} className={"collection_edit_container"}>
                                <AppHeader  title={"COLLECTIONS"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.collection_name}/>
                                <Grid>
                                    {this.state.getResponse === true ?
                                        <CollectionDetails
                                            data={this.state.collection_form_data}
                                            onChange={this.handleTextFeildChanges}
                                            valueErrors={this.state.valueErrors}
                                            handleImageUpload={this.handleImageUpload}
                                            RemoveImage={this.RemoveImage}
                                            onChangeCheckbox={this.handleCheckboxChanges}
                                            onChangeSelect={this.handleSelectChanges}
                                            isEditing={this.state.isEditing}
                                        /> :null
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

export default CollectionsEdit;
