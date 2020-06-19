import React from "react";
import "./ProductTypesList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {productTypePath, productTypeAddPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import DeleteProductTypesMutation from "../../../../mutations/DeleteProductTypesMutation";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import { withRouter } from "react-router-dom";
import LoadingScreen from "react-loading-screen";


const getProductTypesList = graphql`
       query ProductTypesListQuery{
         listOfProductType{
          id
          name
          taxRate
          taxType
        }
    }
`;

const headCells = [
    { id: 'name',   label: 'Name' },
    { id: 'taxRate',   label: 'Tax Rate' },
    { id: 'taxType',   label: 'Tax Type' },
];

class ProductTypesList extends React.Component{
    state={
        product_types_list:[],
        loading:false,
        filterData:[]
    };
    componentDidMount(){
        this.getProductTypesList();
    }

    getProductTypesList = () =>{
        let variables = {};
        this.setState({
           loading:true
        });
        fetchQuery(environment, getProductTypesList, variables)
            .then(data => {
                if(data.listOfProductType !== null && data.listOfProductType.length > 0){

                    this.setState({
                        product_types_list:data.listOfProductType,
                        loading:false,
                        filterData:data.listOfProductType
                    })
                } else {
                    this.setState({
                        product_types_list:[],
                        loading:false,
                        filterData:[]
                    })
                }

            });
    };

    deleteAttributes = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
        DeleteProductTypesMutation(selected_rows, (response) => {
            if(response.deleteProductType !== null && response.deleteProductType.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteProductType.message, { position: 'top-center'});
                scope.getProductTypesList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleProductTypeSearch = (searchText) => {
        const {product_types_list} = this.state;
        let filteredData = product_types_list.filter(value => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        this.setState({
            filterData:filteredData
        })

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
                    <div className="producttype_list_component">
                        <Container maxWidth={"lg"} className={"producttype_list_container"}>
                            <div className="producttype_list_top_section">
                                <h5 className="component_title">Product types</h5>
                                <Button variant="contained" className="admin_create_producttype_btn" onClick={()=>{
                                    this.props.history.push(productTypeAddPath);
                                }}>Create Product Type</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.product_types_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={productTypePath}
                                deleteRows={this.deleteAttributes}
                                handleSearch={this.handleProductTypeSearch}
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
export default withRouter(ProductTypesList);
