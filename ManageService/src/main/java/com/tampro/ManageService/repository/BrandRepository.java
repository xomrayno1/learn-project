package com.tampro.ManageService.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.ManageService.entity.Brand;

@Repository
@Transactional
public interface BrandRepository extends JpaRepository<Brand, Long>, JpaSpecificationExecutor<Brand>{

	 
	List<Brand> findByActiveFlag(int activeFlag);
	
	Brand findByName(String name);
}
