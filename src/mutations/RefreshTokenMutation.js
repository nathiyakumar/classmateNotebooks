import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation RefreshTokenMutation($token:String!) {
       refreshToken(token:$token){
           token
           payload
       }
  }
`;

export default (token, callback,errCallback) => {
    const variables = {
        token:token
    };
    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response,err) => {

                if(response.refreshToken !== null && response.refreshToken.payload !== null){
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
