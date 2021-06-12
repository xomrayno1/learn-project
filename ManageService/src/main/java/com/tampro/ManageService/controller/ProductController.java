package com.tampro.ManageService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.ManageService.entity.Product;
import com.tampro.ManageService.exception.ApplicationException;
import com.tampro.ManageService.model.request.ProductPagingSearchSortModel;
import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;
import com.tampro.ManageService.service.ProductService;
import com.tampro.ManageService.utils.Constant;
import com.tampro.ManageService.utils.ResponseUtil;

@RestController
@RequestMapping(value = Constant.PRODUCT_API)
@CrossOrigin(value = Constant.CROSS_ORIGIN)
public class ProductController {

	
	@Value("${instance.name}")
	private String instanceName;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
	
	@PostMapping(Constant.PRODUCT_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody ProductPagingSearchSortModel ppssm) {
		
		try {
			Page<Product> listProduct = productService.doFilterSearchPagingProduct(ppssm.getSearchKey(), ppssm.getCategoryId(), 
					ppssm.getBrandId(), ppssm.getPageSize(), ppssm.getPageNumber(), 
					ppssm.getSortCase(), ppssm.isAscSort());
			if(listProduct != null) {
				return ResponseUtil.responseSuccess(listProduct);
			}else {
				throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
			}
		} catch (Exception e) {
			throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
		}
	}
	
}
