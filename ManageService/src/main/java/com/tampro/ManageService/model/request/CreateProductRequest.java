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
public class CreateProductRequest {
	@NotBlank(message = "Không được để trống tên")
	@Size(max = 32, min = 6, message = "Độ dài của trường từ 6 đến 32 kí tự")
	private String name;
	@NotBlank(message = "Không được để trống code")
	@Size(max = 16, min = 2, message = "Độ dài của trường từ 2 đến 16 kí tự")
	private String code;
	@NotBlank(message = "Không được để trống cân nặng")
	@Size(max = 3, min = 2, message = "Độ dài của trường từ 2 đến 3 kí tự")
	private String weight;
//	@Size(max = 10, min = 3, message = "Độ dài của trường từ 3 đến 10 kí tự")
	private double price;
	private long categoryId;
	private long brandId;
	private MultipartFile imageUpload;
	

}
