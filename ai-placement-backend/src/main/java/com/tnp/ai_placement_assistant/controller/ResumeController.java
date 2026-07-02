package com.tnp.ai_placement_assistant.controller;

import com.tnp.ai_placement_assistant.dto.ResumeResponse;
import com.tnp.ai_placement_assistant.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        return ResponseEntity.ok(
                resumeService.uploadResume(file, userDetails.getUsername()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ResumeResponse>> getMyResumes(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                resumeService.getUserResumes(userDetails.getUsername()));
    }
}