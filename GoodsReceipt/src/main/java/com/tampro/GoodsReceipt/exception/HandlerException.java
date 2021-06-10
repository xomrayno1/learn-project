package com.tampro.GoodsReceipt.exception;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tampro.GoodsReceipt.response.APIStatus;

@ControllerAdvice
public class HandlerException extends ResponseEntityExceptionHandler{

	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		// TODO Auto-generated method stub
		BindingResult result = ex.getBindingResult();
		List<FieldError> fieldErrors =	result.getFieldErrors();
		
		ErrorDetail errorDetail = new ErrorDetail(new Date(), APIStatus.ERR_BAD_PARAMS,request.getDescription(false));
		
		if(fieldErrors.isEmpty()) {
			List<Map<String, String>> errors = new ArrayList<Map<String, String>>();
			for (FieldError item : fieldErrors) {
				Map<String, String> error = new HashMap<String, String>();
				error.put("key", item.getField());
				error.put("value", item.getDefaultMessage());
				errors.add(error);
			}
			errorDetail.setErrors(errors);
		}
		
		return new ResponseEntity<Object>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@Override
	protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status,
			WebRequest request) {
		// TODO Auto-generated method stub
		BindingResult result = ex.getBindingResult();
		List<FieldError> fieldErrors =	result.getFieldErrors();
		
		ErrorDetail errorDetail = new ErrorDetail(new Date(), APIStatus.ERR_BAD_PARAMS,request.getDescription(false));
		
		if(fieldErrors.isEmpty()) {
			List<Map<String, String>> errors = new ArrayList<Map<String, String>>();
			for (FieldError item : fieldErrors) {
				Map<String, String> error = new HashMap<String, String>();
				error.put("key", item.getField());
				error.put("value", item.getDefaultMessage());
				errors.add(error);
			}
			errorDetail.setErrors(errors);
		}
		
		return new ResponseEntity<Object>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ApplicationException.class)
	private ResponseEntity<ErrorDetail> handleException(ApplicationException ae, WebRequest request){
		ErrorDetail errorDetail = new ErrorDetail(new Date(), ae.getCode(),ae.getMessage(),request.getDescription(false));
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	
}
