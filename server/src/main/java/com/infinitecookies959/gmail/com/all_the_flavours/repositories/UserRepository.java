package com.infinitecookies959.gmail.com.all_the_flavours.repositories;

import com.infinitecookies959.gmail.com.all_the_flavours.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}