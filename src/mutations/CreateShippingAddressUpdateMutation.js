import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateShippingAddressUpdateMutation(
     $checkoutId:ID!
     $shippingAddress:AddressInput
  ) {
       checkoutShippingAddressUpdate(
       checkoutId: $checkoutId
       shippingAddress:$shippingAddress) {
            message
            checkout {
              shippingAddress {
                firstName        
                lastName
                companyName
                phone        
                city
                postalCode  
              }
            }
       }
  }
`

export default (shipping_address,checkout_id, callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        shippingAddress:shipping_address
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutShippingAddressUpdate !== null){
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
