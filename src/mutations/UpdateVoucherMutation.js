import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation UpdateVoucherMutation(
     $voucherId :ID
     $input:VoucherInput
  ) {
       updateVoucher(
           voucherId :$voucherId
           input: $input
       ) {
            message
            voucher{
              id
              usageLimit
            }
       }
    }
`;

export default (id, Voucherdetails, callback,errCallback) => {
    const variables = {
        voucherId :id,
        input:Voucherdetails,

    };

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.updateVoucher !== null){
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
