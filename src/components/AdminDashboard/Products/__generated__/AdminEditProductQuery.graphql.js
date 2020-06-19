/**
 * @flow
 * @relayHash 8522a614c66f841020ca9837a895bdf0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminEditProductQueryVariables = {|
  id: string
|};
export type AdminEditProductQueryResponse = {|
  +productVariant: ?{|
    +id: string,
    +product: {|
      +name: string,
      +description: string,
      +images: ?{|
        +edges: $ReadOnlyArray<{|
          +node: {|
            +url: string
          |}
        |}>
      |},
      +chargeTaxes: boolean,
      +attributes: any,
      +price: ?number,
      +variants: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +name: string,
          |}
        |}>
      |},
      +seoTitle: string,
      +seoDescription: string,
      +productType: {|
        +id: string,
        +name: string,
      |},
      +category: ?{|
        +id: string,
        +name: string,
      |},
    |},
  |}
|};
export type AdminEditProductQuery = {|
  variables: AdminEditProductQueryVariables,
  response: AdminEditProductQueryResponse,
|};
*/


/*
query AdminEditProductQuery(
  $id: ID!
) {
  productVariant(id: $id) {
    id
    product {
      name
      description
      images(first: 1) {
        edges {
          node {
            url
            id
          }
        }
      }
      chargeTaxes
      attributes
      price
      variants {
        edges {
          node {
            id
            name
          }
        }
      }
      seoTitle
      seoDescription
      productType {
        id
        name
      }
      category {
        id
        name
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
  "name": "description",
  "args": null,
  "storageKey": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "chargeTaxes",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "attributes",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v10 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "variants",
  "storageKey": null,
  "args": null,
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
          "selections": (v10/*: any*/)
        }
      ]
    }
  ]
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seoTitle",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seoDescription",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "productType",
  "storageKey": null,
  "args": null,
  "concreteType": "ProducttypeType",
  "plural": false,
  "selections": (v10/*: any*/)
},
v15 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": (v10/*: any*/)
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AdminEditProductQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "productVariant",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductVariantType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminEditProductQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "productVariant",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductVariantType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
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
                          (v2/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AdminEditProductQuery",
    "id": null,
    "text": "query AdminEditProductQuery(\n  $id: ID!\n) {\n  productVariant(id: $id) {\n    id\n    product {\n      name\n      description\n      images(first: 1) {\n        edges {\n          node {\n            url\n            id\n          }\n        }\n      }\n      chargeTaxes\n      attributes\n      price\n      variants {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      seoTitle\n      seoDescription\n      productType {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cb033471fa0128340dd56881ad305ff9';
module.exports = node;
