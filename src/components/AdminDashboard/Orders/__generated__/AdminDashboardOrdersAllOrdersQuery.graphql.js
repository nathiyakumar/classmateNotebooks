/**
 * @flow
 * @relayHash baf5be7568968a084d41e596e84a0541
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaymentChargeStatusEnum = "AUTHORIZED" | "CAPTURED" | "COD" | "FAILED" | "FULLY_CHARGED" | "FULLY_REFUNDED" | "NOT_CHARGED" | "PARTIALLY_CHARGED" | "PARTIALLY_REFUNDED" | "%future added value";
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type AdminDashboardOrdersAllOrdersQueryVariables = {||};
export type AdminDashboardOrdersAllOrdersQueryResponse = {|
  +adminOrdersList: ?$ReadOnlyArray<?{|
    +id: string,
    +orderId: ?string,
    +created: any,
    +total: ?number,
    +userEmail: ?string,
    +status: ?string,
    +payments: ?$ReadOnlyArray<?{|
      +gateway: string,
      +id: string,
      +chargeStatus: PaymentChargeStatusEnum,
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
    +lines: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
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
        |}
      |}>
    |},
  |}>
|};
export type AdminDashboardOrdersAllOrdersQuery = {|
  variables: AdminDashboardOrdersAllOrdersQueryVariables,
  response: AdminDashboardOrdersAllOrdersQueryResponse,
|};
*/


/*
query AdminDashboardOrdersAllOrdersQuery {
  adminOrdersList {
    id
    orderId
    created
    total
    userEmail
    status
    payments {
      gateway
      id
      chargeStatus
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
    lines(first: 100) {
      edges {
        node {
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
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "total",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userEmail",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v6 = {
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
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "chargeStatus",
      "args": null,
      "storageKey": null
    }
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v9 = [
  (v0/*: any*/),
  (v7/*: any*/),
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
      (v8/*: any*/),
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
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shippingAddress",
  "storageKey": null,
  "args": null,
  "concreteType": "Address",
  "plural": false,
  "selections": (v9/*: any*/)
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "billingAddress",
  "storageKey": null,
  "args": null,
  "concreteType": "Address",
  "plural": false,
  "selections": (v9/*: any*/)
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountAmount",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isPaymentSuccessful",
  "args": null,
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "weight",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productName",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPrice",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceNet",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceGross",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxRate",
  "args": null,
  "storageKey": null
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingStatus",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AdminDashboardOrdersAllOrdersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminOrdersList",
        "storageKey": null,
        "args": null,
        "concreteType": "OrdersType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "shippingMethod",
            "storageKey": null,
            "args": null,
            "concreteType": "ShippingMethodType",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              (v13/*: any*/)
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
              (v12/*: any*/),
              (v8/*: any*/)
            ]
          },
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": "lines(first:100)",
            "args": (v17/*: any*/),
            "concreteType": "OrderLineTypeConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderLineTypeEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineType",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
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
                              (v7/*: any*/),
                              (v25/*: any*/),
                              (v26/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "lineShipping",
                        "storageKey": "lineShipping(first:100)",
                        "args": (v17/*: any*/),
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
                                  (v27/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
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
    "name": "AdminDashboardOrdersAllOrdersQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminOrdersList",
        "storageKey": null,
        "args": null,
        "concreteType": "OrdersType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "shippingMethod",
            "storageKey": null,
            "args": null,
            "concreteType": "ShippingMethodType",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              (v13/*: any*/),
              (v0/*: any*/)
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
              (v12/*: any*/),
              (v8/*: any*/),
              (v0/*: any*/)
            ]
          },
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": "lines(first:100)",
            "args": (v17/*: any*/),
            "concreteType": "OrderLineTypeConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderLineTypeEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineType",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
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
                              (v7/*: any*/),
                              (v25/*: any*/),
                              (v26/*: any*/),
                              (v0/*: any*/)
                            ]
                          },
                          (v0/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "lineShipping",
                        "storageKey": "lineShipping(first:100)",
                        "args": (v17/*: any*/),
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
                                  (v27/*: any*/),
                                  (v0/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
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
    "name": "AdminDashboardOrdersAllOrdersQuery",
    "id": null,
    "text": "query AdminDashboardOrdersAllOrdersQuery {\n  adminOrdersList {\n    id\n    orderId\n    created\n    total\n    userEmail\n    status\n    payments {\n      gateway\n      id\n      chargeStatus\n    }\n    shippingAddress {\n      id\n      firstName\n      lastName\n      companyName\n      city\n      country {\n        code\n        country\n      }\n      postalCode\n      phone\n    }\n    billingAddress {\n      id\n      firstName\n      lastName\n      companyName\n      city\n      country {\n        code\n        country\n      }\n      postalCode\n      phone\n    }\n    shippingMethod {\n      name\n      shippingTotal\n      id\n    }\n    voucher {\n      name\n      code\n      id\n    }\n    discountName\n    discountAmount\n    isPaymentSuccessful\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          weight\n          productName\n          quantity\n          unitPrice\n          unitPriceNet\n          unitPriceGross\n          taxRate\n          vendor {\n            vendor {\n              firstName\n              email\n              mobileNumber\n              id\n            }\n            id\n          }\n          lineShipping(first: 100) {\n            edges {\n              node {\n                shippingStatus\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24d3e1112dedccd4adffa294d6356dd6';
module.exports = node;
