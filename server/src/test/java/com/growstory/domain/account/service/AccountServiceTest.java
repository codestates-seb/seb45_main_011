//package com.growstory.domain.account.service;
//
//import com.growstory.domain.account.dto.AccountDto;
//import com.growstory.domain.account.entity.Account;
//import com.growstory.domain.account.repository.AccountRepository;
//import com.growstory.domain.board.entity.Board;
//import com.growstory.domain.comment.entity.Comment;
//import com.growstory.domain.likes.entity.BoardLike;
//import com.growstory.domain.point.entity.Point;
//import com.growstory.domain.point.service.PointService;
//import com.growstory.global.auth.utils.AuthUserUtils;
//import com.growstory.global.auth.utils.CustomAuthorityUtils;
//import com.growstory.global.aws.service.S3Uploader;
//import com.growstory.global.exception.BusinessLogicException;
//import com.growstory.global.exception.ExceptionCode;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.data.domain.Page;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.util.*;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.contains;
//import static org.hamcrest.Matchers.is;
//import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.BDDMockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class AccountServiceTest {
//    @InjectMocks // @Mock으로 만들어진 객체를 의존성 주입받는 객체
//    private AccountService accountService;
//    @Mock
//    private PasswordEncoder passwordEncoder;
//    @Mock
//    private CustomAuthorityUtils customAuthorityUtils;
//    @Mock
//    private PointService pointService;
//    @Mock
//    private S3Uploader s3Uploader;
//    @Mock
//    private AuthUserUtils authUserUtils;
//    @Mock
//    private static Authentication authentication;
//    @Mock
//    private AccountRepository accountRepository;
//    @Mock
//    private static SecurityContext securityContext = mock(SecurityContext.class);
//    @Mock
//    private Point point = mock(Point.class);
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 회원가입 {
//        // given
//        AccountDto.Post requestDto = AccountDto.Post.builder()
//                .email("user@gmail.com")
//                .displayName("user1")
//                .password("user1234")
//                .build();
//        List<String> roles = List.of("USER");
//
//        @Test
//        @Order(1)
//        public void 중복된_이메일이면_회원가입_실패() {
//            given(accountRepository.findByEmail(Mockito.anyString()))
//                    .willReturn(Optional.of(Account.builder().build()));
//
//            // when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> accountService.createAccount(requestDto));
//            assertThat(exception.getExceptionCode().getStatus(), is(409));
//            assertThat(exception.getExceptionCode().getMessage(), is("Account already exists"));
//        }
//
//        @Test
//        @Order(2)
//        public void 아니면_회원가입_성공() {
//            given(accountRepository.findByEmail(Mockito.anyString()))
//                    .willReturn(Optional.empty());
//
//            given(passwordEncoder.encode(Mockito.anyString()))
//                    .willReturn(requestDto.getPassword());
//            given(customAuthorityUtils.createRoles(Mockito.anyString()))
//                    .willReturn(roles);
//            given(pointService.createPoint(Mockito.anyString()))
//                    .willReturn(point);
//
//            Account savedAccount = getAccount(1L, requestDto.getEmail(), requestDto.getDisplayName(),
//                    requestDto.getPassword(), "path", point, roles, Account.AccountGrade.GRADE_BRONZE);
//
//            given(accountRepository.save(Mockito.any(Account.class)))
//                    .willReturn(savedAccount);
//
//            willDoNothing().given(point).updateAccount(Mockito.any(Account.class));
//
//            // when
//            AccountDto.Response responseDto = accountService.createAccount(requestDto);
//
//            // then
//            assertThat(responseDto.getAccountId(), is(savedAccount.getAccountId()));
//        }
//    }
//
//    @Nested
//    class 이미지_수정 {
//        // given
//        String s3ImageUrl = "s3/path";
//
//        MockMultipartFile testImage = new MockMultipartFile("profileImage",
//                "testImage.jpg",
//                "jpg",
//                new FileInputStream("src/test/resources/images/testImage.jpg"));
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        이미지_수정() throws IOException {
//        }
//
//        private void uploadImage() {
//            given(s3Uploader.uploadImageToS3(Mockito.any(MockMultipartFile.class), Mockito.anyString()))
//                    .willReturn(s3ImageUrl);
//            given(accountRepository.save(Mockito.any(Account.class)))
//                    .willReturn(account.toBuilder().profileImageUrl(s3ImageUrl).build());
//        }
//
//        @Test
//        public void 기존_이미지가_존재할_때() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//
//            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//
//            uploadImage();
//
//            // when , then
//            assertDoesNotThrow(() -> accountService.updateProfileImage(testImage));
//            verify(s3Uploader, times(1)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//        }
//
//        @Test
//        public void 기존_이미지가_없을_때() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account.toBuilder().profileImageUrl(null).build());
//
//            uploadImage();
//
//            // when, then
//            assertDoesNotThrow(() -> accountService.updateProfileImage(testImage));
//            verify(s3Uploader, times(0)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//        }
//    }
//
//    @Test
//    public void 닉네임_수정() {
//        // given
//        String updatedDisplayName = "updatedDisplayName";
//
//        AccountDto.DisplayNamePatch displayNamePatchDto = AccountDto.DisplayNamePatch.builder().displayName(updatedDisplayName).build();
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        given(authUserUtils.getAuthUser())
//                .willReturn(account);
//
//        given(accountRepository.save(Mockito.any(Account.class)))
//                .willReturn(account.toBuilder().displayName(displayNamePatchDto.getDisplayName()).build());
//
//        // when, then
//        assertDoesNotThrow(() -> accountService.updateDisplayName(displayNamePatchDto));
//    }
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 비밀번호_수정 {
//        // given
//        String updatedPassword = "updatedPassword";
//        String samePassword = "user1234";
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        AccountDto.PasswordPatch passwordPatchDto = AccountDto.PasswordPatch.builder()
//                .presentPassword(account.getPassword())
//                .changedPassword(updatedPassword)
//                .build();
//
//        private void init(String updatedPassword) {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//            given(passwordEncoder.encode(Mockito.anyString()))
//                    .willReturn(updatedPassword);
//        }
//
//        @Test
//        @Order(1)
//        public void 현재_비밀번호가_일치하지_않으면_실패() {
//            init(updatedPassword);
//            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
//                    .willReturn(false);
//
//            // when, then
//            BadCredentialsException exception = assertThrows(BadCredentialsException.class,
//                    () -> accountService.updatePassword(passwordPatchDto));
//            assertThat(exception.getMessage(), is("현재 비밀번호가 일치하지 않습니다."));
//        }
//
//        @Test
//        @Order(2)
//        public void 새로운_비밀번호가_현재와_같으면_실패() {
//            init(samePassword);
//            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
//                    .willReturn(true);
//
//            // when, then
//            BadCredentialsException exception = assertThrows(BadCredentialsException.class,
//                    () -> accountService.updatePassword(passwordPatchDto));
//            assertThat(exception.getMessage(), is("새로운 비밀번호와 현재 비밀번호가 일치합니다."));
//        }
//
//        @Test
//        @Order(3)
//        public void 아니면_수정_성공() {
//            init(updatedPassword);
//            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
//                    .willReturn(true);
//
//            given(accountRepository.save(Mockito.any(Account.class)))
//                    .willReturn(account.toBuilder().password(updatedPassword).build());
//            // when, then
//            assertDoesNotThrow(() -> accountService.updatePassword(passwordPatchDto));
//        }
//    }
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 단일_사용자_조회 {
//        // given
//        Long accountId = 1L;
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        @Test
//        @Order(1)
//        public void 입력한_ID의_사용자가_존재하지_않으면_실패() {
//            accountVerification(accountId);
//        }
//
//        @Test
//        @Order(2)
//        public void 존재한다면_성공() {
//            given(accountRepository.findById(accountId))
//                    .willReturn(Optional.of(account));
//
//            // when
//            AccountDto.Response responseDto = accountService.getAccount(accountId);
//
//            // then
//            assertThat(responseDto.getAccountId(), is(accountId));
//        }
//    }
//
//    @Test
//    public void 전체_사용자_조회() {
//        // given
//        Account account1 = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Account account2 = getAccount(2L, "user2@gmail.com", "user2",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Account account3 = getAccount(3L, "user3@gmail.com", "user3",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        given(accountRepository.findAll())
//                .willReturn(List.of(account1, account2, account3));
//
//        // when
//        List<AccountDto.Response> responseDtos = accountService.getAccounts();
//
//        // then
//        assertThat(responseDtos.size(), is(3));
//        assertThat(responseDtos.get(0).getAccountId(), is(1L));
//        assertThat(responseDtos.get(1).getAccountId(), is(2L));
//        assertThat(responseDtos.get(2).getAccountId(), is(3L));
//    }
//
//    @Nested
//    class 사용자_관련_게시글_조회 {
//        // given
//        int page = 1;
//        int size = 12;
//        Long accountId = 1L;
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//        BoardLike boardLike = BoardLike.builder().account(account).build();
//        Comment comment1 = Comment.builder().account(account).build();
//        Comment comment2 = Comment.builder().account(account).build();
//        Board board1 = getBoard(1L, account, List.of(comment1), new ArrayList<>());
//        Board board2 = getBoard(2L, account, List.of(comment2), List.of(boardLike));
//        Board board3 = getBoard(3L, account, new ArrayList<>(), new ArrayList<>());
//
//
//
//        @Nested
//        @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//        class 사용자가_쓴_게시글_조회 {
//            @Test
//            @Order(1)
//            public void 입력한_ID의_사용자가_존재하지_않으면_실패() {
//                accountVerification(accountId);
//            }
//
//            @Test
//            @Order(2)
//            public void 존재한다면_성공() {
//                given(accountRepository.findById(accountId))
//                        .willReturn(Optional.of(account.toBuilder()
//                                .boards(List.of(board1, board2, board3))
//                                .build()));
//
//                // when
//                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountBoardWritten(page - 1, size, accountId);
//
//                // then
//                assertThat(boardResponsePages.getContent().size(), is(3));
//                assertThat(boardResponsePages.getNumber(), is(page - 1));
//            }
//        }
//
//        @Nested
//        @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//        class 사용자가_좋아요_누른_게시글_조회 {
//            @Test
//            @Order(1)
//            public void 입력한_ID의_사용자가_존재하지_않으면_실패() {
//                accountVerification(accountId);
//            }
//
//            @Test
//            @Order(2)
//            public void 존재한다면_성공() {
//                given(accountRepository.findById(accountId))
//                        .willReturn(Optional.of(account.toBuilder()
//                                .boards(List.of(board2))
//                                .boardLikes(List.of(boardLike.toBuilder().board(board2).build()))
//                                .build()));
//
//                // when
//                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountBoardLiked(page - 1, size, accountId);
//
//                // then
//                assertThat(boardResponsePages.getContent().size(), is(1));
//                assertThat(boardResponsePages.getNumber(), is(page - 1));
//                assertThat(boardResponsePages.getContent().get(0).getLikes(), contains(1L));
//            }
//        }
//
//        @Nested
//        @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//        class 사용자가_댓글_쓴_게시글_조회 {
//            @Test
//            @Order(1)
//            public void 입력한_ID의_사용자가_존재하지_않으면_실패() {
//                accountVerification(accountId);
//            }
//
//            @Test
//            @Order(2)
//            public void 존재한다면_성공() {
//                given(accountRepository.findById(accountId))
//                        .willReturn(Optional.of(account.toBuilder()
//                                .boards(List.of(board1, board2))
//                                .comments(List.of(
//                                        comment1.toBuilder().board(board1).build(),
//                                        comment2.toBuilder().board(board2).build()))
//                                .build()));
//
//                // when
//                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountCommentWrittenBoard(page - 1, size, accountId);
//
//                // then
//                assertThat(boardResponsePages.getContent().size(), is(2));
//                assertThat(boardResponsePages.getNumber(), is(page - 1));
//                assertThat(boardResponsePages.getContent().get(0).getCommentNums(), is(1));
//                assertThat(boardResponsePages.getContent().get(1).getCommentNums(), is(1));
//            }
//        }
//    }
//
//    @Nested
//    class 회원탈퇴 {
//        // given
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        @Test
//        public void 기존_이미지가_존재할_때() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//
//            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//
//            // when , then
//            assertDoesNotThrow(() -> accountService.deleteAccount());
//            verify(s3Uploader, times(1)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//        }
//
//        @Test
//        public void 기존_이미지가_없을_때() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account.toBuilder().profileImageUrl(null).build());
//
//            // when, then
//            assertDoesNotThrow(() -> accountService.deleteAccount());
//            verify(s3Uploader, times(0)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
//        }
//    }
//
//    @Nested
//    class 회원탈퇴_시_비밀번호_검증 {
//        // given
//        String password = "user1234";
//        String diffPassword = "admin1234";
//
//        AccountDto.PasswordVerify passwordVerifyDto = AccountDto.PasswordVerify
//                .builder()
//                .password(password)
//                .build();
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                password, "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//        @Test
//        public void 입력이_현재_비밀번호와_같을_때() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//
//            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
//                    .willReturn(passwordVerifyDto.getPassword().equals(account.getPassword()));
//
//            // when
//            Boolean response = accountService.verifyPassword(passwordVerifyDto);
//
//            // then
//            assertThat(response, is(true));
//        }
//
//        @Test
//        public void 입력이_현재_비밀번호와_다를_때() {
//            passwordVerifyDto = passwordVerifyDto.toBuilder().password(diffPassword).build();
//
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//
//            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
//                    .willReturn(passwordVerifyDto.getPassword().equals(account.getPassword()));
//
//            // when
//            Boolean response = accountService.verifyPassword(passwordVerifyDto);
//
//            // then
//            assertThat(response, is(false));}
//    }
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 사용자_검증 {
//        // given
//        Map<String, Object> claims = new HashMap<>();
//        Long accountId = 1L;
//
//        @BeforeEach
//        private void securityInit() {
//            SecurityContextHolder.setContext(securityContext);
//            securityContext.setAuthentication(authentication);
//
//            given(SecurityContextHolder.getContext().getAuthentication())
//                    .willReturn(authentication);
//        }
//
//        @Test
//        @Order(1)
//        public void 로그인된_사용자가_없다면_실패() {
//            given(SecurityContextHolder.getContext().getAuthentication())
//                    .willReturn(null);
//
//            //when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> accountService.isAuthIdMatching(accountId));
//            assertThat(exception.getExceptionCode().getStatus(), is(404));
//            assertThat(exception.getExceptionCode().getMessage(), is("Account not found"));
//        }
//
//        @Test
//        @Order(2)
//        public void 인증되지_않은_사용자라면_실패() {
//            given(authentication.getPrincipal())
//                    .willReturn(claims);
//
//            given(authentication.getName())
//                    .willReturn(null);
//
//            //when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> accountService.isAuthIdMatching(accountId));
//            assertThat(exception.getExceptionCode().getStatus(), is(401));
//            assertThat(exception.getExceptionCode().getMessage(), is("Account unauthorized"));
//        }
//
//        @Test
//        @Order(3)
//        public void 익명_사용자라면_실패() {
//            given(authentication.getPrincipal())
//                    .willReturn(claims);
//
//            given(authentication.getName())
//                    .willReturn("anonymousUser");
//
//            //when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> accountService.isAuthIdMatching(accountId));
//            assertThat(exception.getExceptionCode().getStatus(), is(401));
//            assertThat(exception.getExceptionCode().getMessage(), is("Account unauthorized"));
//        }
//
//        @Test
//        @Order(4)
//        public void 로그인된_사용자와_입력된_사용자가_다르면_실패() {
//            given(authentication.getPrincipal())
//                    .willReturn(claims);
//
//            claims.put("accountId", "999");
//
//            given(authentication.getName())
//                    .willReturn("SeungTaeLee");
//
//            //when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> accountService.isAuthIdMatching(accountId));
//            assertThat(exception.getExceptionCode().getStatus(), is(405));
//            assertThat(exception.getExceptionCode().getMessage(), is("That Account doesn't have authority"));
//        }
//
//        @Test
//        @Order(5)
//        public void 로그인된_사용자가_입력과_동일하면_성공() {
//            given(authentication.getPrincipal())
//                    .willReturn(claims);
//
//            claims.put("accountId", "1");
//
//            given(authentication.getName())
//                    .willReturn("SeungTaeLee");
//
//            //when, then
//            assertDoesNotThrow(() -> accountService.isAuthIdMatching(accountId));
//        }
//    }
//
//    private static Account getAccount(Long accountId, String email, String displayName, String password,
//                                      String profileImageUrl, Point point, List<String> roles, Account.AccountGrade accountGrade) {
//        return Account.builder()
//                .accountId(accountId)
//                .email(email)
//                .displayName(displayName)
//                .password(password)
//                .profileImageUrl(profileImageUrl)
//                .point(point)
//                .roles(roles)
//                .accountGrade(accountGrade)
//                .build();
//    }
//
//    private static Board getBoard(Long boardId, Account account, List<Comment> boardComments, List<BoardLike> boardLikes) {
//        return Board.builder()
//                .boardId(boardId)
//                .boardImages(new ArrayList<>())
//                .account(account)
//                .boardComments(boardComments)
//                .boardLikes(boardLikes)
//                .build();
//    }
//
//    private void accountVerification(Long accountId) {
//        given(accountRepository.findById(accountId))
//                .willReturn(Optional.empty());
//
//        // when, then
//        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                () -> accountService.getAccount(accountId));
//        assertThat(exception.getExceptionCode().getStatus(), is(404));
//        assertThat(exception.getExceptionCode().getMessage(), is("Account not found"));
//    }
//}
