package com.infinitecookies959.gmail.com.all_the_flavours.models.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.HashSet;

public class FileTypeValidator implements ConstraintValidator<FileType, Object> {

    private final HashSet<String> acceptedTypes = new HashSet<>();

    @Override
    public void initialize(FileType constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        acceptedTypes.addAll(Arrays.asList(constraintAnnotation.accepted()));
    }

    private boolean isValidFileType(MultipartFile file) {
        return acceptedTypes.contains(file.getContentType());
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {

        if (value instanceof MultipartFile file) {
            return isValidFileType(file);
        } else if (value instanceof MultipartFile[] files) {
            for (MultipartFile file : files) {
                if (file != null && !isValidFileType(file)) {
                    return false;
                }
            }

            // Valid for all files.
            return true;
        }

        // Does not apply for the given type.
        return false;
    }
}
