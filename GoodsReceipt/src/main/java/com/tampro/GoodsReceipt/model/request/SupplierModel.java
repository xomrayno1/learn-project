package com.tampro.GoodsReceipt.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupplierModel {
	private long id;
	private String name;
	private String phone;
	private String email;
	private String address;
}
