package com.example.backend.exceptions;

import com.example.backend.exceptions.dtos.ErrorMessageDTO;
import com.example.backend.exceptions.dtos.MessageExceptionHandlerDTO;
import com.example.backend.exceptions.types.MessageBadRequestException;
import com.example.backend.exceptions.types.MessageNotFoundException;
import com.example.backend.exceptions.types.MessageUnauthorizedException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ExceptionHandlerController {

    private MessageSource messageSource;

    public ExceptionHandlerController(MessageSource message) {
        this.messageSource = message;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<ErrorMessageDTO> dto = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(err -> {
            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
            dto.add(new ErrorMessageDTO(message, err.getField()));
        });

        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> messageNotFound(MessageNotFoundException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(new Date(), HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(MessageBadRequestException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> messageBadRequest(MessageBadRequestException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(new Date(), HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(MessageUnauthorizedException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> messageUnauthorized(MessageUnauthorizedException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(new Date(), HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}