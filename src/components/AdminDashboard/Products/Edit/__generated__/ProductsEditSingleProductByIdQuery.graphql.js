/**
 * @flow
 * @relayHash 05806043301f197176518d3e7a8e5966
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsEditSingleProductByIdQueryVariables = {|
  id: string
|};
export type ProductsEditSingleProductByIdQueryResponse = {|
  +product: ?{|
    +id: string,
    +name: string,
    +description: string,
    +chargeTaxes: boolean,
    +price: ?number,
    +masterSku: ?string,
    +weight: number,
    +length: number,
    +height: number,
    +width: number,
    +taxRate: ?string,
    +isActive: boolean,
    +isFeatured: boolean,
    +attributes: any,
    +amazonLink: ?string,
    +flipkartLink: ?string,
    +classmateShopLink: ?string,
    +featuredImage: ?$ReadOnlyArray<?{|
      +id: string,
      +url: string,
    |}>,
    +productType: {|
      +id: string,
      +name: string,
      +productAttributes: ?{|
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
                |}
              |}>
            |},
          |}
        |}>
      |},
    |},
    +category: ?{|
      +id: string,
      +name: string,
      +branding: boolean,
    |},
    +collections: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
    +images: ?{|
      +edges: $ReadOnlyArray<{|
        +node: {|
          +id: string,
          +url: string,
        |}
      |}>
    |},
    +variants: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +sku: string,
          +stockQuantity: number,
          +isAvailable: ?boolean,
          +price: ?number,
          +images: ?$ReadOnlyArray<?{|
            +id: string,
            +url: string,
          |}>,
        |}
      |}>
    |},
  |}
|};
export type ProductsEditSingleProductByIdQuery = {|
  variables: ProductsEditSingleProductByIdQueryVariables,
  response: ProductsEditSingleProductByIdQueryResponse,
|};
*/


/*
query ProductsEditSingleProductByIdQuery(
  $id: ID!
) {
  product(id: $id) {
    id
    name
    description
    chargeTaxes
    price
    masterSku
    weight
    length
    height
    width
    taxRate
    isActive
    isFeatured
    attributes
    amazonLink
    flipkartLink
    classmateShopLink
    featuredImage {
      id
      url
    }
    productType {
      id
      name
      productAttributes(first: 100) {
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
                }
              }
            }
          }
        }
      }
    }
    category {
      id
      name
      branding
    }
    collections(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    images(first: 100) {
      edges {
        node {
          id
          url
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          name
          sku
          stockQuantity
          isAvailable
          price
          images {
            id
            url
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v6 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "product",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "ProductsType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
        "name": "chargeTaxes",
        "args": null,
        "storageKey": null
      },
      (v3/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "masterSku",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "weight",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "length",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "height",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "width",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "taxRate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isActive",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isFeatured",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "attributes",
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "classmateShopLink",
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
        "selections": (v4/*: any*/)
      },
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
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "productAttributes",
            "storageKey": "productAttributes(first:100)",
            "args": (v5/*: any*/),
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
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "slug",
                        "args": null,
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "values",
                        "storageKey": "values(first:100)",
                        "args": (v5/*: any*/),
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
                                  (v2/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "value",
                                    "args": null,
                                    "storageKey": null
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
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "branding",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "collections",
        "storageKey": "collections(first:100)",
        "args": (v5/*: any*/),
        "concreteType": "CollectionTypeConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CollectionTypeEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "CollectionType",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "images",
        "storageKey": "images(first:100)",
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
                "selections": (v4/*: any*/)
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "variants",
        "storageKey": "variants(first:100)",
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "sku",
                    "args": null,
                    "storageKey": null
                  },
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
                    "name": "isAvailable",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "images",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "VariantImageType",
                    "plural": true,
                    "selections": (v4/*: any*/)
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
    "name": "ProductsEditSingleProductByIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v6/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsEditSingleProductByIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v6/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsEditSingleProductByIdQuery",
    "id": null,
    "text": "query ProductsEditSingleProductByIdQuery(\n  $id: ID!\n) {\n  product(id: $id) {\n    id\n    name\n    description\n    chargeTaxes\n    price\n    masterSku\n    weight\n    length\n    height\n    width\n    taxRate\n    isActive\n    isFeatured\n    attributes\n    amazonLink\n    flipkartLink\n    classmateShopLink\n    featuredImage {\n      id\n      url\n    }\n    productType {\n      id\n      name\n      productAttributes(first: 100) {\n        edges {\n          node {\n            id\n            slug\n            name\n            values(first: 100) {\n              edges {\n                node {\n                  id\n                  name\n                  value\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    category {\n      id\n      name\n      branding\n    }\n    collections(first: 100) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    images(first: 100) {\n      edges {\n        node {\n          id\n          url\n        }\n      }\n    }\n    variants(first: 100) {\n      edges {\n        node {\n          id\n          name\n          sku\n          stockQuantity\n          isAvailable\n          price\n          images {\n            id\n            url\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '45cd7948be4e969111c633ba01f2d181';
module.exports = node;
