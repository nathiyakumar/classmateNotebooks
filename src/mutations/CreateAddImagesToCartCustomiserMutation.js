import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateAddImagesToCartCustomiserMutation(
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


export default (images,specification,checkout_id, callback,errCallback) => {


    let inputDictionary={

    };




    for(let i=0;i<images.length;i++){
       let image_formate = {
           "input_type": "image",
           "user_image": images[i].image_name,
           "image_angle": 0,
           "image_position": [0,50],
           "image_dimension": [540, 565]
       }
       let index = i.toString();
       inputDictionary[index] = [image_formate];

    }


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






