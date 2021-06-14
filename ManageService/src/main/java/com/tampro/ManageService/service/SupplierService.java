package com.tampro.ManageService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.ManageService.entity.Supplier;
import com.tampro.ManageService.repository.SupplierRepository;
import com.tampro.ManageService.response.specification.SupplierSpecification;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepo;;

	public Page<Supplier> doFilterSearchPagingSupplier(String searchKey, int pageSize, int pageNumber, int sortCase, boolean isAscSort){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return supplierRepo.findAll(new SupplierSpecification(searchKey, sortCase, isAscSort), pageable);
	}
	
	boolean isExist(long supplierId) {
		 return supplierRepo.findById(supplierId) != null ? true : false;
	}
	
	public Supplier save(Supplier supplier) {
		return supplierRepo.save(supplier);
	}
	
	public void delete(long supplierId) {
		supplierRepo.deleteById(supplierId);
	}
	
	public Supplier getOne(long braId) {
		return supplierRepo.getOne(braId);
	}
	
	public Supplier supplierById(long supplierId) {
		return supplierRepo.findById(supplierId).orElse(null);
	}
	
	public Supplier supplierByName(String name) {
		return supplierRepo.findByName(name);
	}
	
	public Supplier supplierByEmail(String email) {
		return supplierRepo.findByEmail(email);
	}
	
	public List<Supplier> supplierByActive(int activeFlag){
		return supplierRepo.findByActiveFlag(activeFlag);
	}
}
