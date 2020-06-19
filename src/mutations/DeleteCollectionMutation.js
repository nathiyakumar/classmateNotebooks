import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation DeleteCollectionMutation(
  $collectionId: [ID]
  ) {
    deleteCollection(collectionId: $collectionId) {
        message
    }
  }
`

export default (collections, callback, errCallback) => {
    const variables = {
        collectionId: collections

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response, err) => {
                if (response.checkoutCreate !== null) {
                    // localStorage.setItem('checkout_id',response.checkoutCreate.checkout.id)
                    // localStorage.setItem('guest_user_token',response.checkoutCreate.checkout.token)
                    callback(response)
                } else {
                    errCallback(err[0].message)
                }
            },
            onError: err => {
                errCallback(err)
            },
        },
    )
}
