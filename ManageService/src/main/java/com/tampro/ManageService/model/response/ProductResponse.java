package com.tampro.ManageService.model.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
	private long id;
	private String name;
	private String code;
	private String weight;
	private double price;
	@JsonProperty("img_url")
	private String imgUrl;
	@JsonProperty("category_name")
	private String categoryName;
	@JsonProperty("category_id")
	private long categoryId;
	@JsonProperty("brand_name")
	private String brandName;
	@JsonProperty("brand_id")
	private long brandId;
	@JsonProperty("active_flag")
	private int activeFlag;
	@JsonProperty("create_date")
	private Date createDate;
	@JsonProperty("update_date")
	private Date updateDate;

	
}
