package com.tampro.GoodsReceipt.model.response;

import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ModelResponse<T> {
	private T content;
	private long totalElements;
	private Pageable pageable;

}
