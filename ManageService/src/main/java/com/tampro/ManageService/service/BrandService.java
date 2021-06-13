package com.tampro.ManageService.service;

import java.util.List;

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

	public Page<Brand> doFilterSearchPagingBrand(String searchKey, int pageSize, int pageNumber, int sortCase, boolean isAscSort){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return brandRepo.findAll(new BrandSpecification(searchKey, sortCase, isAscSort), pageable);
	}
	
	boolean isExist(long brandId) {
		 return brandRepo.findById(brandId) != null ? true : false;
	}
	
	public Brand save(Brand brand) {
		return brandRepo.save(brand);
	}
	
	public void delete(long brandId) {
		brandRepo.deleteById(brandId);
	}
	
	public Brand getOne(long braId) {
		return brandRepo.getOne(braId);
	}
	
	public Brand brandById(long brandId) {
		return brandRepo.findById(brandId).orElse(null);
	}
	
	public Brand brandByName(String name) {
		return brandRepo.findByName(name);
	}
	
	public List<Brand> brandByActive(int activeFlag){
		return brandRepo.findByActiveFlag(activeFlag);
	}
}
