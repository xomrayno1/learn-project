package com.tampro.ManageService.response;

public enum APIStatus {
	OK(200, "OK"), 
	ERROR(300, "ERROR"),
	//////////////////
	// CLIENT SIDE //
	//////////////////
	ERR_BAD_REQUEST(400, "Bad request"), 
	ERR_UNAUTHORIZED(401, "Unauthorized or Access Token is expired"),
	ERR_FORBIDDEN(403, "Forbidden! Access denied"), 
	ERR_BAD_PARAMS(406, "Bad parameters"),
	INVALID_PARAMETER(407, "Invalid parameters"),
	//notify message product
    ERR_PRODUCT_LIST_IS_EMPTY(116, "List of product is null."),
    ERR_PRODUCT_ID_NOT_EXIST(117, "Product not exists."),
    ERR_PRODUCT_CODE_ALREADY_EXISTS(118, "Product already exists."),
    ERR_CREATE_PRODUCT(119, "Can't create product."),
    ERR_UPDATE_PRODUCT(120, "Can't update product."),
	//notify message category
	ERR_CATEGORY_LIST_IS_EMPTY(156, "List of category is null."),
	ERR_CATEGORY_ID_NOT_EXIST(157, "Category not exits."),
	ERR_CATEGORY_NAME_ALREADY_EXISTS(158, "Category already exists."),
	ERR_CREATE_CATEGORY(159, "Can't create category."),
	ERR_UPDATE_CATEGORY(160, "Can't update category."),
	//notify message category
	ERR_SUPPLIER_LIST_IS_EMPTY(216, "List of supplier is null."),
	ERR_SUPPLIER_ID_NOT_EXIST(217, "Supplier not exits."),
	ERR_SUPPLIER_NAME_ALREADY_EXISTS(218, "Supplier name already exists."),
	ERR_CREATE_SUPPLIER(219, "Can't create supplier."),
	ERR_UPDATE_SUPPLIER(220, "Can't update supplier."),
	ERR_SUPPLIER_EMAIL_ALREADY_EXISTS(221, "Supplier email already exists."),
	//notify message category
	ERR_BRAND_LIST_IS_EMPTY(256, "List of brand is null."),
	ERR_BRAND_ID_NOT_EXIST(257, "Brand not exits."),
	ERR_BRAND_NAME_ALREADY_EXISTS(258, "Brand already exists."),
	ERR_CREATE_BRAND(259, "Can't create brand."),
	ERR_UPDATE_BRAND(260, "Can't update brand."),
	;
	private final int code;
	private final String description;

	private APIStatus(int s, String v) {
		code = s;
		description = v;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}
}
