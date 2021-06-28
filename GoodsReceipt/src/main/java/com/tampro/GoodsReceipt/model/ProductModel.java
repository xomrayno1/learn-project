package com.tampro.GoodsReceipt.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class ProductModel implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String name;
	private String code;
	private String weight;
	private double price;
	@JsonProperty("img_url")
	private String imgUrl;
	@JsonProperty("category_id")
	private long categoryId;
	@JsonProperty("brand_id")
	private long brandId;
	@JsonProperty("create_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date createDate;
	@JsonProperty("update_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date updateDate;
	@JsonProperty("active_flag")
	private int activeFlag;
 
	
}
