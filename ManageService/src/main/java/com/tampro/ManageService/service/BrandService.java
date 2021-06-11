package com.tampro.ManageService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.ManageService.entity.Brand;
import com.tampro.ManageService.repository.BrandRepository;
import com.tampro.ManageService.response.specification.BrandSpecification;

@Service
public class BrandService {
	@Autowired
	private BrandRepository brandRepo;;

	Page<Brand> doFilterSearchPagingBrand(String keySearch, int sortCase, boolean isAscSort, int pageSize, int pageNumber){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return brandRepo.findAll(new BrandSpecification(keySearch, sortCase, isAscSort), pageable);
	}
	
	boolean isExist(long brandId) {
		 return brandRepo.exists(brandId);
	}
	
	public Brand save(Brand brand) {
		return brandRepo.save(brand);
	}
	
	public void delete(long brandId) {
		brandRepo.deleteById(brandId);
	}
	
	public Brand productById(long brandId) {
		return brandRepo.findOne(brandId);
	}
}
