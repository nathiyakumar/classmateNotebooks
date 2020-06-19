import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateAttributeMutation(
  $id:ID!
  $input: AttributesInput  
  ) {
     updateAttribute(id:$id,input:$input){
        attributes{
          id
          slug
          name
        }
        message
     }
  }
`;

export default (attribute_id,input, callback,errCallback) => {
    const variables = {
        id:attribute_id,
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
                if(response.updateAttribute !== null && response.updateAttribute.attributes !== null){
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
