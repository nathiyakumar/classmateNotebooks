import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation DeleteCategoryMutation(
  $categoryId:[ID]
  ) {
     deleteCategory(categoryId:$categoryId){
        message
     }
  }
`;

export default (category_id, callback,errCallback) => {
    const variables = {
        categoryId:category_id,
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.deleteCategory !== null && response.deleteCategory.message !== null){
                    // localStorage.setItem('checkout_id',response.checkoutCreate.checkout.id)
                    // localStorage.setItem('guest_user_token',response.checkoutCreate.checkout.token)
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
