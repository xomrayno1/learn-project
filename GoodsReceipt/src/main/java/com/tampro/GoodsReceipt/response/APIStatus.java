package com.tampro.GoodsReceipt.response;

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
	//notify message invoice
	ERR_INVOICE_IS_EMPTY(516, "List of invoice is null"),
	ERR_INVOICE_ID_NOT_EXIST(517, "Invoice not exist"),
	ERR_CREATE_INVOICE(518, "Can't create invoice."),
	ERR_UPDATE_INVOICE(519, "Can't update invoice."),
	ERR_INVOICE_SUPPLIER_NOT_EXIST(517, "Supplier not exist"),
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
