import React from "react";
import "./CategoriesList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {categoryPath, categoryAddPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import DeleteCategoryMutation from "../../../../mutations/DeleteCategoryMutation";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import LoadingScreen from "react-loading-screen";

const getCategoryList = graphql`
  query  CategoriesListQuery{
     categorys{
        id
        name
        parent{
          id
        }
        children(first:10){
          edges{
            node{
              id
              name
            }
          }
        }
        products(first:10){
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



const headCells = [
    { id: 'category_name',   label: 'Category Name' },
    { id: 'subcategories_count',   label: 'Subcategories' },
    { id: 'products_count',   label: 'No. Products' },
];

class CategoriesList extends React.Component{
    state={
        category_list:[],
        loading:false,
        filterData:[]
    };

    componentDidMount(){
        this.getCategoriesList();
    }

    getCategoriesList = () =>{
        let variables = {};
        this.setState({
           loading:true
        });
        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.categorys !== null && data.categorys.length > 0){
                    this.FormateTableData(data.categorys);
                } else {
                    this.setState({
                        category_list:[],
                        filterData:[],
                        loading:false
                    })
                }

            });
    };
    FormateTableData = (categoryList) => {
        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < categoryList.length; i++) {
            dataFormate = {
                id: categoryList[i].id,
                category_name: categoryList[i].name,
                subcategories_count: categoryList[i].children.edges.length,
                products_count: categoryList[i].products.edges.length,
            };
            datas.push(dataFormate)

        }
        this.setState({
            category_list: datas,
            filterData:datas,
            loading:false
        })

    };


    deleteCategories = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
        DeleteCategoryMutation(selected_rows, (response) => {
            if(response.deleteCategory !== null && response.deleteCategory.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteCategory.message, { position: 'top-center'});
                scope.getCategoriesList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleCategorySearch = (searchText) => {
        const {category_list} = this.state;
        let filteredData = category_list.filter(value => {
            return (
                value.category_name.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        this.setState({
            filterData:filteredData
        })

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
                    <div className="categories_list_component">
                        <Container maxWidth={"lg"} className={"categories_list_container"}>
                            <div className="categories_list_top_section">
                                <h5 className="component_title">Categories</h5>
                                <Button variant="contained" className="admin_create_categories_btn" onClick={()=>{
                                    this.props.history.push(categoryAddPath);
                                }}>Create Category</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.category_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={categoryPath}
                                deleteRows={this.deleteCategories}
                                handleSearch={this.handleCategorySearch}
                                filterData={this.state.filterData}
                            />
                        </Container>
                    </div>
                    </LoadingScreen>
                </AdminDashboardIndex>
            </div>
        );
    }
}
export default CategoriesList
