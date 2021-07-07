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
@NoArgsConstructor
@AllArgsConstructor
public class CreateSupplierRequest {
	@NotBlank(message = "Không được để trống tên")
	@Size(max = 32, min = 6, message = "Độ dài của trường từ 6 đến 32 kí tự")
	private String name;
	@NotBlank(message = "Không được để trống email")
	@Email(message = "Email nhà cung cấp không đúng định dạng")
	@Size(max = 32, min = 12, message = "Độ dài của trường từ 12 đến 32 kí tự")
	private String email;
	@NotBlank(message = "Không được để trống code")
	@Size(max = 16, min = 2, message = "Độ dài của trường từ 2 đến 16 kí tự")
	private String code;
	private String address;
	private String phone;
}
