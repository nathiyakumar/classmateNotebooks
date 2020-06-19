/**
 * @flow
 * @relayHash 64183cdb1f17f0ca10260db31b957323
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminEditProductProductTypesListQueryVariables = {||};
export type AdminEditProductProductTypesListQueryResponse = {|
  +listOfProductType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type AdminEditProductProductTypesListQuery = {|
  variables: AdminEditProductProductTypesListQueryVariables,
  response: AdminEditProductProductTypesListQueryResponse,
|};
*/


/*
query AdminEditProductProductTypesListQuery {
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
    "name": "AdminEditProductProductTypesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminEditProductProductTypesListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminEditProductProductTypesListQuery",
    "id": null,
    "text": "query AdminEditProductProductTypesListQuery {\n  listOfProductType {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cddfdd9d81449c4df18b6a6980640695';
module.exports = node;
