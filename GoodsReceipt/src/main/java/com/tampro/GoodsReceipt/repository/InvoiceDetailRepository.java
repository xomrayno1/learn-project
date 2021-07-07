package com.tampro.GoodsReceipt.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tampro.GoodsReceipt.entity.InvoiceDetail;
@Repository
@Transactional
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long>, JpaSpecificationExecutor<InvoiceDetail>{
	
	
	@Query(value = "SELECT ID FROM InvoiceDetail ID where ID.invoice.id = ?1")
	List<InvoiceDetail> getInvoiceDetailByInvoice(long invoiceId);
}
