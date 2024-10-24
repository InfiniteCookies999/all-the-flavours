package com.infinitecookies959.gmail.com.all_the_flavours.services;

import com.infinitecookies959.gmail.com.all_the_flavours.models.Recipe;
import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageResolveService {

    public static final String AVATAR_IMAGE_UPLOAD_PATH = "images/upload/avatars";
    public static final String IMAGE_UPLOAD_PATH = "images/upload/recipes";

    public void fixupUserAvatarSrc(User user) {
        String existingAvatarImage = user.getAvatarImage();
        if (existingAvatarImage != null) {
            // We want to store it into a different variable because JPA will
            // have state persistence across a request which can lead to this
            // having the wrong state on multiple calls.
            user.setAvatarSrc("/" + AVATAR_IMAGE_UPLOAD_PATH + "/" + existingAvatarImage);
        }
    }

    public void fixupRecipeImagesSrc(Recipe recipe) {
        List<String> sources = recipe.getImages().stream()
                .map(image -> "/" + IMAGE_UPLOAD_PATH + "/" + image)
                .toList();
        recipe.setImagesSrc(sources);
    }
}
