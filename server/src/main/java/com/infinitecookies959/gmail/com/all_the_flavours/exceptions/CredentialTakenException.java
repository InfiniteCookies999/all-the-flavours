package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

import org.springframework.http.HttpStatus;

public class CredentialTakenException extends HttpException {
    public CredentialTakenException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}