import React from "react";
import './AttributesList.css';
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SelectableTable from "../../SelectableTable";
import {attributeAddPath,attributePath} from "../../../../Core/util";
import environment from "../../../../Environment";
import graphql from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import { withRouter } from "react-router-dom";
import DeleteAttributeMutation from "../../../../mutations/DeleteAttributeMutation";
import cogoToast from "cogo-toast";
import LoadingScreen from "react-loading-screen";


const getAttributesList = graphql`
    query AttributesListQuery{
         listAttribute{
            id
            slug
            name            
         }
    }
`;

const headCells = [
    { id: 'name',   label: 'Name' },
    { id: 'slug',   label: 'Slug' },
];

class AttributesList extends React.Component{

    state={
      attributes_list:[],
      loading:false,
      filterData:[]
    };

    componentDidMount(){
        this.getAttributesList();
    }

    getAttributesList = () =>{
        let variables = {};
        this.setState({
            loading:true
        });
        fetchQuery(environment, getAttributesList, variables)
            .then(data => {
                if(data.listAttribute !== null && data.listAttribute.length > 0){
                    this.setState({
                        attributes_list:data.listAttribute,
                        loading:false,
                        filterData:data.listAttribute
                    })
                } else {
                    this.setState({
                        attributes_list:[],
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
        let scope = this;
        DeleteAttributeMutation(selected_rows, (response) => {
            if(response.deleteAttribute !== null && response.deleteAttribute.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteAttribute.message, { position: 'top-center'});
                scope.getAttributesList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleAttributeSearch = (searchText) => {
        const {attributes_list} = this.state;
        let filteredData = attributes_list.filter(value => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.slug.toLowerCase().includes(searchText.toLowerCase())
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
                    <div className="attributeindex_component">
                        <Container maxWidth={"lg"} className={"attributeindex_container"}>
                            <div className="attributeindex_top_section">
                                <h5 className="component_title">Attributes</h5>
                                <Button variant="contained" className="admin_create_attribute_btn" onClick={()=>{
                                    this.props.history.push(attributeAddPath);
                                }}>Create Attribute</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.attributes_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={attributePath}
                                deleteRows={this.deleteAttributes}
                                handleSearch={this.handleAttributeSearch}
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
export default withRouter(AttributesList);
