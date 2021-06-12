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
	//notify message customer
    ERR_PRODUCT_LIST_IS_EMPTY(116, "List of product is null."),
    ERR_PRODUCT_ID_NOT_EXIST(117, "Product not exists."),
    ERR_PRODUCT_CODE_ALREADY_EXISTS(118, "Product already exists."),
    ERR_PRODUCT_PARAM_CODE_IS_NULL(119, "Product can't empty.");

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
