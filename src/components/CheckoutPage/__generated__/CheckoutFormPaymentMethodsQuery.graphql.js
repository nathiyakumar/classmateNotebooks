/**
 * @flow
 * @relayHash 226b6ed545965a316ba102418fa4d7a4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutFormPaymentMethodsQueryVariables = {|
  checkoutId: string
|};
export type CheckoutFormPaymentMethodsQueryResponse = {|
  +availablePaymentMethods: ?any
|};
export type CheckoutFormPaymentMethodsQuery = {|
  variables: CheckoutFormPaymentMethodsQueryVariables,
  response: CheckoutFormPaymentMethodsQueryResponse,
|};
*/


/*
query CheckoutFormPaymentMethodsQuery(
  $checkoutId: ID!
) {
  availablePaymentMethods(checkoutId: $checkoutId)
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
    "kind": "ScalarField",
    "alias": null,
    "name": "availablePaymentMethods",
    "args": [
      {
        "kind": "Variable",
        "name": "checkoutId",
        "variableName": "checkoutId"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CheckoutFormPaymentMethodsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckoutFormPaymentMethodsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CheckoutFormPaymentMethodsQuery",
    "id": null,
    "text": "query CheckoutFormPaymentMethodsQuery(\n  $checkoutId: ID!\n) {\n  availablePaymentMethods(checkoutId: $checkoutId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dd8be20024aaa83acb448d032a9568a6';
module.exports = node;
