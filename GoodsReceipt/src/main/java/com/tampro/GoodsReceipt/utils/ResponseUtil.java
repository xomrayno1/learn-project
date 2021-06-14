package com.tampro.GoodsReceipt.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tampro.GoodsReceipt.response.APIResponse;
import com.tampro.GoodsReceipt.response.APIStatus;

public class ResponseUtil {
	
	public static APIResponse createShowAPIResponse(APIStatus apiStatus, Object data) {
		return new APIResponse(apiStatus, data);
	}
	
	//build response
	public static ResponseEntity<APIResponse> buildResponse(APIStatus apiStatus, Object data, HttpStatus httpStatus){
		return new ResponseEntity(createShowAPIResponse(apiStatus, data), httpStatus);
	}
	
	//response success
	public static ResponseEntity<APIResponse> responseSuccess(Object data){
		return buildResponse(APIStatus.OK, data, HttpStatus.OK);
	}
}
