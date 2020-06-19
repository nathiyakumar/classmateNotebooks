/**
 * @flow
 * @relayHash 29c8ff11ed8f70b62ad800f355b014a4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingMethodCreateShippingZoneListQueryVariables = {||};
export type ShippingMethodCreateShippingZoneListQueryResponse = {|
  +shippingZones: ?{|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
      |}
    |}>
  |}
|};
export type ShippingMethodCreateShippingZoneListQuery = {|
  variables: ShippingMethodCreateShippingZoneListQueryVariables,
  response: ShippingMethodCreateShippingZoneListQueryResponse,
|};
*/


/*
query ShippingMethodCreateShippingZoneListQuery {
  shippingZones(first: 100) {
    edges {
      node {
        id
        name
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "shippingZones",
    "storageKey": "shippingZones(first:100)",
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 100
      }
    ],
    "concreteType": "ShippingZoneTypeCountableConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "ShippingZoneTypeCountableEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "ShippingZoneType",
            "plural": false,
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
              }
            ]
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
    "name": "ShippingMethodCreateShippingZoneListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingMethodCreateShippingZoneListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ShippingMethodCreateShippingZoneListQuery",
    "id": null,
    "text": "query ShippingMethodCreateShippingZoneListQuery {\n  shippingZones(first: 100) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '973c2b4bc8a6994cad889e4e8e0c54ea';
module.exports = node;
