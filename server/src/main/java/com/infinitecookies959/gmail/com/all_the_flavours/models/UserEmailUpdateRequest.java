package com.infinitecookies959.gmail.com.all_the_flavours.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserEmailUpdateRequest {

    @Email
    private String email;

    @NotEmpty
    private String password;

}
