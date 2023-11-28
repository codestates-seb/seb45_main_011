package com.growstory.domain.guestbook.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.guestbook.dto.GuestBookRequestDto;
import com.growstory.domain.guestbook.dto.GuestBookResponseDto;
import com.growstory.domain.guestbook.entity.GuestBook;
import com.growstory.domain.guestbook.repository.GuestBookRepository;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Transactional
@RequiredArgsConstructor
@Service
public class GuestBookService {

    private final AccountRepository accountRepository;
    private final GuestBookRepository guestbookRepository;
    private final AuthUserUtils authUserUtils;

    public Long saveGuestBook(Long accountId, GuestBookRequestDto.Post requestDto) {
        // 방명록을 작성하는 사람
        Account author = authUserUtils.getAuthUser();

        // 방명록을 받을 사용자
        Account receiver = accountRepository.findById(accountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCOUNT_NOT_FOUND));

        GuestBook guestbook = guestbookRepository.save(requestDto.toEntity(author, receiver));


        return guestbook.getGuestbookId();
    }

    public Page<GuestBookResponseDto> getGuestbookPage(Long accountId, int page, int size) {
//        List<GuestBook> guestBooks = guestbookRepository.findGuestBooksByReceiverAccountId(accountId).orElseThrow(EntityNotFoundException::new);

        return guestbookRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(guestBook -> GuestBookResponseDto.builder()
                        .guestbookId(guestBook.getGuestbookId())
                        .content(guestBook.getContent())
                        .build());
    }

    public void updateGuestBook(Long guestBookId, GuestBookRequestDto.Patch requestDto) {
        findGuestBooksMatchGuestBookId(guestBookId);

        GuestBook findGuestBook = findVerifedGuestbook(guestBookId);
        findGuestBook.update(requestDto.getContent());
    }

    public void deleteGuestbook(Long guestbookId) {
        findGuestBooksMatchGuestBookId(guestbookId);

        GuestBook findGuestBook = findVerifedGuestbook(guestbookId);

        guestbookRepository.delete(findGuestBook);

        // 방명록 삭제 후 Account, PlantObj 업데이트
        findGuestBook.getAuthor().getWriterGuestBooks().remove(findGuestBook);
        findGuestBook.getReceiver().getReceivedGuestBooks().remove(findGuestBook);

    }


    private void findGuestBooksMatchGuestBookId(Long guestBookId) {
        Account account = authUserUtils.getAuthUser();

        boolean isGuestBook = account.getWriterGuestBooks().stream()
                .map(GuestBook::getGuestbookId)
                .anyMatch(id -> Objects.equals(id, guestBookId));

        if (!isGuestBook)
            throw new BusinessLogicException(ExceptionCode.GUESTBOOK_NOT_FOUND);
    }


    @Transactional(readOnly = true)
    public GuestBook findVerifedGuestbook(Long guestbookId) {
        return guestbookRepository.findById(guestbookId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GUESTBOOK_NOT_FOUND));
    }
}
