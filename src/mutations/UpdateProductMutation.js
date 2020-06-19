import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'
import DesignContestUploadImagePage
    from "../components/DesignContest/DesignContestUploadImagePage/DesignContestUploadImagePage";


const mutation = graphql`
  mutation UpdateProductMutation(
  $productId:ID!
  $input: ProductUpdateInput  
  ) {
     updateProduct(productId:$productId,input:$input){
        message
        singleProduct{
          id
          name          
        }
     }
  }
`;

export default (productId,input, callback,errCallback) => {
    const variables = {
        productId:productId,
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
                if(response.updateProduct !== null && response.updateProduct.singleProduct !== null){
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
