package com.tampro.ManageService.exception;

import com.tampro.ManageService.response.APIStatus;

public class ApplicationException extends RuntimeException{
	
	private final int code;
	private final String msg;
	

	public ApplicationException(APIStatus apiStatus) {
		if(apiStatus == null) {
			 throw new IllegalArgumentException("APIStatus must not be null");
		}
		code = apiStatus.getCode();
		msg = apiStatus.getDescription();
	}


	public int getCode() {
		return code;
	}


	public String getMsg() {
		return msg;
	}

	 
	
	
	

}
