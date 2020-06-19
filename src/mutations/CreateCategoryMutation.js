import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateCategoryMutation(
  $input: CategoryInput!
  ) {
     createCategory(input:$input){       
         category{
          id
          name
        }
     }
  }
`;

export default (input, callback,errCallback) => {
    const variables = {
        input:input,
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createCategory !== null && response.createCategory.category !== null){
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
