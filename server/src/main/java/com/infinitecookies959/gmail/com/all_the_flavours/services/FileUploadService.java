package com.infinitecookies959.gmail.com.all_the_flavours.services;

import jakarta.servlet.ServletContext;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class FileUploadService {

    private static final Map<String, String> FILE_TYPE_MAPPING = Map.of(
            "image/png", "png",
            "image/jpg", "jpg",
            "image/jpeg", "jpeg"
    );

    private final ServletContext servletContext;

    public FileUploadService(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public static String getRandomizedFileName(MultipartFile file) {
        return UUID.randomUUID() + "." + FILE_TYPE_MAPPING.get(file.getContentType());
    }

    public void transferFile(MultipartFile file,
                             String destinationDirectory,
                             String destinationFileName) throws IOException {

        Path directoryPath = getPath(destinationDirectory);

        Path filePath = directoryPath.resolve(destinationFileName);

        // Move the file.
        file.transferTo(filePath);

    }

    public void transferFiles(MultipartFile[] files,
                              String destinationDirectory,
                              Function<MultipartFile, String> destinationFileNameCB) throws IOException {
        for (MultipartFile file : files) {
            transferFile(file, destinationDirectory, destinationFileNameCB.apply(file));
        }
    }

    public Path getPath(String pathLocation) {
        return Paths.get(servletContext.getRealPath(pathLocation));
    }
}
