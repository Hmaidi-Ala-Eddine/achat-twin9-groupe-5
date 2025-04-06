package tn.esprit.rh.achat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AchatApplication {

    public static void main(String[] args) {
        System.out.println("DEBUG: Application mise à jour"); // <- Log de test
        SpringApplication.run(AchatApplication.class, args);
    }

}
