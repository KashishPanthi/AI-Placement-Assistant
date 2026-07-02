package com.tnp.ai_placement_assistant.repository;

import com.tnp.ai_placement_assistant.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserId(Long userId);
}