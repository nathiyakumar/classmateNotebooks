import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation DeleteStaffMembersMutation(
     $userIds:[ID]
    ) {
       deleteStaffMember(
       userIds: $userIds
      ) {
         message
      }
    }
`;

export default (userId, callback,errCallback) => {

    const variables = {
        userIds:userId,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.deleteStaffMember !== null){
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
