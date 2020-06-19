import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation DeleteCustomerMutation(
     $userId:[ID]
    ) {
       deleteUser(
       userId: $userId
      ) {
       
       message
        
      }
    }
`;

export default (userId, callback,errCallback) => {
    const variables = {
        userId:userId,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.deleteUser !== null){
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
