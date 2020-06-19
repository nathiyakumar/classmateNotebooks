import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateStaffMembersMutation(
  $firstName:String!
  $lastName:String
  $mobileNumber:String!
  $email: String! 
  ) {
          addStaffMember(
          firstName:$firstName
          lastName: $lastName
          email:$email
          mobileNumber:$mobileNumber
       ){
            user{
              id
             }
            message
          }
  }
`

export default (userData, callback,errCallback) => {

    const variables = {
        lastName:userData.lastName,
        firstName:userData.firstName,
        mobileNumber:userData.mobileNumber,
        email:userData.email,
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.addStaffMember !== null){
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
