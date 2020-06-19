/**
 * @flow
 * @relayHash c5330f9814f51e81276dd4e774f6fc4d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ClassmateBrandSingleProductQueryVariables = {|
  productId: string
|};
export type ClassmateBrandSingleProductQueryResponse = {|
  +catalogueSingleProductView: ?{|
    +id: string,
    +masterSku: ?string,
    +name: string,
    +price: ?number,
    +images: ?{|
      +edges: $ReadOnlyArray<{|
        +node: {|
          +id: string,
          +url: string,
        |}
      |}>
    |},
    +attributes: any,
    +category: ?{|
      +id: string,
      +name: string,
    |},
    +description: string,
    +seoTitle: string,
    +seoDescription: string,
    +amazonLink: ?string,
    +flipkartLink: ?string,
  |}
|};
export type ClassmateBrandSingleProductQuery = {|
  variables: ClassmateBrandSingleProductQueryVariables,
  response: ClassmateBrandSingleProductQueryResponse,
|};
*/


/*
query ClassmateBrandSingleProductQuery(
  $productId: ID!
) {
  catalogueSingleProductView(productId: $productId) {
    id
    masterSku
    name
    price
    images(first: 100) {
      edges {
        node {
          id
          url
        }
      }
    }
    attributes
    category {
      id
      name
    }
    description
    seoTitle
    seoDescription
    amazonLink
    flipkartLink
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productId",
    "type": "ID!",
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "catalogueSingleProductView",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      }
    ],
    "concreteType": "ProductsType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "masterSku",
        "args": null,
        "storageKey": null
      },
      (v2/*: any*/),
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
                "selections": [
                  (v1/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "url",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "attributes",
        "args": null,
        "storageKey": null
      },
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
          (v2/*: any*/)
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoTitle",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoDescription",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "amazonLink",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "flipkartLink",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ClassmateBrandSingleProductQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ClassmateBrandSingleProductQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ClassmateBrandSingleProductQuery",
    "id": null,
    "text": "query ClassmateBrandSingleProductQuery(\n  $productId: ID!\n) {\n  catalogueSingleProductView(productId: $productId) {\n    id\n    masterSku\n    name\n    price\n    images(first: 100) {\n      edges {\n        node {\n          id\n          url\n        }\n      }\n    }\n    attributes\n    category {\n      id\n      name\n    }\n    description\n    seoTitle\n    seoDescription\n    amazonLink\n    flipkartLink\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1cfb2d895aa03dade63dd343cb75199c';
module.exports = node;
