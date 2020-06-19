import graphql from 'babel-plugin-relay/macro';

export const basicUserFragment = graphql`
  fragment BasicUserFields on UserType {
      id
      email
      mobileNumber  
      dateOfBirth
      defaultBillingAddress{
        id
        firstName
        lastName
        companyName
        city
        country{
          code
          country
        }
        postalCode
        phone        
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
      defaultShippingAddress{
        id
        firstName
        lastName
        companyName
        city
        country{
          code
          country
        }
        postalCode
        phone        
        isDefaultShippingAddress
        isDefaultBillingAddress
        
      }
      avatar
      firstName
      lastName 
  }
`;
