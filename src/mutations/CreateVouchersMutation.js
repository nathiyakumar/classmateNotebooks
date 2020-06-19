import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateVouchersMutation(
     $input:VoucherInput
  ) {
       createVoucher(
           input: $input
       ) {
           message
            voucher{
              id
            }
       }
    }
`;

export default (Voucherdetails, callback,errCallback) => {
    const variables = {
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

                if(response.createVoucher !== null){
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
