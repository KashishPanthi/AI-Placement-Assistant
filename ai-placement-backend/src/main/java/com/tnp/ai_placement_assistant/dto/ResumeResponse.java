package com.tnp.ai_placement_assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResumeResponse {
    private Long id;
    private String fileName;
    private String extractedText;
    private String uploadedAt;
}