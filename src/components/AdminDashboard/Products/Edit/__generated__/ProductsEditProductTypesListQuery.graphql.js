/**
 * @flow
 * @relayHash 6946acb195b8a9b30b210c6849e0aade
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsEditProductTypesListQueryVariables = {||};
export type ProductsEditProductTypesListQueryResponse = {|
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
export type ProductsEditProductTypesListQuery = {|
  variables: ProductsEditProductTypesListQueryVariables,
  response: ProductsEditProductTypesListQueryResponse,
|};
*/


/*
query ProductsEditProductTypesListQuery {
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
    "name": "ProductsEditProductTypesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsEditProductTypesListQuery",
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsEditProductTypesListQuery",
    "id": null,
    "text": "query ProductsEditProductTypesListQuery {\n  listOfProductType {\n    id\n    name\n    productAttributes(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          values(first: 100) {\n            edges {\n              node {\n                id\n                name\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b58462eb98113dfe7f56acb55465506a';
module.exports = node;
