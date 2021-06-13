package com.tampro.ManageService.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Product extends BaseEntity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //32 45 255 16
	private long id;
	@Column(name = "name", nullable = false, length = 255)
	private String name;
	@Column(name = "code", nullable = false, length = 16, unique = true)
	private String code;
	@Column(name = "weight", nullable = false, length = 3)
	private String weight;
	@Column(name = "price", nullable = false, columnDefinition = "Decimal(10,2)")
	private double price;
	@Column(name = "img_url", nullable = true, length = 255)
	private String imgUrl;
	@Column(name = "category_id", nullable = false, length = 4)
	private long categoryId;
	@Column(name = "brand_id", nullable = false, length = 4)
	private long brandId;
	
	

}
