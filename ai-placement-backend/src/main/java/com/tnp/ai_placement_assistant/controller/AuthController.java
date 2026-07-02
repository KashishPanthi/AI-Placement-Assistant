package com.tnp.ai_placement_assistant.controller;

import com.tnp.ai_placement_assistant.dto.JwtResponse;
import com.tnp.ai_placement_assistant.dto.LoginRequest;
import com.tnp.ai_placement_assistant.dto.RegisterRequest;
import com.tnp.ai_placement_assistant.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}