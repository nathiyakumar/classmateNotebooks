/**
 * @flow
 * @relayHash 518f42c69fe468bea2ad34d3106545a6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoriesListQueryVariables = {||};
export type CategoriesListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +parent: ?{|
      +id: string
    |},
    +children: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
  |}>
|};
export type CategoriesListQuery = {|
  variables: CategoriesListQueryVariables,
  response: CategoriesListQueryResponse,
|};
*/


/*
query CategoriesListQuery {
  categorys {
    id
    name
    parent {
      id
    }
    children(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
    products(first: 10) {
      edges {
        node {
          id
          name
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
    "value": 10
  }
],
v3 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v4 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "categorys",
    "storageKey": null,
    "args": null,
    "concreteType": "CategoryType",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "parent",
        "storageKey": null,
        "args": null,
        "concreteType": "CategoryType",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "children",
        "storageKey": "children(first:10)",
        "args": (v2/*: any*/),
        "concreteType": "CategoryTypeConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CategoryTypeEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "CategoryType",
                "plural": false,
                "selections": (v3/*: any*/)
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": "products(first:10)",
        "args": (v2/*: any*/),
        "concreteType": "ProductsTypeConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ProductsTypeEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductsType",
                "plural": false,
                "selections": (v3/*: any*/)
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
    "name": "CategoriesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CategoriesListQuery",
    "argumentDefinitions": [],
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CategoriesListQuery",
    "id": null,
    "text": "query CategoriesListQuery {\n  categorys {\n    id\n    name\n    parent {\n      id\n    }\n    children(first: 10) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    products(first: 10) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c26910bae4b9fc404751696984f63599';
module.exports = node;
