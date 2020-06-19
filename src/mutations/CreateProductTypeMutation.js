import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateProductTypeMutation($input:ProducttypeInput) {
       createProductType(input: $input) {
          product{
              id
              name
              hasVariants
              isDigital
              isShippingRequired
          }
          message
      }
    }
`;

export default (input, callback,errCallback) => {

    const variables = {
        input : input

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response,err) => {
                if(response.createProductType !== null && response.createProductType.product !== null){
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
