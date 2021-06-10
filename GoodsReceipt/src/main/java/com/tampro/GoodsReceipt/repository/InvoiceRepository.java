package com.tampro.GoodsReceipt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.GoodsReceipt.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long>, JpaSpecificationExecutor<Invoice>{
	
	boolean exists(long invoiceId);
	
}
