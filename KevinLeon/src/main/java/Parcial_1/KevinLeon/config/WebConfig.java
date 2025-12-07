package Parcial_1.KevinLeon.config;

// WebConfig.java

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            /* Este método define las reglas CORS*/
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Aplica esta regla a todos los endpoints de la API (/**)
                registry.addMapping("/*")
                        // ➡️ ORIGEN PERMITIDO: Tu dominio base de GitHub Pages
                        // Esto permite que el navegador haga peticiones desde tu sitio desplegado
                        .allowedOrigins(frontendUrl)
                        // Métodos HTTP que se permiten (GET, POST, PUT, DELETE, etc.)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*") // Permite todos los encabezados
                        // Permite enviar cookies o encabezados de autenticación (aunque no los uses
                        // aún, es buena práctica)
                        .allowCredentials(true);
            }
        };
    }
}