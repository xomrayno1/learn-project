package com.tampro.GoodsReceipt.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.GoodsReceipt.entity.Invoice;
import com.tampro.GoodsReceipt.repository.InvoiceRepository;
import com.tampro.GoodsReceipt.response.specification.InvoiceSpecification;

@Service
public class InvoiceService {
	@Autowired
	private InvoiceRepository invoiceRepo;

	Page<Invoice> doFilterSearchPagingInvoice(Date fromDate, Date toDate, int pageSize, int pageNumber){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return invoiceRepo.findAll(new InvoiceSpecification(fromDate, toDate), pageable);
	}
	
	boolean isExist(long invoiceId) {
		 return invoiceRepo.exists(invoiceId);
	}
	
	public Invoice save(Invoice invoice) {
		return invoiceRepo.save(invoice);
	}
	
	public void delete(long invoiceId) {
		invoiceRepo.deleteById(invoiceId);
	}
	
	public Invoice invoiceById(long invoiceId) {
		return invoiceRepo.getOne(invoiceId);
	}
}
