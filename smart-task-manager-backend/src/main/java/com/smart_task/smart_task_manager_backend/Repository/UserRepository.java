package com.smart_task.smart_task_manager_backend.Repository;

import com.smart_task.smart_task_manager_backend.Model.Role;
import com.smart_task.smart_task_manager_backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(Role role);
    List<User> findByRoleNot(Role role);
}
