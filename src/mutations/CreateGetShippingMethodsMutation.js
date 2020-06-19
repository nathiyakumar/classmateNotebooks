import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateGetShippingMethodsMutation(
     $checkoutId:ID!    
  ) {
       availableShippingMethods(checkoutId:$checkoutId){
        message
        shippingMethods{
          id
          name
          shippingTotal      
        }
      }
  }
`

export default (checkout_id,callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.availableShippingMethods !== null){
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
