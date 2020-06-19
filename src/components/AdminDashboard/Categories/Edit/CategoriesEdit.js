import React from "react";
import "./CategoriesEdit.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import AppHeader from "../../AppHeader/AppHeader";
import PageHeader from "../../PageHeader/PageHeader";
import Grid from "@material-ui/core/Grid";
import {categorySection} from "../../../../Core/util";
import CategoryDetails from "../CategoryDetails";
import cogoToast from "cogo-toast";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import SaveButtonBar from "../../SaveButtonBar/SaveButtonBar";
import axios from "axios";
import {api} from "../../../../serviceApi";
import LoadingScreen from "react-loading-screen";

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";

const getCategoryList = graphql`
    query CategoriesEditCategoryListQuery{
         categorys{
            id
            name
            branding
         }
    }
`;

const getSingleCategory = graphql`
  query CategoriesEditSingleCategoryQuery($id : ID!){
      category(id:$id){
         id
        name
        description
        seoTitle
        seoDescription
        parent{
          id
          name
        }
        backgroundImageUrl  
        isActive
        branding
      }
  
  }
`;


class CategoriesEdit extends React.Component{
    state={
        category_form_data:{
            name:"",
            description:"",
            category_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isSubcategory:false,
            parent:'',
            parent_category_list:[],
            selected_parent_category:{},
            is_brand_category:false,
            is_active:false,
        },
        valueErrors:{},
        category_image_file:null,
        category_id:'',
        category_name:"",
        loading:false,
        category_list:[]

    };
    componentWillMount(){
        this.getSingleCategoryData();
        this.setState({
            category_id:this.props.match.params.id
        });
    };
    getSingleCategoryData = () => {

        let variables = {
            id:this.props.match.params.id
        };
        this.setState({
           loading:true
        });

        fetchQuery(environment, getSingleCategory, variables)
            .then(data => {
                if(data.category !== null){
                    let category_form_data = {...this.state.category_form_data};

                     category_form_data = {
                            name:data.category.name,
                            description:data.category.description,
                            category_image:data.category.backgroundImageUrl,
                            seoTitle:data.category.seoTitle,
                            seoDescription:data.category.seoDescription,
                            isSubcategory:!!(data.category.parent && data.category.parent.id),
                            parent:data.category.parent? data.category.parent.id:'',
                            selected_parent_category:data.category.parent? data.category.parent:{},
                            parent_category_list:category_form_data.parent_category_list,
                            is_brand_category:data.category.branding,
                            is_active:data.category.isActive

                        };
                    this.setState({
                        category_name:data.category.name,
                        category_form_data:category_form_data,
                        loading:false
                    },()=>{
                            this.getCategoryList();
                        })

                } else {
                    this.setState({
                        category_form_data:this.emptyFormData(),
                        category_image_file:null,
                        loading:false
                    })
                }

            });
    };
    emptyFormData = () => {
        return {
            name:"",
            description:"",
            category_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isSubcategory:false,
            parent:'',
            parent_category_list:[],
            selected_parent_category:{}
        };
    };
    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.categorys !== null && data.categorys.length > 0){
                    let category_form_data = {...this.state.category_form_data};
                    category_form_data['parent_category_list'] = data.categorys.filter(l => {
                        return l.branding === this.state.category_form_data.is_brand_category;
                    });

                    this.setState({
                        category_form_data:category_form_data,
                        category_list:data.categorys
                    })
                } else {
                    this.setState({
                        category_form_data:{},
                        category_list:[]
                    })
                }

            });

    };
    GoBack = () => {
        this.props.history.push(categorySection);
    };
    handleTextFeildChanges = (e,feild) => {
        let category_form_data = this.state.category_form_data;
        category_form_data[feild] = e.target.value;
        this.setState({
            category_form_data:category_form_data
        });
    };
    handleCheckboxChanges = (e,feild) => {
        let category_form_data = this.state.category_form_data;
        category_form_data[feild] = e.target.checked;
        this.setState({
            category_form_data:category_form_data
        },()=>{
            if(feild === "is_brand_category"){
                this.FilterCategorys();
            }
        });
    };
    FilterCategorys = ()=>{
        let category_form_data = this.state.category_form_data;
        category_form_data['parent_category_list'] = this.state.category_list.filter(l => {
            return l.branding === this.state.category_form_data.is_brand_category;
        });
        this.setState({
            category_form_data:category_form_data
        })

    };
    handleImageUpload = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        // let url = reader.readAsDataURL(file);

        let category_form_data = this.state.category_form_data;


        reader.onloadend = function (e) {
            category_form_data['category_image'] = [reader.result];
            this.setState({
                category_image_file:file,
                category_form_data: category_form_data,
            })
        }.bind(this);

    };
    RemoveImage = () => {
        let category_form_data = this.state.category_form_data;
        category_form_data['category_image'] = PlaceholderImage;

        this.setState({
            category_form_data:category_form_data,
            category_image_file:null
        })

    };
    handleSelectChanges = (e,feild,list) => {
        let category_form_data = this.state.category_form_data;
        let selected_index = list.findIndex(function (data) {
            return data.id === e.target.value;
        });
        category_form_data[feild] = list[selected_index];

        this.setState({
            category_form_data:category_form_data,
        })

    };
    handleSubmit = () => {
        let error = {};
        if(this.state.category_form_data.name === ""){
            error = {
                field: "name",
                message: "The category's name cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else if(this.state.category_form_data.isSubcategory === true && Object.keys(this.state.category_form_data.selected_parent_category).length === 0 ){
            error = {
                field: "category",
                message: "The subcategory's parent category cannot be blank."
            };
            this.setState({
                valueErrors:error
            })
        } else {
            this.setState({
                valueErrors:{},
                loading:true
            });
            this.updateCategory();
        }

    };
    updateCategory = () => {
        let category_form_data={...this.state.category_form_data} ;
        const variables = {
            categoryId:this.state.category_id,
            input:{
                name:category_form_data.name,
                description:category_form_data.description,
                seoTitle:category_form_data.seoTitle,
                seoDescription:category_form_data.seoDescription,
                parent:category_form_data.selected_parent_category.id?category_form_data.selected_parent_category.id:"",
                branding:category_form_data.is_brand_category,
                isActive:category_form_data.is_active
            }
        };
        let scope = this;
        let data = new FormData();
        data.append("query", "mutation UpdateCategoryMutation(\n  $categoryId:ID!\n  $input: CategoryInput!\n  ) {\n     updateCategory(categoryId:$categoryId,input:$input){       \n         category{\n          id\n          name\n        }\n     }\n  }");
        data.append("variables", JSON.stringify(variables));
        if(this.state.category_image_file){
            data.append("file", this.state.category_image_file)
        }
        let token = localStorage.getItem('user_token');
        let config;
        if(token !== null && token !== undefined && token !== ""){
            config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token
                }
            };
        } else {
            config = {
                headers: {
                    'Accept': 'application/json'
                }
            };
        }
        axios.post(api, data, config)
            .then(function (response) {
                if(response.data.data.updateCategory !== null && response.data.data.updateCategory.category !== null){
                    scope.setState({
                       loading:false
                    });
                    cogoToast.success("Category Updated Successfully", { position: 'top-center'});
                    scope.GoBack();
                }

            })
            .catch(function (err) {
                scope.setState({
                    loading:false
                });
                cogoToast.error(err, { position: 'top-center'});
            });
    };
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"categories"} >
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="category_edit_component">
                        <form>
                            <Container maxWidth={"lg"} className={"category_edit_container"}>
                                <AppHeader  title={"CATEGORIES"} onBack={this.GoBack}/>
                                <PageHeader title={this.state.category_name}/>
                                <Grid>
                                    <CategoryDetails
                                        data={this.state.category_form_data}
                                        onChange={this.handleTextFeildChanges}
                                        valueErrors={this.state.valueErrors}
                                        handleImageUpload={this.handleImageUpload}
                                        RemoveImage={this.RemoveImage}
                                        onChangeCheckbox={this.handleCheckboxChanges}
                                        onChangeSelect={this.handleSelectChanges}
                                        action="edit"
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

export default CategoriesEdit;
