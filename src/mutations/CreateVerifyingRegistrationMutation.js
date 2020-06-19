import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateVerifyingRegistrationMutation(
  $mobileNumber:String!
  $otp: String!
  ) {
         verifyingRegistration(
          mobileNumber:$mobileNumber
          otp: $otp){
               user{
                  id
                  email
                  mobileNumber  
                  dateOfBirth
                  isVendor
                  isAdmin
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
                message
         }
  }
`

export default (userData, callback,errCallback) => {
    const variables = {
        mobileNumber:userData.mobileno,
        otp: JSON.stringify(userData.otp)
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.verifyingRegistration !== null){
                    // localStorage.removeItem('guest_user_token');
                    // localStorage.setItem('loggedin_user_token',response.verifyingRegistration.token);
                    callback(response)
                } else {
                    errCallback(err[0].message);
                }

            },
            onError: err => {
                console.error(err)
            },
        },
    )
}
