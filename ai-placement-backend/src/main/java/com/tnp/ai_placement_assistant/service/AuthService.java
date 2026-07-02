package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.dto.JwtResponse;
import com.tnp.ai_placement_assistant.dto.LoginRequest;
import com.tnp.ai_placement_assistant.dto.RegisterRequest;
import com.tnp.ai_placement_assistant.entity.User;
import com.tnp.ai_placement_assistant.repository.UserRepository;
import com.tnp.ai_placement_assistant.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new JwtResponse(token, user.getEmail(), user.getName());
    }

    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new JwtResponse(token, user.getEmail(), user.getName());
    }
}