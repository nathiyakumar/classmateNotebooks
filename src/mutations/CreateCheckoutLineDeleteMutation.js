import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutLineDeleteMutation(
    $checkoutId:ID!
    $lines:[ID]
  ) {
          checkoutLineDelete(
            checkoutId:$checkoutId
            lines: $lines
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

export default (line_id,checkout_id, callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        lines:[line_id]
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutLineDelete !== null){
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
