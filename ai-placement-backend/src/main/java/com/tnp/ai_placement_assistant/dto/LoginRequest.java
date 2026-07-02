package com.tnp.ai_placement_assistant.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}