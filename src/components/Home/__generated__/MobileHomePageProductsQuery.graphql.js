/**
 * @flow
 * @relayHash 4f9d3036df890cd68cd3b0d63190052a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileHomePageProductsQueryVariables = {||};
export type MobileHomePageProductsQueryResponse = {|
  +products: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +price: ?number,
    +masterSku: ?string,
    +category: ?{|
      +id: string,
      +name: string,
    |},
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
export type MobileHomePageProductsQuery = {|
  variables: MobileHomePageProductsQueryVariables,
  response: MobileHomePageProductsQueryResponse,
|};
*/


/*
query MobileHomePageProductsQuery {
  products {
    id
    name
    price
    masterSku
    category {
      id
      name
    }
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "masterSku",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ]
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "variants",
  "storageKey": "variants(first:1)",
  "args": (v5/*: any*/),
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
    "name": "MobileHomePageProductsQuery",
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v5/*: any*/),
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
                      (v6/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v7/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileHomePageProductsQuery",
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v5/*: any*/),
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
                      (v6/*: any*/),
                      (v0/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v7/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MobileHomePageProductsQuery",
    "id": null,
    "text": "query MobileHomePageProductsQuery {\n  products {\n    id\n    name\n    price\n    masterSku\n    category {\n      id\n      name\n    }\n    images(first: 1) {\n      edges {\n        node {\n          url\n          id\n        }\n      }\n    }\n    variants(first: 1) {\n      edges {\n        node {\n          id\n          name\n          priceOverride\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2471add92a8d8caf7423345328446cba';
module.exports = node;
