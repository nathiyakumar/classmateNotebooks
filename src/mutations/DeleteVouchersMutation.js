import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation DeleteVouchersMutation(
     $voucherIds:[ID]
    ) {
       deleteVoucher(
       voucherIds: $voucherIds
      ) {
         message
      }
    }
`;

export default (VoucherId, callback,errCallback) => {
    const variables = {
        voucherIds:VoucherId,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.deleteVoucher !== null){
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
