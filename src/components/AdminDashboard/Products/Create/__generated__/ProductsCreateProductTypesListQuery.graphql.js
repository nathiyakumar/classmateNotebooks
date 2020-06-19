/**
 * @flow
 * @relayHash 417eecff23984ca1bf423af8bc231bc2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsCreateProductTypesListQueryVariables = {||};
export type ProductsCreateProductTypesListQueryResponse = {|
  +listOfProductType: ?$ReadOnlyArray<?{|
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
  |}>
|};
export type ProductsCreateProductTypesListQuery = {|
  variables: ProductsCreateProductTypesListQueryVariables,
  response: ProductsCreateProductTypesListQueryResponse,
|};
*/


/*
query ProductsCreateProductTypesListQuery {
  listOfProductType {
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
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "listOfProductType",
    "storageKey": null,
    "args": null,
    "concreteType": "ProducttypeType",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "productAttributes",
        "storageKey": "productAttributes(first:100)",
        "args": (v2/*: any*/),
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
                  (v0/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slug",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "values",
                    "storageKey": "values(first:100)",
                    "args": (v2/*: any*/),
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
                              (v0/*: any*/),
                              (v1/*: any*/),
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
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductsCreateProductTypesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsCreateProductTypesListQuery",
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsCreateProductTypesListQuery",
    "id": null,
    "text": "query ProductsCreateProductTypesListQuery {\n  listOfProductType {\n    id\n    name\n    productAttributes(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          values(first: 100) {\n            edges {\n              node {\n                id\n                name\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd3133737b8a07d9cda4d0a488f0534ea';
module.exports = node;
