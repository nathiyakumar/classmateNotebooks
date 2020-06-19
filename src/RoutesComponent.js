import React from "react";
import { connect } from "react-redux";
import {Route, Redirect,Switch} from 'react-router-dom';
import AuthProvider from "./components/AuthProvider/AuthProvider";
import CartProvider from "./components/CartProvider/CartProvider";
import App from "./App";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import SingleProductPageIndex from "./components/SingleProductPage/SingleProductPageIndex";
import CustomDesignProductListIndex from "./components/CustomDesignProducts/CustomDesignProductListIndex";
import PaymentPage from "./components/CheckoutPage/PaymentPage";
import PaperkraftBrandPageIndex from "./components/PaperkraftBrandPage/PaperkraftBrandPageIndex";
import ClassmateBrandPageIndex from "./components/ClassmateBrandPage/ClassmateBrandPageIndex";
import ContactForm from "./components/ContactForm/ContactForm";
import CommonTermsAndCondition from "./components/TermsAndCondition/CommonTermsAndCondition";
import PressAndMedia from "./components/PressAndMedia/PressAndMedia";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";
import MyAccountPageIndex from "./components/MyAccount/MyAccountPageIndex";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import CustomiseForm from "./components/CustomizeForm/CustomiseForm";
// import TrackSigleOrder from "./components/TrackSigleOrder/TrackSigleOrder";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import NotFound from "./NotFound";
import LandingPages from "./components/LandingPages/LandingPages";
import MainPaperkraftLandingPage from "./components/LandingPages/MainPaperkraftLandingPage";

import AdminDashboardOrders from "./components/AdminDashboard/Orders/AdminDashboardOrders";
import Configuration from "./components/AdminDashboard/Configuration/Configuration";
import AttributesList from "./components/AdminDashboard/Attributes/List/AttributesList";
import AttributeCreate from "./components/AdminDashboard/Attributes/Create/AttributeCreate";
import AttributeEdit from "./components/AdminDashboard/Attributes/Edit/AttributeEdit";
import ProductTypesList from "./components/AdminDashboard/ProductTypes/List/ProductTypesList";
import ProductTypeCreate from "./components/AdminDashboard/ProductTypes/Create/ProductTypeCreate";
import ProductTypeEdit from "./components/AdminDashboard/ProductTypes/Edit/ProductTypeEdit";
import AdminProductList from "./components/AdminDashboard/Products/List/AdminProductsList";
import ProductsCreate from "./components/AdminDashboard/Products/Create/ProductsCreate";
import ProductsEdit from "./components/AdminDashboard/Products/Edit/ProductsEdit";
import CategoriesList from "./components/AdminDashboard/Categories/List/CategoriesList";
import CategoriesCreate from "./components/AdminDashboard/Categories/Create/CategoriesCreate";
import CategoriesEdit from "./components/AdminDashboard/Categories/Edit/CategoriesEdit";
import ProductVariantCreate from "./components/AdminDashboard/Products/ProductVariant/ProductVariantCreate";
import ProductVariantEdit from "./components/AdminDashboard/Products/ProductVariant/ProductVariantEdit";
import CollectionsList from "./components/AdminDashboard/Collections/List/CollectionsList"



import CollectionsCreate from "./components/AdminDashboard/Collections/Create/CollectionsCreate";
import CollectionsEdit from "./components/AdminDashboard/Collections/Edit/CollectionEdit";
import CustomerList from "./components/AdminDashboard/Customers/List/CustomerList";
import CustomerCreate from "./components/AdminDashboard/Customers/Create/CustomerCreate";
import VoucherList from "./components/AdminDashboard/Vouchers/List/VoucherList";
import VoucherCreate from "./components/AdminDashboard/Vouchers/Create/VoucherCreate";
import VoucherEdit from "./components/AdminDashboard/Vouchers/Edit/VoucherEdit";
import StaffMembersList from "./components/AdminDashboard/StaffMembers/List/StaffMembersList";
import StaffMembersCreate from "./components/AdminDashboard/StaffMembers/Create/StaffMembersCreate";
import StaffsMembersEdit from "./components/AdminDashboard/StaffMembers/Edit/StaffsMembersEdit";
import HomeAdminDashboard from "./components/AdminDashboard/Home/Home";
import MainPaperkraftPenLandingPage from "./components/LandingPages/MainPaperkraftPenLandingPage";
import ShippingZonesList from "./components/AdminDashboard/ShippingMethod/List/ShippingZonesList";
import ShippingMethodCreate from "./components/AdminDashboard/ShippingMethod/Create/ShippingMethodCreate";
import ShippingZonePage from "./components/AdminDashboard/ShippingMethod/ShippingZonePage";
import ShippingMethodEdit from "./components/AdminDashboard/ShippingMethod/Edit/ShippingMethodEdit";
import DesignContestHome from "./components/DesignContest/DesignContestHome/DesignContestHome";
import DesignContestAllEntries from "./components/DesignContest/DesignContestAllEntries/DesignContestAllEntries";
import DesignContestUploadImagePage
    from "./components/DesignContest/DesignContestUploadImagePage/DesignContestUploadImagePage";
import DesignContestSuccessScreen
    from "./components/DesignContest/DesignContestSuccessScreen/DesignContestSuccessScreen";
import DesignContestUserDesignList
    from "./components/DesignContest/DesignContestUserDesignsLit/DesignContestUserDesignList";
import MusicSeriesPenMainPage from './components/LandingPages/MusicSeriesPenLandingPage/MusicSeriesPenMainPage'
// import ClassmateBrandListIndex from "./components/BrandPage/Classmate/ClassmateBrandListIndex/ClassmateBrandListIndex";
// import ClassmateBrandSingleProductIndex from "./components/BrandPage/Classmate/ClassmateBrandSingleProductIndex";
// import ClassmateBrandPageHome from "./components/BrandPage/Classmate/ClassmateBrandPageHome/ClassmateBrandPageHome";

class RoutesComponent extends React.Component{

    render() {
        return (
                <AuthProvider>
                    <CartProvider>
                        <Switch>
                            <Route exact path="/d2c" component={App} />
                            <Route  path="/d2c/customize"  render={()=>(<Redirect to="/classmate-customised-notebooks/select-pages"/>)}/>
                            <Route exact path="/" component={App} />
                            <Route path="/classmate-customised-notebooks/:page" component={CustomiseForm}/>
                            <Route path="/classmate-customised-notebooks/" component={CustomiseForm} />
                            <Route exact path="/classmate-school-and-office-stationery-products"
                                   component={ProductsPage}/>
                            <Route
                                   path="/classmate-school-and-office-stationery-products/:product_name/:product_id"
                                   component={SingleProductPageIndex}/>
                            <Route exact path="/classmate-designer-notebooks" component={CustomDesignProductListIndex}/>
                            <Route  path="/classmate-designer-notebooks/:category/"
                                   component={CustomDesignProductListIndex}/>
                            <Route  path="/payment" component={PaymentPage}/>
                            <Route  path="/paperkraft-notebook-series" component={PaperkraftBrandPageIndex}/>
                            <Route  path="/classmate-office-and-school-stationeries"
                                   component={ClassmateBrandPageIndex}/>
                            <Route  path="/business-inquiry" component={ContactForm}/>
                            <Route  path="/terms-conditions" component={CommonTermsAndCondition}/>
                            <Route  path="/press_media" component={PressAndMedia}/>
                            {/*<Route exact path="/tracking-orders" component={TrackSigleOrder} />*/}
                            {/*<Route  path="/tracking-orders/:order_id" component={TrackSigleOrder} />*/}
                            <Route  path="/christmas-test" component={LandingPages} />
                            <Route  path="/paperkraft-giftbox" component={MainPaperkraftLandingPage} />
                            <Route path="/callista-scepter" component={MainPaperkraftPenLandingPage} />
                            <Route path="/music-series-pen" component={MusicSeriesPenMainPage} />
                            {/*<Route exact path="/classmate-office-and-school-stationeries/:id" component={ClassmateBrandListIndex} />*/}
                            {/*<Route path="/classmate-office-and-school-stationeries/:product_name/:product_id" component={ClassmateBrandSingleProductIndex} />*/}
                            {/*<Route exact path="/classmate-office-and-school-stationeries" component={ClassmateBrandPageHome} />*/}
                            <Route  path="/design-contest-home" component={DesignContestHome} />
                            <Route  path="/design-contest-all-entries" component={DesignContestAllEntries} />
                            <Route  path="/design-contest-user-design-list" component={DesignContestUserDesignList} />
                            <Route  path="/design-contest-upload" component={DesignContestUploadImagePage} />
                            <Route  path="/design-contest-success" component={DesignContestSuccessScreen} />


                            <Route
                                path="/admin-dashboard"
                                render={({ match: { url } }) => (
                                    <>
                                        <Route path={`${url}/orders`} component={AdminDashboardOrders} />
                                        <Route exact path={`${url}/products`} component={AdminProductList} />
                                        <Route path={`${url}/products/add`} component={ProductsCreate} />
                                        <Route exact path={`${url}/products/edit/:id`} component={ProductsEdit} />
                                        <Route exact path={`${url}/products/edit/:id/variant/add`} component={ProductVariantCreate} />
                                        <Route exact path={`${url}/products/edit/:id/variant/edit/:variant_id`} component={ProductVariantEdit} />
                                        <Route path={`${url}/configuration`} component={Configuration} />
                                        <Route exact  path={`${url}/attributes`} component={AttributesList} />
                                        <Route exact  path={`${url}/attributes/add`} component={AttributeCreate} />
                                        <Route exact path={`${url}/attributes/edit/:id`} component={AttributeEdit} />
                                        <Route exact  path={`${url}/product-types`} component={ProductTypesList} />
                                        <Route exact  path={`${url}/product-types/add`} component={ProductTypeCreate} />
                                        <Route exact path={`${url}/product-types/edit/:id`} component={ProductTypeEdit} />
                                        <Route exact  path={`${url}/categories`} component={CategoriesList} />
                                        <Route exact  path={`${url}/categories/add`} component={CategoriesCreate} />
                                        <Route exact  path={`${url}/categories/edit/:id`} component={CategoriesEdit} />
                                        <Route exact  path={`${url}/collections`} component={CollectionsList} />
                                        <Route exact  path={`${url}/collections/add`} component={CollectionsCreate} />
                                        <Route exact  path={`${url}/collections/edit/:id`} component={CollectionsEdit} />
                                        <Route exact  path={`${url}/customers`} component={CustomerList} />
                                        <Route exact  path={`${url}/customers/add`} component={CustomerCreate} />
                                        <Route exact  path={`${url}/vouchers`} component={VoucherList} />
                                        <Route exact  path={`${url}/vouchers/add`} component={VoucherCreate} />
                                        <Route exact  path={`${url}/vouchers/edit/:id`} component={VoucherEdit} />
                                        <Route exact  path={`${url}/staffMembers`} component={StaffMembersList} />
                                        <Route exact  path={`${url}/staffMembers/add`} component={StaffMembersCreate} />
                                        <Route exact  path={`${url}/staffMembers/edit/:id`} component={StaffsMembersEdit} />
                                        <Route exact  path={`${url}/home`} component={HomeAdminDashboard} />
                                        <Route exact  path={`${url}/shipping`} component={ShippingZonesList} />
                                        <Route exact  path={`${url}/shipping/add`} component={ShippingMethodCreate} />
                                        <Route exact  path={`${url}/shipping/zone/:id`} component={ShippingZonePage} />
                                        <Route exact  path={`${url}/shipping/edit/:id`} component={ShippingMethodEdit} />
                                        </>
                                )}
                            />

                            {
                                this.props.location.pathname  === '/checkout' && (
                                    <>
                                        {this.props.cart_data.lines && this.props.cart_data.lines.length > 0 ? (
                                            <Route  path="/checkout" component={CheckoutPage} />
                                        ) : (
                                            <Redirect to="/" />
                                        )}
                                    </>
                                )
                            }

                            {
                                this.props.location.pathname  === '/dashboard' && (
                                    <>
                                        {this.props.user_details.token && this.props.user_details.user.isVendor === true ? (
                                            <Route  path="/dashboard" component={VendorDashboard} />
                                        ) : (
                                            <Redirect to="/" />
                                        )}
                                    </>
                                )
                            }

                            {
                                this.props.location.pathname  === '/MyAccount' && (
                                    <>
                                        {this.props.user_details.token && this.props.user_details.user.isVendor !== true ? (
                                            <Route  path="/MyAccount" component={MyAccountPageIndex} />
                                        ) : (
                                            <Redirect to="/" />
                                        )}
                                    </>
                                )
                            }

                            {
                                this.props.location.pathname  === '/order-confirmation' && (
                                    <>
                                        {this.props.order_data.order && this.props.order_data.order.orderId ? (
                                            <Route  path="/order-confirmation" component={OrderConfirmation} />
                                        ) : (
                                            <Redirect to="/" />
                                        )}
                                    </>
                                )
                            }

                            <Route component={NotFound} />
                        </Switch>
                    </CartProvider>
                </AuthProvider>
        );
    }
}

const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details,
    order_data: state.OrderReducer.order_data,
    cart_data:state.CartReducer.cart_data
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(RoutesComponent);
