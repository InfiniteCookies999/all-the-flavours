package com.infinitecookies959.gmail.com.all_the_flavours;

import com.infinitecookies959.gmail.com.all_the_flavours.exceptions.HttpException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpException.class)
    public ResponseEntity<?> handleHttpExceptions(HttpException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}
