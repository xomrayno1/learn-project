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

import com.tampro.ManageService.entity.Category;
import com.tampro.ManageService.exception.ApplicationException;
import com.tampro.ManageService.model.request.CategoryPagingSearchSortModel;
import com.tampro.ManageService.model.request.CreateCategoryRequest;
import com.tampro.ManageService.model.request.UpdateCategoryRequest;
import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;
import com.tampro.ManageService.service.CategoryService;
import com.tampro.ManageService.utils.Constant;
import com.tampro.ManageService.utils.ResponseUtil;

@RestController
@RequestMapping(value = Constant.CATEGORY_API)
@CrossOrigin(value = Constant.CROSS_ORIGIN)
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	private ModelMapper mapper = new ModelMapper();
	
	private static final Logger log = LoggerFactory.getLogger(CategoryController.class);

	
	@PostMapping(value = Constant.CATEGORY_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody CategoryPagingSearchSortModel pagingSearchSortModel){
		try {
			Page<Category> listCategory = categoryService.doFilterSearchPagingCategory(pagingSearchSortModel.getSearchKey(), pagingSearchSortModel.getPageSize(),
					pagingSearchSortModel.getPageNumber(), pagingSearchSortModel.getSortCase(),
						pagingSearchSortModel.isAscSort());
			if(listCategory == null) {
				throw new ApplicationException(APIStatus.ERR_CATEGORY_LIST_IS_EMPTY);
			}
			log.info("get list filter successfully");
			return ResponseUtil.responseSuccess(listCategory);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error category list is empty");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_LIST_IS_EMPTY);
		}
	}
	
	@GetMapping(value = Constant.CATEGORY_GET_DETAIL)
	public ResponseEntity<APIResponse> getCategoryDetail(@PathVariable("cateId") long cateId){
		try {
			Category category= categoryService.categoryById(cateId);
			if(category == null) {
				throw new ApplicationException(APIStatus.ERR_CATEGORY_ID_NOT_EXIST);
			}
			log.info("get category detail successfully");
			return ResponseUtil.responseSuccess(category);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error category id not exists");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_ID_NOT_EXIST);
		}
	}

	@PostMapping(value = Constant.CATEGORY_CREATE)
	public ResponseEntity<APIResponse> createCategory(@Validated @RequestBody CreateCategoryRequest categoryRequest){
		Category getCategory = categoryService.categoryByName(categoryRequest.getName());
		if (getCategory != null) {
			log.error("error category name already exists");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_NAME_ALREADY_EXISTS);
		}
		try {
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			Category category = mapper.map(categoryRequest, Category.class);
			category.setActiveFlag(Constant.ACTIVE);
			categoryService.save(category);
			log.info("create category successfully");
			return ResponseUtil.responseSuccess("Create category successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error create category");
			throw new ApplicationException(APIStatus.ERR_CREATE_CATEGORY);
		}
	}
	
	@PostMapping(value = Constant.CATEGORY_DELETE)
	public ResponseEntity<APIResponse> deleteCategory(@RequestBody List<Long> ids){
		try {
			for(Long id : ids) {
				Category category = categoryService.categoryById(id);
				if(category == null) {
					throw new ApplicationException(APIStatus.ERR_CATEGORY_ID_NOT_EXIST);
				}
				category.setActiveFlag(Constant.YET_ACTIVE);
				categoryService.save(category);
			}
			log.info("delete category successfully");
			return ResponseUtil.responseSuccess("Delete category successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error delete category id not exist");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_ID_NOT_EXIST);
		}
	}
	
	@PutMapping(value = Constant.CATEGORY_UPDATE)
	public ResponseEntity<APIResponse> updateCategory(@Validated @RequestBody UpdateCategoryRequest categoryRequest){
		Category categoryById = categoryService.categoryById(categoryRequest.getId());
		Category categoryByName = categoryService.categoryByName(categoryRequest.getName());
		if(categoryById != null) {
			if(categoryByName != null) {
				if(!categoryByName.getName().equals(categoryById.getName())) {
					throw new ApplicationException(APIStatus.ERR_CATEGORY_NAME_ALREADY_EXISTS);
				}
			}
			try {
				mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
				
				Category category = mapper.map(categoryRequest, Category.class);
				category.setActiveFlag(categoryById.getActiveFlag());
				category.setCreateDate(categoryById.getCreateDate());
				categoryService.save(category);
				
				log.info("update category successfully");
				
				return ResponseUtil.responseSuccess("update category successfully");
			} catch (Exception e) {
				log.error("error update category");
				throw new ApplicationException(APIStatus.ERR_UPDATE_CATEGORY);
			}
		}else {
			log.error("error update category id not exist");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_ID_NOT_EXIST);
		}
	}
	
	@GetMapping(value = Constant.CATEGORY_GET_LIST_ACTIVE)
	public ResponseEntity<APIResponse> getListActive(){
		try {
			List<Category> categories= categoryService.categoryByActive(Constant.ACTIVE);
			if(categories == null) {
				throw new ApplicationException(APIStatus.ERR_CATEGORY_LIST_IS_EMPTY);
			}
			log.info("get category active successfully");
			return ResponseUtil.responseSuccess(categories);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error category active list is empty");
			throw new ApplicationException(APIStatus.ERR_CATEGORY_LIST_IS_EMPTY);
		}
	}
	
}
