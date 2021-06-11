package com.tampro.ManageService.entity;

import java.math.BigDecimal;

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
public class Product extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;	
	private String code;	
	private String weight;
	private BigDecimal price;
	private String imgUrl;
//	@ManyToOne
//	@JoinColumn(name = "category_id")
//	private Category category;
	@Column(name = "category", nullable = false)
	private long categoryId;
//	@ManyToOne
//	@JoinColumn(name = "brand_id")
//	private Brand brand;
	@Column(name = "brand_id", nullable = false)
	private long brandId;
	
	

}
