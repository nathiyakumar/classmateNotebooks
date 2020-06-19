/**
 * @flow
 * @relayHash d36e402016f5f48d1e6db720fb070cee
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomDesignProductListProductsByCategoryQueryVariables = {|
  categoryId?: ?string,
  isAvailable?: ?boolean,
|};
export type CustomDesignProductListProductsByCategoryQueryResponse = {|
  +licensedDesignBooks: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +isAvailable: boolean,
    +thumbnailUrl: ?string,
    +category: {|
      +id: string,
      +name: string,
    |},
  |}>
|};
export type CustomDesignProductListProductsByCategoryQuery = {|
  variables: CustomDesignProductListProductsByCategoryQueryVariables,
  response: CustomDesignProductListProductsByCategoryQueryResponse,
|};
*/


/*
query CustomDesignProductListProductsByCategoryQuery(
  $categoryId: ID
  $isAvailable: Boolean
) {
  licensedDesignBooks(categoryId: $categoryId, isAvailable: $isAvailable) {
    id
    name
    isAvailable
    thumbnailUrl
    category {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isAvailable",
    "type": "Boolean",
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
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "licensedDesignBooks",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "isAvailable",
        "variableName": "isAvailable"
      }
    ],
    "concreteType": "LicensedDesignBooksType",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isAvailable",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "thumbnailUrl",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "category",
        "storageKey": null,
        "args": null,
        "concreteType": "LicensedDesignBooksCategoryType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CustomDesignProductListProductsByCategoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomDesignProductListProductsByCategoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CustomDesignProductListProductsByCategoryQuery",
    "id": null,
    "text": "query CustomDesignProductListProductsByCategoryQuery(\n  $categoryId: ID\n  $isAvailable: Boolean\n) {\n  licensedDesignBooks(categoryId: $categoryId, isAvailable: $isAvailable) {\n    id\n    name\n    isAvailable\n    thumbnailUrl\n    category {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0af5c8f397a63f3d5a0b780f749548fd';
module.exports = node;
