package com.tampro.ManageService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.ManageService.entity.Product;
import com.tampro.ManageService.repository.ProductRepository;
import com.tampro.ManageService.response.specification.ProductSpecification;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepo;;

	Page<Product> doFilterSearchPagingProduct(String keySearch, String categoryId, String brandId, int pageSize, int pageNumber, int sortCase, boolean isAscSort){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return productRepo.findAll(new ProductSpecification(keySearch, categoryId, brandId, sortCase, isAscSort), pageable);
	}
	
	boolean isExist(long productId) {
		 return productRepo.exists(productId);
	}
	
	public Product save(Product product) {
		return productRepo.save(product);
	}
	
	public void delete(long productId) {
		productRepo.deleteById(productId);
	}
	
	public Product productById(long productId) {
		return  productRepo.findOne(productId);
	}
}
