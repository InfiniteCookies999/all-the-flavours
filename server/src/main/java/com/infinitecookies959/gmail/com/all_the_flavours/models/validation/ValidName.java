package com.infinitecookies959.gmail.com.all_the_flavours.models.validation;

import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {})
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@NotEmpty
@Size(max = UserConstraints.MAX_NAME_LENGTH)
@Pattern(regexp = UserConstraints.NAME_PATTERN)
public @interface ValidName {
    String message() default "Invalid name";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
