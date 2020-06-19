import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateStaffMemebersMutation(
  $userData: StaffInput
  $userId:ID! 
  ) {
     updateStaffMember(userData:$userData,userId :$userId){        
        message
     }
  }
`;

export default (id,input, callback,errCallback) => {
    const variables = {
        userId:id,
        userData:input

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.updateStaffMember !== null && response.updateStaffMember.message !== null){
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
