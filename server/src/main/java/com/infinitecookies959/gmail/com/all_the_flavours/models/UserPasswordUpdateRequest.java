package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserPasswordUpdateRequest {

    @NotEmpty
    private String currentPassword;

    @NotEmpty
    @Pattern(regexp = UserConstraints.PASSWORD_PATTERN)
    private String newPassword;

}
