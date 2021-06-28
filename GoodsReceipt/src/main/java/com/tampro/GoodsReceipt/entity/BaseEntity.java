package com.tampro.GoodsReceipt.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
	private int activeFlag;
	
	@Temporal(TemporalType.DATE)
	@CreatedDate
	@Column(name = "create_date", nullable = false, updatable = false)
	private Date createDate;
	
	@Temporal(TemporalType.DATE)
	@LastModifiedDate
	@Column(name = "update_date")
	private Date updateDate;

}
