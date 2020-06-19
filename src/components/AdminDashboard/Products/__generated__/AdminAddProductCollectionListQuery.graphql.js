/**
 * @flow
 * @relayHash 31d8bc775ad96dcf06dbd0a40ac7e4a0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminAddProductCollectionListQueryVariables = {||};
export type AdminAddProductCollectionListQueryResponse = {|
  +listOfVouchers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type AdminAddProductCollectionListQuery = {|
  variables: AdminAddProductCollectionListQueryVariables,
  response: AdminAddProductCollectionListQueryResponse,
|};
*/


/*
query AdminAddProductCollectionListQuery {
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
    "name": "AdminAddProductCollectionListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminAddProductCollectionListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminAddProductCollectionListQuery",
    "id": null,
    "text": "query AdminAddProductCollectionListQuery {\n  listOfVouchers {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd1afaf20b3a023ea022f3fdab1bf7a22';
module.exports = node;
