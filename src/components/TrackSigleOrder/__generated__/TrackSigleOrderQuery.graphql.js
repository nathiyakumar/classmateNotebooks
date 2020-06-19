/**
 * @flow
 * @relayHash 886757d677dd87009409af38ae04e899
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TrackSigleOrderQueryVariables = {|
  orderId?: ?string
|};
export type TrackSigleOrderQueryResponse = {|
  +trackingDataNew: ?{|
    +orderData: ?{|
      +orderId: ?string,
      +orderDate: ?string,
    |},
    +shippingData: ?$ReadOnlyArray<?{|
      +shippingStatus: ?string,
      +dateData: ?any,
      +shippingActivities: ?$ReadOnlyArray<?any>,
      +courierName: ?string,
      +trackingId: ?string,
    |}>,
  |}
|};
export type TrackSigleOrderQuery = {|
  variables: TrackSigleOrderQueryVariables,
  response: TrackSigleOrderQueryResponse,
|};
*/


/*
query TrackSigleOrderQuery(
  $orderId: String
) {
  trackingDataNew(orderId: $orderId) {
    orderData {
      orderId
      orderDate
    }
    shippingData {
      shippingStatus
      dateData
      shippingActivities
      courierName
      trackingId
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "trackingDataNew",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      }
    ],
    "concreteType": "TrackingData",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "orderData",
        "storageKey": null,
        "args": null,
        "concreteType": "OrderData",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "orderId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "orderDate",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "shippingData",
        "storageKey": null,
        "args": null,
        "concreteType": "ShippingData",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingStatus",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "dateData",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingActivities",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "courierName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "trackingId",
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
    "name": "TrackSigleOrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TrackSigleOrderQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "TrackSigleOrderQuery",
    "id": null,
    "text": "query TrackSigleOrderQuery(\n  $orderId: String\n) {\n  trackingDataNew(orderId: $orderId) {\n    orderData {\n      orderId\n      orderDate\n    }\n    shippingData {\n      shippingStatus\n      dateData\n      shippingActivities\n      courierName\n      trackingId\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9a13477e7c2ec304aab21a0014444ac5';
module.exports = node;
