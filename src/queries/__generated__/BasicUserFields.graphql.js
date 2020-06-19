/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type BasicUserFields$ref: FragmentReference;
declare export opaque type BasicUserFields$fragmentType: BasicUserFields$ref;
export type BasicUserFields = {|
  +id: string,
  +email: string,
  +mobileNumber: string,
  +dateOfBirth: ?any,
  +defaultBillingAddress: ?{|
    +id: string,
    +firstName: string,
    +lastName: string,
    +companyName: string,
    +city: string,
    +country: {|
      +code: ?string,
      +country: ?string,
    |},
    +postalCode: number,
    +phone: string,
    +isDefaultShippingAddress: ?boolean,
    +isDefaultBillingAddress: ?boolean,
  |},
  +defaultShippingAddress: ?{|
    +id: string,
    +firstName: string,
    +lastName: string,
    +companyName: string,
    +city: string,
    +country: {|
      +code: ?string,
      +country: ?string,
    |},
    +postalCode: number,
    +phone: string,
    +isDefaultShippingAddress: ?boolean,
    +isDefaultBillingAddress: ?boolean,
  |},
  +avatar: ?string,
  +firstName: string,
  +lastName: ?string,
  +$refType: BasicUserFields$ref,
|};
export type BasicUserFields$data = BasicUserFields;
export type BasicUserFields$key = {
  +$data?: BasicUserFields$data,
  +$fragmentRefs: BasicUserFields$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "companyName",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "city",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "country",
    "storageKey": null,
    "args": null,
    "concreteType": "CountryDisplay",
    "plural": false,
    "selections": [
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
        "name": "country",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "postalCode",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "phone",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isDefaultShippingAddress",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isDefaultBillingAddress",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "BasicUserFields",
  "type": "UserType",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "email",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "mobileNumber",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "dateOfBirth",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "defaultBillingAddress",
      "storageKey": null,
      "args": null,
      "concreteType": "Address",
      "plural": false,
      "selections": (v3/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "defaultShippingAddress",
      "storageKey": null,
      "args": null,
      "concreteType": "Address",
      "plural": false,
      "selections": (v3/*: any*/)
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "avatar",
      "args": null,
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/)
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '0eac02a4e272575e6e5a74de64cbb289';
module.exports = node;
