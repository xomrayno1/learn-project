package com.tampro.GoodsReceipt.response.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.GoodsReceipt.entity.Invoice;

public class InvoiceSpecification implements Specification<Invoice>{
	
	private final Date toDate;
	private final Date fromDate;
  
	
	public InvoiceSpecification(Date fromDate, Date toDate) {
		this.toDate = toDate;
		this.fromDate = fromDate;
	}


	@Override
	public Predicate toPredicate(Root<Invoice> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		return null;
	}

}
