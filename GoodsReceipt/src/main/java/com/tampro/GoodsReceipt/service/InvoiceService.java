package com.tampro.GoodsReceipt.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tampro.GoodsReceipt.entity.Invoice;
import com.tampro.GoodsReceipt.entity.InvoiceDetail;
import com.tampro.GoodsReceipt.repository.InvoiceDetailRepository;
import com.tampro.GoodsReceipt.repository.InvoiceRepository;
import com.tampro.GoodsReceipt.response.specification.InvoiceSpecification;

@Service
@Transactional
public class InvoiceService {
	@Autowired
	private InvoiceRepository invoiceRepo;
	
	@Autowired
	private InvoiceDetailRepository invoiceDetailRepo;

	public Page<Invoice> doFilterSearchPagingInvoice(Date fromDate, Date toDate, Date dateExport,int pageSize, int pageNumber, int sortCase, boolean ascSort){
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return invoiceRepo.findAll(new InvoiceSpecification(fromDate, toDate, dateExport, sortCase, ascSort), pageable);
	}
	
	boolean isExist(long invoiceId) {
		 return invoiceRepo.findById(invoiceId) != null ? true : false;
	}
	
	public Invoice save(Invoice invoice) {
 
		return invoiceRepo.save(invoice);
	}
	public InvoiceDetail saveDetail(InvoiceDetail invoiceDetail) {
		return invoiceDetailRepo.save(invoiceDetail);
	}
	
	public InvoiceDetail invoiceDetailById(long id) {
		return invoiceDetailRepo.findById(id).orElse(null);
	}
	
	public void delete(long invoiceId) {
		invoiceRepo.deleteById(invoiceId);
	}
	
	public Invoice invoiceById(long invoiceId) {
		return invoiceRepo.getOne(invoiceId);
	}

	public List<InvoiceDetail> getInvoiceDetailByInvoice(long invoiceId){
		return invoiceDetailRepo.getInvoiceDetailByInvoice(invoiceId);
	}
}
