package com.tnp.ai_placement_assistant.Utils;

import org.springframework.stereotype.Component;

@Component
public class PromptUtil {

    public String buildResumeAnalysisPrompt(String resumeText) {
        return """
                Analyze the following resume and provide:
                1. A brief summary of the candidate's profile
                2. Key strengths
                3. Areas of improvement
                4. Suggested job roles
                
                Resume:
                """ + resumeText;
    }

    public String buildAtsPrompt(String resumeText, String jobDescription) {
        return """
                You are an ATS (Applicant Tracking System) scanner.
                Compare the resume with the job description and provide:
                1. ATS Score (0-100)
                2. Matching keywords found
                3. Missing keywords
                4. Suggestions to improve the resume
                
                Resume:
                """ + resumeText + """
                
                Job Description:
                """ + jobDescription;
    }

    public String buildInterviewPrompt(String topic) {
        return """
                Generate 5 interview questions for the topic: 
                """ + topic + """
                
                For each question provide:
                1. The question
                2. Expected answer
                3. Tips to answer well
                """;
    }

    public String buildFeedbackPrompt(String question, String answer) {
        return """
                Evaluate the following interview answer and provide:
                1. Score (0-10)
                2. Feedback on the answer
                3. Ideal answer
                
                Question: 
                """ + question + """
                
                Candidate's Answer:
                """ + answer;
    }

    public String buildChatPrompt(String message) {
        return """
                You are an AI placement assistant helping students with:
                - Resume building
                - Interview preparation
                - Job search guidance
                - Career advice
                
                User message:
                """ + message;
    }
}