package spring_exam.demo.security;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {

    @Autowired
    JwtAuthFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/public/**","/api/item/**","/images/**").permitAll()  // 공용 API 경로
                        .requestMatchers("/api/user/**").hasAuthority("ROLE_USER")  // ROLE_USER만 접근 가능
                        .anyRequest().authenticated() // 나머지 경로는 인증 필요

                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 활성화
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)  // jwtAuthFilter 필터 체인에 추가
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .accessDeniedHandler((request, response, accessDeniedException) -> {
                                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);  // 403 상태 코드 설정
                                    response.getWriter().write("You do not have permission to access this resource");  // 권한 부족 메시지 출력
                                })
                );  // 권한 부족 시 처리할 핸들러 설정
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true); // 쿠키를 포함한 요청 허용
        configuration.addAllowedOrigin("http://localhost:3000"); // 클라이언트의 출처 추가
        configuration.addAllowedHeader("*"); // 모든 헤더 허용
        configuration.addAllowedMethod(HttpMethod.GET); // GET 메서드 허용
        configuration.addAllowedMethod(HttpMethod.POST); // POST 메서드 허용
        configuration.addAllowedMethod(HttpMethod.PATCH); // PATCH 메서드 허용
        configuration.addAllowedMethod(HttpMethod.DELETE); // DELETE 메서드 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 설정 적용

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // BCryptPasswordEncoder를 사용하여 비밀번호 해시화
    }
}
