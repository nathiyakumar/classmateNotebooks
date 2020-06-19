/**
 * @flow
 * @relayHash 82e5675db416e74eca0a618d7f955aed
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductInput = {|
  productType: string,
  name: string,
  description?: ?string,
  descriptionJson?: ?string,
  category: string,
  isFeatured?: ?boolean,
  isActive?: ?boolean,
  masterSku: string,
  price?: ?number,
  attributes?: ?string,
  chargeTaxes?: ?boolean,
  taxRate?: ?string,
  weight?: ?number,
  length?: ?number,
  width?: ?number,
  height?: ?number,
  amazonLink?: ?string,
  flipkartLink?: ?string,
  classmateShopLink?: ?string,
  collection?: ?$ReadOnlyArray<?string>,
|};
export type CreateProductMutationVariables = {|
  input?: ?ProductInput
|};
export type CreateProductMutationResponse = {|
  +createProducts: ?{|
    +message: ?string,
    +singleProduct: ?{|
      +id: string,
      +name: string,
      +descriptionJson: any,
    |},
  |}
|};
export type CreateProductMutation = {|
  variables: CreateProductMutationVariables,
  response: CreateProductMutationResponse,
|};
*/


/*
mutation CreateProductMutation(
  $input: ProductInput
) {
  createProducts(input: $input) {
    message
    singleProduct {
      id
      name
      descriptionJson
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ProductInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createProducts",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateProducts",
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
        "name": "singleProduct",
        "storageKey": null,
        "args": null,
        "concreteType": "ProductsType",
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
            "name": "descriptionJson",
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
    "name": "CreateProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateProductMutation",
    "id": null,
    "text": "mutation CreateProductMutation(\n  $input: ProductInput\n) {\n  createProducts(input: $input) {\n    message\n    singleProduct {\n      id\n      name\n      descriptionJson\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5c7a7b51d0e395c2087dfe7a316b954f';
module.exports = node;
