package spring_exam.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public FilterRegistrationBean<OncePerRequestFilter> jwtFilter() {
        FilterRegistrationBean<OncePerRequestFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(jwtAuthFilter);  // Jwt 필터로 등록
        registrationBean.addUrlPatterns("/api/user/**");  // 필터를 적용할 URL 패턴 설정
        registrationBean.setOrder(1);  // 필터의 순서 (낮은 값일수록 먼저 실행)
        return registrationBean;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 실제 파일이 저장된 경로를 사용해 정적 리소스를 처리
        String basePath = System.getProperty("user.dir"); // 현재 작업 디렉토리
        String parentPath = Paths.get(basePath, "../../item_img").toString();


        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + parentPath + "/");
    }
}

