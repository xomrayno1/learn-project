package com.tampro.ManageService.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.ManageService.entity.Category;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category>{
	
	 
	List<Category> findByActiveFlag(int activeFlag);
	
	Category findByName(String name);
	
}
