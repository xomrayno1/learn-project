package com.tampro.gatewayservice.filters;

import java.util.UUID;

import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

public class AddRequestIdFilter extends ZuulFilter{

	@Override
	public boolean shouldFilter() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public Object run() throws ZuulException { // sinh ra id cho mỗi lần request
		// TODO Auto-generated method stub
		RequestContext context = RequestContext.getCurrentContext();
		String requestId = UUID.randomUUID().toString();
		context.addZuulRequestHeader("requestId", requestId);
		return null;
	}

	@Override
	public String filterType() {
		// TODO Auto-generated method stub
		return FilterConstants.PRE_TYPE;
	}

	@Override
	public int filterOrder() { // thứ tự của filter trong trường hợp có nhiều filter
		// TODO Auto-generated method stub
		return 0; 
	}

}
