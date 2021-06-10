package com.tampro.gatewayservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tampro.gatewayservice.filters.AddRequestIdFilter;

@Configuration
public class GatewayServiceConfiguration {
	
	@Bean
	public AddRequestIdFilter addRequestIdFilter() {
		return new AddRequestIdFilter();
	}

}
