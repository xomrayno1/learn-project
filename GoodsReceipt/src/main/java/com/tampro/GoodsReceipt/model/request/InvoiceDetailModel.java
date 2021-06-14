package com.tampro.GoodsReceipt.model.request;

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
	private long productId;
	private double price;
	private long count;
	private long weight;
	private double totalPrice;
}
