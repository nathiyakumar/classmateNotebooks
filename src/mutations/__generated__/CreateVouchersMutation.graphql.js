/**
 * @flow
 * @relayHash 788654b3aa1c02cc105153683f4e398a
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
export type CreateVouchersMutationVariables = {|
  input?: ?VoucherInput
|};
export type CreateVouchersMutationResponse = {|
  +createVoucher: ?{|
    +message: ?string,
    +voucher: ?{|
      +id: string
    |},
  |}
|};
export type CreateVouchersMutation = {|
  variables: CreateVouchersMutationVariables,
  response: CreateVouchersMutationResponse,
|};
*/


/*
mutation CreateVouchersMutation(
  $input: VoucherInput
) {
  createVoucher(input: $input) {
    message
    voucher {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "name": "createVoucher",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateVoucher",
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
    "name": "CreateVouchersMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateVouchersMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateVouchersMutation",
    "id": null,
    "text": "mutation CreateVouchersMutation(\n  $input: VoucherInput\n) {\n  createVoucher(input: $input) {\n    message\n    voucher {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3d714f46a52c0959b33c168ed983f7d5';
module.exports = node;
