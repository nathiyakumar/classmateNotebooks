import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUserLoginWithMobilenoMutation(
  $mobileNumber:String!
  ) {
        userLoginWithMobile(mobileNumber:$mobileNumber){
            mobileNumber              
        }
  }
`

export default (mobileno, callback,errCallback) => {
    const variables = {
        mobileNumber:mobileno
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.userLoginWithMobile !== null){
                    localStorage.removeItem('guest_user_token');
                    localStorage.setItem('user_mobileno',response.userLoginWithMobile.mobileNumber);
                    callback(response)
                } else {
                    errCallback(err[0].message)
                }

            },
            onError: err => {
                errCallback(err)
            },
        },
    )
}
