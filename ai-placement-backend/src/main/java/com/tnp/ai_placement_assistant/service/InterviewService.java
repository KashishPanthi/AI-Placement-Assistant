package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.dto.ChatResponse;
import com.tnp.ai_placement_assistant.entity.InterviewResult;
import com.tnp.ai_placement_assistant.entity.User;
import com.tnp.ai_placement_assistant.repository.InterviewRepository;
import com.tnp.ai_placement_assistant.Utils.PromptUtil;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private OpenAiChatModel chatModel;

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PromptUtil promptUtil;

    public ChatResponse generateQuestions(String topic) {
        String prompt = promptUtil.buildInterviewPrompt(topic);
        String response = chatModel.call(prompt);
        return new ChatResponse(response);
    }

    public ChatResponse submitAnswer(String email, String topic,
                                     String question, String answer) {
        String prompt = promptUtil.buildFeedbackPrompt(question, answer);
        String feedback = chatModel.call(prompt);

        User user = userService.getUserByEmail(email);

        InterviewResult result = new InterviewResult();
        result.setUser(user);
        result.setTopic(topic);
        result.setQuestion(question);
        result.setAnswer(answer);
        result.setFeedback(feedback);
        result.setScore(0);

        interviewRepository.save(result);

        return new ChatResponse(feedback);
    }

    public List<InterviewResult> getUserHistory(String email) {
        User user = userService.getUserByEmail(email);
        return interviewRepository.findByUserId(user.getId());
    }
}