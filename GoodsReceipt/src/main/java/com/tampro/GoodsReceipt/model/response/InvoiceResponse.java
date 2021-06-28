package com.tampro.GoodsReceipt.model.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponse {
	private long id;
	private double price;
	private double discount;
	private long count; 
	private long weight;
	@JsonProperty(value = "total_price")
	private double totalPrice;
	@JsonProperty(value = "date_export")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date dateExport;
	@JsonProperty(value = "supplier_id")
	private long supplierId;
	@JsonProperty(value = "supplier_name")
	private String supplierName;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	@JsonProperty(value = "create_date")
	private Date createDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	@JsonProperty(value = "update_date")
	private Date updateDate;
}
