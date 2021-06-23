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
    ERR_PRODUCT_LIST_IS_EMPTY(116, "Danh sách sản phẩm trống."),//List of product is null
    ERR_PRODUCT_ID_NOT_EXIST(117, "Sản phẩm không tồn tại."),//Product not exists
    ERR_PRODUCT_CODE_ALREADY_EXISTS(118, "Code sản phẩm đã tồn tại."),//Product already exists
    ERR_CREATE_PRODUCT(119, "Không thể thêm sản phẩm."),//Can't create product
    ERR_UPDATE_PRODUCT(120, "Không thể cập nhật sản phẩm."),//Can't update product
	//notify message category
	ERR_CATEGORY_LIST_IS_EMPTY(156, "Danh sách danh mục trống."),
	ERR_CATEGORY_ID_NOT_EXIST(157, "Danh mục không tồn tại."),
	ERR_CATEGORY_NAME_ALREADY_EXISTS(158, "Danh mục đã tồn tại."),
	ERR_CREATE_CATEGORY(159, "Không thể thêm danh mục."),
	ERR_UPDATE_CATEGORY(160, "Không thể cập nhật danh mục."),
	//notify message category
	ERR_SUPPLIER_LIST_IS_EMPTY(216, "Danh sách nhà cung cấp trống."),
	ERR_SUPPLIER_ID_NOT_EXIST(217, "Nhà cung cấp không tồn tại."),
	ERR_SUPPLIER_NAME_ALREADY_EXISTS(218, "Tên nhà cung cấp đã tồn tại."),
	ERR_CREATE_SUPPLIER(219, "Không thể thêm nhà cung cấp."),
	ERR_UPDATE_SUPPLIER(220, "Không thể cập nhật nhà cung cấp."),
	ERR_SUPPLIER_EMAIL_ALREADY_EXISTS(221, "Email nhà cung cấp đã tồn tại."),
	ERR_SUPPLIER_EMAIL_INCORRECT_FORMAT(222, "Email nhà cung cấp không đúng định dạng."),
	//notify message category
	ERR_BRAND_LIST_IS_EMPTY(256, "Danh sách nhãn hiệu trống."),
	ERR_BRAND_ID_NOT_EXIST(257, "Nhãn hiệu không tồn tại."),
	ERR_BRAND_NAME_ALREADY_EXISTS(258, "Nhãn hiệu đã tồn tại."),
	ERR_CREATE_BRAND(259, "Không thể thêm nhãn hiệu."),
	ERR_UPDATE_BRAND(260, "Không thể cập nhật nhãn hiệu."),
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
