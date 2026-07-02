package com.tnp.ai_placement_assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AtsResponse {
    private int score;
    private String feedback;
    private String suggestions;
}