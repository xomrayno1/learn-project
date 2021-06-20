package com.tampro.ManageService.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supplier")
public class Supplier extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("key")
	private long id;
	@Column(name = "name", length = 32, nullable = false)
	private String name;
	@Column(name = "phone", length = 16, nullable = true)
	private String phone;
	@Column(name = "email", length = 32, nullable = true, unique = true)
	private String email;
	@Column(name = "address", length = 255, nullable = true)
	private String address;
}
