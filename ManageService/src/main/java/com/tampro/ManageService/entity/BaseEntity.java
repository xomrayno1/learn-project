package com.tampro.ManageService.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseEntity {
	
	@Column(name = "active_flag", nullable = false, length = 2)
	@JsonProperty("active_flag")
	private int activeFlag;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@CreatedDate
	@Column(name = "create_date", nullable = false, updatable = false)
	@JsonProperty("create_date")
	private Date createDate;
	
	@Temporal(TemporalType.DATE)
	@LastModifiedDate
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column(name = "update_date", nullable = false)
	@JsonProperty("update_date")
	private Date updateDate;

}
