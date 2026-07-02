package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.dto.ResumeResponse;
import com.tnp.ai_placement_assistant.entity.Resume;
import com.tnp.ai_placement_assistant.entity.User;
import com.tnp.ai_placement_assistant.repository.ResumeRepository;
import com.tnp.ai_placement_assistant.Utils.PdfUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PdfUtil pdfUtil;

    public ResumeResponse uploadResume(MultipartFile file, String email) throws IOException {
        User user = userService.getUserByEmail(email);

        String extractedText = pdfUtil.extractText(file);

        Resume resume = new Resume();
        resume.setUser(user);
        resume.setFileName(file.getOriginalFilename());
        resume.setExtractedText(extractedText);

        resumeRepository.save(resume);

        return new ResumeResponse(
                resume.getId(),
                resume.getFileName(),
                resume.getExtractedText(),
                resume.getUploadedAt().toString()
        );
    }

    public List<ResumeResponse> getUserResumes(String email) {
        User user = userService.getUserByEmail(email);
        return resumeRepository.findByUserId(user.getId())
                .stream()
                .map(r -> new ResumeResponse(
                        r.getId(),
                        r.getFileName(),
                        r.getExtractedText(),
                        r.getUploadedAt().toString()
                ))
                .collect(Collectors.toList());
    }
}