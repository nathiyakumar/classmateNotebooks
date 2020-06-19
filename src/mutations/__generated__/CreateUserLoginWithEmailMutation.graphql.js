/**
 * @flow
 * @relayHash 039dd7481679e269a355661cedc5686b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserLoginWithEmailMutationVariables = {|
  email: string,
  password: string,
|};
export type CreateUserLoginWithEmailMutationResponse = {|
  +userLoginWithEmail: ?{|
    +user: ?{|
      +id: string,
      +email: string,
      +mobileNumber: string,
      +dateOfBirth: ?any,
      +isVendor: boolean,
      +isAdmin: boolean,
      +customizable: ?boolean,
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
  |}
|};
export type CreateUserLoginWithEmailMutation = {|
  variables: CreateUserLoginWithEmailMutationVariables,
  response: CreateUserLoginWithEmailMutationResponse,
|};
*/


/*
mutation CreateUserLoginWithEmailMutation(
  $email: String!
  $password: String!
) {
  userLoginWithEmail(email: $email, password: $password) {
    user {
      id
      email
      mobileNumber
      dateOfBirth
      isVendor
      isAdmin
      customizable
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
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
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
    "name": "userLoginWithEmail",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "UserLoginWithEmail",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "customizable",
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateUserLoginWithEmailMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUserLoginWithEmailMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateUserLoginWithEmailMutation",
    "id": null,
    "text": "mutation CreateUserLoginWithEmailMutation(\n  $email: String!\n  $password: String!\n) {\n  userLoginWithEmail(email: $email, password: $password) {\n    user {\n      id\n      email\n      mobileNumber\n      dateOfBirth\n      isVendor\n      isAdmin\n      customizable\n      defaultBillingAddress {\n        id\n        firstName\n        lastName\n        companyName\n        city\n        country {\n          code\n          country\n        }\n        postalCode\n        phone\n        isDefaultShippingAddress\n        isDefaultBillingAddress\n      }\n      defaultShippingAddress {\n        id\n        firstName\n        lastName\n        companyName\n        city\n        country {\n          code\n          country\n        }\n        postalCode\n        phone\n        isDefaultShippingAddress\n        isDefaultBillingAddress\n      }\n      avatar\n      firstName\n      lastName\n    }\n    token\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1db28c3ca9bf5343ee6c8a0ae5e2379c';
module.exports = node;
