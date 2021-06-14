package com.tampro.GoodsReceipt.model.request;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CreateInvoiceRequest {
	private double price;
	private double discount;
	private long count;
	private long weight;
	private double totalPrice;
	private Date dateExport;
	private long supplierId;
	private List<InvoiceDetailModel> invoiceDetails;
}
