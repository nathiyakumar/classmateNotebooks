/**
 * @flow
 * @relayHash db8b1b4bcc15341ffe715b5aacdfdc04
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TaxTypeEnum = "FIXED" | "PERCENTAGE" | "%future added value";
export type ProducttypeInput = {|
  name: string,
  hasVariants?: ?boolean,
  isShippingRequired?: ?boolean,
  isDigital?: ?boolean,
  taxRate?: ?string,
  taxType?: ?TaxTypeEnum,
  weight?: ?string,
  isCustomizable?: ?boolean,
  productAttributes?: ?$ReadOnlyArray<?string>,
  variantAttributes?: ?$ReadOnlyArray<?string>,
|};
export type CreateProductTypeMutationVariables = {|
  input?: ?ProducttypeInput
|};
export type CreateProductTypeMutationResponse = {|
  +createProductType: ?{|
    +product: ?{|
      +id: string,
      +name: string,
      +hasVariants: boolean,
      +isDigital: boolean,
      +isShippingRequired: boolean,
    |},
    +message: ?string,
  |}
|};
export type CreateProductTypeMutation = {|
  variables: CreateProductTypeMutationVariables,
  response: CreateProductTypeMutationResponse,
|};
*/


/*
mutation CreateProductTypeMutation(
  $input: ProducttypeInput
) {
  createProductType(input: $input) {
    product {
      id
      name
      hasVariants
      isDigital
      isShippingRequired
    }
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ProducttypeInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createProductType",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateProductType",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "product",
        "storageKey": null,
        "args": null,
        "concreteType": "ProducttypeType",
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
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasVariants",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isDigital",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isShippingRequired",
            "args": null,
            "storageKey": null
          }
        ]
      },
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
    "name": "CreateProductTypeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateProductTypeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateProductTypeMutation",
    "id": null,
    "text": "mutation CreateProductTypeMutation(\n  $input: ProducttypeInput\n) {\n  createProductType(input: $input) {\n    product {\n      id\n      name\n      hasVariants\n      isDigital\n      isShippingRequired\n    }\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4bfa3b072b292d19f5b8c6da0b7c8fda';
module.exports = node;
