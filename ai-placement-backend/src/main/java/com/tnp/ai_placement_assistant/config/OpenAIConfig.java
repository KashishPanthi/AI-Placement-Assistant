package com.tnp.ai_placement_assistant.config;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {

    @Autowired
    private OpenAiChatModel chatModel;
}