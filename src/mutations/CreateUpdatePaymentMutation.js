import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUpdatePaymentMutation(
  $orderId: ID! 
  $paymentId: ID!
  $response:JSONString!
  ) {
     createPayment(
    orderId: $orderId
    paymentId:$paymentId
    response: $response
  ){
    order{
      id
      status
      isPaid
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
        paymentToken
      }
    }
  }
  }
`

export default (order_id,payment_id,data, callback,errCallback) => {

    const variables = {
        orderId: order_id,
        paymentId:payment_id,
        response: JSON.stringify(data)

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.createPayment !== null){
                    callback(response)
                } else{
                    errCallback(err[0].message);
                }

            },
            onError: err => {
                errCallback(err);
            },
        },
    )
}
