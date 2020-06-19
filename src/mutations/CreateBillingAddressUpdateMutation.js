import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateBillingAddressUpdateMutation(
     $checkoutId:ID!
     $billingAddress:AddressInput
  ) {
       checkoutBillingAddressUpdate(
       checkoutId: $checkoutId
       billingAddress:$billingAddress) {
            message
            checkout {
              billingAddress {
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

export default (billing_address,checkout_id, callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        billingAddress:billing_address
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.checkoutBillingAddressUpdate !== null){
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
