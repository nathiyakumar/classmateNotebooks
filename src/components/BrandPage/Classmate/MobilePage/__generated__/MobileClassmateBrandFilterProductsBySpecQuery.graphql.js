/**
 * @flow
 * @relayHash 63431b45dae9f3adf19b646c28a5ef11
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileClassmateBrandFilterProductsBySpecQueryVariables = {|
  categoryId: string,
  filters?: ?string,
  sortOrder?: ?string,
|};
export type MobileClassmateBrandFilterProductsBySpecQueryResponse = {|
  +catalogueProductsFilter: ?$ReadOnlyArray<?{|
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
  |}>
|};
export type MobileClassmateBrandFilterProductsBySpecQuery = {|
  variables: MobileClassmateBrandFilterProductsBySpecQueryVariables,
  response: MobileClassmateBrandFilterProductsBySpecQueryResponse,
|};
*/


/*
query MobileClassmateBrandFilterProductsBySpecQuery(
  $categoryId: ID!
  $filters: String
  $sortOrder: String
) {
  catalogueProductsFilter(categoryId: $categoryId, filters: $filters, sortOrder: $sortOrder) {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "filters",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sortOrder",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "catalogueProductsFilter",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "filters",
        "variableName": "filters"
      },
      {
        "kind": "Variable",
        "name": "sortOrder",
        "variableName": "sortOrder"
      }
    ],
    "concreteType": "ProductsType",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
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
        "selections": (v2/*: any*/)
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
                "selections": (v2/*: any*/)
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
    "name": "MobileClassmateBrandFilterProductsBySpecQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileClassmateBrandFilterProductsBySpecQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MobileClassmateBrandFilterProductsBySpecQuery",
    "id": null,
    "text": "query MobileClassmateBrandFilterProductsBySpecQuery(\n  $categoryId: ID!\n  $filters: String\n  $sortOrder: String\n) {\n  catalogueProductsFilter(categoryId: $categoryId, filters: $filters, sortOrder: $sortOrder) {\n    id\n    name\n    price\n    featuredImage {\n      id\n      url\n    }\n    images(first: 100) {\n      edges {\n        node {\n          id\n          url\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '750c522eace52ca2ec03844494bd02c3';
module.exports = node;
