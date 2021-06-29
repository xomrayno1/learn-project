package com.tampro.GoodsReceipt.model.request;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tampro.GoodsReceipt.model.InvoiceDetailModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CreateInvoiceRequest implements Serializable{
	private double price;
	private double discount;
	private long count;
	private long weight;
	@JsonProperty(value ="total_price")
	private double totalPrice;
	@JsonProperty(value ="date_export")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date dateExport;
	@JsonProperty(value ="supplier_id")
	private long supplierId;
	@JsonProperty(value ="invoice_details")
	private List<InvoiceDetailModel> invoiceDetails;
}
