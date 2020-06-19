import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation DeleteProductTypesMutation($prdTypeIds:[ID]) {
       deleteProductType(prdTypeIds: $prdTypeIds) {
         message
      }
    }
`;

export default (product_type_id, callback,errCallback) => {
    const variables = {
        prdTypeIds:product_type_id,
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.deleteProductType !== null && response.deleteProductType.message !== null){
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
