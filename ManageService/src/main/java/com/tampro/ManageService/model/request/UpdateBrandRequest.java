package com.tampro.ManageService.model.request;

import javax.validation.constraints.Email;
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
	@NotBlank(message = "Email is required")
	@Email(message = "Please provide a properly formatted email address")
	@Size(max = 32, min = 12, message = "Length must be between 12 and 32")
	private String email;
	private String address;
	private String phone;
}
