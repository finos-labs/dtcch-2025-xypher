package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    private ProducerService producerService;

    @GetMapping("/send")
    public String sendMessage() {
        String message = "Hello from Pranav!";
        producerService.sendMessage(message);
        return "Message sent to Kafka: " + message;
    }
}
