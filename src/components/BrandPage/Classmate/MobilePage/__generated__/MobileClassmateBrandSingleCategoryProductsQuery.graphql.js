/**
 * @flow
 * @relayHash 5c6140d798e48e25facb3f9b3cf11865
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileClassmateBrandSingleCategoryProductsQueryVariables = {|
  categoryId: string
|};
export type MobileClassmateBrandSingleCategoryProductsQueryResponse = {|
  +catalogueCategorySingleView: ?$ReadOnlyArray<?{|
    +categoryId: ?string,
    +name: string,
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +price: ?number,
          +featuredImage: ?$ReadOnlyArray<?{|
            +id: string,
            +url: string,
          |}>,
          +images: ?{|
            +edges: $ReadOnlyArray<{|
              +node: {|
                +id: string,
                +url: string,
              |}
            |}>
          |},
        |}
      |}>
    |},
  |}>
|};
export type MobileClassmateBrandSingleCategoryProductsQuery = {|
  variables: MobileClassmateBrandSingleCategoryProductsQueryVariables,
  response: MobileClassmateBrandSingleCategoryProductsQueryResponse,
|};
*/


/*
query MobileClassmateBrandSingleCategoryProductsQuery(
  $categoryId: ID!
) {
  catalogueCategorySingleView(categoryId: $categoryId) {
    categoryId
    name
    products(first: 10) {
      edges {
        node {
          id
          name
          price
          featuredImage {
            id
            url
          }
          images(first: 100) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
      }
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "categoryId",
    "variableName": "categoryId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "categoryId",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "products",
  "storageKey": "products(first:10)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 10
    }
  ],
  "concreteType": "ProductsTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ProductsTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "ProductsType",
          "plural": false,
          "selections": [
            (v4/*: any*/),
            (v3/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "price",
              "args": null,
              "storageKey": null
            },
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
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "images",
              "storageKey": "images(first:100)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 100
                }
              ],
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
    "name": "MobileClassmateBrandSingleCategoryProductsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "catalogueCategorySingleView",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CategoryType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileClassmateBrandSingleCategoryProductsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "catalogueCategorySingleView",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CategoryType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MobileClassmateBrandSingleCategoryProductsQuery",
    "id": null,
    "text": "query MobileClassmateBrandSingleCategoryProductsQuery(\n  $categoryId: ID!\n) {\n  catalogueCategorySingleView(categoryId: $categoryId) {\n    categoryId\n    name\n    products(first: 10) {\n      edges {\n        node {\n          id\n          name\n          price\n          featuredImage {\n            id\n            url\n          }\n          images(first: 100) {\n            edges {\n              node {\n                id\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ff224af56866cdf09a7c3d6191156b4c';
module.exports = node;
