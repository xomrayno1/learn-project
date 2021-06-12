package com.tampro.ManageService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.ManageService.entity.Category;
import com.tampro.ManageService.repository.CategoryRepository;
import com.tampro.ManageService.response.specification.CategorySpecification;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepo;

	Page<Category> doFilterSearchPagingCategory(String searchKey, int pageSize, int pageNumber, int sortCase, boolean isAscSort){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return categoryRepo.findAll(new CategorySpecification(searchKey, sortCase, isAscSort), pageable);
	}
	
	boolean isExist(long cateId) {
		 return true;
	}
	
	public Category save(Category category) {
		return categoryRepo.save(category);
	}
	
	public void delete(long cateId) {
		categoryRepo.deleteById(cateId);
	}
	
	public Category categoryById(long cateId) {
		return  null;
	}
}
