import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutEmailUpdateMutation(
     $checkoutId:ID!
     $emailId:String!
  ) {
      checkoutEmailUpdate(
        checkoutId:$checkoutId
        emailId:$emailId){
          message
          checkout{   
            email
            token           
          }
      }
  }
`

export default (email_id,checkout_id, callback) => {
    const variables = {
        checkoutId:checkout_id,
        emailId:email_id
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response) => {
                localStorage.setItem('guest_user_token',response.checkoutEmailUpdate.checkout.token);
                callback(response)
            },
            onError: err => {
                console.error(err)
            },
        },
    )
}
