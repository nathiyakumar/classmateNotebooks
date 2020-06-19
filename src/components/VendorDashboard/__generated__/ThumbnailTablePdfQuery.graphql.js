/**
 * @flow
 * @relayHash cee5d29e6010926ab7649abf5269e25a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ThumbnailTablePdfQueryVariables = {|
  orderId: string
|};
export type ThumbnailTablePdfQueryResponse = {|
  +designPdfOrder: ?any
|};
export type ThumbnailTablePdfQuery = {|
  variables: ThumbnailTablePdfQueryVariables,
  response: ThumbnailTablePdfQueryResponse,
|};
*/


/*
query ThumbnailTablePdfQuery(
  $orderId: String!
) {
  designPdfOrder(orderId: $orderId)
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
    "name": "designPdfOrder",
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
    "name": "ThumbnailTablePdfQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ThumbnailTablePdfQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ThumbnailTablePdfQuery",
    "id": null,
    "text": "query ThumbnailTablePdfQuery(\n  $orderId: String!\n) {\n  designPdfOrder(orderId: $orderId)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cbf53da5caea4a76ea8aee9b283dfc19';
module.exports = node;
