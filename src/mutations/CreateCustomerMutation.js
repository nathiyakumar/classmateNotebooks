import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCustomerMutation(
     $firstName:String!
     $lastName:String
     $mobileNumber:String!
     $email:String!
     $address:AddressInput
   ) {
       addCustomer(
       firstName: $firstName
       lastName: $lastName
       mobileNumber: $mobileNumber
       email: $email
       address: $address
      ) {
            user{
              id
              email
             }
      }
    }
`

export default (customerdetails, callback,errCallback) => {
    const variables = {
        firstName:customerdetails.firstName,
        lastName:customerdetails.lastName,
        mobileNumber:customerdetails.mobileNumber,
        email:customerdetails.email,
        address:customerdetails.address
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.addCustomer !== null){
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
