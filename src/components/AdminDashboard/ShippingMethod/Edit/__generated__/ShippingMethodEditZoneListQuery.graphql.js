/**
 * @flow
 * @relayHash 010aa9cab488429a3b65f6bf81b72f9c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingMethodEditZoneListQueryVariables = {||};
export type ShippingMethodEditZoneListQueryResponse = {|
  +shippingZones: ?{|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
      |}
    |}>
  |}
|};
export type ShippingMethodEditZoneListQuery = {|
  variables: ShippingMethodEditZoneListQueryVariables,
  response: ShippingMethodEditZoneListQueryResponse,
|};
*/


/*
query ShippingMethodEditZoneListQuery {
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
    "name": "ShippingMethodEditZoneListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingMethodEditZoneListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ShippingMethodEditZoneListQuery",
    "id": null,
    "text": "query ShippingMethodEditZoneListQuery {\n  shippingZones(first: 100) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4b6ba916955cae0ea3c10c583bd64305';
module.exports = node;
