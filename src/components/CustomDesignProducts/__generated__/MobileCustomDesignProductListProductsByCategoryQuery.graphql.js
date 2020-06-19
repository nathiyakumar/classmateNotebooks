/**
 * @flow
 * @relayHash 1a824b584fc31e41504e532a2409b227
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileCustomDesignProductListProductsByCategoryQueryVariables = {|
  categoryId?: ?string,
  isAvailable?: ?boolean,
|};
export type MobileCustomDesignProductListProductsByCategoryQueryResponse = {|
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
export type MobileCustomDesignProductListProductsByCategoryQuery = {|
  variables: MobileCustomDesignProductListProductsByCategoryQueryVariables,
  response: MobileCustomDesignProductListProductsByCategoryQueryResponse,
|};
*/


/*
query MobileCustomDesignProductListProductsByCategoryQuery(
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
    "name": "MobileCustomDesignProductListProductsByCategoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileCustomDesignProductListProductsByCategoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MobileCustomDesignProductListProductsByCategoryQuery",
    "id": null,
    "text": "query MobileCustomDesignProductListProductsByCategoryQuery(\n  $categoryId: ID\n  $isAvailable: Boolean\n) {\n  licensedDesignBooks(categoryId: $categoryId, isAvailable: $isAvailable) {\n    id\n    name\n    isAvailable\n    thumbnailUrl\n    category {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c3c8b4116fdbc920eadb15641263e6a';
module.exports = node;
