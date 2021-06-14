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
public class UpdateBrandRequest {
	private long id;
	@NotBlank(message = "Name is required")
	@Size(max = 32, min = 6, message = "Length must be between 6 and 32")
	private String name;
	private String description;
}
