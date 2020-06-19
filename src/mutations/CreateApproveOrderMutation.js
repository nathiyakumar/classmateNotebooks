import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateApproveOrderMutation(
    $orderId: ID
    $orderItemId: ID
    $status: ApprovalEnum
  ) {
     approveOrder(orderId:$orderId, orderItemId:$orderItemId, status:$status){
    
    order{
      id
      orderId
      payments{
        id
      }
    created
    escalateTime
    hasCustomizable
    status
    lines(first:10){
      edges{
        node{
          id
          productName
          productSku
          quantity
          unitPriceNet
          unitPriceGross
          unitPrice
          taxRate
          vendor{
            vendor{
              firstName
            }
          }
        }
      }
    }
    }
  }
  }
`

export default (order_data, callback,errCallback) => {
    const variables = {
        orderId:order_data.order_id,
        orderItemId:"",
        status:order_data.status

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.approveOrder !== null){
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
