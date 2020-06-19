import React from "react";
import "./ShippingZonesList.css";
import AdminDashboardIndex from "../../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {shippingAddPath, shippingZonePath} from "../../../../Core/util";
import SelectableTable from "../../SelectableTable";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../../Environment";
import DeleteAttributeMutation from "../../../../mutations/DeleteAttributeMutation";
import cogoToast from "cogo-toast";
import LoadingScreen from "react-loading-screen";

const getShippingZonesList = graphql`
    query ShippingZonesListQuery{
         shippingZones(first:100){
            edges{
                node{
                    id
                    name
                    countries{
                      code
                      country
                    }
                    shippingMethods{
                      id
                      name
                    }
                 }
            }
         }
    }
`;

const headCells = [
    { id: 'name',   label: 'Name' },
    { id: 'countries',   label: 'Countries' },
    { id: 'shippingMethods',   label: 'Shipping Methods Count' },
];

class ShippingZonesList extends React.Component{
    state={
        shipping_zones_list:[],
        filterData:[],
        loading:false,
    };

    componentDidMount(){
        this.getShippingZonesList();
    }

    getShippingZonesList = () =>{
        let variables = {};
        this.setState({
            loading:true
        });
        fetchQuery(environment, getShippingZonesList, variables)
            .then(data => {
                if(data.shippingZones !== null && data.shippingZones.edges.length > 0){

                    this.FormateTableData(data.shippingZones.edges);
                } else {
                    this.setState({
                        shipping_zones_list:[],
                        filterData:[],
                        loading:false
                    })
                }

            });
    };
    FormateTableData = (shippingZonesList) => {

        let datas = [];
        let dataFormate = {};
        for (let i = 0; i < shippingZonesList.length; i++) {

            dataFormate = {
                id: shippingZonesList[i].node.id,
                name: shippingZonesList[i].node.name,
                countries: shippingZonesList[i].node.countries.length,
                shippingMethods: shippingZonesList[i].node.shippingMethods.length

            };
            datas.push(dataFormate)

        }
        this.setState({
            shipping_zones_list: datas,
            filterData:datas,
            loading:false
        })

    };

    deleteShippingZones = (selected_rows) => {
        // DeleteAttributeMutation(selected_rows, (response) => {
        //     if(response.deleteAttribute !== null && response.deleteAttribute.message !== null){
        //         cogoToast.success(response.deleteAttribute.message, { position: 'top-center'});
        //         this.getShippingZonesList();
        //     }
        //
        // },function (err) {
        //     cogoToast.error(err, { position: 'top-center'});
        // })
    };
    handleVoucherSearch = (searchText) => {

        const {shipping_zones_list} = this.state;
        let filteredData = shipping_zones_list.filter(value => {
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
                    <div className="shipping_method_component">
                        <Container maxWidth={"lg"} className={"shipping_method_container"}>
                            <div className="shipping_method_top_section">
                                <h5 className="component_title">Shipping</h5>
                                <Button variant="contained" className="shipping_create_btn" onClick={()=>{
                                    this.props.history.push(shippingAddPath);
                                }}>Create Shipping Method</Button>
                            </div>
                            <p style={{fontSize:"20px"}}>Shipping By Zone</p>
                            <SelectableTable
                                table_row_data={this.state.shipping_zones_list}
                                table_head_data={headCells}
                                table_title={""}
                                edit_path={shippingZonePath}
                                deleteRows={this.deleteShippingZones}
                                handleSearch={this.handleVoucherSearch}
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
export default ShippingZonesList;
