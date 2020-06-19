/**
 * @flow
 * @relayHash 36f0de0e7a980faba51d77944981ceb7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductUpdateInput = {|
  name: string,
  description?: ?string,
  descriptionJson?: ?any,
  category?: ?string,
  isFeatured?: ?boolean,
  isActive?: ?boolean,
  price?: ?number,
  attributes?: ?any,
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
export type UpdateProductMutationVariables = {|
  productId: string,
  input?: ?ProductUpdateInput,
|};
export type UpdateProductMutationResponse = {|
  +updateProduct: ?{|
    +message: ?string,
    +singleProduct: ?{|
      +id: string,
      +name: string,
    |},
  |}
|};
export type UpdateProductMutation = {|
  variables: UpdateProductMutationVariables,
  response: UpdateProductMutationResponse,
|};
*/


/*
mutation UpdateProductMutation(
  $productId: ID!
  $input: ProductUpdateInput
) {
  updateProduct(productId: $productId, input: $input) {
    message
    singleProduct {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ProductUpdateInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateProduct",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      }
    ],
    "concreteType": "UpdateProduct",
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
    "name": "UpdateProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateProductMutation",
    "id": null,
    "text": "mutation UpdateProductMutation(\n  $productId: ID!\n  $input: ProductUpdateInput\n) {\n  updateProduct(productId: $productId, input: $input) {\n    message\n    singleProduct {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8e49030cd45792fe96e8e41257ef0d35';
module.exports = node;
