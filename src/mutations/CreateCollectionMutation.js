import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateCollectionMutation(
  $input: CollectionInput!
  ) {
     createCollection(input:$input){       
         collection{
          id
          name
        }
     }
  }
`;

export default (file,input, callback,errCallback) => {
    const variables = {
        input:input,

    };
    let file_object = {
        file:file,
        key_name:'background_image'
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            file_object,
            // 6
            onCompleted: (response,err) => {
                if(response.createCollection !== null && response.createCollection.collection !== null){
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
