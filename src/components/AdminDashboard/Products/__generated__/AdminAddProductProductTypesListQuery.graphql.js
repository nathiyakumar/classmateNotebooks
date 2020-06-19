/**
 * @flow
 * @relayHash b840f77cbc20f1858f5075cfae0bc02d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminAddProductProductTypesListQueryVariables = {||};
export type AdminAddProductProductTypesListQueryResponse = {|
  +listOfProductType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type AdminAddProductProductTypesListQuery = {|
  variables: AdminAddProductProductTypesListQueryVariables,
  response: AdminAddProductProductTypesListQueryResponse,
|};
*/


/*
query AdminAddProductProductTypesListQuery {
  listOfProductType {
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
    "name": "listOfProductType",
    "storageKey": null,
    "args": null,
    "concreteType": "ProducttypeType",
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
    "name": "AdminAddProductProductTypesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminAddProductProductTypesListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminAddProductProductTypesListQuery",
    "id": null,
    "text": "query AdminAddProductProductTypesListQuery {\n  listOfProductType {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2420568e6d0f227e46e187e123e6fd4d';
module.exports = node;
