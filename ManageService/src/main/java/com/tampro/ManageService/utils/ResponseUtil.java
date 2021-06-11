package com.tampro.ManageService.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tampro.ManageService.response.APIResponse;
import com.tampro.ManageService.response.APIStatus;

public class ResponseUtil {
	
	public APIResponse createShowAPIResponse(APIStatus apiStatus, Object data) {
		return new APIResponse(apiStatus, data);
	}
	
	//build response
	public ResponseEntity<APIResponse> buildResponse(APIStatus apiStatus, Object data, HttpStatus httpStatus){
		return new ResponseEntity(createShowAPIResponse(apiStatus, data), httpStatus);
	}
	
	//response success
	public ResponseEntity<APIResponse> responseSuccess(Object data){
		return buildResponse(APIStatus.OK, data, HttpStatus.OK);
	}
}