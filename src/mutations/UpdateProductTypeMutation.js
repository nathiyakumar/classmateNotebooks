import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation UpdateProductTypeMutation(
     $id :ID
     $input:ProducttypeInput
  ) {
       updateProductType(
           id :$id
           input: $input
       ) {
             message
            product{
              isDigital
              name
            }
            productAttributes{
              slug
            }
            variantAttributes{
              slug
              name
            }
       }
    }
`;

export default (id, productTypesDetail, callback,errCallback) => {
    const variables = {
        id :id,
        input:productTypesDetail,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.updateProductType !== null && response.updateProductType.message !== null){
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
