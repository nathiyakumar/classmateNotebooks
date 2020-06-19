import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateSchedulePickupMutation(
  $orderId: ID!  
  ) {
     createSchedulePickup(orderId:$orderId){
        message
        isPickedUp        
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
                if(response.createSchedulePickup !== null){
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
