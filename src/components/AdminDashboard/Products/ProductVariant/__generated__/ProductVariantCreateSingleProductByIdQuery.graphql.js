/**
 * @flow
 * @relayHash 7441be508e0abb71f8e675e4db5a96ba
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductVariantCreateSingleProductByIdQueryVariables = {|
  id: string
|};
export type ProductVariantCreateSingleProductByIdQueryResponse = {|
  +product: ?{|
    +id: string,
    +name: string,
    +images: ?{|
      +edges: $ReadOnlyArray<{|
        +node: {|
          +url: string
        |}
      |}>
    |},
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
                  +slug: string,
                |}
              |}>
            |},
          |}
        |}>
      |},
    |},
    +variants: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +sku: string,
          +images: ?$ReadOnlyArray<?{|
            +url: string
          |}>,
        |}
      |}>
    |},
  |}
|};
export type ProductVariantCreateSingleProductByIdQuery = {|
  variables: ProductVariantCreateSingleProductByIdQueryVariables,
  response: ProductVariantCreateSingleProductByIdQueryResponse,
|};
*/


/*
query ProductVariantCreateSingleProductByIdQuery(
  $id: ID!
) {
  product(id: $id) {
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
                  slug
                }
              }
            }
          }
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          name
          sku
          images {
            url
            id
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
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "productType",
  "storageKey": null,
  "args": null,
  "concreteType": "ProducttypeType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "variantAttributes",
      "storageKey": "variantAttributes(first:100)",
      "args": (v7/*: any*/),
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
                (v8/*: any*/),
                (v3/*: any*/),
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "values",
                  "storageKey": "values(first:100)",
                  "args": (v7/*: any*/),
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
                            (v2/*: any*/),
                            (v3/*: any*/),
                            (v8/*: any*/)
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
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sku",
  "args": null,
  "storageKey": null
},
v11 = [
  (v5/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductVariantCreateSingleProductByIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "product",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v4/*: any*/),
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
                    "selections": (v6/*: any*/)
                  }
                ]
              }
            ]
          },
          (v9/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "variants",
            "storageKey": "variants(first:100)",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": (v6/*: any*/)
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
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductVariantCreateSingleProductByIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "product",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v4/*: any*/),
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
                    "selections": (v11/*: any*/)
                  }
                ]
              }
            ]
          },
          (v9/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "variants",
            "storageKey": "variants(first:100)",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": (v11/*: any*/)
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
  },
  "params": {
    "operationKind": "query",
    "name": "ProductVariantCreateSingleProductByIdQuery",
    "id": null,
    "text": "query ProductVariantCreateSingleProductByIdQuery(\n  $id: ID!\n) {\n  product(id: $id) {\n    id\n    name\n    images(first: 1) {\n      edges {\n        node {\n          url\n          id\n        }\n      }\n    }\n    productType {\n      id\n      variantAttributes(first: 100) {\n        edges {\n          node {\n            id\n            slug\n            name\n            values(first: 100) {\n              edges {\n                node {\n                  id\n                  name\n                  slug\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    variants(first: 100) {\n      edges {\n        node {\n          id\n          name\n          sku\n          images {\n            url\n            id\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f087351f8e7b362d8a8669d5b25a09b9';
module.exports = node;
