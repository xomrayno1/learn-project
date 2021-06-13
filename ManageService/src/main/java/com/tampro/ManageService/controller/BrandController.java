package com.tampro.ManageService.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.ManageService.entity.Brand;
import com.tampro.ManageService.exception.ApplicationException;
import com.tampro.ManageService.model.request.BrandPagingSearchSortModel;
import com.tampro.ManageService.model.request.CreateBrandRequest;
import com.tampro.ManageService.model.request.UpdateBrandRequest;
import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;
import com.tampro.ManageService.service.BrandService;
import com.tampro.ManageService.utils.Constant;
import com.tampro.ManageService.utils.ResponseUtil;

@RestController
@RequestMapping(value = Constant.BRAND_API)
@CrossOrigin(value = Constant.CROSS_ORIGIN)
public class BrandController {
	@Autowired
	private BrandService brandService;
	
	private ModelMapper mapper = new ModelMapper();
	
	private static final Logger log = LoggerFactory.getLogger(CategoryController.class);

	
	@PostMapping(value = Constant.BRAND_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody BrandPagingSearchSortModel pagingSearchSortModel){
		try {
			Page<Brand> listBrand = brandService.doFilterSearchPagingBrand(pagingSearchSortModel.getSearchKey(), pagingSearchSortModel.getPageSize(),
										pagingSearchSortModel.getPageNumber(), pagingSearchSortModel.getSortCase(),
											pagingSearchSortModel.isAscSort());
			if(listBrand == null) {
				throw new ApplicationException(APIStatus.ERR_BRAND_LIST_IS_EMPTY);
			}
			log.info("get list filter successfully");
			return ResponseUtil.responseSuccess(listBrand);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error brand list is empty");
			throw new ApplicationException(APIStatus.ERR_BRAND_LIST_IS_EMPTY);
		}
	}
	
	@GetMapping(value = Constant.BRAND_GET_DETAIL)
	public ResponseEntity<APIResponse> getBrandDetail(@PathVariable("braId") long braId){
		try {
			Brand brand = brandService.brandById(braId);
			if(brand == null) {
				throw new ApplicationException(APIStatus.ERR_BRAND_ID_NOT_EXIST);
			}
			log.info("get brand detail successfully");
			return ResponseUtil.responseSuccess(brand);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error brand id not exists");
			throw new ApplicationException(APIStatus.ERR_BRAND_ID_NOT_EXIST);
		}
	}

	@PostMapping(value = Constant.BRAND_CREATE)
	public ResponseEntity<APIResponse> createBrand(@Validated @RequestBody CreateBrandRequest brandRequest){
		Brand getBrand = brandService.brandByName(brandRequest.getName());
		if (getBrand != null) {
			log.error("error brand name already exists");
			throw new ApplicationException(APIStatus.ERR_BRAND_NAME_ALREADY_EXISTS);
		}
		try {
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			
			Brand brand = mapper.map(brandRequest, Brand.class);
			brand.setActiveFlag(Constant.ACTIVE);
			brandService.save(brand);
			
			log.info("create brand successfully");
			return ResponseUtil.responseSuccess("Create brand successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error create brand");
			throw new ApplicationException(APIStatus.ERR_CREATE_BRAND);
		}
	}
	
	@PostMapping(value = Constant.BRAND_DELETE)
	public ResponseEntity<APIResponse> deleteBrand(@RequestBody List<Long> ids){
		try {
			for(Long id : ids) {
				Brand brand = brandService.brandById(id);
				if(brand == null) {
					throw new ApplicationException(APIStatus.ERR_BRAND_ID_NOT_EXIST);
				}
				brand.setActiveFlag(Constant.YET_ACTIVE);
				brandService.save(brand);
			}
			log.info("delete brand successfully");
			return ResponseUtil.responseSuccess("Delete brand successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error delete brand id not exist");
			throw new ApplicationException(APIStatus.ERR_BRAND_ID_NOT_EXIST);
		}
	}
	
	@PutMapping(value = Constant.BRAND_UPDATE)
	public ResponseEntity<APIResponse> updateCategory(@Validated @RequestBody UpdateBrandRequest brandRequest){
		Brand brandById = brandService.brandById(brandRequest.getId());
		Brand brandByName = brandService.brandByName(brandRequest.getName());
		if(brandById != null) {
			if(brandByName != null) {
				if(!brandByName.getName().equals(brandById.getName())) {
					throw new ApplicationException(APIStatus.ERR_BRAND_NAME_ALREADY_EXISTS);
				}
			}
			try {
				mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
				
				Brand brand = mapper.map(brandRequest, Brand.class);
				brand.setActiveFlag(brandById.getActiveFlag());
				brand.setCreateDate(brandById.getCreateDate());
				brandService.save(brand);
				
				log.info("update brand successfully");
				
				return ResponseUtil.responseSuccess("update brand successfully");
			} catch (Exception e) {
				log.error("error update brand");
				throw new ApplicationException(APIStatus.ERR_UPDATE_BRAND);
			}
		}else {
			log.error("error update brand id not exist");
			throw new ApplicationException(APIStatus.ERR_BRAND_ID_NOT_EXIST);
		}
	}
	
	@GetMapping(value = Constant.BRAND_GET_LIST_ACTIVE)
	public ResponseEntity<APIResponse> getListActive(){
		try {
			List<Brand> brands = brandService.brandByActive(Constant.ACTIVE);
			if(brands == null) {
				throw new ApplicationException(APIStatus.ERR_BRAND_LIST_IS_EMPTY);
			}
			log.info("get brand active successfully");
			return ResponseUtil.responseSuccess(brands);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error brand active list is empty");
			throw new ApplicationException(APIStatus.ERR_BRAND_LIST_IS_EMPTY);
		}
	}

}
