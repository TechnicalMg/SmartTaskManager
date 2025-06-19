package com.smart_task.smart_task_manager_backend.Repository;


import com.smart_task.smart_task_manager_backend.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

