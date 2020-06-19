/**
 * @flow
 * @relayHash aacd693f19ec1414b00008a14fa6b59d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingZonesListQueryVariables = {||};
export type ShippingZonesListQueryResponse = {|
  +shippingZones: ?{|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
        +countries: ?$ReadOnlyArray<?{|
          +code: ?string,
          +country: ?string,
        |}>,
        +shippingMethods: ?$ReadOnlyArray<?{|
          +id: string,
          +name: string,
        |}>,
      |}
    |}>
  |}
|};
export type ShippingZonesListQuery = {|
  variables: ShippingZonesListQueryVariables,
  response: ShippingZonesListQueryResponse,
|};
*/


/*
query ShippingZonesListQuery {
  shippingZones(first: 100) {
    edges {
      node {
        id
        name
        countries {
          code
          country
        }
        shippingMethods {
          id
          name
        }
      }
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
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
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "countries",
                "storageKey": null,
                "args": null,
                "concreteType": "CountryDisplay",
                "plural": true,
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
                "kind": "LinkedField",
                "alias": null,
                "name": "shippingMethods",
                "storageKey": null,
                "args": null,
                "concreteType": "ShippingMethodType",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ]
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
    "name": "ShippingZonesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingZonesListQuery",
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ShippingZonesListQuery",
    "id": null,
    "text": "query ShippingZonesListQuery {\n  shippingZones(first: 100) {\n    edges {\n      node {\n        id\n        name\n        countries {\n          code\n          country\n        }\n        shippingMethods {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fad2c54bbda0f34da14bacd215fc46f3';
module.exports = node;
