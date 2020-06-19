/**
 * @flow
 * @relayHash be62dc41c7b2ed65fc0f9481835cdde7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminEditProductCategoryListQueryVariables = {||};
export type AdminEditProductCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type AdminEditProductCategoryListQuery = {|
  variables: AdminEditProductCategoryListQueryVariables,
  response: AdminEditProductCategoryListQueryResponse,
|};
*/


/*
query AdminEditProductCategoryListQuery {
  categorys {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "categorys",
    "storageKey": null,
    "args": null,
    "concreteType": "CategoryType",
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
    "name": "AdminEditProductCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminEditProductCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminEditProductCategoryListQuery",
    "id": null,
    "text": "query AdminEditProductCategoryListQuery {\n  categorys {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1ac9aba100de0f446433f5606a7c07e4';
module.exports = node;
