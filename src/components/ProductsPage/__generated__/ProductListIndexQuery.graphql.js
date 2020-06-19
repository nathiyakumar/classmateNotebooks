/**
 * @flow
 * @relayHash 5ce3410c223cd2c39c46217bfceabbb6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductListIndexQueryVariables = {||};
export type ProductListIndexQueryResponse = {|
  +products: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +price: ?number,
    +masterSku: ?string,
    +featuredImage: ?$ReadOnlyArray<?{|
      +url: string
    |}>,
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
          +costPrice: ?number,
          +priceOverride: ?number,
          +stockQuantity: number,
        |}
      |}>
    |},
  |}>
|};
export type ProductListIndexQuery = {|
  variables: ProductListIndexQueryVariables,
  response: ProductListIndexQueryResponse,
|};
*/


/*
query ProductListIndexQuery {
  products {
    id
    name
    price
    masterSku
    featuredImage {
      url
      id
    }
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
          costPrice
          priceOverride
          stockQuantity
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
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
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
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "variants",
  "storageKey": "variants(first:1)",
  "args": (v7/*: any*/),
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
              "name": "costPrice",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "priceOverride",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "stockQuantity",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
},
v9 = [
  (v4/*: any*/),
  (v0/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductListIndexQuery",
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "featuredImage",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductImageType",
            "plural": true,
            "selections": (v5/*: any*/)
          },
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v7/*: any*/),
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
                    "selections": (v5/*: any*/)
                  }
                ]
              }
            ]
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductListIndexQuery",
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "featuredImage",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductImageType",
            "plural": true,
            "selections": (v9/*: any*/)
          },
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v7/*: any*/),
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
                    "selections": (v9/*: any*/)
                  }
                ]
              }
            ]
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProductListIndexQuery",
    "id": null,
    "text": "query ProductListIndexQuery {\n  products {\n    id\n    name\n    price\n    masterSku\n    featuredImage {\n      url\n      id\n    }\n    category {\n      id\n      name\n    }\n    images(first: 1) {\n      edges {\n        node {\n          url\n          id\n        }\n      }\n    }\n    variants(first: 1) {\n      edges {\n        node {\n          id\n          name\n          costPrice\n          priceOverride\n          stockQuantity\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5b28a9da7243a86001fb352278aebbf2';
module.exports = node;
