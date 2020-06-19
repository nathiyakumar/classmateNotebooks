import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation DeleteProductVariantImagesMutation(
  $imageId: [ID]!   
  ) {
     deleteVariantImage(imageId:$imageId){        
        message
     }
  }
`;

export default (ImageId, callback,errCallback) => {
    const variables = {
        imageId:ImageId


    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.deleteVariantImage !== null && response.deleteVariantImage.message !== null){
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
