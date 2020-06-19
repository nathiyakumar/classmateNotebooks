import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUserMutation(
  $email:String!
  $firstName:String!
  $mobileNumber:String!
  $password: String! 
  ) {
          createUser(
          email:$email
          firstName:$firstName
          mobileNumber:$mobileNumber
          password: $password){
            user{
              id
              dateOfBirth
              mobileNumber
              firstName
            }
            otp
          }
  }
`

export default (userData, callback,errCallback) => {
    const variables = {
        email:userData.email,
        firstName:userData.firstname,
        mobileNumber:userData.mobileno,
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

                if(response.createUser !== null){
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
