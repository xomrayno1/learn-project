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
			System.out.println(wrapSearch);
			Predicate proName = criteriaBuilder.like(root.get("name"), wrapSearch);
			Predicate proCode = criteriaBuilder.like(root.get("code"), wrapSearch);
			Predicate search = criteriaBuilder.or(proName, proCode);
			predicates.add(search);
		}
		 
		if(categoryId != null && !categoryId.trim().isEmpty()) {
			Root<Category> cateRoot = query.from(Category.class);
			predicates.add(criteriaBuilder.equal(cateRoot.get("id"), categoryId));
			predicates.add(criteriaBuilder.equal(root.get("categoryId"), cateRoot.get("id")));
		}
		 
		if(brandId != null && !brandId.trim().isEmpty()) {
			Root<Supplier> brandRoot = query.from(Supplier.class);	
			predicates.add(criteriaBuilder.equal(brandRoot.get("id"), brandId));
			predicates.add(criteriaBuilder.equal(root.get("brandId"), brandRoot.get("id")));
		}
		//select * from s  inner join a on a.id = s.id where a.id = 1
		
		
		Predicate preActiveFlag = criteriaBuilder.equal(root.get("activeFlag"), 1);
		predicates.add(preActiveFlag);
		
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
			case Constant.SORT_BY_PRODUCT_CATEGORY:
				orderClause = root.get("categoryId");
				break;
			case Constant.SORT_BY_PRODUCT_BRAND:
				orderClause = root.get("brandId");
				break;
			case Constant.SORT_BY_PRODUCT_PRICE:
				orderClause = root.get("price");
				break;
			default:
				orderClause = root.get("id");
		}
		if(isAscSort) {
			System.out.println("asc");
			query.orderBy(criteriaBuilder.asc(orderClause));
		}else {
			System.out.println("desc");
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

	public int getSortCase() {
		return sortCase;
	}

	public boolean isAscSort() {
		return isAscSort;
	}

	
	
}
