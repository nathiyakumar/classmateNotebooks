/**
 * @flow
 * @relayHash 77021d03be1b274b873d032b48d3db1b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherEditCategoryListQueryVariables = {||};
export type VoucherEditCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type VoucherEditCategoryListQuery = {|
  variables: VoucherEditCategoryListQueryVariables,
  response: VoucherEditCategoryListQueryResponse,
|};
*/


/*
query VoucherEditCategoryListQuery {
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
    "name": "VoucherEditCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherEditCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherEditCategoryListQuery",
    "id": null,
    "text": "query VoucherEditCategoryListQuery {\n  categorys {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b52b68ff79bfe03161a2285e3d00e127';
module.exports = node;
