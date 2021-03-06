import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'


const mutation = graphql`
  mutation CreateDownloadPdfStatusUpdateMutation(
    $designId: String!
    $orderId: ID!
  ) {        
        downloadPdfStatusUpdate(
            orderId:$orderId   
            designId:$designId){
                message
        }
        
  }
`

export default (data, callback,errCallback) => {
    const variables = {
        designId: data.designId,
        orderId: data.orderId
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {
                if(response.downloadPdfStatusUpdate !== null){
                    // localStorage.setItem('checkout_id',response.checkoutCreate.checkout.id)
                    // localStorage.setItem('guest_user_token',response.checkoutCreate.checkout.token)
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
