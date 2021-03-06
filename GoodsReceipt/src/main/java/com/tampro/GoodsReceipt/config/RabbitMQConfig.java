package com.tampro.GoodsReceipt.config;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Component
public class RabbitMQConfig {

	public static final String EXCHANGE = "notification_exchange";
	public static final String QUEUE = "notification_queue";
	public static final String ROUTING_KEY = "notification_routing_key";
	
	@Bean
	public TopicExchange topicExchange() {
		return new TopicExchange(EXCHANGE);
	}
	
	@Bean
	public Queue queue() {
		return new Queue(QUEUE, false);
	}
	
	@Bean
	public Binding binding(Queue queue, TopicExchange topicExchange) {
		return BindingBuilder.bind(queue).to(topicExchange).with(ROUTING_KEY);
	}
	
	@Bean
	public MessageConverter messageConverter() {
		return new Jackson2JsonMessageConverter();
	}
	
	@Bean
	public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
		final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(messageConverter());
		return rabbitTemplate;
	}
	
}
