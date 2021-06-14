package com.tampro.ManageService.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.ManageService.entity.Supplier;

@Repository
@Transactional
public interface SupplierRepository extends JpaRepository<Supplier, Long>, JpaSpecificationExecutor<Supplier>{

	 
	List<Supplier> findByActiveFlag(int activeFlag);
	
	Supplier findByName(String name);
	
	Supplier findByEmail(String email);
}
