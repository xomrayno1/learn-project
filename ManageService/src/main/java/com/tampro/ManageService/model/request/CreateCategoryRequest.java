package com.tampro.ManageService.model.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCategoryRequest {
	@NotBlank(message = "Không được để trống tên")
	@Size(max = 32, min = 3, message = "Độ dài của trường từ 3 đến 32 kí tự")
	private String name;
	private String description;
}
