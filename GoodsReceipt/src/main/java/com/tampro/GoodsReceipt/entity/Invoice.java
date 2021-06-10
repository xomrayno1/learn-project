package com.tampro.GoodsReceipt.entity;

import java.math.BigDecimal;
import java.util.Date;

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
public class Invoice extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private BigDecimal price;
	private BigDecimal discount;
	
	private long count; // số lượng bao
	private long weight; // trọng lượng của hoá đơn
	
	@Column(name = "total_price")
	private BigDecimal totalPrice;
	@Column(name = "date_export")
	private Date dateExport;
	
	
	

}
