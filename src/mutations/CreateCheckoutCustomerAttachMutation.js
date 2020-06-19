import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCheckoutCustomerAttachMutation(
      $checkoutId:ID!
      $customerId:ID! 
  ) {
         checkoutCustomerAttach(
              checkoutId:$checkoutId
              customerId:$customerId
         ){
            message
            checkout{     
                user{
                    id
                }   
                token  
                email
                id
            }
         }
  }
`

export default (data, callback,errCallback) => {
    const variables = {
        checkoutId:data.checkoutId,
        customerId:data.customerId
}

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.checkoutCustomerAttach !== null){
                    // localStorage.setItem('user_mobileno',response.createUser.user.mobileNumber);
                    // localStorage.setItem('user_name',response.createUser.user.firstName);
                    callback(response)
                } else {
                    errCallback(err[0].message);
                }

            },
            onError: err => {
                errCallback(err);
            },
        },
    )
}
