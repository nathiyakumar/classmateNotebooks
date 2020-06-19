import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateShippingMethodMutation(
  $input: ShippingPriceInput!
  ) {
     createShippingMethod(input:$input){       
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
                if(response.createShippingMethod !== null && response.createShippingMethod.shippingMethod !== null){
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
