package com.infinitecookies959.gmail.com.all_the_flavours.models;

import com.infinitecookies959.gmail.com.all_the_flavours.models.constraints.UserConstraints;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUsernameUpdateRequest {

    @NotEmpty
    @Size(max = UserConstraints.MAX_USERNAME_LENGTH)
    @Pattern(regexp = UserConstraints.USERNAME_PATTERN)
    private String username;

}
