import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateRefundOrderMutation(
    $orderId: ID!
    $paymentId: ID!
    $refundAmount: Float!
  ) {
        createRefund(
            orderId: $orderId
            paymentId: $paymentId
            refundAmount: $refundAmount
          ){
                order{
                  id
                  status
                  isPaid
                  orderId
                }
                payment{
                  id
                  gateway
                  isActive
                  created
                  modified
                  token
                  chargeStatus
                  transactions{
                    id
                    created
                    token
                    kind
                    isSuccess
                    error
                    gatewayResponse
                    amount
                  }
                }
          }
  }
`

export default (order_data, callback,errCallback) => {
    const variables = {
        orderId: order_data.order_id,
        paymentId: order_data.payment_id,
        refundAmount: order_data.refund_amount

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createRefund !== null){
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
