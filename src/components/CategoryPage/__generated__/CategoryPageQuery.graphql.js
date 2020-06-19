/**
 * @flow
 * @relayHash 421542753091ca14def0c863bb5bd81d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoryPageQueryVariables = {|
  id: string
|};
export type CategoryPageQueryResponse = {|
  +category: ?{|
    +id: string,
    +name: string,
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +images: ?{|
            +edges: $ReadOnlyArray<{|
              +node: {|
                +url: string
              |}
            |}>
          |},
          +variants: ?{|
            +edges: $ReadOnlyArray<?{|
              +node: ?{|
                +id: string,
                +name: string,
                +priceOverride: ?number,
              |}
            |}>
          |},
        |}
      |}>
    |},
  |}
|};
export type CategoryPageQuery = {|
  variables: CategoryPageQueryVariables,
  response: CategoryPageQueryResponse,
|};
*/


/*
query CategoryPageQuery(
  $id: ID!
) {
  category(id: $id) {
    id
    name
    products(first: 100) {
      edges {
        node {
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
          variants(first: 1) {
            edges {
              node {
                id
                name
                priceOverride
              }
            }
          }
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function () {
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
                "value": 100
            }
        ],
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
            "kind": "LinkedField",
            "alias": null,
            "name": "variants",
            "storageKey": "variants(first:1)",
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
                                (v2/*: any*/),
                                (v3/*: any*/),
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "priceOverride",
                                    "args": null,
                                    "storageKey": null
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
            "name": "CategoryPageQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0/*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "category",
                    "storageKey": null,
                    "args": (v1/*: any*/),
                    "concreteType": "CategoryType",
                    "plural": false,
                    "selections": [
                        (v2/*: any*/),
                        (v3/*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "products",
                            "storageKey": "products(first:100)",
                            "args": (v4/*: any*/),
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
                                            "selections": [
                                                (v2/*: any*/),
                                                (v3/*: any*/),
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
        },
        "operation": {
            "kind": "Operation",
            "name": "CategoryPageQuery",
            "argumentDefinitions": (v0/*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "category",
                    "storageKey": null,
                    "args": (v1/*: any*/),
                    "concreteType": "CategoryType",
                    "plural": false,
                    "selections": [
                        (v2/*: any*/),
                        (v3/*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "products",
                            "storageKey": "products(first:100)",
                            "args": (v4/*: any*/),
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
                                            "selections": [
                                                (v2/*: any*/),
                                                (v3/*: any*/),
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
        },
        "params": {
            "operationKind": "query",
            "name": "CategoryPageQuery",
            "id": null,
            "text": "query CategoryPageQuery(\n  $id: ID!\n) {\n  category(id: $id) {\n    id\n    name\n    products(first: 100) {\n      edges {\n        node {\n          id\n          name\n          images(first: 1) {\n            edges {\n              node {\n                url\n                id\n              }\n            }\n          }\n          variants(first: 1) {\n            edges {\n              node {\n                id\n                name\n                priceOverride\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    };
})();
// prettier-ignore
(node/*: any*/).hash = 'd8e64a8d794a5b7c090180641516ed24';
module.exports = node;
