import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateProductVariantMutation(
  $input: ProductVariantInput 
  $productVariantId:ID! 
  ) {
     updateProductVariant(input:$input,productVariantId:$productVariantId){        
        message
     }
  }
`;

export default (product_variant_id,input, callback,errCallback) => {
    const variables = {
        input:input,
        productVariantId:product_variant_id

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.updateProductVariant !== null && response.updateProductVariant.message !== null){
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
