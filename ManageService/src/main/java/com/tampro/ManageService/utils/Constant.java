package com.tampro.ManageService.utils;

public interface Constant {
	
	/*
	 * define sort
	 */
	
	//sort by brand
	public static final int SORT_BY_BRAND_ID = 1;
	public static final int SORT_BY_BRAND_NAME = 2;
	
	//sort by category
	public static final int SORT_BY_CATEGORY_ID = 1;
	public static final int SORT_BY_CATEGORY_NAME = 2;
	
	//sort by product
	public static final int SORT_BY_PRODUCT_ID = 1;
	public static final int SORT_BY_PRODUCT_NAME = 2;
	public static final int SORT_BY_PRODUCT_CODE = 3;
	public static final int SORT_BY_PRODUCT_BRAND = 4;
	public static final int SORT_BY_PRODUCT_CATEGORY = 5;
	
	
	
	//cross origin
	public static final String CROSS_ORIGIN = "http://localhost:3000/";
	
	
	/*
	 * define api path
	 */
	
	public static final String API_PREFIX = "/api/v1";
	
	//auth API
	
	// product API
	public static final String PRODUCT_API = API_PREFIX + "/products";
	public static final String PRODUCT_GET_LIST_PAGING_SORT_SEARCH_FILTER = "/product_get_list_paging_sort_search_filter";
	public static final String PRODUCT_GET_DETAIL = "/product_get_detail/{proId}";
	public static final String PRODUCT_DELETE = "/product_delete";
	public static final String PRODUCT_UPDATE = "/product_update";
	public static final String PRODUCT_CREATE = "/product_create";
}
