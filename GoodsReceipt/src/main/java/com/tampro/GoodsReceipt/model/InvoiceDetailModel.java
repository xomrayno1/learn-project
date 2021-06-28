package com.tampro.GoodsReceipt.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDetailModel {
	private long id;
	@JsonProperty(value ="product_id")
	private long productId;
	private double price;
	private long count;
	private long weight;
	@JsonProperty(value ="total_price")
	private double totalPrice;
}
