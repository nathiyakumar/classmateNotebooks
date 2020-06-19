/**
 * @flow
 * @relayHash a1139bae7547b20ae2a4db2b9ecf96e3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ThumbnailTableQueryVariables = {|
  orderId: string
|};
export type ThumbnailTableQueryResponse = {|
  +designThumbnailImageOrder: ?any
|};
export type ThumbnailTableQuery = {|
  variables: ThumbnailTableQueryVariables,
  response: ThumbnailTableQueryResponse,
|};
*/


/*
query ThumbnailTableQuery(
  $orderId: String!
) {
  designThumbnailImageOrder(orderId: $orderId)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "designThumbnailImageOrder",
    "args": [
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ThumbnailTableQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ThumbnailTableQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ThumbnailTableQuery",
    "id": null,
    "text": "query ThumbnailTableQuery(\n  $orderId: String!\n) {\n  designThumbnailImageOrder(orderId: $orderId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9bf04cdc0dd311f068dd8d075277fc37';
module.exports = node;
