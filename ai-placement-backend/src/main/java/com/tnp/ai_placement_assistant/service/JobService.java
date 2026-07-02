package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.entity.Job;
import com.tnp.ai_placement_assistant.Exceptions.ResourceNotFoundException;
import com.tnp.ai_placement_assistant.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> searchJobs(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found!"));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}