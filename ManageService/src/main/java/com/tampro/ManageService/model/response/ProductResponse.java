package com.tampro.ManageService.model.response;

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
	private long categoryId;
	@JsonProperty("brand_name")
	private String brandName;
	private long brandId;
	@JsonProperty("active_flag")
	private int activeFlag;
	@JsonProperty("create_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date createDate;
	@JsonProperty("update_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date updateDate;

	
}
