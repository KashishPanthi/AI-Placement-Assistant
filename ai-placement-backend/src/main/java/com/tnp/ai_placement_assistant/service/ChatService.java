package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.dto.ChatRequest;
import com.tnp.ai_placement_assistant.dto.ChatResponse;
import com.tnp.ai_placement_assistant.Utils.PromptUtil;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private OpenAiChatModel chatModel;

    @Autowired
    private PromptUtil promptUtil;

    public ChatResponse chat(ChatRequest request) {
        String prompt = promptUtil.buildChatPrompt(request.getMessage());
        String reply = chatModel.call(prompt);
        return new ChatResponse(reply);
    }
}