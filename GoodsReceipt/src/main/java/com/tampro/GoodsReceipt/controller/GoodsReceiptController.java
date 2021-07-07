package com.tampro.GoodsReceipt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tampro.GoodsReceipt.config.RabbitMQConfig;
import com.tampro.GoodsReceipt.entity.Invoice;
import com.tampro.GoodsReceipt.entity.InvoiceDetail;
import com.tampro.GoodsReceipt.exception.ApplicationException;
import com.tampro.GoodsReceipt.model.InvoiceDetailModel;
import com.tampro.GoodsReceipt.model.ProductModel;
import com.tampro.GoodsReceipt.model.SupplierModel;
import com.tampro.GoodsReceipt.model.request.CreateInvoiceRequest;
import com.tampro.GoodsReceipt.model.request.InvoicePagingSearchModel;
import com.tampro.GoodsReceipt.model.request.UpdateInvoiceRequest;
import com.tampro.GoodsReceipt.model.response.InvoiceDetailResponse;
import com.tampro.GoodsReceipt.model.response.InvoiceResponse;
import com.tampro.GoodsReceipt.model.response.ModelResponse;
import com.tampro.GoodsReceipt.response.APIResponse;
import com.tampro.GoodsReceipt.response.APIStatus;
import com.tampro.GoodsReceipt.service.InvoiceService;
import com.tampro.GoodsReceipt.utils.Constant;
import com.tampro.GoodsReceipt.utils.ResponseUtil;



@RestController
@RequestMapping(Constant.GOODS_RECEIPT_API)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class GoodsReceiptController {

	
	@Value("${instance.name}")
	private String instanceName;
	
	@Autowired  
	private RestTemplate restTemplate;  
	
	@Autowired
	private InvoiceService invoiceService;
 
	@Autowired
	private RabbitTemplate rabbitTemplate;
	
	private static final Logger log = LoggerFactory.getLogger(GoodsReceiptController.class);

	private ModelMapper mapper = new ModelMapper();
	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
	
	//"MKH-" + dateReplaced + "-" + (cusNear.size() + 1)
	//(cusNear.size() + 1): Số column đc tạo ngay hôm đó  + 1
	
	@PostMapping(value = Constant.INVOICE_GET_LIST_PAGING_SORT_SEARCH_FILTER)
	public ResponseEntity<APIResponse> getListPagingSortSearchFilter(@RequestBody InvoicePagingSearchModel pagingSearchSortModel){
		try {
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			
			Page<Invoice> page = invoiceService.doFilterSearchPagingInvoice(pagingSearchSortModel.getFromDate(), pagingSearchSortModel.getToDate(), pagingSearchSortModel.getDateExport(),
					pagingSearchSortModel.getPageSize(), pagingSearchSortModel.getPageNumber(), pagingSearchSortModel.getSortCase(),
						pagingSearchSortModel.isAscSort());
			if(page == null) {
				throw new ApplicationException(APIStatus.ERR_INVOICE_IS_EMPTY);
			}
			List<InvoiceResponse> responses = page.getContent().stream().map(item -> {
				InvoiceResponse invoiceResponse = mapper.map(item, InvoiceResponse.class);
				invoiceResponse.setSupplierId(item.getSupplierId());
				APIResponse apiResponse = restTemplate.getForObject(Constant.SUPPLIER_SERVICE_API + "/supplier_get_detail/" + item.getSupplierId(), APIResponse.class);
				if(apiResponse.getData() == null) {
					log.error("error invoice supplier not exist");
					throw new ApplicationException(APIStatus.ERR_INVOICE_SUPPLIER_NOT_EXIST);
				}
				ObjectMapper mapper = new ObjectMapper();
				try {
					String json = mapper.writeValueAsString(apiResponse.getData());
					SupplierModel supplierModel = mapper.readValue(json, SupplierModel.class);
					invoiceResponse.setSupplierName(supplierModel.getName());
				} catch (Exception e) {
					// TODO: handle exception
					log.error("error get invoice pssf map json error");
					throw new ApplicationException(APIStatus.ERR_INVOICE_IS_EMPTY);
				}
				return invoiceResponse;
			}).collect(Collectors.toList());
			
			ModelResponse modelResponse = new ModelResponse(responses, page.getTotalElements(), page.getPageable());
			log.info("get list filter successfully");
			return ResponseUtil.responseSuccess(modelResponse);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error invoice list is empty");
			throw new ApplicationException(APIStatus.ERR_INVOICE_IS_EMPTY);
		}
	}
	
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
			
			rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTING_KEY, "create invoice successfully");
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
	
	@GetMapping(value = Constant.INVOICE_GET_DETAIL)
	public ResponseEntity<APIResponse> getInvoiceDetail(@PathVariable("invoiId") long invoiId){
		try {
			Invoice invoice = invoiceService.invoiceById(invoiId);
			InvoiceResponse invoiceResponse = mapper.map(invoice, InvoiceResponse.class);
			invoiceResponse.setSupplierId(invoice.getSupplierId());
			APIResponse apiResponse = restTemplate.getForObject(Constant.SUPPLIER_SERVICE_API + "/supplier_get_detail/" + invoice.getSupplierId(), APIResponse.class);
			if(apiResponse.getData() == null) {
				log.error("error invoice supplier not exist");
				throw new ApplicationException(APIStatus.ERR_INVOICE_SUPPLIER_NOT_EXIST);
			}
			ObjectMapper mapper = new ObjectMapper();
			try {
				String json = mapper.writeValueAsString(apiResponse.getData());
				SupplierModel supplierModel = mapper.readValue(json, SupplierModel.class);
				invoiceResponse.setSupplierName(supplierModel.getName());
			} catch (Exception e) {
				// TODO: handle exception
				log.error("error get invoice detail map json error");
				throw new ApplicationException(APIStatus.ERR_INVOICE_ID_NOT_EXIST);
			}
	 	
			log.error("get invoice detail success");
			return ResponseUtil.responseSuccess(invoiceResponse);
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
	
	@GetMapping(value = Constant.INVOICE_DETAIL_GET_BY_INVOICE)
	public ResponseEntity<APIResponse> getInvoiceDetailGetByInvoice(@PathVariable("invoiId") long invoiId){
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			List<InvoiceDetailResponse> response = new ArrayList<>();
			List<InvoiceDetail> list = invoiceService.getInvoiceDetailByInvoice(invoiId);
			list.forEach(item -> {
				InvoiceDetailResponse invoiceDetailResponse = mapper.map(item, InvoiceDetailResponse.class);
				invoiceDetailResponse.setInvoiceId(item.getInvoice().getId());
				APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/" + item.getProductId(), APIResponse.class); 
				try {
					String json = objectMapper.writeValueAsString(apiResponse.getData());
					ProductModel productModel = objectMapper.readValue(json, ProductModel.class);
					invoiceDetailResponse.setProductName(productModel.getName());
					response.add(invoiceDetailResponse);
				} catch (JsonMappingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});
			return ResponseUtil.responseSuccess(response);
		} catch (Exception e) {
			throw new ApplicationException(APIStatus.ERR_INVOICE_ID_NOT_EXIST);
		}	 
	}
	
	//	SELECT sum(ID.total_price) as 'Tổng tiền ', sum(ID.weight * ID.count) as 'Tổng kg', 
	//	ID.id, ID.price, ID.product_id, sum(ID.count) as 'Số lượng'  FROM invoice_detail as ID
	//	inner join invoice i on i.id = ID.invoice_id
	//  inner join supplier s on s.id = i.supplier_id
	//	where MONTH (i.date_export) = MONTH('2021-07-07') 
	//	and s.code = "RSTART"
	//	group by ID.product_id
	
	@GetMapping(value = "/get_product/{proId}")
	public ResponseEntity<APIResponse> getProducts(@PathVariable("proId") long proId) throws JsonMappingException, JsonProcessingException{
		APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/"+proId, APIResponse.class);
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(apiResponse.getData());
		ProductModel productModel = objectMapper.readValue(json, ProductModel.class);
		 
		System.out.println(apiResponse.getData().toString());	
		System.out.println(productModel);	
		
//		log.error("get products response {}",apiResponse.getData().toString());
//		ProductModel productModel = CommonUtil.jsonToObject(apiResponse.getData().toString(), ProductModel.class);
//		log.error("get products response 1 {}",productModel);
		return ResponseUtil.responseSuccess(apiResponse);
	}
}
