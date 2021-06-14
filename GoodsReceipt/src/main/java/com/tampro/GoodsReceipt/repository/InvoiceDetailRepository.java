package com.tampro.GoodsReceipt.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.GoodsReceipt.entity.InvoiceDetail;
@Repository
@Transactional
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long>, JpaSpecificationExecutor<InvoiceDetail>{

}
