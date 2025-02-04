package com.example.demo2;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService {

    @KafkaListener(topics = "test", groupId = "test-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }
}
