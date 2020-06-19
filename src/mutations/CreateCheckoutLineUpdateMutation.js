import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutLineUpdateMutation(
    $checkoutId:ID!
    $lines:[CheckoutLineInput]
  ) {
          checkoutLineUpdate(
            checkoutId:$checkoutId
            lines:$lines
          ){
            checkout{
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
`

export default (product,checkout_id, callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        lines:[product]
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutLineUpdate !== null){
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
