import React from "react";
import "./AdminProductsList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {productPath, productAddPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import DeleteProductMutation from "../../../../mutations/DeleteProductMutation";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import { withRouter } from "react-router-dom";
import LoadingScreen from "react-loading-screen";

const getProductsList = graphql`
      query AdminProductsListQuery{
            adminProductsList{ 
            id 
            publicationDate
            isPublished
            productType{
              id
              name
            }
            name
            description   
            category{
              id
              name
            }
            isFeatured
            isActive
            masterSku
            price
            updatedAt
            chargeTaxes
            quantity
            weight
            units
            slug
            images(first:1){
              edges{
                node{
                  url
                }
              }
            }    
          }
      }
`;
const headCells = [
    { id: 'name',   label: 'Name' },
    { id: 'type',   label: 'Type' },
    { id: 'published',   label: 'Published' },
    { id: 'category',   label: 'Category' },
    { id: 'sku',   label: 'SKU' },
    { id: 'quantity',   label: 'Quantity' },
    { id: 'weight',   label: 'Weight' },
    { id: 'price',   label: 'Price' },
];

class AdminProductsList extends React.Component{
    state={
        products_list:[],
        loading:false,
        filterData:[]
    };

    componentDidMount(){
        this.getProductsList();
    }

    getProductsList = () =>{
        let variables = {};
        this.setState({
            loading:true
        });

        fetchQuery(environment, getProductsList, variables)
            .then(data => {
                if(data.adminProductsList !== null && data.adminProductsList.length > 0){
                    this.formateTableData(data.adminProductsList);
                } else {
                    this.setState({
                        products_list:[],
                        filterData:[],
                        loading:false
                    })
                }

            });
    };
    formateTableData = (response) => {
        let table_data = [];
        response.map((item,index)=>{
            table_data[index] = {
                'id': item.id,
                'name': item.name,
                'type': item.productType.name ? item.productType.name : '--',
                'published': item.isPublished ? 'published' : 'not published',
                'category': item.category && item.category.name ? item.category.name : '--',
                'sku': item.masterSku ? item.masterSku : '--',
                'quantity': item.quantity,
                'weight': item.weight,
                'price': item.price,
            };
        });
        this.setState({
            products_list:table_data,
            filterData:table_data,
            loading:false
        })

    };

    deleteProducts = (selected_rows) => {
        this.setState({
           loading:true
        });
        let scope=this;
        DeleteProductMutation(selected_rows, (response) => {
            if(response.deleteProduct !== null && response.deleteProduct.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteProduct.message, { position: 'top-center'});
                scope.getProductsList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleProductSearch = (searchText) => {
        const {products_list} = this.state;
        let filteredData = products_list.filter(value => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.sku.toLowerCase().includes(searchText.toLowerCase()) ||
                value.type.toLowerCase().includes(searchText.toLowerCase()) ||
                value.category.toLowerCase().includes(searchText.toLowerCase())

            );
        });
        this.setState({
            filterData:filteredData
        })

    };

    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"products"}>
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="admin_product_list_component">
                        <Container maxWidth={"lg"} className={"admin_product_list_container"}>
                            <div className="admin_product_list_top_section">
                                <h5 className="component_title">Products</h5>
                                <Button variant="contained" className="admin_create_product_btn" onClick={()=>{
                                    this.props.history.push(productAddPath);
                                }}>Add Product</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.products_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={productPath}
                                deleteRows={this.deleteProducts}
                                handleSearch={this.handleProductSearch}
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
export default withRouter(AdminProductsList);
