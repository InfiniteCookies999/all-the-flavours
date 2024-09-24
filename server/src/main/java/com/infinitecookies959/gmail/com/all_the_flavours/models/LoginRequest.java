package com.infinitecookies959.gmail.com.all_the_flavours.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(max = 100)
    private String password;

}
