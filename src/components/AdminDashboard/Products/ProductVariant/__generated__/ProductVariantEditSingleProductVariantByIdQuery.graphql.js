/**
 * @flow
 * @relayHash 3f1648190e524f9dd289847fc1b21f66
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductVariantEditSingleProductVariantByIdQueryVariables = {|
  id: string
|};
export type ProductVariantEditSingleProductVariantByIdQueryResponse = {|
  +productVariant: ?{|
    +id: string,
    +attributes: any,
    +quantity: number,
    +stockQuantity: number,
    +quantityAllocated: number,
    +costPrice: ?number,
    +images: ?$ReadOnlyArray<?{|
      +id: string,
      +url: string,
    |}>,
    +name: string,
    +priceOverride: ?number,
    +product: {|
      +id: string,
      +images: ?{|
        +edges: $ReadOnlyArray<{|
          +node: {|
            +id: string,
            +url: string,
          |}
        |}>
      |},
      +name: string,
      +variants: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +name: string,
            +sku: string,
            +images: ?$ReadOnlyArray<?{|
              +id: string,
              +url: string,
            |}>,
          |}
        |}>
      |},
      +masterSku: ?string,
      +quantity: ?number,
      +productType: {|
        +id: string,
        +variantAttributes: ?{|
          +edges: $ReadOnlyArray<?{|
            +node: ?{|
              +id: string,
              +slug: string,
              +name: string,
              +values: ?{|
                +edges: $ReadOnlyArray<?{|
                  +node: ?{|
                    +id: string,
                    +name: string,
                    +value: string,
                    +slug: string,
                  |}
                |}>
              |},
            |}
          |}>
        |},
      |},
    |},
  |}
|};
export type ProductVariantEditSingleProductVariantByIdQuery = {|
  variables: ProductVariantEditSingleProductVariantByIdQueryVariables,
  response: ProductVariantEditSingleProductVariantByIdQueryResponse,
|};
*/


/*
query ProductVariantEditSingleProductVariantByIdQuery(
  $id: ID!
) {
  productVariant(id: $id) {
    id
    attributes
    quantity
    stockQuantity
    quantityAllocated
    costPrice
    images {
      id
      url
    }
    name
    priceOverride
    product {
      id
      images(first: 100) {
        edges {
          node {
            id
            url
          }
        }
      }
      name
      variants(first: 100) {
        edges {
          node {
            id
            name
            sku
            images {
              id
              url
            }
          }
        }
      }
      masterSku
      quantity
      productType {
        id
        variantAttributes(first: 100) {
          edges {
            node {
              id
              slug
              name
              values(first: 100) {
                edges {
                  node {
                    id
                    name
                    value
                    slug
                  }
                }
              }
            }
          }
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
    "name": "id",
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
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "images",
  "storageKey": null,
  "args": null,
  "concreteType": "VariantImageType",
  "plural": true,
  "selections": (v3/*: any*/)
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v8 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "productVariant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "ProductVariantType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "attributes",
        "args": null,
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "stockQuantity",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "quantityAllocated",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "costPrice",
        "args": null,
        "storageKey": null
      },
      (v4/*: any*/),
      (v5/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "priceOverride",
        "args": null,
        "storageKey": null
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
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:100)",
            "args": (v6/*: any*/),
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
                    "selections": (v3/*: any*/)
                  }
                ]
              }
            ]
          },
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "variants",
            "storageKey": "variants(first:100)",
            "args": (v6/*: any*/),
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
                      (v1/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "sku",
                        "args": null,
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "masterSku",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "productType",
            "storageKey": null,
            "args": null,
            "concreteType": "ProducttypeType",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "variantAttributes",
                "storageKey": "variantAttributes(first:100)",
                "args": (v6/*: any*/),
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
                          (v1/*: any*/),
                          (v7/*: any*/),
                          (v5/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "values",
                            "storageKey": "values(first:100)",
                            "args": (v6/*: any*/),
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
                                    "selections": [
                                      (v1/*: any*/),
                                      (v5/*: any*/),
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "value",
                                        "args": null,
                                        "storageKey": null
                                      },
                                      (v7/*: any*/)
                                    ]
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
    "name": "ProductVariantEditSingleProductVariantByIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v8/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductVariantEditSingleProductVariantByIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v8/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductVariantEditSingleProductVariantByIdQuery",
    "id": null,
    "text": "query ProductVariantEditSingleProductVariantByIdQuery(\n  $id: ID!\n) {\n  productVariant(id: $id) {\n    id\n    attributes\n    quantity\n    stockQuantity\n    quantityAllocated\n    costPrice\n    images {\n      id\n      url\n    }\n    name\n    priceOverride\n    product {\n      id\n      images(first: 100) {\n        edges {\n          node {\n            id\n            url\n          }\n        }\n      }\n      name\n      variants(first: 100) {\n        edges {\n          node {\n            id\n            name\n            sku\n            images {\n              id\n              url\n            }\n          }\n        }\n      }\n      masterSku\n      quantity\n      productType {\n        id\n        variantAttributes(first: 100) {\n          edges {\n            node {\n              id\n              slug\n              name\n              values(first: 100) {\n                edges {\n                  node {\n                    id\n                    name\n                    value\n                    slug\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e67368d07c7ea1f373d454f3d0824f4c';
module.exports = node;
