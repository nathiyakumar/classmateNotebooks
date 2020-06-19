/**
 * @flow
 * @relayHash 933b9ed9889e71b93046974a440286b3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type OrderTrackingQueryVariables = {|
  shippingId?: ?string
|};
export type OrderTrackingQueryResponse = {|
  +trackingData: ?$ReadOnlyArray<?any>
|};
export type OrderTrackingQuery = {|
  variables: OrderTrackingQueryVariables,
  response: OrderTrackingQueryResponse,
|};
*/


/*
query OrderTrackingQuery(
  $shippingId: ID
) {
  trackingData(shippingId: $shippingId)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "shippingId",
    "type": "ID",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "trackingData",
    "args": [
      {
        "kind": "Variable",
        "name": "shippingId",
        "variableName": "shippingId"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OrderTrackingQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "OrderTrackingQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "OrderTrackingQuery",
    "id": null,
    "text": "query OrderTrackingQuery(\n  $shippingId: ID\n) {\n  trackingData(shippingId: $shippingId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fe2d8bbd4f1da1a4b85993f221b94661';
module.exports = node;
