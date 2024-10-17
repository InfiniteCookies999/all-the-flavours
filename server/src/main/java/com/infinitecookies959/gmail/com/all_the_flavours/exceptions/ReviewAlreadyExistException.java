package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

public class ReviewAlreadyExistException extends RuntimeException {
    public ReviewAlreadyExistException() {
        super("Review already exists");
    }
}
