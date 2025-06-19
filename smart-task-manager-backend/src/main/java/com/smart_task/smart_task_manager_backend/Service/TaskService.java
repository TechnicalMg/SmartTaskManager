package com.smart_task.smart_task_manager_backend.Service;

import com.smart_task.smart_task_manager_backend.Model.*;
import com.smart_task.smart_task_manager_backend.Repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {
    
    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task createTask(Task task) {
        task.setCreatedDate(LocalDate.now());
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = repo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setPriority(taskDetails.getPriority());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        task.setRemark(taskDetails.getRemark());
        task.setPercentage(taskDetails.getPercentage());
        return repo.save(task);
    }
}

