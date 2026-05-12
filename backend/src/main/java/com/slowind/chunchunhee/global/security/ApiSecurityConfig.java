package com.slowind.chunchunhee.global.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApiSecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                // (선택) 이 프로젝트가 전부 /api 라면 생략해도 됨. H2만 따로 두고 싶으면 체인을 둘로 쪼개고 @Order 사용.
                // .securityMatcher("/api/**")
                .securityMatcher("/api/**")
                .authorizeHttpRequests(auth -> auth
                        // 공개
                        .requestMatchers(HttpMethod.GET, "/api/v1/products", "/api/v1/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/members/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/openai/images/generate").permitAll()

                        // 나머지 API는 일단 막거나, 로그인 후만 허용
                        .requestMatchers("/api/**").authenticated()

                        // (정적 리소스·에러 페이지 등이 있으면)
                        .anyRequest().authenticated()
                )
                .csrf(
                        csrf -> csrf
                                .disable()
                ) // csrf 토큰 끄기
                .cors(
                        cors -> cors
                                .configurationSource(configurationSource()))
                .httpBasic(
                        httpBasic -> httpBasic.disable()
                ) // httpBasic 로그인 방식 끄기
                .formLogin(
                        formLogin -> formLogin.disable()
                ) // 폼 로그인 방식 끄기
                .sessionManagement(
                        sm -> sm
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ) // 세션 끄기
                .addFilterBefore(
                        jwtAuthorizationFilter, // 엑세스 토큰을 이용한 로그인 처리
                        UsernamePasswordAuthenticationFilter.class
                );

        // JWT 붙인 뒤:
        // http.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource configurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");    // 허용할 출처 추가
        configuration.addAllowedOrigin("http://cdpn.io");           // 추가 허용 출처
        configuration.addAllowedMethod("*");                        // 모든 HTTP 메서드 헏용
        configuration.addAllowedHeader("*");                        // 모든 요청 헤더 허용
        configuration.setAllowCredentials(true);                    // 쿠키 및 인증 정보 포함 허용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
