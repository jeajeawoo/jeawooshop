package spring_exam.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.security.Key;

@Slf4j
@Component
public class JwtUtil {

    // 비밀 키를 직접 하드코딩하지 않고, 안전한 방법으로 생성
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // HS512에 적합한 키 자동 생성
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 토큰의 유효 기간 (1시간)

    // JWT 생성 메서드
    public String generateToken(String email,String role) {
        return Jwts.builder()
                .setSubject(email)  // 토큰에 담을 내용 (여기서는 email)
                .claim("role", role)
                .setIssuedAt(new Date())  // 토큰 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // 토큰 만료 시간
                .signWith(SECRET_KEY)  // 서명 방식 (HS512)과 비밀키
                .compact();  // JWT 생성
    }

    // JWT에서 사용자 이름(email) 추출
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);  // 토큰에서 사용자 이름을 추출
    }

    // JWT에서 클레임(Claims) 추출
    public <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = extractAllClaims(token);  // 토큰에서 모든 클레임을 추출
        return claimsResolver.resolve(claims);  // 지정된 클레임 추출
    }

    // JWT에서 모든 클레임을 추출
    public Claims extractAllClaims(String token) {
        // JWT 파싱 및 서명 검증
        JwtParser parser = Jwts.parserBuilder() // parserBuilder() 사용
                .setSigningKey(SECRET_KEY)  // 서명 검증을 위한 비밀 키
                .build();  // JwtParser 객체 생성

        // JWT 파싱 후 클레임 반환
        return parser.parseClaimsJws(token).getBody();
    }
    // JWT에서 역할(role) 추출
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));  // "role" 클레임에서 role 추출
    }
    // JWT의 유효성 검사 (만료일과 서명)
    public boolean validateToken(String token) {
        return (!isTokenExpired(token));
    }

    // 토큰 만료 여부 확인
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // JWT에서 만료 시간(Expiration)을 추출
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ClaimsResolver 인터페이스
    @FunctionalInterface
    public interface ClaimsResolver<T> {
        T resolve(Claims claims);
    }
}
