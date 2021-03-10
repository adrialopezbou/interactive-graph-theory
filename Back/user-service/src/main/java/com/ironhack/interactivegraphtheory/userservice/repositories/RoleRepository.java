package com.ironhack.interactivegraphtheory.userservice.repositories;

import com.ironhack.interactivegraphtheory.userservice.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String third_party);
}
