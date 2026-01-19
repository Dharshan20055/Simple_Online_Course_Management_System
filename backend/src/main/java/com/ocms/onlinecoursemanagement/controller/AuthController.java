package com.ocms.onlinecoursemanagement.controller;

import com.ocms.onlinecoursemanagement.dto.AuthRequest;
import com.ocms.onlinecoursemanagement.dto.AuthResponse;
import com.ocms.onlinecoursemanagement.entity.User;
import com.ocms.onlinecoursemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(userService.authenticateUser(authRequest));
    }
}
