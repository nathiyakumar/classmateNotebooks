import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateShippingMethodMutation(
  $input: ShippingPriceUpdateInput!
  ) {
     updateShippingMethod(input:$input){       
         shippingMethod{
          id
          name
        }
     }
  }
`;

export default (input, callback,errCallback) => {
    const variables = {
        input:input,
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.updateShippingMethod !== null && response.updateShippingMethod.shippingMethod !== null){
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
