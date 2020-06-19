/**
 * @flow
 * @relayHash 855fb1d2b12d45a32a080c4d33fe819f
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
export type UpdateProductTypeMutationVariables = {|
  id?: ?string,
  input?: ?ProducttypeInput,
|};
export type UpdateProductTypeMutationResponse = {|
  +updateProductType: ?{|
    +message: ?string,
    +product: ?{|
      +isDigital: boolean,
      +name: string,
    |},
    +productAttributes: ?$ReadOnlyArray<?{|
      +slug: string
    |}>,
    +variantAttributes: ?$ReadOnlyArray<?{|
      +slug: string,
      +name: string,
    |}>,
  |}
|};
export type UpdateProductTypeMutation = {|
  variables: UpdateProductTypeMutationVariables,
  response: UpdateProductTypeMutationResponse,
|};
*/


/*
mutation UpdateProductTypeMutation(
  $id: ID
  $input: ProducttypeInput
) {
  updateProductType(id: $id, input: $input) {
    message
    product {
      isDigital
      name
      id
    }
    productAttributes {
      slug
      id
    }
    variantAttributes {
      slug
      name
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ProducttypeInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isDigital",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UpdateProductTypeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateProductType",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProductType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProducttypeType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "productAttributes",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributesType",
            "plural": true,
            "selections": [
              (v5/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "variantAttributes",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributesType",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateProductTypeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateProductType",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProductType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "ProducttypeType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "productAttributes",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributesType",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "variantAttributes",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributesType",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateProductTypeMutation",
    "id": null,
    "text": "mutation UpdateProductTypeMutation(\n  $id: ID\n  $input: ProducttypeInput\n) {\n  updateProductType(id: $id, input: $input) {\n    message\n    product {\n      isDigital\n      name\n      id\n    }\n    productAttributes {\n      slug\n      id\n    }\n    variantAttributes {\n      slug\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '797558984cc64d84fa03aff49af94f8f';
module.exports = node;
