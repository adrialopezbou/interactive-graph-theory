package com.ironhack.interactivegraphtheory.nodesservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NodesServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NodesServiceApplication.class, args);
    }

}
