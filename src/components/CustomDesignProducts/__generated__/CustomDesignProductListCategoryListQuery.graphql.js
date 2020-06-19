/**
 * @flow
 * @relayHash 57c4a3fa110bc81f068d1052a073173b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomDesignProductListCategoryListQueryVariables = {|
  isAvailable?: ?boolean
|};
export type CustomDesignProductListCategoryListQueryResponse = {|
  +licensedDesignBooksCategory: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type CustomDesignProductListCategoryListQuery = {|
  variables: CustomDesignProductListCategoryListQueryVariables,
  response: CustomDesignProductListCategoryListQueryResponse,
|};
*/


/*
query CustomDesignProductListCategoryListQuery(
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
    "name": "CustomDesignProductListCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomDesignProductListCategoryListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CustomDesignProductListCategoryListQuery",
    "id": null,
    "text": "query CustomDesignProductListCategoryListQuery(\n  $isAvailable: Boolean\n) {\n  licensedDesignBooksCategory(isAvailable: $isAvailable) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '40523550c625d993f29d2d3c746d5bdd';
module.exports = node;
