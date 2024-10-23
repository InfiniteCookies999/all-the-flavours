package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

import org.springframework.http.HttpStatus;

public class UpdateNonExistentModelException extends HttpException {
    public UpdateNonExistentModelException(Class<?> clazz) {
        super(HttpStatus.NOT_FOUND,
                String.format("Tried to update a %s model but it does not exist",
                        clazz.getSimpleName()));
    }
}
