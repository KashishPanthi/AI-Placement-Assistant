package com.tnp.ai_placement_assistant.service;

import com.tnp.ai_placement_assistant.entity.User;
import com.tnp.ai_placement_assistant.Exceptions.ResourceNotFoundException;
import com.tnp.ai_placement_assistant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}