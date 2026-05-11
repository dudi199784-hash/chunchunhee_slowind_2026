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

                .authorizeHttpRequests(auth -> auth
                        // 공개
                        .requestMatchers(HttpMethod.GET, "/api/v1/products", "/api/v1/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/members/login").permitAll()

                        // 나머지 API는 일단 막거나, 로그인 후만 허용
                        .requestMatchers("/api/**").authenticated()

                        // (정적 리소스·에러 페이지 등이 있으면)
                        .anyRequest().denyAll()
                )
                .csrf(
                        csrf -> csrf
                                .disable()
                ) // csrf 토큰 끄기
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
}
