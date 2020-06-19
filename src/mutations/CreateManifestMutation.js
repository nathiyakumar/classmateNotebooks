import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateManifestMutation(
  $orderId: ID!  
  ) {
     createManifest(orderId:$orderId){
        message
        invoices{
          invoiceUrl
          manifestUrl
          labelUrl
        }
      }
  }
`

export default (order_id, callback,errCallback) => {
    const variables = {
        orderId:order_id
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createManifest !== null){
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
