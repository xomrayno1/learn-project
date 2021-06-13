package com.tampro.ManageService.model.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {
	private long id;
	@NotBlank(message = "Name is required")
	@Size(max = 32, min = 6, message = "Length must be between 6 and 32")
	private String name;
	@NotBlank(message = "Code is required")
	@Size(max = 16, min = 2, message = "Length must be between 2 and 16")
	private String code;
	@NotBlank(message = "Weight is required")
	@Size(max = 2, min = 3, message = "Length must be between 2 and 3")
	private String weight;
	@NotBlank(message = "Price is required")
	@Size(max = 1, min = 10, message = "Length must be between 2 and 10")
	private double price;
	@NotBlank(message = "Category is required")
	private long categoryId;
	@NotBlank(message = "Brand is required")
	private long brandId;
	private MultipartFile imageUpload;
}
