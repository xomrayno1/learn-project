package com.tampro.GoodsReceipt.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.tampro.GoodsReceipt.config.RabbitMQConfig;

@Component
public class OrderSendEmail {

	private static final Logger log = LoggerFactory.getLogger(OrderSendEmail.class);

	
	@RabbitListener(queues = RabbitMQConfig.QUEUE)
	public void sendEmail(String message) {
		log.info("send email message : " + message);
	}
}
