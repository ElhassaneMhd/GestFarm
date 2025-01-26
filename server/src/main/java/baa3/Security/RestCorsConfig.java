//package baa3.Security;
//
//import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
//import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//
//@Component
//public class RestCorsConfig implements RepositoryRestConfigurer {
//
//    @Override
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        cors.addMapping("/**")
//                .allowedOrigins("http://localhost:5173")
//                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//}