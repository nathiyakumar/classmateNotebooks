import React from "react";
import CartContext from './cart-context.js'
import { connect } from 'react-redux'



class CartProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            addCartData:this.addCartData,
            cart_data:{}
        }
    }

    componentDidMount() {

        this.setState({
            cart_data:this.props.cart_data,
        })
    }


    addCartData = (cart_data) => {
        this.setState({
            cart_data:cart_data
        })
    }



    render() {
        const { children } = this.props;
        return (
            <CartContext.Provider value={this.state}>
                {children}
            </CartContext.Provider>
        );
    }
}


const mapStateToProps = state => ({
    cart_data:state.CartReducer.cart_data
})


export default connect(mapStateToProps)(CartProvider);

