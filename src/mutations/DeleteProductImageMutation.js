import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation DeleteProductImageMutation($imageId:[ID]!) {
     deleteProductImages(imageId:$imageId){
       message
     }
  }
`;

export default (image_ids, callback,errCallback) => {
    const variables = {
        imageId:image_ids,
    };
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.deleteProductImages !== null && response.deleteProductImages.message !== null){
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
