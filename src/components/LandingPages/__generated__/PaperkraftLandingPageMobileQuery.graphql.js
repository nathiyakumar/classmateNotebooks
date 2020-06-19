/**
 * @flow
 * @relayHash f31f21b38ee8aae0e539444354693763
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaperkraftLandingPageMobileQueryVariables = {||};
export type PaperkraftLandingPageMobileQueryResponse = {|
  +listOfPaperkraftGift: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +price: ?number,
    +costPrice: ?number,
    +colorBand: ?string,
    +sku: string,
    +stockQuantity: number,
    +images: ?$ReadOnlyArray<?{|
      +url: string
    |}>,
    +product: {|
      +variants: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +name: string,
            +price: ?number,
          |}
        |}>
      |},
      +category: ?{|
        +name: string
      |},
      +masterSku: ?string,
      +name: string,
    |},
  |}>
|};
export type PaperkraftLandingPageMobileQuery = {|
  variables: PaperkraftLandingPageMobileQueryVariables,
  response: PaperkraftLandingPageMobileQueryResponse,
|};
*/


/*
query PaperkraftLandingPageMobileQuery {
  listOfPaperkraftGift {
    id
    name
    price
    costPrice
    colorBand
    sku
    stockQuantity
    images {
      url
      id
    }
    product {
      variants(first: 1) {
        edges {
          node {
            id
            name
            price
          }
        }
      }
      category {
        name
        id
      }
      masterSku
      name
      id
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
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "colorBand",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sku",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "variants",
  "storageKey": "variants(first:1)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 1
    }
  ],
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
            (v2/*: any*/)
          ]
        }
      ]
    }
  ]
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "masterSku",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PaperkraftLandingPageMobileQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "listOfPaperkraftGift",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductVariantType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "VariantImageType",
            "plural": true,
            "selections": [
              (v7/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "category",
                "storageKey": null,
                "args": null,
                "concreteType": "CategoryType",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ]
              },
              (v9/*: any*/),
              (v1/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PaperkraftLandingPageMobileQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "listOfPaperkraftGift",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductVariantType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "VariantImageType",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v0/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "category",
                "storageKey": null,
                "args": null,
                "concreteType": "CategoryType",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v0/*: any*/)
                ]
              },
              (v9/*: any*/),
              (v1/*: any*/),
              (v0/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PaperkraftLandingPageMobileQuery",
    "id": null,
    "text": "query PaperkraftLandingPageMobileQuery {\n  listOfPaperkraftGift {\n    id\n    name\n    price\n    costPrice\n    colorBand\n    sku\n    stockQuantity\n    images {\n      url\n      id\n    }\n    product {\n      variants(first: 1) {\n        edges {\n          node {\n            id\n            name\n            price\n          }\n        }\n      }\n      category {\n        name\n        id\n      }\n      masterSku\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '49d4df0d5875fd5ed88145c8146a95c1';
module.exports = node;
