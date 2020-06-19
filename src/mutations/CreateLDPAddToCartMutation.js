import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateLDPAddToCartMutation(
    $checkoutId:String!
    $licensedDesignBookIds:JSONString!
    $specification:JSONString!
  ) {
     licensedDesignUserData(
        checkoutId:$checkoutId 
        licensedDesignBookIds:$licensedDesignBookIds 
        specification:$specification
      )
        {        
             checkout{
                 id   
                 lines{
                  id
                  quantity      
                  variant{
                    id
                    sku
                    name        
                    costPrice
                    images{
                      url
                    }          
                    stockQuantity
                    product{
                        productType{
                          name
                        }
                        category{
                            id
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

export default (product,checkout_id,specification, callback,errCallback) => {
    const variables = {
        checkoutId:checkout_id,
        licensedDesignBookIds:JSON.stringify(product),
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
                if(response.licensedDesignUserData !== null){
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
