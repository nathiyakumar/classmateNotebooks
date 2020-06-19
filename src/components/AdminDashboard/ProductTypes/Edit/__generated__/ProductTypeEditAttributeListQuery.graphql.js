/**
 * @flow
 * @relayHash 8193038e7721987684656cf781948710
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductTypeEditAttributeListQueryVariables = {||};
export type ProductTypeEditAttributeListQueryResponse = {|
  +listAttribute: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +slug: string,
  |}>
|};
export type ProductTypeEditAttributeListQuery = {|
  variables: ProductTypeEditAttributeListQueryVariables,
  response: ProductTypeEditAttributeListQueryResponse,
|};
*/


/*
query ProductTypeEditAttributeListQuery {
  listAttribute {
    id
    name
    slug
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "listAttribute",
    "storageKey": null,
    "args": null,
    "concreteType": "AttributesType",
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
        "name": "slug",
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
    "name": "ProductTypeEditAttributeListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductTypeEditAttributeListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductTypeEditAttributeListQuery",
    "id": null,
    "text": "query ProductTypeEditAttributeListQuery {\n  listAttribute {\n    id\n    name\n    slug\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7ff279d992e2bc41f40f007ede8bcb66';
module.exports = node;
