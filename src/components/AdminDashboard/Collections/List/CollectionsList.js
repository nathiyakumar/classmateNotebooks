import React from "react";
import "./CollectionsList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { collectionAddPath, collectionPath} from "../../../../Core/util";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import cogoToast from "cogo-toast";
import SelectableTable from "../../SelectableTable";
import DeleteCollectionMutation from "../../../../mutations/DeleteCollectionMutation";
import LoadingScreen from "react-loading-screen";

const getCollectionList = graphql`
  query  CollectionsListQuery{
     listOfCollections{
        id
        name   
        isPublished
        products(first:10){
          edges{
            node{
              name
            }
          }
        } 
     }
  }
`;



const headCells = [
    { id: 'collection_name',   label: 'Collection Name' },
    { id: 'products_count',   label: 'No. Products' },
    { id: 'availability',   label: 'Availability' },
];

class CollectionsList extends React.Component{
    state={
        collection_list:[],
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

        fetchQuery(environment, getCollectionList, variables)
            .then(data => {

                if(data.listOfCollections !== null && data.listOfCollections.length > 0){
                    this.FormateTableData(data.listOfCollections);
                } else {
                    this.setState({
                        collection_list:[],
                        loading:false,
                        filterData:[]
                    })
                }

            });
    };
    FormateTableData = (collectionList) => {

        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < collectionList.length; i++) {
            let availability
            if(collectionList[i].isPublished === true){
                availability = "isPublished"
            }
            else{
                availability=""
            }
            dataFormate = {
                id: collectionList[i].id,
                collection_name: collectionList[i].name,
                availability: availability,
                products_count: collectionList[i].products.edges.length,
            };
            datas.push(dataFormate)

        }
        this.setState({
            collection_list: datas,
            filterData:datas,
            loading:false
        })

    };


    deleteCollections = (selected_rows) => {
        this.setState({
            loading:true
        });
        let scope=this;
        DeleteCollectionMutation(selected_rows, (response) => {
            if(response.deleteCollection !== null && response.deleteCollection.message !== null){
                scope.setState({
                    loading:false
                });
                cogoToast.success(response.deleteCollection.message, { position: 'top-center'});
                scope.getCategoriesList();
            }

        },function (err) {
            scope.setState({
                loading:false
            });
            cogoToast.error(err, { position: 'top-center'});
        })
    };
    handleCollectionSearch = (searchText) => {
        const {collection_list} = this.state;
        let filteredData = collection_list.filter(value => {
            return (
                value.collection_name.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        this.setState({
            filterData:filteredData
        })

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
                    <div className="collections_list_component">
                        <Container maxWidth={"lg"} className={"collections_list_container"}>
                            <div className="collections_list_top_section">
                                <h5 className="component_title">Collections</h5>
                                <Button variant="contained" className="admin_create_collections_btn" onClick={()=>{
                                    this.props.history.push(collectionAddPath);
                                }}>Create Collection</Button>
                            </div>
                            <SelectableTable
                                table_row_data={this.state.collection_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={collectionPath}
                                deleteRows={this.deleteCollections}
                                handleSearch={this.handleCollectionSearch}
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
export default CollectionsList
