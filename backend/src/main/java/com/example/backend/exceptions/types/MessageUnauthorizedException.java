package com.example.backend.exceptions.types;

public class MessageUnauthorizedException extends RuntimeException {
    private String message;

    public MessageUnauthorizedException(String message){
        this.message = message;
    }

    @Override
    public String getMessage(){
        return message;
    }
}
