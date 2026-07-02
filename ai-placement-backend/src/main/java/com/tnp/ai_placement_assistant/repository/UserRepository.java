package com.tnp.ai_placement_assistant.repository;
import com.tnp.ai_placement_assistant.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

}
