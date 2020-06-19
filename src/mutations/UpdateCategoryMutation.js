import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateCategoryMutation(
  $categoryId:ID!
  $input: CategoryInput!
  ) {
     updateCategory(categoryId:$categoryId,input:$input){       
         category{
          id
          name
        }
     }
  }
`;

export default (category_id,file,input, callback,errCallback) => {
    const variables = {
        categoryId:category_id,
        input:input,

    };
    let file_object = {
        file:file,
        key_name:'background_image'
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            file_object,
            // 6
            onCompleted: (response,err) => {
                if(response.updateCategory !== null && response.updateCategory.category !== null){
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
