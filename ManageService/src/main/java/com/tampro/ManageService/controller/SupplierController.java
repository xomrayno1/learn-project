package com.tampro.ManageService.controller;

import java.util.List;

import javax.validation.Valid;

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

import com.tampro.ManageService.entity.Supplier;
import com.tampro.ManageService.exception.ApplicationException;
import com.tampro.ManageService.model.request.CreateSupplierRequest;
import com.tampro.ManageService.model.request.SupplierPagingSearchSortModel;
import com.tampro.ManageService.model.request.UpdateSupplierRequest;
import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;
import com.tampro.ManageService.service.SupplierService;
import com.tampro.ManageService.utils.CommonUtil;
import com.tampro.ManageService.utils.Constant;
import com.tampro.ManageService.utils.ResponseUtil;

@RestController
@RequestMapping(value = Constant.SUPPLIER_API)
@CrossOrigin(value = Constant.CROSS_ORIGIN)
public class SupplierController {
	@Autowired
	private SupplierService supplierService;
	
	private ModelMapper mapper = new ModelMapper();
	
	private static final Logger log = LoggerFactory.getLogger(CategoryController.class);

	
	@PostMapping(value = Constant.SUPPLIER_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody SupplierPagingSearchSortModel pagingSearchSortModel){
		try {
			Page<Supplier> listSupplier = supplierService.doFilterSearchPagingSupplier(pagingSearchSortModel.getSearchKey(), pagingSearchSortModel.getPageSize(),
										pagingSearchSortModel.getPageNumber(), pagingSearchSortModel.getSortCase(),
											pagingSearchSortModel.isAscSort());
			if(listSupplier == null) {
				throw new ApplicationException(APIStatus.ERR_SUPPLIER_LIST_IS_EMPTY);
			}
			log.info("get list filter successfully");
			return ResponseUtil.responseSuccess(listSupplier);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error supplier list is empty");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_LIST_IS_EMPTY);
		}
	}
	
	@GetMapping(value = Constant.SUPPLIER_GET_DETAIL)
	public ResponseEntity<APIResponse> getSupplierDetail(@PathVariable("supId") long supId){
		try {
			Supplier supplier = supplierService.supplierById(supId);
			if(supplier == null) {
				throw new ApplicationException(APIStatus.ERR_SUPPLIER_ID_NOT_EXIST);
			}
			log.info("get supplier detail successfully");
			return ResponseUtil.responseSuccess(supplier);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error supplier id not exists");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_ID_NOT_EXIST);
		}
	}

	@PostMapping(value = Constant.SUPPLIER_CREATE)
	public ResponseEntity<APIResponse> createSupplier(@Valid @RequestBody CreateSupplierRequest supplierRequest){
		Supplier getSupplierByName = supplierService.supplierByName(supplierRequest.getName());
		Supplier getSupplierByEmail = supplierService.supplierByEmail(supplierRequest.getEmail());
		
		if(CommonUtil.isValidPattern(supplierRequest.getEmail(), Constant.EMAIL_PATTERN)) {
			log.error("error supplier email incorrect format");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_EMAIL_INCORRECT_FORMAT);
		}
		if (getSupplierByName != null) {
			log.error("error supplier name already exists");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_NAME_ALREADY_EXISTS);
		}
		if (getSupplierByEmail != null) {
			log.error("error supplier email already exists");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_EMAIL_ALREADY_EXISTS);
		}
		try {
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			
			Supplier supplier = mapper.map(supplierRequest, Supplier.class);
			supplier.setActiveFlag(Constant.ACTIVE);
			supplierService.save(supplier);
			
			log.info("create supplier successfully");
			return ResponseUtil.responseSuccess("Create supplier successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error create supplier");
			throw new ApplicationException(APIStatus.ERR_CREATE_SUPPLIER);
		}
	}
	
	@PostMapping(value = Constant.SUPPLIER_DELETE)
	public ResponseEntity<APIResponse> deleteSupplier(@RequestBody List<Long> ids){
		try {
			for(Long id : ids) {
				Supplier supplier = supplierService.supplierById(id);
				if(supplier == null) {
					throw new ApplicationException(APIStatus.ERR_SUPPLIER_ID_NOT_EXIST);
				}
				supplier.setActiveFlag(Constant.YET_ACTIVE);
				supplierService.save(supplier);
			}
			log.info("delete supplier successfully");
			return ResponseUtil.responseSuccess("Delete supplier successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error delete supplier id not exist");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_ID_NOT_EXIST);
		}
	}
	
	@PutMapping(value = Constant.SUPPLIER_UPDATE)
	public ResponseEntity<APIResponse> updateSupplier(@Validated @RequestBody UpdateSupplierRequest supplierRequest){
		Supplier supplierById = supplierService.supplierById(supplierRequest.getId());
		Supplier supplierByName = supplierService.supplierByName(supplierRequest.getName());
		Supplier supplierByEmail = supplierService.supplierByEmail(supplierRequest.getEmail());
		if(supplierById != null) {
			if(supplierByName != null) {
				if(!supplierByName.getName().equals(supplierById.getName())) {
					log.error("error update supplier name already exist");
					throw new ApplicationException(APIStatus.ERR_SUPPLIER_NAME_ALREADY_EXISTS);
				}
			}
			if(CommonUtil.isValidPattern(supplierRequest.getEmail(), Constant.EMAIL_PATTERN)) {
				log.error("error supplier email incorrect format");
				throw new ApplicationException(APIStatus.ERR_SUPPLIER_EMAIL_INCORRECT_FORMAT);
			}
			if(supplierByEmail != null) {
				if(!supplierByEmail.getEmail().equals(supplierById.getEmail())) {
					log.error("error update supplier email already exist");
					throw new ApplicationException(APIStatus.ERR_SUPPLIER_EMAIL_ALREADY_EXISTS);
				}
			}
			try {
				mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
				
				Supplier supplier = mapper.map(supplierRequest, Supplier.class);
				supplier.setActiveFlag(supplierById.getActiveFlag());
				supplier.setCreateDate(supplierById.getCreateDate());
				supplierService.save(supplier);
				
				log.info("update supplier successfully");
				
				return ResponseUtil.responseSuccess("update supplier successfully");
			} catch (Exception e) {
				log.error("error update supplier");
				throw new ApplicationException(APIStatus.ERR_UPDATE_SUPPLIER);
			}
		}else {
			log.error("error update supplier id not exist");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_ID_NOT_EXIST);
		}
	}
	
	@GetMapping(value = Constant.SUPPLIER_GET_LIST_ACTIVE)
	public ResponseEntity<APIResponse> getListActive(){
		try {
			List<Supplier> suppliers = supplierService.supplierByActive(Constant.ACTIVE);
			if(suppliers == null) {
				throw new ApplicationException(APIStatus.ERR_SUPPLIER_LIST_IS_EMPTY);
			}
			log.info("get supplier active successfully");
			return ResponseUtil.responseSuccess(suppliers);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error supplier active list is empty");
			throw new ApplicationException(APIStatus.ERR_SUPPLIER_LIST_IS_EMPTY);
		}
	}

}
