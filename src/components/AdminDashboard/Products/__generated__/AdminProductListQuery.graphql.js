/**
 * @flow
 * @relayHash 9e5a6ab4b57ba1d9a64b6e903ddc81db
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductUnits = "G" | "KG" | "%future added value";
export type AdminProductListQueryVariables = {||};
export type AdminProductListQueryResponse = {|
  +adminProductsList: ?$ReadOnlyArray<?{|
    +id: string,
    +publicationDate: ?any,
    +isPublished: boolean,
    +productType: {|
      +id: string,
      +name: string,
    |},
    +name: string,
    +description: string,
    +category: ?{|
      +id: string,
      +name: string,
    |},
    +isFeatured: boolean,
    +isActive: boolean,
    +masterSku: ?string,
    +price: ?number,
    +updatedAt: ?any,
    +chargeTaxes: boolean,
    +quantity: ?number,
    +weight: number,
    +units: ?ProductUnits,
    +slug: ?string,
    +images: ?{|
      +edges: $ReadOnlyArray<{|
        +node: {|
          +url: string
        |}
      |}>
    |},
  |}>
|};
export type AdminProductListQuery = {|
  variables: AdminProductListQueryVariables,
  response: AdminProductListQueryResponse,
|};
*/


/*
query AdminProductListQuery {
  adminProductsList {
    id
    publicationDate
    isPublished
    productType {
      id
      name
    }
    name
    description
    category {
      id
      name
    }
    isFeatured
    isActive
    masterSku
    price
    updatedAt
    chargeTaxes
    quantity
    weight
    units
    slug
    images(first: 1) {
      edges {
        node {
          url
          id
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
  "name": "publicationDate",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isPublished",
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
  (v0/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "productType",
  "storageKey": null,
  "args": null,
  "concreteType": "ProducttypeType",
  "plural": false,
  "selections": (v4/*: any*/)
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": (v4/*: any*/)
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isFeatured",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isActive",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "masterSku",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "updatedAt",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "chargeTaxes",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weight",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "units",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v18 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AdminProductListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminProductsList",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v5/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v18/*: any*/),
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
                      (v19/*: any*/)
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
    "name": "AdminProductListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminProductsList",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v5/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": "images(first:1)",
            "args": (v18/*: any*/),
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
                      (v19/*: any*/),
                      (v0/*: any*/)
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
    "name": "AdminProductListQuery",
    "id": null,
    "text": "query AdminProductListQuery {\n  adminProductsList {\n    id\n    publicationDate\n    isPublished\n    productType {\n      id\n      name\n    }\n    name\n    description\n    category {\n      id\n      name\n    }\n    isFeatured\n    isActive\n    masterSku\n    price\n    updatedAt\n    chargeTaxes\n    quantity\n    weight\n    units\n    slug\n    images(first: 1) {\n      edges {\n        node {\n          url\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7e5caeb5796c6a73e6bd0c46d84142f0';
module.exports = node;
