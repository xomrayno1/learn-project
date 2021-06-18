package com.tampro.GoodsReceipt.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductModel {
	private long id;
	private String name;
	private String code;
	private String weight;
	private double price;
	private String imgUrl;
	private long categoryId;
	private long brandIdId;
}
