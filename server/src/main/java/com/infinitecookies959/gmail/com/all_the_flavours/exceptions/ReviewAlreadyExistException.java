package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

import org.springframework.http.HttpStatus;

public class ReviewAlreadyExistException extends HttpException {
    public ReviewAlreadyExistException() {
        super(HttpStatus.CONFLICT, "review already exists");
    }
}
