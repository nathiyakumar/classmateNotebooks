/**
 * @flow
 * @relayHash f1dc6ea31261b0bf9fd771097b79d287
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type SingleOrderDetailQueryVariables = {|
  shippingId?: ?string,
  vendor?: ?string,
|};
export type SingleOrderDetailQueryResponse = {|
  +singleShippingOrderView: ?{|
    +id: string,
    +orderId: ?string,
    +lines: ?$ReadOnlyArray<?{|
      +id: string,
      +weight: ?number,
      +productName: string,
      +quantity: number,
      +unitPrice: number,
      +unitPriceNet: number,
      +unitPriceGross: number,
      +taxRate: number,
      +vendor: ?{|
        +vendor: ?{|
          +firstName: string,
          +email: string,
          +mobileNumber: string,
        |}
      |},
      +lineShipping: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +shippingStatus: ShippingShippingStatus
          |}
        |}>
      |},
      +order: {|
        +orderId: ?string,
        +created: any,
        +total: ?number,
        +userEmail: ?string,
        +status: ?string,
        +payments: ?$ReadOnlyArray<?{|
          +gateway: string,
          +id: string,
        |}>,
        +shippingAddress: ?{|
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
        |},
        +billingAddress: ?{|
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
        |},
        +shippingMethod: ?{|
          +name: string,
          +shippingTotal: ?number,
        |},
        +voucher: ?{|
          +name: ?string,
          +code: string,
        |},
        +discountName: ?string,
        +discountAmount: ?number,
        +isPaymentSuccessful: boolean,
      |},
    |}>,
  |}
|};
export type SingleOrderDetailQuery = {|
  variables: SingleOrderDetailQueryVariables,
  response: SingleOrderDetailQueryResponse,
|};
*/


/*
query SingleOrderDetailQuery(
  $shippingId: String
  $vendor: String
) {
  singleShippingOrderView(shippingId: $shippingId, vendor: $vendor) {
    id
    orderId
    lines {
      id
      weight
      productName
      quantity
      unitPrice
      unitPriceNet
      unitPriceGross
      taxRate
      vendor {
        vendor {
          firstName
          email
          mobileNumber
          id
        }
        id
      }
      lineShipping(first: 100) {
        edges {
          node {
            shippingStatus
            id
          }
        }
      }
      order {
        orderId
        created
        total
        userEmail
        status
        payments {
          gateway
          id
        }
        shippingAddress {
          id
          firstName
          lastName
          companyName
          city
          country {
            code
            country
          }
          postalCode
          phone
        }
        billingAddress {
          id
          firstName
          lastName
          companyName
          city
          country {
            code
            country
          }
          postalCode
          phone
        }
        shippingMethod {
          name
          shippingTotal
          id
        }
        voucher {
          name
          code
          id
        }
        discountName
        discountAmount
        isPaymentSuccessful
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "shippingId",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "vendor",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "shippingId",
    "variableName": "shippingId"
  },
  {
    "kind": "Variable",
    "name": "vendor",
    "variableName": "vendor"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weight",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productName",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPrice",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceNet",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceGross",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxRate",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingStatus",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "total",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userEmail",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "payments",
  "storageKey": null,
  "args": null,
  "concreteType": "PaymentType",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "gateway",
      "args": null,
      "storageKey": null
    },
    (v2/*: any*/)
  ]
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v22 = [
  (v2/*: any*/),
  (v11/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "lastName",
    "args": null,
    "storageKey": null
  },
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
      (v21/*: any*/),
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
  }
],
v23 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shippingAddress",
  "storageKey": null,
  "args": null,
  "concreteType": "Address",
  "plural": false,
  "selections": (v22/*: any*/)
},
v24 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "billingAddress",
  "storageKey": null,
  "args": null,
  "concreteType": "Address",
  "plural": false,
  "selections": (v22/*: any*/)
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
},
v28 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountAmount",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isPaymentSuccessful",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SingleOrderDetailQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleShippingOrderView",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lineShipping",
                "storageKey": "lineShipping(first:100)",
                "args": (v14/*: any*/),
                "concreteType": "ShippingTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ShippingTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ShippingType",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingMethod",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ShippingMethodType",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v26/*: any*/)
                    ]
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
                      (v25/*: any*/),
                      (v21/*: any*/)
                    ]
                  },
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SingleOrderDetailQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleShippingOrderView",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lineShipping",
                "storageKey": "lineShipping(first:100)",
                "args": (v14/*: any*/),
                "concreteType": "ShippingTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ShippingTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ShippingType",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v2/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingMethod",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ShippingMethodType",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v2/*: any*/)
                    ]
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
                      (v25/*: any*/),
                      (v21/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SingleOrderDetailQuery",
    "id": null,
    "text": "query SingleOrderDetailQuery(\n  $shippingId: String\n  $vendor: String\n) {\n  singleShippingOrderView(shippingId: $shippingId, vendor: $vendor) {\n    id\n    orderId\n    lines {\n      id\n      weight\n      productName\n      quantity\n      unitPrice\n      unitPriceNet\n      unitPriceGross\n      taxRate\n      vendor {\n        vendor {\n          firstName\n          email\n          mobileNumber\n          id\n        }\n        id\n      }\n      lineShipping(first: 100) {\n        edges {\n          node {\n            shippingStatus\n            id\n          }\n        }\n      }\n      order {\n        orderId\n        created\n        total\n        userEmail\n        status\n        payments {\n          gateway\n          id\n        }\n        shippingAddress {\n          id\n          firstName\n          lastName\n          companyName\n          city\n          country {\n            code\n            country\n          }\n          postalCode\n          phone\n        }\n        billingAddress {\n          id\n          firstName\n          lastName\n          companyName\n          city\n          country {\n            code\n            country\n          }\n          postalCode\n          phone\n        }\n        shippingMethod {\n          name\n          shippingTotal\n          id\n        }\n        voucher {\n          name\n          code\n          id\n        }\n        discountName\n        discountAmount\n        isPaymentSuccessful\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ee4ac8760d1de85ee4ed4390608e4630';
module.exports = node;
