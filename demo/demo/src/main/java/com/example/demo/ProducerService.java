package com.example.demo;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "test";

    public void sendMessage(String message) {
        kafkaTemplate.send(TOPIC, message);
        System.out.println("Sent message: " + message);
    }
}
