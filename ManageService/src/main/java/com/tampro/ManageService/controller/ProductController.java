package com.tampro.ManageService.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.ManageService.entity.Brand;
import com.tampro.ManageService.entity.Category;
import com.tampro.ManageService.entity.Product;
import com.tampro.ManageService.exception.ApplicationException;
import com.tampro.ManageService.model.request.CreateProductRequest;
import com.tampro.ManageService.model.request.ProductPagingSearchSortModel;
import com.tampro.ManageService.model.request.UpdateProductRequest;
import com.tampro.ManageService.model.response.ModelResponse;
import com.tampro.ManageService.model.response.ProductResponse;
import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;
import com.tampro.ManageService.service.BrandService;
import com.tampro.ManageService.service.CategoryService;
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
	@Autowired
	private BrandService brandService;
	@Autowired
	private CategoryService categoryService;
	
	
	private ModelMapper mapper = new ModelMapper();
	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
	
	
	private static final Logger log = LoggerFactory.getLogger(ProductController.class);

	
	@PostMapping(Constant.PRODUCT_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody ProductPagingSearchSortModel ppssm) {
		try {
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			
			Page<Product> page = productService.doFilterSearchPagingProduct(ppssm.getSearchKey(), ppssm.getCategoryId(), 
					ppssm.getBrandId(), ppssm.getPageSize(), ppssm.getPageNumber(), 
					ppssm.getSortCase(), ppssm.isAscSort());
			if(page == null) {
				throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
			}
			//mapper
			List<ProductResponse> responses = page.getContent().stream().map(item -> {
				ProductResponse productResponse = mapper.map(item, ProductResponse.class);
				Brand brand = brandService.brandById(item.getBrandId());
				Category category = categoryService.categoryById(item.getCategoryId());
				productResponse.setBrandName(brand.getName());
				productResponse.setCategoryName(category.getName());
				return productResponse;
			}).collect(Collectors.toList());
			
			ModelResponse modelResponse = 
					new ModelResponse(responses, page.getTotalElements(), page.getPageable());
			
			return ResponseUtil.responseSuccess(modelResponse);
		} catch (Exception e) {
			e.getStackTrace();
			//throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
		}
		return null;
	}
	
	@GetMapping(Constant.PRODUCT_GET_DETAIL)
	public ResponseEntity<APIResponse> getProductDetail(@PathVariable("proId") long proId) {
		//find product by id
		Product product = productService.productById(proId);
		if(product != null) {
			//mapper
			ProductResponse productResponse = mapper.map(product, ProductResponse.class);
			Brand brand = brandService.brandById(product.getBrandId());
			Category category = categoryService.categoryById(product.getCategoryId());
			productResponse.setBrandName(brand.getName());
			productResponse.setCategoryName(category.getName());
			return ResponseUtil.responseSuccess(product);
		}else {
			throw new ApplicationException(APIStatus.ERR_PRODUCT_ID_NOT_EXIST);
		}
	}
	
	@PostMapping(Constant.PRODUCT_DELETE)
	public ResponseEntity<APIResponse> getProductDetail(@RequestBody List<Long> ids) {
		try {
			for (Long proId : ids) {
//				boolean getProduct = productService.isExist(proId);
//				if(getProduct) {
//					productService.delete(proId);
//					log.info("Delete product by {}", proId);
//				}
				Product getProduct = productService.productById(proId);
				if(getProduct == null) {
					log.error("Error delete product id not exist {}", proId);
					throw new ApplicationException(APIStatus.ERR_PRODUCT_ID_NOT_EXIST); 
				} 
				getProduct.setActiveFlag(Constant.YET_ACTIVE);
				productService.save(getProduct);
			}
			return ResponseUtil.responseSuccess("Delete product successfully");
		} catch (Exception e) {
			log.error("Error delete product ");
			throw new ApplicationException(APIStatus.ERR_PRODUCT_ID_NOT_EXIST);
		}
	}
	
	@PostMapping(Constant.PRODUCT_CREATE)
	public ResponseEntity<APIResponse> createProduct(@Validated @RequestBody CreateProductRequest productRequest) {

		Product getProduct = productService.productByCode(productRequest.getCode());
		if (getProduct == null) {
			try {
				mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
				
				Product product = mapper.map(productRequest, Product.class);
				product.setActiveFlag(Constant.ACTIVE);
				productService.save(product);
				
				log.info("Create product successfully");
			} catch (Exception e) {
				log.error("Error create product");
				throw new ApplicationException(APIStatus.ERR_CREATE_PRODUCT);
			}
		} else {
			log.error("Error create product code already exists {}", getProduct.getCode());
			throw new ApplicationException(APIStatus.ERR_PRODUCT_CODE_ALREADY_EXISTS);
		}
		return ResponseUtil.responseSuccess("Create product successfully");

	}
	
	@PutMapping(Constant.PRODUCT_UPDATE)
	public ResponseEntity<APIResponse> updateProduct(@Validated @RequestBody UpdateProductRequest productRequest) {
		Product productByCode = productService.productByCode(productRequest.getCode());
		Product productById = productService.productById(productRequest.getId());
		if(productById != null) {
			if(productByCode != null) {
				if(!productByCode.getCode().equals(productById.getCode())) {
					log.error("Error update product code already exists {}", productRequest.getCode());
					throw new ApplicationException(APIStatus.ERR_PRODUCT_CODE_ALREADY_EXISTS);
				} 
			}
			try {
				mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
				
				Product product = mapper.map(productRequest, Product.class);
				product.setActiveFlag(productById.getActiveFlag());
				product.setCreateDate(productById.getCreateDate());
				productService.save(product);
				
				log.info("Update product successfully");
			} catch (Exception e) {
				log.error("Error update product");
				throw new ApplicationException(APIStatus.ERR_UPDATE_PRODUCT);
			}
		}else {
			throw new ApplicationException(APIStatus.ERR_PRODUCT_ID_NOT_EXIST);
		}
		return ResponseUtil.responseSuccess("Update product successfully");
	}
	
	@GetMapping(Constant.PRODUCT_GET_LIST_ACTIVE)
	public ResponseEntity<APIResponse> getListProduct() {
		try {
			List<Product> products = productService.productByActiveFlag(Constant.ACTIVE);
			if(products.isEmpty()) {
				throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
			}
			List<ProductResponse> responses = products.stream().map(item -> {
				ProductResponse productResponse = mapper.map(item, ProductResponse.class);
				Brand brand = brandService.brandById(item.getBrandId());
				Category category = categoryService.categoryById(item.getCategoryId());
				productResponse.setBrandName(brand.getName());
				productResponse.setCategoryName(category.getName());
				return productResponse;
			}).collect(Collectors.toList());
			log.error("Get list successfully");
			return ResponseUtil.responseSuccess(responses);
		} catch (Exception e) {
			log.error("Error product get list is empty");
			throw new ApplicationException(APIStatus.ERR_PRODUCT_LIST_IS_EMPTY);
		}
	}
}
