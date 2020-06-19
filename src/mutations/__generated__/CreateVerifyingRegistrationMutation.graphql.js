/**
 * @flow
 * @relayHash d57a5efc30169041ce1a45f02273571c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateVerifyingRegistrationMutationVariables = {|
  mobileNumber: string,
  otp: string,
|};
export type CreateVerifyingRegistrationMutationResponse = {|
  +verifyingRegistration: ?{|
    +user: ?{|
      +id: string,
      +email: string,
      +mobileNumber: string,
      +dateOfBirth: ?any,
      +isVendor: boolean,
      +isAdmin: boolean,
      +defaultBillingAddress: ?{|
        +id: string,
        +firstName: string,
        +lastName: string,
        +companyName: string,
        +city: string,
        +country: {|
          +code: ?string,
          +country: ?string,
        |},
        +postalCode: number,
        +phone: string,
        +isDefaultShippingAddress: ?boolean,
        +isDefaultBillingAddress: ?boolean,
      |},
      +defaultShippingAddress: ?{|
        +id: string,
        +firstName: string,
        +lastName: string,
        +companyName: string,
        +city: string,
        +country: {|
          +code: ?string,
          +country: ?string,
        |},
        +postalCode: number,
        +phone: string,
        +isDefaultShippingAddress: ?boolean,
        +isDefaultBillingAddress: ?boolean,
      |},
      +avatar: ?string,
      +firstName: string,
      +lastName: ?string,
    |},
    +token: ?string,
    +message: ?string,
  |}
|};
export type CreateVerifyingRegistrationMutation = {|
  variables: CreateVerifyingRegistrationMutationVariables,
  response: CreateVerifyingRegistrationMutationResponse,
|};
*/


/*
mutation CreateVerifyingRegistrationMutation(
  $mobileNumber: String!
  $otp: String!
) {
  verifyingRegistration(mobileNumber: $mobileNumber, otp: $otp) {
    user {
      id
      email
      mobileNumber
      dateOfBirth
      isVendor
      isAdmin
      defaultBillingAddress {
        id
        firstName
        lastName
        companyName
        city
        country {
          code
          country
        }
        postalCode
        phone
        isDefaultShippingAddress
        isDefaultBillingAddress
      }
      defaultShippingAddress {
        id
        firstName
        lastName
        companyName
        city
        country {
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
    token
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "mobileNumber",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "otp",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "companyName",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "city",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "country",
    "storageKey": null,
    "args": null,
    "concreteType": "CountryDisplay",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "code",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "country",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "postalCode",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "phone",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isDefaultShippingAddress",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isDefaultBillingAddress",
    "args": null,
    "storageKey": null
  }
],
v5 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "verifyingRegistration",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "mobileNumber",
        "variableName": "mobileNumber"
      },
      {
        "kind": "Variable",
        "name": "otp",
        "variableName": "otp"
      }
    ],
    "concreteType": "VerifyingRegistration",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "UserType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "mobileNumber",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "dateOfBirth",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isVendor",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isAdmin",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "defaultBillingAddress",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": false,
            "selections": (v4/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "defaultShippingAddress",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": false,
            "selections": (v4/*: any*/)
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "avatar",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateVerifyingRegistrationMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateVerifyingRegistrationMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateVerifyingRegistrationMutation",
    "id": null,
    "text": "mutation CreateVerifyingRegistrationMutation(\n  $mobileNumber: String!\n  $otp: String!\n) {\n  verifyingRegistration(mobileNumber: $mobileNumber, otp: $otp) {\n    user {\n      id\n      email\n      mobileNumber\n      dateOfBirth\n      isVendor\n      isAdmin\n      defaultBillingAddress {\n        id\n        firstName\n        lastName\n        companyName\n        city\n        country {\n          code\n          country\n        }\n        postalCode\n        phone\n        isDefaultShippingAddress\n        isDefaultBillingAddress\n      }\n      defaultShippingAddress {\n        id\n        firstName\n        lastName\n        companyName\n        city\n        country {\n          code\n          country\n        }\n        postalCode\n        phone\n        isDefaultShippingAddress\n        isDefaultBillingAddress\n      }\n      avatar\n      firstName\n      lastName\n    }\n    token\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '237d25503468c4841eec4be3ad68924a';
module.exports = node;
