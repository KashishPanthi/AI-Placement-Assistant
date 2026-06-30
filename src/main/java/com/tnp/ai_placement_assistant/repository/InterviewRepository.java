package com.tnp.ai_placement_assistant.repository;

import com.tnp.ai_placement_assistant.entity.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewResult, Long> {
    List<InterviewResult> findByUserId(Long userId);
}