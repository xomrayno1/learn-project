package com.tampro.ManageService.response.specification;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.ManageService.entity.Brand;
import com.tampro.ManageService.entity.Category;
import com.tampro.ManageService.entity.Product;
import com.tampro.ManageService.utils.Constant;

public class ProductSpecification implements Specification<Product>{
	
	private final String searchKey;
	private final String categoryId;
	private final String brandId;
    private final int sortCase;
    private final boolean isAscSort;

	@Override
	public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		List<Predicate> predicates = new ArrayList<>();
		
		if(searchKey != null && !searchKey.trim().isEmpty()) {
			String wrapSearch = "%" + searchKey.trim() +"%";
			Predicate proId = criteriaBuilder.like(root.get("id"), wrapSearch);
			Predicate proName = criteriaBuilder.like(root.get("name"), wrapSearch);
			Predicate proCode = criteriaBuilder.like(root.get("code"), wrapSearch);
			Predicate search = criteriaBuilder.or(proId, proName, proCode);
			predicates.add(search);
		}
		
		if(categoryId != null && categoryId.trim().isEmpty()) {
			Root<Category> rootCate = query.from(Category.class);
			predicates.add(criteriaBuilder.equal(rootCate.get("id"), categoryId));
			predicates.add(criteriaBuilder.equal(root.get("id"), rootCate.get("id")));
		}
		
		if(brandId != null && brandId.trim().isEmpty()) {
			Root<Brand> rootBrand = query.from(Brand.class);	
			predicates.add(criteriaBuilder.equal(rootBrand.get("id"), brandId));
			predicates.add(criteriaBuilder.equal(root.get("id"), rootBrand.get("id")));
		}
		//select * from s  inner join a on a.id = s.id where a.id = 1
		
		Path orderClause;
		switch (sortCase) {
			case Constant.SORT_BY_PRODUCT_ID:
				orderClause = root.get("id");
				break;
			case Constant.SORT_BY_PRODUCT_NAME:
				orderClause = root.get("name");
				break;
			case Constant.SORT_BY_PRODUCT_CODE:
				orderClause = root.get("code");
				break;
			default:
				orderClause = root.get("id");
				break;
		}
		if(isAscSort) {
			query.orderBy(criteriaBuilder.asc(orderClause));
		}else {
			query.orderBy(criteriaBuilder.desc(orderClause));
		}
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
	}

	public ProductSpecification(String searchKey, String categoryId, String brandId, int sortCase, boolean isAscSort) {
		 
		this.searchKey = searchKey;
		this.categoryId = categoryId;
		this.brandId = brandId;
		this.sortCase = sortCase;
		this.isAscSort = isAscSort;
	}

	public String getSearchKey() {
		return searchKey;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public String getBrandId() {
		return brandId;
	}

	
	
}
