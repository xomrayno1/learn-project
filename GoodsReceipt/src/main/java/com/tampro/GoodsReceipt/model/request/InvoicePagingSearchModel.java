package com.tampro.GoodsReceipt.model.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoicePagingSearchModel {
	private Date toDate;
	private Date fromDate;
	private Date dateExport;
    private int pageNumber;
    private int pageSize;
    private int sortCase;
    private boolean ascSort;
  
	
	

}
