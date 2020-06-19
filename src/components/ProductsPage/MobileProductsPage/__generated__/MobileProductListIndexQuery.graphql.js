/**
 * @flow
 * @relayHash 3f205e1879f9ff94e386cd3dcc491ee3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileProductListIndexQueryVariables = {||};
export type MobileProductListIndexQueryResponse = {|
  +products: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +images: ?{|
      +edges: $ReadOnlyArray<{|
        +node: {|
          +url: string
        |}
      |}>
    |},
    +variants: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +priceOverride: ?number,
        |}
      |}>
    |},
  |}>
|};
export type MobileProductListIndexQuery = {|
  variables: MobileProductListIndexQueryVariables,
  response: MobileProductListIndexQueryResponse,
|};
*/


/*
query MobileProductListIndexQuery {
  products {
    id
    name
    images(first: 1) {
      edges {
        node {
          url
          id
        }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          name
          priceOverride
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
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "variants",
  "storageKey": "variants(first:1)",
  "args": (v2/*: any*/),
  "concreteType": "ProductVariantTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ProductVariantTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "ProductVariantType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "priceOverride",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MobileProductListIndexQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v2/*: any*/),
            "concreteType": "ProductImageTypeCountableConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductImageTypeCountableEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductImageType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileProductListIndexQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v2/*: any*/),
            "concreteType": "ProductImageTypeCountableConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductImageTypeCountableEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductImageType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v0/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MobileProductListIndexQuery",
    "id": null,
    "text": "query MobileProductListIndexQuery {\n  products {\n    id\n    name\n    images(first: 1) {\n      edges {\n        node {\n          url\n          id\n        }\n      }\n    }\n    variants(first: 1) {\n      edges {\n        node {\n          id\n          name\n          priceOverride\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7f8be5ec212cf5989f1c59d744ed8d43';
module.exports = node;
