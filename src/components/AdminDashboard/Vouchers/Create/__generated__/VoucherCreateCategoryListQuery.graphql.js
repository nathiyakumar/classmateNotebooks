/**
 * @flow
 * @relayHash 0d71f336f671cc8355340d14112be68a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherCreateCategoryListQueryVariables = {||};
export type VoucherCreateCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type VoucherCreateCategoryListQuery = {|
  variables: VoucherCreateCategoryListQueryVariables,
  response: VoucherCreateCategoryListQueryResponse,
|};
*/


/*
query VoucherCreateCategoryListQuery {
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
    "name": "VoucherCreateCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherCreateCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherCreateCategoryListQuery",
    "id": null,
    "text": "query VoucherCreateCategoryListQuery {\n  categorys {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ad8ed4ea4522039580504f443ce1aec9';
module.exports = node;
