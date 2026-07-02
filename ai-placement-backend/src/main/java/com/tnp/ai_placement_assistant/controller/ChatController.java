package com.tnp.ai_placement_assistant.controller;

import com.tnp.ai_placement_assistant.dto.ChatRequest;
import com.tnp.ai_placement_assistant.dto.ChatResponse;
import com.tnp.ai_placement_assistant.service.AtsService;
import com.tnp.ai_placement_assistant.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private AtsService atsService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.chat(request));
    }

    @PostMapping("/ats/{resumeId}")
    public ResponseEntity<?> analyzeAts(
            @PathVariable Long resumeId,
            @RequestBody ChatRequest request) {
        return ResponseEntity.ok(
                atsService.analyzeResume(resumeId, request.getMessage()));
    }
}