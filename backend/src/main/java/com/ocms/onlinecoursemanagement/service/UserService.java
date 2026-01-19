package com.ocms.onlinecoursemanagement.service;

import com.ocms.onlinecoursemanagement.dto.AuthRequest;
import com.ocms.onlinecoursemanagement.dto.AuthResponse;
import com.ocms.onlinecoursemanagement.entity.User;
import java.util.List;

public interface UserService {
    AuthResponse authenticateUser(AuthRequest authRequest);

    User registerUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);
}
