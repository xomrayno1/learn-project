package com.tampro.ManageService.response.specification;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.ManageService.entity.Supplier;
import com.tampro.ManageService.utils.Constant;

public class SupplierSpecification implements Specification<Supplier>{
	
	private final String searchKey;
	private final int sortCase;
	private final boolean isAscSort;

	
	@Override
	public Predicate toPredicate(Root<Supplier> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		List<Predicate> predicates = new ArrayList<>();
		
		if(searchKey != null && !searchKey.trim().isEmpty()) {
			String wrapSearch = "%" + searchKey.trim() + "%";
			Predicate brandName = criteriaBuilder.like(root.get("name"), wrapSearch);
			predicates.add(brandName);
		}
		
		Path orderClause;
		switch (sortCase) {
			case Constant.SORT_BY_SUPPLIER_ID:
				orderClause = root.get("id");
				break;
			case Constant.SORT_BY_SUPPLIER_NAME:
				orderClause = root.get("name");
				break;
			default:
				orderClause = root.get("name");
				break;
		}
		
		if(isAscSort) {
			query.orderBy(criteriaBuilder.asc(orderClause));
		}else {
			query.orderBy(criteriaBuilder.desc(orderClause));
		}
		
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
	}


	public SupplierSpecification(String searchKey, int sortCase, boolean isAscSort) {
		this.searchKey = searchKey;
		this.sortCase = sortCase;
		this.isAscSort = isAscSort;
	}


	public String getSearchKey() {
		return searchKey;
	}


	public int getSortCase() {
		return sortCase;
	}


	public boolean isAscSort() {
		return isAscSort;
	}
	
	 

	 
 
	
	
	
}
