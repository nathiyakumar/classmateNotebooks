import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateAddMobileCanvasToCartCustomiserMutation(
  $userDesignId: String!
  $checkoutId: String!
  $inputDictionary: JSONString!
  $specification: JSONString!
  ) {
    customizerData(userDesignId: $userDesignId,checkoutId:$checkoutId,inputDictionary:$inputDictionary,specification:$specification) {
       checkout{
            id   
            lines{
              id
              quantity      
              variant{
                id
                sku
                name        
                priceOverride
                images{
                  url
                }          
                stockQuantity
                product{
                    productType{
                      name
                    }
                }
              }
            }    
            subtotalPrice
            totalPrice    
            checkoutQuantity 
        } 
    }
  }
`


export default (inputDictionary,specification,checkout_id, callback,errCallback) => {





    // let inputDictionary = getCanvasDatas(canvas);
    let userDesignId = '';
    if(localStorage.getItem('userDesignId')){
        userDesignId = localStorage.getItem('userDesignId');
    }

    const variables = {
        userDesignId:userDesignId,
        checkoutId:checkout_id,
        inputDictionary:JSON.stringify(inputDictionary),
        specification:JSON.stringify(specification)

    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // 6
            onCompleted: (response,err) => {

                if(response.customizerData !== null){
                    callback(response)
                } else {
                    errCallback(err[0].message);
                }


            },
            onError: err => {
                errCallback(err);
            },
        },
    )
}






