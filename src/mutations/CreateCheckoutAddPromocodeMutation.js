import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutAddPromocodeMutation(
    $checkoutId:ID!     
    $promocode:String! 
  ) {
   checkoutAddPromocode(
    checkoutId: $checkoutId,
    promocode: $promocode
  ){
    message
    checkout{
      voucherCode
      discountAmount
      subtotalPrice
      totalPrice
      isShippingRequired
      id   
      lines{
        id
        quantity      
        variant{
          id
          sku
          name 
          price
          costPrice       
          priceOverride
          images{
            url
          }          
          stockQuantity
          product{
            productType{
              name
            }
            category{
              id
              name
            }
          }
        }
      }    
      subtotalPrice
      totalPrice    
      checkoutQuantity 
      voucherCode
      shippingPrice
      discountName
      discountAmount
    }
  }
  }
`;

export default (coupon_data, callback,errCallback) => {

    const variables = {
        checkoutId: coupon_data.checkoutId,
        promocode: coupon_data.promocode
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutAddPromocode !== null){
                    callback(response)
                } else{
                    errCallback(err[0].message)
                }
            },
            onError: err => {
                errCallback(err)
            },
        },
    )
}
