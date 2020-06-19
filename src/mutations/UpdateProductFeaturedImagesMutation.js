import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation UpdateProductFeaturedImagesMutation(
  $productId:ID! 
  $imageId: ID!   
  ) {
     setFeaturedImage(productId:$productId,imageId:$imageId){        
        message
     }
  }
`;

export default (product_id,ImageId, callback,errCallback) => {
    const variables = {
        productId:product_id,
        imageId: ImageId
    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.setFeaturedImage !== null && response.setFeaturedImage.message !== null){
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
