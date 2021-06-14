package com.tampro.GoodsReceipt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.tampro.GoodsReceipt.model.request.CreateInvoiceRequest;
import com.tampro.GoodsReceipt.model.request.InvoiceDetailModel;
import com.tampro.GoodsReceipt.response.APIResponse;
import com.tampro.GoodsReceipt.utils.Constant;
import com.tampro.GoodsReceipt.utils.ResponseUtil;



@RestController
@RequestMapping(Constant.GOODS_RECEIPT_API)
public class GoodsReceiptController {

	
	@Value("${instance.name}")
	private String instanceName;
	
	@Autowired  
	private RestTemplate restTemplate;  
	
	private static final Logger log = LoggerFactory.getLogger(GoodsReceiptController.class);

	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
	
	//"MKH-" + dateReplaced + "-" + (cusNear.size() + 1)
	//(cusNear.size() + 1): Số column đc tạo ngay hôm đó  + 1
	
	@PostMapping(value = Constant.INVOICE_CREATE)
	public ResponseEntity<APIResponse> createInvoice(@RequestBody CreateInvoiceRequest invoiceRequest){
		 
		for(InvoiceDetailModel item : invoiceRequest.getInvoiceDetails()) {
			APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/get_detail/", APIResponse.class, item.getProductId());
		}
		return null;
	}
	
	
	@GetMapping(value = "/get_product/{proId}")
	public ResponseEntity<APIResponse> getProducts(@PathVariable("proId") long proId){
		 
		APIResponse apiResponse = restTemplate.getForObject(Constant.PRODUCT_SERVICE_API + "/product_get_detail/"+proId, APIResponse.class);
		log.error("get products response {}",apiResponse);
		return ResponseUtil.responseSuccess(apiResponse);
	}
}
