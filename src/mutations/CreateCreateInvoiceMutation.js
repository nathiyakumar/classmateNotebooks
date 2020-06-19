import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateCreateInvoiceMutation(
  $orderIds: [ID]
  ) {
     createInvoice(orderIds:$orderIds){
        message
        invoice{
          invoiceUrl         
        }
      }
  }
`

export default (order_id, callback,errCallback) => {
    const variables = {
        orderIds:order_id
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createInvoice !== null){
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
