package com.tampro.GoodsReceipt.utils;

public interface Constant {
	public static int ACTIVE = 1;
	public static int YET_ACTIVE = 0;
	
	/*
	 * define sort
	 */
	
	public static int SORT_BY_INVOICE_PRICE = 0;
	public static int SORT_BY_INVOICE_CREATE_DATE = 1;
	public static int SORT_BY_INVOICE_DATE_EXPORT = 2;
	public static int SORT_BY_INVOICE_WEIGHT = 3;
	
	//cross origin
	public static final String CROSS_ORIGIN = "http://localhost:3000/";
	
	/*
	 * define path
	 */
	
	public static final String API_PREFIX = "/api/v1";
	
	//invocie API
	public static final String GOODS_RECEIPT_API = API_PREFIX + "/goods-receipt";
	public static final String INVOICE_GET_LIST_PAGING_SORT_SEARCH_FILTER ="/product_get_list_paging_sort_search_filter";
	public static final String INVOICE_GET_DETAIL = "/invoice_get_detail/{invoiId}";
	public static final String INVOICE_DELETE = "/invoice_delete";
	public static final String INVOICE_CREATE = "/invoice_create";
	public static final String INVOICE_UPDATE = "/invoice_update";
	public static final String INVOICE_GET_LIST_ACTIVE = "/invoice_get_list_active";
	
	//invoice detail API
	public static final String INVOICE_DETAIL_API = API_PREFIX + "/invoice_details";
	public static final String INVOICE_DETAIL_GET_BY_INVOICE = "/invoice_detail_get_all_by_invoice/{invoiId}";
	public static final String INVOICE_DETAIL_GET_DETAIL = "/invoice_detail_get_detail/{invoiDeId}";
	public static final String INVOICE_DETAIL_DELETE = "/invoice_detail_delete";
	public static final String INVOICE_DETAIL_CREATE = "/invoice_detail_create";
	public static final String INVOICE_DETAIL_UPDATE = "/invoice_detail_update";
	
	//
	public static final String PRODUCT_SERVICE_API = "http://manage-service/api/v1/products";
	public static final String SUPPLIER_SERVICE_API = "http://manage-service/api/v1/suppliers";
	
}
