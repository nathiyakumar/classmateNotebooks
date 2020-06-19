/**
 * @flow
 * @relayHash ec4d3c729100869b7bb816bee4e8283f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutPageCouponListQueryVariables = {||};
export type CheckoutPageCouponListQueryResponse = {|
  +listOfVouchers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +isActive: boolean,
    +showInList: boolean,
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
export type CheckoutPageCouponListQuery = {|
  variables: CheckoutPageCouponListQueryVariables,
  response: CheckoutPageCouponListQueryResponse,
|};
*/


/*
query CheckoutPageCouponListQuery {
  listOfVouchers {
    id
    name
    isActive
    showInList
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
        "name": "isActive",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "showInList",
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
    "name": "CheckoutPageCouponListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckoutPageCouponListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CheckoutPageCouponListQuery",
    "id": null,
    "text": "query CheckoutPageCouponListQuery {\n  listOfVouchers {\n    id\n    name\n    isActive\n    showInList\n    code\n    usageLimit\n    startDate\n    endDate\n    discountValueType\n    applyOncePerOrder\n    discountValue\n    minAmountSpent\n    maxDiscountValue\n    type\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f1e566e3fe85083dacef44608cfc8c18';
module.exports = node;
