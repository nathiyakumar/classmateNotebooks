import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateAddToCartCustomiserMutation(               
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


export default (canvas,specification,checkout_id, callback,errCallback) => {
    let canvas_array = canvas;

    let inputDictionary={

    };

    for(let i=0;i<canvas_array.length;i++){
        let inner_array = [];
       for(let j=0;j<canvas_array[i]._objects.length;j++){

           if(canvas_array[i]._objects[j].type === 'image'){

               let image_formate = {
                   "input_type": "image",
                   "user_image": canvas_array[i]._objects[j].image_name,
                   "image_angle": canvas_array[i]._objects[j].angle,
                   "image_position": getDimensions(canvas_array[i]._objects[j].aCoords),
                   "image_dimension": [canvas_array[i]._objects[j].getScaledWidth(), canvas_array[i]._objects[j].getScaledHeight()]
               }
               inner_array.push(image_formate);

           } else if(canvas_array[i]._objects[j].type === 'text'){
               let font_style = "regular";
               if(canvas_array[i]._objects[j].__dimensionAffectingProps.fontWeight === "bold" && canvas_array[i]._objects[j].__dimensionAffectingProps.fontStyle === "italic"){
                   font_style = "bolditalic";
               }else if(canvas_array[i]._objects[j].__dimensionAffectingProps.fontWeight === "bold"){
                   font_style = canvas_array[i]._objects[j].__dimensionAffectingProps.fontWeight;
               } else if(canvas_array[i]._objects[j].__dimensionAffectingProps.fontStyle === "italic"){
                   font_style = canvas_array[i]._objects[j].__dimensionAffectingProps.fontStyle;
               }
         let concadTeaxt;
               if(canvas_array[i]._objects[j].textLines.length > 1){
                   concadTeaxt = canvas_array[i]._objects[j].textLines.join('\n')
               }
               else{
                   concadTeaxt = canvas_array[i]._objects[j].textLines[0]
               }

               let text_formate =  {
                   "input_type": "text",
                   "font": canvas_array[i]._objects[j].__dimensionAffectingProps.fontFamily,
                   "font_size": canvas_array[i]._objects[j].__dimensionAffectingProps.fontSize * canvas_array[i]._objects[j].scaleX,
                   // "text":canvas_array[i]._objects[j].__dimensionAffectingProps.text,
                    "text":concadTeaxt,
                   "font_colour": getRGB(canvas_array[i]._objects[j].fill),
                   "font_position": getDimensions(canvas_array[i]._objects[j].aCoords),
                   "font_style": font_style,
                   "font_dimension": [canvas_array[i]._objects[j].width, canvas_array[i]._objects[j].height],
                   "text_angle": canvas_array[i]._objects[j].angle,
                   "font_underlined": canvas_array[i]._objects[j].underline?true:false
               }
               inner_array.push(text_formate);
           }

           if(j === canvas_array[i]._objects.length-1){
               let index = i.toString();
               inputDictionary[index] = inner_array;
           }

       }

        if(i === canvas_array.length-1 ){
            // console.log(inputDictionary)
        }

    }

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


const getDimensions = (coords) => {

    let x= [];
    let y=[];
    {Object.keys(coords).map(function (parenKey,index) {

        x[index] = coords[parenKey]['x'];
        y[index] = coords[parenKey]['y'];
    })}


    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    return [x.min(),y.min()];

}
const getRGB = (str) => {

    if(str[0] === '#') {

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str);
        return result ? [
           parseInt(result[1], 16),
           parseInt(result[2], 16),
           parseInt(result[3], 16)
        ]: [];

    } else {
        let value = str.split("(")[1].split(")")[0].split(",")
        return value.length>0?[
            value[0],
            value[1],
            value[2]
        ] : [];
    }






}




