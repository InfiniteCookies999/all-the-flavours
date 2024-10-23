package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

import org.springframework.http.HttpStatus;

public class WrongCredentialsException extends HttpException {
    public WrongCredentialsException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
