package com.tampro.GoodsReceipt.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDetailResponse {
	private long id;
	@JsonProperty("product_id")
	private long productId;
	@JsonProperty("product_name")
	private String productName;
	private long invoiceId;
	private double price;
	private long count;
	private long weight; // tổng cân nặng
	@JsonProperty("total_price")
	private double totalPrice;	
}
