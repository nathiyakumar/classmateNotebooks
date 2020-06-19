import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateProductVariantImagesMutation(
  $productVariantId:ID! 
  $variantImageId: [ID]!   
  ) {
     uploadVariantImage(productVariantId:$productVariantId,variantImageId:$variantImageId){        
        message
     }
  }
`;

export default (product_variant_id,variantImageId, callback,errCallback) => {
    const variables = {
        productVariantId:product_variant_id,
        variantImageId:variantImageId


    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.uploadVariantImage !== null && response.uploadVariantImage.message !== null){
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
