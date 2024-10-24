package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserBioUpdateRequest {

    @Size(max = UserConstraints.MAX_BIO_LENGTH)
    private String bio;

}
