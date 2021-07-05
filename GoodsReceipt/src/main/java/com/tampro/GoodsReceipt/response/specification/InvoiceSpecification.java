package com.tampro.GoodsReceipt.response.specification;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.GoodsReceipt.entity.Invoice;

public class InvoiceSpecification implements Specification<Invoice>{
	
	private final Date toDate;
	private final Date fromDate;
	private final Date dateExport;
    private int sortCase;
    private boolean ascSort;

	public InvoiceSpecification(Date fromDate, Date toDate, Date dateExport, int sortCase, boolean ascSort) {
		super();
		this.toDate = toDate;
		this.fromDate = fromDate;
		this.dateExport = dateExport;
		this.sortCase = sortCase;
		this.ascSort = ascSort;
	}

	@Override
	public Predicate toPredicate(Root<Invoice> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		List<Predicate> predicates = new LinkedList<>();
		if(dateExport != null) {
			Predicate preExport = criteriaBuilder.equal(root.get("dateExport"), dateExport);
			predicates.add(preExport);
		}
		
		if(fromDate != null && toDate != null) {
			Predicate preFromTo = criteriaBuilder.between(root.get("create_date"), fromDate, toDate);
			predicates.add(preFromTo);
		}
		
		Predicate preActiveFlag = criteriaBuilder.equal(root.get("activeFlag"), 1);
		predicates.add(preActiveFlag);
		return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
	}

	public int getSortCase() {
		return sortCase;
	}

	public void setSortCase(int sortCase) {
		this.sortCase = sortCase;
	}

	public boolean isAscSort() {
		return ascSort;
	}

	public void setAscSort(boolean ascSort) {
		this.ascSort = ascSort;
	}

	public Date getToDate() {
		return toDate;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public Date getDateExport() {
		return dateExport;
	}

	
	
}
