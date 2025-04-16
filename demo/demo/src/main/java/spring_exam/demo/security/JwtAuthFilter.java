package spring_exam.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component  // Spring 빈으로 등록
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    private static final String UNAUTHORIZED_MESSAGE = "Unauthorized: %s";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/api/public") || requestURI.startsWith("/api/item") || requestURI.startsWith("/images")) {
            filterChain.doFilter(request, response);  // 필터링을 건너뛰고 다음 필터로 넘어감
            return;
        }
        String token = getTokenFromRequest(request);

        if (token != null && !token.isEmpty()) {
            try {
                log.info("Token received: {}", token);
                log.info("Token Expiration: {}", jwtUtil.extractExpiration(token));
                Claims claims = jwtUtil.extractAllClaims(token);
                String email = claims.getSubject();
                String role = jwtUtil.extractRole(token);
                log.info("Email from token: {}", email);
                log.info("Role from token: {}", role);
                boolean isValidToken = jwtUtil.validateToken(token);
                log.info("Is token valid: {}", isValidToken);
                if (isValidToken) {
                    // JWT 토큰을 통해 인증 객체 생성
                    // 권한 목록을 "ROLE_" 접두어로 생성하여 설정
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,  // 인증된 사용자 정보 (이메일)
                                    null,   // 비밀번호는 null로 설정 (JWT 토큰에는 포함되지 않으므로)
                                    AuthorityUtils.createAuthorityList(role)  // "ROLE_" 접두어를 붙여서 권한 설정
                            );

                    // SecurityContext에 인증 정보 설정
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info("Authentication in SecurityContext: {}", SecurityContextHolder.getContext().getAuthentication());
                    request.setAttribute("email", email);  // 인증된 이메일을 요청 속성에 저장
                    request.setAttribute("role", role);    // role을 요청 속성에 설정
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Unauthorized: Invalid or Expired Token");
                    return;
                }
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Token Parsing Error");
                return;
            }
        } else {
            log.warn("Missing token.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Missing Token");
            return;
        }

        filterChain.doFilter(request, response);  // 요청을 후속 필터로 전달
    }

    // 요청에서 토큰을 추출하는 메소드
    private String getTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }
    // Unauthorized 응답을 처리하는 메소드
    private void sendUnauthorizedResponse(HttpServletResponse response, String errorMessage) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(String.format(UNAUTHORIZED_MESSAGE, errorMessage));
    }
}
