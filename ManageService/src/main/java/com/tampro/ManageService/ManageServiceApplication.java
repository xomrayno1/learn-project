package com.tampro.ManageService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ManageServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManageServiceApplication.class, args);
	}

}
