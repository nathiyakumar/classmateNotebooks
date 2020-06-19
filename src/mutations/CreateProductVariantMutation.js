import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateProductVariantMutation(
  $input: ProductVariantInput 
  $product:ID! 
  ) {
     createProductVariant(input:$input,product:$product){
        singleProduct{
          id
          name
        }
        message
     }
  }
`;

export default (product_id,input, callback,errCallback) => {
    const variables = {
        input:input,
        product:product_id

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createProductVariant !== null && response.createProductVariant.singleProduct !== null){
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
