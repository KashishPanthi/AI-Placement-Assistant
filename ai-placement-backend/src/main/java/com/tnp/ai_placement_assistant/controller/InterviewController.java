package com.tnp.ai_placement_assistant.controller;

import com.tnp.ai_placement_assistant.dto.ChatResponse;
import com.tnp.ai_placement_assistant.entity.InterviewResult;
import com.tnp.ai_placement_assistant.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @GetMapping("/questions")
    public ResponseEntity<ChatResponse> getQuestions(@RequestParam String topic) {
        return ResponseEntity.ok(interviewService.generateQuestions(topic));
    }

    @PostMapping("/submit")
    public ResponseEntity<ChatResponse> submitAnswer(
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(interviewService.submitAnswer(
                userDetails.getUsername(),
                payload.get("topic"),
                payload.get("question"),
                payload.get("answer")
        ));
    }

    @GetMapping("/history")
    public ResponseEntity<List<InterviewResult>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                interviewService.getUserHistory(userDetails.getUsername()));
    }
}