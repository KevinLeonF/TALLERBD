package Parcial_1.KevinLeon.config; // ⬅️ Usa tu paquete 'config'

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

// Esta anotación le dice a Spring que esta clase define Beans de configuración
@Configuration
public class SecurityConfig {

    // Este Bean define la cadena de filtros de seguridad que se aplicará a todas las peticiones
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. DESHABILITAR CSRF: Es fundamental para APIs de React/Spring.
                .csrf(csrf -> csrf.disable())
                // 2. Usar la configuración CORS de WebConfig
                .cors(Customizer.withDefaults())

                // 2. CONFIGURACIÓN DE AUTORIZACIÓN: Define qué rutas son públicas.
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/pedidos/**").permitAll() // Permitir Pedidos
                        .requestMatchers("/gafas/**").permitAll()   // Permitir Gafas
                        // Permite el acceso sin autenticación a todas las rutas que empiecen con /api/
                        //.requestMatchers("/**").permitAll()

                        // Todas las otras peticiones requieren autenticación
                        .anyRequest().authenticated()
                );

        // 3. (Opcional) Deshabilitar formularios de login si es solo una API
        // .formLogin(AbstractHttpConfigurer::disable);

        return http.build();
    }
}