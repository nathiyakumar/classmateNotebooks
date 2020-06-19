import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateProductMutation(
  $input: ProductInput  
  ) {
     createProducts(input:$input){
        message
        singleProduct{
          id
          name
          descriptionJson
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
                if(response.createProducts !== null && response.createProducts.singleProduct !== null){
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
