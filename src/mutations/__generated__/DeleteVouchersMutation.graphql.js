/**
 * @flow
 * @relayHash 71c95249d3c2ca2b6c12c05c84901713
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteVouchersMutationVariables = {|
  voucherIds?: ?$ReadOnlyArray<?string>
|};
export type DeleteVouchersMutationResponse = {|
  +deleteVoucher: ?{|
    +message: ?string
  |}
|};
export type DeleteVouchersMutation = {|
  variables: DeleteVouchersMutationVariables,
  response: DeleteVouchersMutationResponse,
|};
*/


/*
mutation DeleteVouchersMutation(
  $voucherIds: [ID]
) {
  deleteVoucher(voucherIds: $voucherIds) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "voucherIds",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteVoucher",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "voucherIds",
        "variableName": "voucherIds"
      }
    ],
    "concreteType": "DeleteVoucher",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
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
    "name": "DeleteVouchersMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteVouchersMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteVouchersMutation",
    "id": null,
    "text": "mutation DeleteVouchersMutation(\n  $voucherIds: [ID]\n) {\n  deleteVoucher(voucherIds: $voucherIds) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2e297e37113fede6a9259d872103be83';
module.exports = node;
