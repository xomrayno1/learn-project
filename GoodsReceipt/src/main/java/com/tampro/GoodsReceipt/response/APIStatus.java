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
	INVALID_PARAMETER(407, "Invalid parameters");

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
