import {commitMutation} from 'react-relay';
import environment from '../Environment';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation CreateFeedbackMutation($city:String!, $comment:String!, $country:String!, $email:String!, $name:String!, $phoneNumber:String!, $state:String!,$enquiryType:EnquiryTypeEnum!,$orderId:String) {
    
    createFeedback(
            city: $city,
            comment:$comment,
            country:$country,
            email:$email,
            name: $name,
            phoneNumber:$phoneNumber,
            state:$state,
            enquiryType:$enquiryType,
            orderId:$orderId
            ){
            message
    }
  }
  `;

export default (data, callback, errCallback) => {

    let variables ={};
    if(data.inquiry_types === "order_issue"){
       variables = {
            city: data.city,
            comment: data.comment,
            country: "India",
            email: data.email,
            name: data.name,
            phoneNumber: data.phone_number,
            state: data.state,
            enquiryType:data.inquiry_types,
            orderId:data.order_id
        }
    }
    else{
        variables = {
            city: data.city,
            comment: data.comment,
            country: "India",
            email: data.email,
            name: data.name,
            phoneNumber: data.phone_number,
            enquiryType:data.inquiry_types,
            state: data.state,
        }
    }



    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response, err) => {
                if (response !== null) {
                    callback(response)
                } else {
                    errCallback(err[0].message)
                }
            },
            onError: err => {
                errCallback(err)
            },
        },
    )


}
