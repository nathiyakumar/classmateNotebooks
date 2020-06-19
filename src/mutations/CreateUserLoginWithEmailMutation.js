import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateUserLoginWithEmailMutation(
  $email:String!
  $password:String! 
  ) {
        userLoginWithEmail(
            email:$email 
            password: $password){
             user{
              id
              email
              mobileNumber  
              dateOfBirth
              isVendor
              isAdmin
              customizable
              defaultBillingAddress{
                id
                firstName
                lastName
                companyName
                city
                country{
                  code
                  country
                }
                postalCode
                phone        
                isDefaultShippingAddress
                isDefaultBillingAddress
              }
              defaultShippingAddress{
                id
                firstName
                lastName
                companyName
                city
                country{
                  code
                  country
                }
                postalCode
                phone        
                isDefaultShippingAddress
                isDefaultBillingAddress
                
              }
              avatar
              firstName
              lastName      
            }
            token
        }
  }
`

export default (userData, callback,errCallback) => {
    const variables = {
        email:userData.email,
        password:userData.password
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.userLoginWithEmail !== null){
                    // localStorage.removeItem('guest_user_token');
                    // localStorage.setItem('user_mobileno',response.userLoginWithEmail.user.mobileNumber);
                    // localStorage.setItem('user_name',response.userLoginWithEmail.user.firstName);
                    // localStorage.setItem('loggedin_user_token',response.userLoginWithEmail.token);

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
