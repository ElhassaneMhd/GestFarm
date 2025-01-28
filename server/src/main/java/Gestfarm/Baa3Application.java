package Gestfarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Baa3Application {

	public static void main(String[] args) {
		SpringApplication.run(Baa3Application.class, args);
	}}
