import React from "react";
import './test.css'
// import ReactGA from 'react-ga';


class TestComponent extends React.Component{


    // componentDidMount(){
    //
    //     ReactGA.set({
    //         location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
    //         title: "Test"
    //     });
    //
    //     ReactGA.pageview(window.location.pathname);
    // }
    //
    // checkoutProcess=(step)=>{
    //     let label;
    //     if(step === 1){
    //         label = "LoginInfo";
    //     } else if(step === 2) {
    //         label = "ShippingAddressInfo";
    //     }else if(step === 3) {
    //         label = "BillingAddressInfo";
    //     }else if(step === 4) {
    //         label = "ShippingMethodInfo";
    //     }
    //
    //     //
    //     // ReactGA.plugin.execute(
    //     //     'ec',
    //     //     'addProduct',
    //     //     {
    //     //         'id': 'P12345',
    //     //         'name': 'Android Warhol T-Shirt',
    //     //         'category': 'Apparel',
    //     //         'brand': 'Google',
    //     //         'variant': 'black',
    //     //         'price': '29.20',
    //     //         'quantity': 1
    //     //     }
    //     // );
    //     ReactGA.plugin.execute('ec', 'setAction', 'checkout', { step: step })
    //
    //
    //
    //
    //     // ReactGA.plugin.execute(
    //     //     'ec',
    //     //     'setAction',
    //     //     'checkout',{
    //     //         'step': step,
    //     //         'option': label
    //     //     }
    //     // );
    //
    //     // ga('ec:addProduct', {
    //     //     'id': 'P12345',
    //     //     'name': 'Android Warhol T-Shirt',
    //     //     'category': 'Apparel',
    //     //     'brand': 'Google',
    //     //     'variant': 'black',
    //     //     'price': '29.20',
    //     //     'quantity': 1
    //     // });
    //     //
    //     // ga('ec:setAction','checkout', {
    //     //     'step': 1,
    //     //     'option': 'Visa'
    //     // });
    //
    // }


    render() {
        return (
            <div>
                test
                {/*<button onClick={()=>this.checkoutProcess(1)}>checkout step 1</button>*/}
                {/*<button onClick={()=>this.checkoutProcess(2)}>checkout step 2</button>*/}
                {/*<button onClick={()=>this.checkoutProcess(3)}>checkout step 3</button>*/}
                {/*<button onClick={()=>this.checkoutProcess(4)}>checkout step 4</button>*/}
            </div>

        );
    }
}
export default TestComponent;




