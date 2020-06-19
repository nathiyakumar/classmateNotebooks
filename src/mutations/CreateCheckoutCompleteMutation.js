import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutCompleteMutation(
    $checkoutId:ID!     
    $gateway:String! 
  ) {
    checkoutComplete( checkoutId: $checkoutId,gateway: $gateway )
   {
          order{
          id
          created
          total
          userEmail
          orderId
          shippingPrice
          shippingAddress{
            firstName
            phone
          }
          lines(first:100){
            edges{
              node{
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
            }            
          } 
          user{
            email
            mobileNumber
            firstName      
          } 
        }
        payment{
          id
          total
          paymentOrderId
          total
        }
   }
  }
`

export default (selected_payment,checkout_id, callback,errCallback) => {

    const variables = {
        checkoutId:checkout_id,
        gateway:selected_payment
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutComplete !== null){
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
