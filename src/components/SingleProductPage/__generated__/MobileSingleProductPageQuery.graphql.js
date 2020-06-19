/**
 * @flow
 * @relayHash 343601918304671f96670be5c2b0a910
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileSingleProductPageQueryVariables = {|
  id: string
|};
export type MobileSingleProductPageQueryResponse = {|
  +productVariant: ?{|
    +id: string,
    +sku: string,
    +name: string,
    +costPrice: ?number,
    +priceOverride: ?number,
    +images: ?$ReadOnlyArray<?{|
      +url: string
    |}>,
    +attributes: any,
    +product: {|
      +seoTitle: string,
      +seoDescription: string,
      +description: string,
      +category: ?{|
        +id: string,
        +name: string,
      |},
      +productType: {|
        +productAttributes: ?{|
          +edges: $ReadOnlyArray<?{|
            +node: ?{|
              +id: string,
              +name: string,
              +values: ?{|
                +edges: $ReadOnlyArray<?{|
                  +node: ?{|
                    +id: string,
                    +name: string,
                  |}
                |}>
              |},
            |}
          |}>
        |}
      |},
    |},
  |}
|};
export type MobileSingleProductPageQuery = {|
  variables: MobileSingleProductPageQueryVariables,
  response: MobileSingleProductPageQueryResponse,
|};
*/


/*
query MobileSingleProductPageQuery(
  $id: ID!
) {
  productVariant(id: $id) {
    id
    sku
    name
    costPrice
    priceOverride
    images {
      url
      id
    }
    attributes
    product {
      seoTitle
      seoDescription
      description
      category {
        id
        name
      }
      productType {
        productAttributes(first: 10) {
          edges {
            node {
              id
              name
              values(first: 10) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
        id
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
  "name": "sku",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "priceOverride",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "attributes",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seoTitle",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seoDescription",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v12 = [
  (v2/*: any*/),
  (v4/*: any*/)
],
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": (v12/*: any*/)
},
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v15 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "productAttributes",
  "storageKey": "productAttributes(first:10)",
  "args": (v14/*: any*/),
  "concreteType": "AttributesTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "AttributesTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "AttributesType",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v4/*: any*/),
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "values",
              "storageKey": "values(first:10)",
              "args": (v14/*: any*/),
              "concreteType": "AttributeValueTypeConnection",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "edges",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AttributeValueTypeEdge",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "node",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "AttributeValueType",
                      "plural": false,
                      "selections": (v12/*: any*/)
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
    "name": "MobileSingleProductPageQuery",
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
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "productType",
                "storageKey": null,
                "args": null,
                "concreteType": "ProducttypeType",
                "plural": false,
                "selections": [
                  (v15/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileSingleProductPageQuery",
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
              (v2/*: any*/)
            ]
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsType",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "productType",
                "storageKey": null,
                "args": null,
                "concreteType": "ProducttypeType",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  (v2/*: any*/)
                ]
              },
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MobileSingleProductPageQuery",
    "id": null,
    "text": "query MobileSingleProductPageQuery(\n  $id: ID!\n) {\n  productVariant(id: $id) {\n    id\n    sku\n    name\n    costPrice\n    priceOverride\n    images {\n      url\n      id\n    }\n    attributes\n    product {\n      seoTitle\n      seoDescription\n      description\n      category {\n        id\n        name\n      }\n      productType {\n        productAttributes(first: 10) {\n          edges {\n            node {\n              id\n              name\n              values(first: 10) {\n                edges {\n                  node {\n                    id\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a329694b3e1eacdef978344c0197a52f';
module.exports = node;
