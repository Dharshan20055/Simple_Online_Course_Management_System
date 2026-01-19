package com.ocms.onlinecoursemanagement.serviceImpl;

import com.ocms.onlinecoursemanagement.dto.AuthRequest;
import com.ocms.onlinecoursemanagement.dto.AuthResponse;
import com.ocms.onlinecoursemanagement.entity.User;
import com.ocms.onlinecoursemanagement.repository.UserRepository;
import com.ocms.onlinecoursemanagement.security.JwtUtils;
import com.ocms.onlinecoursemanagement.security.UserDetailsImpl;
import com.ocms.onlinecoursemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public AuthResponse authenticateUser(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return AuthResponse.builder()
                .token(jwt)
                .id(userDetails.getId())
                .name(userDetails.getName())
                .email(userDetails.getEmail())
                .role(((UserDetailsImpl) authentication.getPrincipal()).getAuthorities().iterator().next()
                        .getAuthority().replace("ROLE_", "") != null
                                ? com.ocms.onlinecoursemanagement.entity.Role.valueOf(userDetails
                                        .getAuthorities().iterator().next().getAuthority().replace("ROLE_", ""))
                                : null)
                .build();
    }

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
