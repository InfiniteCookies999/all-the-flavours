package com.infinitecookies959.gmail.com.all_the_flavours;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AllTheFlavoursApplication {

	public static void main(String[] args) {

		// Load the .env file into the environment variables.
		Dotenv.load().entries()
				.forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(AllTheFlavoursApplication.class, args);
	}
}
