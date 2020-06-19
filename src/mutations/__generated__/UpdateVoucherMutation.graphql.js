/**
 * @flow
 * @relayHash ea11252884af84ca8750981902f418ae
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DiscountTypesEnum = "FIXED" | "PERCENTAGE" | "%future added value";
export type VoucherTypesEnum = "CATEGORY" | "COLLECTION" | "PRODUCT" | "SHIPPING" | "VALUE" | "%future added value";
export type VoucherInput = {|
  type: VoucherTypesEnum,
  name: string,
  code: string,
  usageLimit?: ?number,
  startDate?: ?string,
  endDate?: ?string,
  isActive?: ?boolean,
  applyOncePerOrder?: ?boolean,
  discountValueType: DiscountTypesEnum,
  discountValue: number,
  minAmountSpent?: ?number,
  maxDiscountValue?: ?number,
  products?: ?$ReadOnlyArray<?string>,
  collections?: ?$ReadOnlyArray<?string>,
  categories?: ?$ReadOnlyArray<?string>,
|};
export type UpdateVoucherMutationVariables = {|
  voucherId?: ?string,
  input?: ?VoucherInput,
|};
export type UpdateVoucherMutationResponse = {|
  +updateVoucher: ?{|
    +message: ?string,
    +voucher: ?{|
      +id: string,
      +usageLimit: ?number,
    |},
  |}
|};
export type UpdateVoucherMutation = {|
  variables: UpdateVoucherMutationVariables,
  response: UpdateVoucherMutationResponse,
|};
*/


/*
mutation UpdateVoucherMutation(
  $voucherId: ID
  $input: VoucherInput
) {
  updateVoucher(voucherId: $voucherId, input: $input) {
    message
    voucher {
      id
      usageLimit
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "voucherId",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "VoucherInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateVoucher",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "voucherId",
        "variableName": "voucherId"
      }
    ],
    "concreteType": "UpdateVoucher",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "voucher",
        "storageKey": null,
        "args": null,
        "concreteType": "VouchersType",
        "plural": false,
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
            "name": "usageLimit",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UpdateVoucherMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateVoucherMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateVoucherMutation",
    "id": null,
    "text": "mutation UpdateVoucherMutation(\n  $voucherId: ID\n  $input: VoucherInput\n) {\n  updateVoucher(voucherId: $voucherId, input: $input) {\n    message\n    voucher {\n      id\n      usageLimit\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9ea3955531ed79013a2978087c2a7d46';
module.exports = node;
