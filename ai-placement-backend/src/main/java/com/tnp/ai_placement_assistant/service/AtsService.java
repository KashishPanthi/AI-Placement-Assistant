package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.dto.AtsResponse;
import com.tnp.ai_placement_assistant.entity.Resume;
import com.tnp.ai_placement_assistant.Exceptions.ResourceNotFoundException;
import com.tnp.ai_placement_assistant.repository.ResumeRepository;
import com.tnp.ai_placement_assistant.Utils.PromptUtil;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AtsService {

    @Autowired
    private OpenAiChatModel chatModel;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private PromptUtil promptUtil;

    public AtsResponse analyzeResume(Long resumeId, String jobDescription) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found!"));

        String prompt = promptUtil.buildAtsPrompt(resume.getExtractedText(), jobDescription);
        String response = chatModel.call(prompt);

        return new AtsResponse(0, response, "See feedback above");
    }
}