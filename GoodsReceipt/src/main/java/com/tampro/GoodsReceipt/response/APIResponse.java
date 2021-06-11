package com.tampro.GoodsReceipt.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class APIResponse<T> implements Serializable {
	private int code;
	private String message;
	private T data;
	
	public APIResponse() {
		 
	}
	
	public APIResponse(APIStatus apiStatus, T data) {
		if(apiStatus == null) {
			throw new IllegalArgumentException("APIStatus must not be null");
		}
		this.code = apiStatus.getCode();
		this.message = apiStatus.getDescription();
		this.data = data;
	}
 
	
}
