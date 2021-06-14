package com.tampro.ManageService.utils;

public interface Constant {
	
	public static final int YET_ACTIVE = 0;
	public static final int ACTIVE = 1;
	
	
	/*
	 * define sort
	 */
	
	//sort by brand
	public static final int SORT_BY_BRAND_ID = 1;
	public static final int SORT_BY_BRAND_NAME = 2;
		
	//sort by supplier
	public static final int SORT_BY_SUPPLIER_ID = 1;
	public static final int SORT_BY_SUPPLIER_NAME = 2;
	
	//sort by category
	public static final int SORT_BY_CATEGORY_ID = 1;
	public static final int SORT_BY_CATEGORY_NAME = 2;
	
	//sort by product
	public static final int SORT_BY_PRODUCT_ID = 1;
	public static final int SORT_BY_PRODUCT_NAME = 2;
	public static final int SORT_BY_PRODUCT_CODE = 3;
	public static final int SORT_BY_PRODUCT_BRAND = 4;
	public static final int SORT_BY_PRODUCT_CATEGORY = 5;
	public static final int SORT_BY_PRODUCT_PRICE = 6;
	
	
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
	public static final String PRODUCT_GET_LIST_ACTIVE = "/product_get_list_active";
	
	//category API
	public static final String CATEGORY_API = API_PREFIX + "/categories";
	public static final String CATEGORY_GET_LIST_PAGING_SORT_SEARCH_FILTER = "/category_get_list_paging_sort_search_filter";
	public static final String CATEGORY_GET_DETAIL= "/category_get_detail/{cateId}";
	public static final String CATEGORY_DELETE = "/category_delete";
	public static final String CATEGORY_UPDATE = "/category_update";
	public static final String CATEGORY_CREATE = "/category_create";
	public static final String CATEGORY_GET_LIST_ACTIVE = "/category_get_list_active";
	
	//supplier API
	public static final String SUPPLIER_API = API_PREFIX + "/suppliers";
	public static final String SUPPLIER_GET_LIST_PAGING_SORT_SEARCH_FILTER = "/supplier_get_list_paging_sort_search_filter";
	public static final String SUPPLIER_GET_DETAIL = "/supplier_get_detail/{braId}";
	public static final String SUPPLIER_DELETE = "/supplier_delete";
	public static final String SUPPLIER_UPDATE = "/supplier_update";
	public static final String SUPPLIER_CREATE = "/supplier_create";
	public static final String SUPPLIER_GET_LIST_ACTIVE = "/supplier_get_list_active";
	
	//brand API
	public static final String BRAND_API = API_PREFIX + "/brands";
	public static final String BRAND_GET_LIST_PAGING_SORT_SEARCH_FILTER = "/brand_get_list_paging_sort_search_filter";
	public static final String BRAND_GET_DETAIL = "/brand_get_detail/{braId}";
	public static final String BRAND_DELETE = "/brand_delete";
	public static final String BRAND_UPDATE = "/brand_update";
	public static final String BRAND_CREATE = "/brand_create";
	public static final String BRAND_GET_LIST_ACTIVE = "/brand_get_list_active";
}
