package baa3.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource){

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        //define user
            jdbcUserDetailsManager.setUsersByUsernameQuery
                    ("select user_id, password,enabled from users where user_id=?");

        // define Query
            jdbcUserDetailsManager.setAuthoritiesByUsernameQuery
                    ("select user_id,role from roles where user_id=?");

        return jdbcUserDetailsManager;
    }
    // Bean for password encoding
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/sheep/**").hasAnyRole("ADMIN","SHEPHERD" )
                                .requestMatchers("/category/**").hasAnyRole("ADMIN","FARMER")
                                .requestMatchers("/shipping/**").hasAnyRole("ADMIN","DELIVERY")
                                .requestMatchers("/**").hasRole("ADMIN")
                                .requestMatchers("/error").permitAll()
                            // any request must be authenticated
                );
        http.httpBasic(Customizer.withDefaults());

        http.csrf(csrf ->csrf.disable());

        return http.build();
    }
}
