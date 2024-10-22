package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.infinitecookies959.gmail.com.all_the_flavours.models.validation.ValidName;
import lombok.Data;

@Data
public class UserNameUpdateRequest {

    @ValidName
    private String firstName;

    @ValidName
    private String lastName;

}
