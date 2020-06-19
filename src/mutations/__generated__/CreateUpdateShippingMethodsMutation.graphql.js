/**
 * @flow
 * @relayHash 16e215487d5537924097d369dc280df4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUpdateShippingMethodsMutationVariables = {|
  checkoutId: string,
  shippingMethodId: string,
|};
export type CreateUpdateShippingMethodsMutationResponse = {|
  +checkoutShippingMethodUpdate: ?{|
    +message: ?string,
    +checkout: ?{|
      +totalPrice: ?number,
      +shippingMethod: ?{|
        +id: string,
        +name: string,
        +price: number,
        +minimumOrderPrice: ?number,
        +maximumOrderPrice: ?number,
        +minimumOrderWeight: ?number,
        +maximumOrderWeight: ?number,
      |},
    |},
  |}
|};
export type CreateUpdateShippingMethodsMutation = {|
  variables: CreateUpdateShippingMethodsMutationVariables,
  response: CreateUpdateShippingMethodsMutationResponse,
|};
*/


/*
mutation CreateUpdateShippingMethodsMutation(
  $checkoutId: ID!
  $shippingMethodId: ID!
) {
  checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
    message
    checkout {
      totalPrice
      shippingMethod {
        id
        name
        price
        minimumOrderPrice
        maximumOrderPrice
        minimumOrderWeight
        maximumOrderWeight
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "checkoutId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "shippingMethodId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "checkoutId",
    "variableName": "checkoutId"
  },
  {
    "kind": "Variable",
    "name": "shippingMethodId",
    "variableName": "shippingMethodId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shippingMethod",
  "storageKey": null,
  "args": null,
  "concreteType": "ShippingMethodType",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "price",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "minimumOrderPrice",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "maximumOrderPrice",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "minimumOrderWeight",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "maximumOrderWeight",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateUpdateShippingMethodsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutShippingMethodUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutShippingMethodUpdate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUpdateShippingMethodsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutShippingMethodUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutShippingMethodUpdate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateUpdateShippingMethodsMutation",
    "id": null,
    "text": "mutation CreateUpdateShippingMethodsMutation(\n  $checkoutId: ID!\n  $shippingMethodId: ID!\n) {\n  checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {\n    message\n    checkout {\n      totalPrice\n      shippingMethod {\n        id\n        name\n        price\n        minimumOrderPrice\n        maximumOrderPrice\n        minimumOrderWeight\n        maximumOrderWeight\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a59a59458dfe7fb9fb3d81a56ff528ad';
module.exports = node;
