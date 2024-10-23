package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

import org.springframework.http.HttpStatus;

public class ModelNotFoundException extends HttpException {
    public ModelNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
