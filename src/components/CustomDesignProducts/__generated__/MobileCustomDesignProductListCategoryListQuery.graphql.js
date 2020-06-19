/**
 * @flow
 * @relayHash 407a535f1017906fdfd2e90e44749e25
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileCustomDesignProductListCategoryListQueryVariables = {|
  isAvailable?: ?boolean
|};
export type MobileCustomDesignProductListCategoryListQueryResponse = {|
  +licensedDesignBooksCategory: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type MobileCustomDesignProductListCategoryListQuery = {|
  variables: MobileCustomDesignProductListCategoryListQueryVariables,
  response: MobileCustomDesignProductListCategoryListQueryResponse,
|};
*/


/*
query MobileCustomDesignProductListCategoryListQuery(
  $isAvailable: Boolean
) {
  licensedDesignBooksCategory(isAvailable: $isAvailable) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "isAvailable",
    "type": "Boolean",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "licensedDesignBooksCategory",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "isAvailable",
        "variableName": "isAvailable"
      }
    ],
    "concreteType": "LicensedDesignBooksCategoryType",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MobileCustomDesignProductListCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileCustomDesignProductListCategoryListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MobileCustomDesignProductListCategoryListQuery",
    "id": null,
    "text": "query MobileCustomDesignProductListCategoryListQuery(\n  $isAvailable: Boolean\n) {\n  licensedDesignBooksCategory(isAvailable: $isAvailable) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e1c033dd9d908736a132bae8fa4731d4';
module.exports = node;
