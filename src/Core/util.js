import { Base64 } from "js-base64";
import { stringify as stringifyQs } from "qs";

export const getDBIdFromGraphqlId = (
    graphqlId: string,
    schema?: string
): number => {
    // This is temporary solution, we will use slugs in the future
    const rawId = Base64.decode(graphqlId);
    const regexp = /(\w+):(\d+)/;
    const [, expectedSchema, id] = regexp.exec(rawId);
    if (schema && schema !== expectedSchema) {
        throw new Error("Schema is not correct");
    }
    return parseInt(id, 10);
};

export const slugify = (text: string | number): string =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const generateProductUrl = (id: string, name: string) => {

    return `/classmate-school-and-office-stationery-products/${slugify(name)}/${getDBIdFromGraphqlId(id, "ProductVariantType")}/`;
};
export const generateBrandProductUrl = (id: string, name: string) => {

    return `/classmate-office-and-school-stationeries/${slugify(name)}/${getDBIdFromGraphqlId(id, "ProductsType")}/`;
};

export const generateCategoryUrl = (id: string, name: string) =>
    `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
    // This is temporary solution, we will use slugs in the future
    Base64.encode(`${schema}:${id}`);



/**
 * Attributes  Route.
 * @return {string} Attributes List Route.
 */
export const attributeListUrl = "/admin-dashboard/attributes";

export const attributeSection = "/admin-dashboard/attributes/";

export const attributeAddPath = attributeSection+"add";

export const attributePath = (id) => attributeSection + "edit/" +id;


export const attributeAddUrl = (params) =>{
    return  attributeAddPath + "?" + stringifyQs(params);
};

export const attributeEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};


export function isSelected(data,list,compare) {
    return !!list.find(listElement => compare(listElement, data));
}

export function updateAtIndex(data,list,index) {
    return addAtIndex(data, removeAtIndex(list, index), index);
}
export function addAtIndex(data,list,index) {
    return [...list.slice(0, index), data, ...list.slice(index)];
}
export function removeAtIndex(list, index) {
    return [...list.slice(0, index), ...list.slice(index + 1)];
}

/**
 * Product types  Route.
 * @return {string} Attributes List Route.
 */

export const productTypeSection = "/admin-dashboard/product-types/";

export const productTypeAddPath = productTypeSection+"add";

export const productTypePath = (id) => productTypeSection + "edit/" +id;


export const productTypeEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Product Route.
 * @return {string} Attributes List Route.
 */

export const productsSection = "/admin-dashboard/products/";

export const productAddPath = productsSection+"add";

export const productPath = (id) => productsSection + "edit/" +id;


export const productEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Product variant Route.
 * @return {string} Attributes List Route.
 */


export const productVariantAddPath = (id) => productsSection + "edit/" +id + "/variant/add";
export const productVariantEditPath = (id,variant_id) => productsSection + "edit/" +id + "/variant/edit/"+variant_id;





/**
 * Category Route.
 * @return {string} Attributes List Route.
 */

export const categorySection = "/admin-dashboard/categories/";

export const categoryAddPath = categorySection+"add";

export const categoryPath = (id) => categorySection + "edit/" +id;

export const categoryEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Collection Route.
 * @return {string} Attributes List Route.
 */

export const collectionSection = "/admin-dashboard/collections/";

export const collectionAddPath = collectionSection+"add";

export const collectionPath = (id) => collectionSection + "edit/" +id;

export const collectionEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Customers Route.
 * @return {string} Attributes List Route.
 */

export const customersSection = "/admin-dashboard/customers/";

export const customersAddPath = customersSection+"add";
export const customersPath = (id) => customersSection + "edit/" +id;

export const customersEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};
/**
 * Staff Members Route.
 * @return {string} Attributes List Route.
 */
export const staffMemberSection = "/admin-dashboard/staffMembers/";

export const staffMemberAddPath = staffMemberSection+"add";
export const staffMemberPath = (id) => staffMemberSection + "edit/" +id;

export const staffMemberEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Vouchers Route.
 * @return {string} Attributes List Route.
 */
export const vouchersSection = "/admin-dashboard/vouchers/";

export const vouchersAddPath = vouchersSection+"add";

export const vouchersPath = (id) => vouchersSection + "edit/" +id;

export const vouchersEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};

/**
 * Shipping Methods Route.
 * @return {string} Attributes List Route.
 */
export const shippingSection = "/admin-dashboard/shipping/";

export const shippingAddPath = shippingSection+"add";

export const shippingPath = (id) => shippingSection + "edit/" +id;
export const shippingZonePath = (id) => shippingSection + "zone/" +id;

export const shippingEditUrl = (params) =>{
    return  "?" + stringifyQs(params);
};


