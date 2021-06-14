package com.tampro.GoodsReceipt.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Invoice extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "price", nullable = false, columnDefinition = "Decimal(10,2)")
	private double price;
	@Column(name = "discount", nullable = false, columnDefinition = "Decimal(10,2)")
	private double discount;
	@Column(name = "count", nullable = false, length = 5)
	private long count; // số lượng bao
	@Column(name = "weight", nullable = false, length = 8)
	private long weight; // trọng lượng của hoá đơn
	@Column(name = "total_price", nullable = false, columnDefinition = "Decimal(10,2)")
	private double totalPrice;
	@Column(name = "date_export", nullable = false)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Temporal(TemporalType.TIME)
	private Date dateExport;
	@Column(name = "supplier_id", nullable = false)
	private long supplierId;
	
	
	

}
