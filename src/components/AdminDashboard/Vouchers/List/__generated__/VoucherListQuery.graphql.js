/**
 * @flow
 * @relayHash ae79f3bb1bdc7e760419b2aeb05ce8b4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherListQueryVariables = {||};
export type VoucherListQueryResponse = {|
  +listOfVouchers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +code: string,
    +usageLimit: ?number,
    +startDate: any,
    +endDate: ?any,
    +discountValueType: ?string,
    +applyOncePerOrder: boolean,
    +discountValue: number,
    +minAmountSpent: number,
    +maxDiscountValue: number,
    +type: ?string,
  |}>
|};
export type VoucherListQuery = {|
  variables: VoucherListQueryVariables,
  response: VoucherListQueryResponse,
|};
*/


/*
query VoucherListQuery {
  listOfVouchers {
    id
    name
    code
    usageLimit
    startDate
    endDate
    discountValueType
    applyOncePerOrder
    discountValue
    minAmountSpent
    maxDiscountValue
    type
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "listOfVouchers",
    "storageKey": null,
    "args": null,
    "concreteType": "VouchersType",
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
        "name": "code",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "usageLimit",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "startDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "endDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "discountValueType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "applyOncePerOrder",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "discountValue",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "minAmountSpent",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "maxDiscountValue",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "type",
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
    "name": "VoucherListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherListQuery",
    "id": null,
    "text": "query VoucherListQuery {\n  listOfVouchers {\n    id\n    name\n    code\n    usageLimit\n    startDate\n    endDate\n    discountValueType\n    applyOncePerOrder\n    discountValue\n    minAmountSpent\n    maxDiscountValue\n    type\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6bf55055cb755dd1f2f4514dd719d45b';
module.exports = node;
