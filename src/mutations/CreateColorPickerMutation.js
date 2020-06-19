import { commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../Environment'

const mutation = graphql`
  mutation CreateColorPickerMutation(
  $input: JSONString!
  $userDesignId: String
  ) {
    imageUpload(input: $input,userDesignId:$userDesignId) {
      message
      userDesign{
         id
         userDesignId
      }
    }
  }
`

export default (images, callback,errCallback) => {


    let uploadables = images;

    let obj ={}
    let userDesignId='';

    for(let i=0;i<images.length;i++){
        if(images[i]){
            obj[i+''] = {
                'image_name':images[i].image_name,
                'dominant_colour':images[i].dominant_colour.replace(/[^\d,]/g, '').split(','),
                'palette_colour':images[i].palete_colour.replace(/[^\d,]/g, '').split(','),

            }
        }

    }

    if(localStorage.getItem('userDesignId')){
        userDesignId = localStorage.getItem('userDesignId');
    }

    // 4
    const variables = {
        input:JSON.stringify(obj),
        userDesignId:userDesignId
    }

    // 5
    commitMutation(
        environment,
        {
            mutation,
            variables,
            uploadables,
            // 6
            onCompleted: (response,err) => {

                if(response.colourPicker !== null){
                    localStorage.setItem('userDesignId',response.imageUpload.userDesign.userDesignId);

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
