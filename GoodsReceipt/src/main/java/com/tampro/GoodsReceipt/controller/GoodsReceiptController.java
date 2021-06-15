package com.tampro.GoodsReceipt.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.tampro.GoodsReceipt.entity.Invoice;
import com.tampro.GoodsReceipt.entity.InvoiceDetail;
import com.tampro.GoodsReceipt.exception.ApplicationException;
import com.tampro.GoodsReceipt.model.request.CreateInvoiceRequest;
import com.tampro.GoodsReceipt.model.request.InvoiceDetailModel;
import com.tampro.GoodsReceipt.model.request.UpdateInvoiceRequest;
import com.tampro.GoodsReceipt.response.APIResponse;
import com.tampro.GoodsReceipt.response.APIStatus;
import com.tampro.GoodsReceipt.service.InvoiceService;
import com.tampro.GoodsReceipt.utils.Constant;
import com.tampro.GoodsReceipt.utils.ResponseUtil;



@RestController
@RequestMapping(Constant.GOODS_RECEIPT_API)
public class GoodsReceiptController {

	
	@Value("${instance.name}")
	private String instanceName;
	
	@Autowired  
	private RestTemplate restTemplate;  
	
	@Autowired
	private InvoiceService invoiceService;
	
	private static final Logger log = LoggerFactory.getLogger(GoodsReceiptController.class);

	private ModelMapper mapper = new ModelMapper();
	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
	
	//"MKH-" + dateReplaced + "-" + (cusNear.size() + 1)
	//(cusNear.size() + 1): Số column đc tạo ngay hôm đó  + 1
	
	@PostMapping(value = Constant.INVOICE_CREATE)
	public ResponseEntity<APIResponse> createInvoice(@RequestBody CreateInvoiceRequest invoiceRequest){
		log.info("create invoice");
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		//get supplier
		APIResponse responseSupplier = restTemplate.getForObject(Constant.SUPPLIER_SERVICE_API + "/supplier_get_detail/" + invoiceRequest.getSupplierId(), APIResponse.class);
		//check supplier 
		if(responseSupplier.getData() == null) {
			log.error("error create invoice invoice supplier not exist");
			throw new ApplicationException(APIStatus.ERR_INVOICE_SUPPLIER_NOT_EXIST);
		}
		try {
			List<InvoiceDetail> details = new ArrayList<InvoiceDetail>();
			Invoice invoice = mapper.map(invoiceRequest, Invoice.class);
			log.info("save invoice success");
			for(InvoiceDetailModel item : invoiceRequest.getInvoiceDetails()) {
				//check product
				APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/" + item.getProductId(), APIResponse.class);
				if(apiResponse.getData() == null) {
					throw new ApplicationException(APIStatus.ERR_CREATE_INVOICE);
				}
				//map
				InvoiceDetail invoiceDetail = mapper.map(item, InvoiceDetail.class);
				invoiceDetail.setActiveFlag(Constant.ACTIVE);
				invoiceDetail.setInvoice(invoice);
				details.add(invoiceDetail);
			}
			invoice.setActiveFlag(Constant.ACTIVE);
			invoice.setInvoiceDetails(details);
			invoiceService.save(invoice);
			//save
			return ResponseUtil.responseSuccess("create invoice successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error create invoice");
			throw new ApplicationException(APIStatus.ERR_CREATE_INVOICE);
		}
	}
	
	@PostMapping(value = Constant.INVOICE_DELETE)
	@Transactional
	public ResponseEntity<APIResponse> deleteInvoice(@RequestBody List<Long> ids){
		try {
			List<InvoiceDetail> details = new ArrayList<InvoiceDetail>();
			for(Long id : ids) {
				 Invoice invoice = invoiceService.invoiceById(id);
				 if(invoice == null) {
					 throw new ApplicationException(APIStatus.ERR_INVOICE_ID_NOT_EXIST);
				 }
				 invoice.setActiveFlag(Constant.YET_ACTIVE);
				 details = invoice.getInvoiceDetails().stream().map(item -> {
					 item.setActiveFlag(Constant.YET_ACTIVE);
					 return item;
				 }).collect(Collectors.toList());
				 invoice.setInvoiceDetails(details);
				 invoiceService.save(invoice);
			}
			log.error("delete invoice successfully");
			return ResponseUtil.responseSuccess("delete invoice successfully");
		} catch (Exception e) {
			log.error("error delete invoice id not exist");
			throw new ApplicationException(APIStatus.ERR_INVOICE_ID_NOT_EXIST);
		}
	}
	
	@PutMapping(value = Constant.INVOICE_UPDATE)
	public ResponseEntity<APIResponse> updateInvoice(@RequestBody UpdateInvoiceRequest invoiceRequest){
		log.info("update invoice");
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		Invoice getInvoice =  invoiceService.invoiceById(invoiceRequest.getId());
		if(getInvoice == null) {
			throw new ApplicationException(APIStatus.ERR_INVOICE_ID_NOT_EXIST);
		}
		// get supplier
		APIResponse responseSupplier = restTemplate.getForObject(Constant.SUPPLIER_SERVICE_API + "/supplier_get_detail/" + invoiceRequest.getSupplierId(),APIResponse.class);
		// check supplier
		if (responseSupplier.getData() == null) {
			log.error("error update invoice invoice supplier not exist");
			throw new ApplicationException(APIStatus.ERR_INVOICE_SUPPLIER_NOT_EXIST);
		}
		try {
			List<InvoiceDetail> details = new ArrayList<InvoiceDetail>();
			Invoice invoice = mapper.map(invoiceRequest, Invoice.class);
			log.info("save invoice success");
			
			for(InvoiceDetailModel item : invoiceRequest.getInvoiceDetails()) {
				//check product
				APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/" + item.getProductId(), APIResponse.class);
				if(apiResponse.getData() == null) {
					log.error("error update getData is null ");
					throw new ApplicationException(APIStatus.ERR_UPDATE_INVOICE);
				}
				InvoiceDetail getInvoiceDetail = invoiceService.invoiceDetailById(item.getId());
				if(getInvoiceDetail == null) {
					log.error("error update invoice getInvoiceDetail is null ");
					throw new ApplicationException(APIStatus.ERR_UPDATE_INVOICE);
				}
				//map
				InvoiceDetail invoiceDetail = mapper.map(item, InvoiceDetail.class);
				invoiceDetail.setActiveFlag(Constant.ACTIVE);
				invoiceDetail.setInvoice(invoice);
				details.add(invoiceDetail);
			}
			invoice.setActiveFlag(getInvoice.getActiveFlag());
			invoice.setCreateDate(getInvoice.getCreateDate());
			invoice.setInvoiceDetails(details);
			invoiceService.save(invoice);
			//save invoice
			return ResponseUtil.responseSuccess("update invoice successfully");
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error update invoice");
			throw new ApplicationException(APIStatus.ERR_UPDATE_INVOICE);
		}
	}
	
	@GetMapping(value = "/get_product/{proId}")
	public ResponseEntity<APIResponse> getProducts(@PathVariable("proId") long proId){
		 
		APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/"+proId, APIResponse.class);
		log.error("get products response {}",apiResponse);
		return ResponseUtil.responseSuccess(apiResponse);
	}
}
