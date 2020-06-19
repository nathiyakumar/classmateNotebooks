import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateVendorUpdateOrderLinesMutation(
  $orderId:ID!
  $shippingType:String!
  $shippingInput:ShippingInput
  ) {
         updateOrderLines(
            orderId:$orderId
            shippingType: $shippingType
            shippingInput:$shippingInput
          ){
            orderLines{
              id
              vendor{
                shipping(orderId:$orderId){
                  lines{
                    id
                    productName
                  }
                  shipRocket(first:100){
                    edges{
                      node{
                        id
                      }
                    }
                  }
                }
                
              }
            }
          }
  }
`

export default (data, callback,errCallback) => {
    const variables = {
        orderId:data.orderId,
        shippingType: "SHIP ROCKET",
        shippingInput:{
            dimensions:JSON.stringify(data.dimensions)
        }

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.updateOrderLines !== null){
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
