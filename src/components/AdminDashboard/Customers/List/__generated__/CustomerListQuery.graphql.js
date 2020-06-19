/**
 * @flow
 * @relayHash 424be8f8c60d66b40007fbbb79403e83
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomerListQueryVariables = {||};
export type CustomerListQueryResponse = {|
  +users: ?$ReadOnlyArray<?{|
    +id: string,
    +firstName: string,
    +lastName: ?string,
    +mobileNumber: string,
    +email: string,
    +defaultBillingAddress: ?{|
      +country: {|
        +country: ?string
      |}
    |},
  |}>
|};
export type CustomerListQuery = {|
  variables: CustomerListQueryVariables,
  response: CustomerListQueryResponse,
|};
*/


/*
query CustomerListQuery {
  users {
    id
    firstName
    lastName
    mobileNumber
    email
    defaultBillingAddress {
      country {
        country
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v5 = {
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
      "name": "country",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CustomerListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "users",
        "storageKey": null,
        "args": null,
        "concreteType": "UserType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "defaultBillingAddress",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomerListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "users",
        "storageKey": null,
        "args": null,
        "concreteType": "UserType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "defaultBillingAddress",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v0/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CustomerListQuery",
    "id": null,
    "text": "query CustomerListQuery {\n  users {\n    id\n    firstName\n    lastName\n    mobileNumber\n    email\n    defaultBillingAddress {\n      country {\n        country\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ad1039bff826944fa76eb403ff5fb90f';
module.exports = node;
