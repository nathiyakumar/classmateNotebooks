import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation DeleteShippingMethodMutation(
     $shippingMethodIds:[ID]
    ) {
       deleteShippingMethod(
     shippingMethodIds: $shippingMethodIds
      ) {
         message
      }
    }
`;

export default (shippingMethodId, callback,errCallback) => {

    const variables = {
        shippingMethodIds:shippingMethodId,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.deleteShippingMethod !== null){
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
