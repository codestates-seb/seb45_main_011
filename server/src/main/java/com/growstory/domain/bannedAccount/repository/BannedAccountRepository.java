package com.growstory.domain.bannedAccount.repository;

import com.growstory.domain.bannedAccount.entity.BannedAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannedAccountRepository extends JpaRepository<BannedAccount, Long> {
}
