package com.tampro.GoodsReceipt.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDetail extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "product_id", nullable = false)
	private long productId;
	@Column(name = "invoice_id", nullable = false)
	private long invoiceId;
	@Column(name = "price", nullable = false, columnDefinition = "Decimal(10,2)")
	private double price;
	@Column(name = "count", nullable = false, length = 5)
	private long count;
	@Column(name = "weight", nullable = false, length = 5)
	private long weight; // tổng cân nặng
	@Column(name = "total_price", nullable = false, columnDefinition = "Decimal(10,2)")
	private double totalPrice;	
}
