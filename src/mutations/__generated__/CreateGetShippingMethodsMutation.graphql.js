/**
 * @flow
 * @relayHash 13240ec4a67deed3c96446d8c4cbdd4f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateGetShippingMethodsMutationVariables = {|
  checkoutId: string
|};
export type CreateGetShippingMethodsMutationResponse = {|
  +availableShippingMethods: ?{|
    +message: ?string,
    +shippingMethods: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +shippingTotal: ?number,
    |}>,
  |}
|};
export type CreateGetShippingMethodsMutation = {|
  variables: CreateGetShippingMethodsMutationVariables,
  response: CreateGetShippingMethodsMutationResponse,
|};
*/


/*
mutation CreateGetShippingMethodsMutation(
  $checkoutId: ID!
) {
  availableShippingMethods(checkoutId: $checkoutId) {
    message
    shippingMethods {
      id
      name
      shippingTotal
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
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "availableShippingMethods",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "checkoutId",
        "variableName": "checkoutId"
      }
    ],
    "concreteType": "AvailableShippingMethods",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "shippingMethods",
        "storageKey": null,
        "args": null,
        "concreteType": "ShippingMethodType",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
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
            "name": "shippingTotal",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateGetShippingMethodsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateGetShippingMethodsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateGetShippingMethodsMutation",
    "id": null,
    "text": "mutation CreateGetShippingMethodsMutation(\n  $checkoutId: ID!\n) {\n  availableShippingMethods(checkoutId: $checkoutId) {\n    message\n    shippingMethods {\n      id\n      name\n      shippingTotal\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8bc3f0050ac017109ec374cb7640ab47';
module.exports = node;
