/**
 * @flow
 * @relayHash c100aca198e1e13c800a8061f69b7c11
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminEditProductCollectionListQueryVariables = {||};
export type AdminEditProductCollectionListQueryResponse = {|
  +listOfVouchers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type AdminEditProductCollectionListQuery = {|
  variables: AdminEditProductCollectionListQueryVariables,
  response: AdminEditProductCollectionListQueryResponse,
|};
*/


/*
query AdminEditProductCollectionListQuery {
  listOfVouchers {
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
    "name": "listOfVouchers",
    "storageKey": null,
    "args": null,
    "concreteType": "VouchersType",
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
    "name": "AdminEditProductCollectionListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminEditProductCollectionListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminEditProductCollectionListQuery",
    "id": null,
    "text": "query AdminEditProductCollectionListQuery {\n  listOfVouchers {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7e8fdb3f760c367dfeffbf27be5c59bf';
module.exports = node;
