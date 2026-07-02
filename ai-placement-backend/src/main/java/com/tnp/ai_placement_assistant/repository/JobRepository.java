package com.tnp.ai_placement_assistant.repository;

import com.tnp.ai_placement_assistant.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitleContainingIgnoreCase(String title);
}