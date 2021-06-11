package com.tampro.ManageService.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goods-receipt")
public class ProductController {

	
	@Value("${instance.name}")
	private String instanceName;
	
	@GetMapping("/instance")
	public String getInstance(@RequestHeader("requestId") String requestId) {
		
	 
		return "instance" + instanceName + " _ Request Id : " + requestId;
	}
}
