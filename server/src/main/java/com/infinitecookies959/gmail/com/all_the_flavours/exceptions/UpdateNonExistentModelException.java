package com.infinitecookies959.gmail.com.all_the_flavours.exceptions;

public class UpdateNonExistentModelException extends RuntimeException {
    public UpdateNonExistentModelException(Class<?> clazz) {
        super(String.format("Tried to update a %s model but it does not exist",
                clazz.getSimpleName()));
    }
}
