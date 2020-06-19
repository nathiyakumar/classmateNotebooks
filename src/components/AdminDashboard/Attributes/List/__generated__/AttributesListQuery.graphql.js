/**
 * @flow
 * @relayHash ea77ef6d580f98442858a9edf7eece0b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AttributesListQueryVariables = {||};
export type AttributesListQueryResponse = {|
  +listAttribute: ?$ReadOnlyArray<?{|
    +id: string,
    +slug: string,
    +name: string,
  |}>
|};
export type AttributesListQuery = {|
  variables: AttributesListQueryVariables,
  response: AttributesListQueryResponse,
|};
*/


/*
query AttributesListQuery {
  listAttribute {
    id
    slug
    name
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
        "name": "slug",
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
    "name": "AttributesListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AttributesListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AttributesListQuery",
    "id": null,
    "text": "query AttributesListQuery {\n  listAttribute {\n    id\n    slug\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '14180cc97e32ac79b0dc46c34e398f3d';
module.exports = node;
