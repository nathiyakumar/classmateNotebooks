import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUpdateShippingMethodsMutation(
     $checkoutId:ID! 
     $shippingMethodId:ID! 
  ) {
       checkoutShippingMethodUpdate(
           checkoutId:$checkoutId
           shippingMethodId: $shippingMethodId){
        message
        checkout{
        totalPrice
          shippingMethod{
            id
            name
            price   
            minimumOrderPrice
            maximumOrderPrice
            minimumOrderWeight
            maximumOrderWeight
          }
        }
        }
  }
`

export default (shipping_method_id,checkout_id,callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        shippingMethodId:shipping_method_id
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutShippingMethodUpdate !== null){
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
