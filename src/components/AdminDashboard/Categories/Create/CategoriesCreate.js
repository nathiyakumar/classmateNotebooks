import React from "react";
import "./CategoriesCreate.css";
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
import CreateCategoryMutation from "../../../../mutations/CreateCategoryMutation";
import LoadingScreen from "react-loading-screen";

const getCategoryList = graphql`
    query CategoriesCreateCategoryListQuery{
         categorys{
            id
            name
            branding
         }
    }
`;

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";

class CategoriesCreate extends React.Component{
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
            is_active:false
        },
        valueErrors:{},
        loading:false,
        category_list:[]

    };
    componentWillMount(){
        this.getCategoryList();
    };
    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {

                if(data.categorys !== null && data.categorys.length > 0){
                    let category_form_data = {...this.state.category_form_data};
                    category_form_data['parent_category_list'] = data.categorys.filter(l => {
                        return l.branding === false;
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
            let category_form_data={...this.state.category_form_data} ;
            let input_data = {
                name:category_form_data.name,
                description:category_form_data.description,
                seoTitle:category_form_data.seoTitle,
                seoDescription:category_form_data.seoDescription,
                parent:category_form_data.selected_parent_category.id?category_form_data.selected_parent_category.id:"",
                branding:category_form_data.is_brand_category,
                isActive:category_form_data.is_active
            };

            let scope = this;
            CreateCategoryMutation(input_data, (response) => {
                if(response.createCategory !== null && response.createCategory.category !== null){
                    scope.setState({
                        loading:false
                    });
                    cogoToast.success("Category Created Successfully", { position: 'top-center'});
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
                <AdminDashboardIndex active_page={"categories"} >
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="category_create_component">
                        <form>
                            <Container maxWidth={"lg"} className={"category_create_container"}>
                                <AppHeader  title={"CATEGORIES"} onBack={this.GoBack}/>
                                <PageHeader title={"Create New Category"}/>
                                <Grid>
                                    <CategoryDetails
                                        data={this.state.category_form_data}
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

export default CategoriesCreate;
