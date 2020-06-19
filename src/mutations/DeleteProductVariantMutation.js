import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation DeleteProductVariantMutation(
  $productVariantId:[ID]!
  ) {
     deleteProductVariant(productVariantId:$productVariantId){      
        message
     }
  }
`;

export default (product_variant_id, callback,errCallback) => {
    const variables = {
        productVariantId:product_variant_id,
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.deleteProductVariant !== null && response.deleteProductVariant.message !== null){
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
