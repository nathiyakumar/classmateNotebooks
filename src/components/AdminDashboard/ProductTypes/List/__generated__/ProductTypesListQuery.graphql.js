/**
 * @flow
 * @relayHash 492b8b06d80dcecf9d97fb5628c79d90
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductTypeTaxType = "FIXED" | "PERCENTAGE" | "%future added value";
export type ProductTypesListQueryVariables = {||};
export type ProductTypesListQueryResponse = {|
  +listOfProductType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +taxRate: ?string,
    +taxType: ProductTypeTaxType,
  |}>
|};
export type ProductTypesListQuery = {|
  variables: ProductTypesListQueryVariables,
  response: ProductTypesListQueryResponse,
|};
*/


/*
query ProductTypesListQuery {
  listOfProductType {
    id
    name
    taxRate
    taxType
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "taxRate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "taxType",
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
    "name": "ProductTypesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductTypesListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductTypesListQuery",
    "id": null,
    "text": "query ProductTypesListQuery {\n  listOfProductType {\n    id\n    name\n    taxRate\n    taxType\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8ced89220c41793f52b0faf9805aa3dc';
module.exports = node;
