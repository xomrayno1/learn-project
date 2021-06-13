package com.tampro.ManageService.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.ManageService.entity.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{
	
	 
	Product findByCode(String code);
	
	List<Product> findByActiveFlag(int activeFlag);
	 
	
}
