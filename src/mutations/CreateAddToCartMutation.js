import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateAddToCartMutation(
  $input: CheckoutCreateInput!  
  ) {
    checkoutCreate(input: $input) {                
        checkout{
            id   
            lines{
              id
              quantity      
              variant{
                id
                sku
                name        
                costPrice
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
        }          
    }
  }
`

export default (product, callback,errCallback) => {
    const variables = {
        input:{
            lines:product
        },

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutCreate !== null){
                    // localStorage.setItem('checkout_id',response.checkoutCreate.checkout.id)
                    // localStorage.setItem('guest_user_token',response.checkoutCreate.checkout.token)
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
