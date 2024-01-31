package com.growstory.domain.account.service;

import com.growstory.domain.account.constants.AccountGrade;
import com.growstory.domain.account.constants.Status;
import com.growstory.domain.account.dto.AccountDto;
import com.growstory.domain.account.entity.Account;
import com.growstory.domain.account.repository.AccountRepository;
import com.growstory.domain.alarm.constants.AlarmType;
import com.growstory.domain.alarm.service.AlarmService;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.guest.service.GuestService;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.domain.likes.entity.BoardLike;
import com.growstory.domain.plant_object.dto.PlantObjDto;
import com.growstory.domain.point.entity.Point;
import com.growstory.domain.point.service.PointService;
import com.growstory.global.auth.jwt.JwtTokenizer;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.auth.utils.CustomAuthorityUtils;
import com.growstory.global.aws.service.S3Uploader;
import com.growstory.global.email.service.EmailService;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.sse.service.SseService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
//    @Spy // accountService의 자체 메서드를 given 하기 위해
    @InjectMocks // @Mock으로 만들어진 객체를 의존성 주입받는 객체
    private AccountService accountService;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private CustomAuthorityUtils authorityUtils;
    @Mock
    private PointService pointService;
    @Mock
    private S3Uploader s3Uploader;
    @Mock
    private AuthUserUtils authUserUtils;
    @Mock
    private SseService sseService;
    @Mock
    private AlarmService alarmService;
    @Mock
    private EmailService emailService;
    @Mock
    private GuestService guestService;
    @Mock
    private JwtTokenizer jwtTokenizer;
    @Mock
    private static Authentication authentication;
    @Mock
    private static SecurityContext securityContext = mock(SecurityContext.class);

    @DisplayName("회원 정보를 받아 신규 회원을 생성한다.")
    @Nested
    class createAccount {
        // given
        AccountDto.Post requestDto = AccountDto.Post.builder()
                .email("user@gmail.com")
                .displayName("user1")
                .password("user1234")
                .build();
        List<String> roles = List.of("USER");
        Point point = Point.builder().build();

        @DisplayName("중복된 이메일은 회원가입 불가이다.")
        @Test
        public void withDuplicatedEmail() {
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.of(Account.builder().build()));

            // when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.createAccount(requestDto));
            assertThat(exception.getExceptionCode().getStatus(), is(409));
            assertThat(exception.getExceptionCode().getMessage(), is("Account already exists"));
        }

        @DisplayName("새로운 이메일로 회원가입을 성공한다.")
        @Test
        public void withNewEmail() {
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.empty());

            given(passwordEncoder.encode(Mockito.anyString()))
                    .willReturn(requestDto.getPassword());
            given(authorityUtils.createRoles(Mockito.anyString()))
                    .willReturn(roles);
            given(pointService.createPoint(Mockito.anyString()))
                    .willReturn(point);

            Account savedAccount = createAccount(1L, requestDto.getEmail(), requestDto.getDisplayName(),
                    requestDto.getPassword(), "path", point, roles, AccountGrade.GRADE_BRONZE);

            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(savedAccount);

            willDoNothing().given(alarmService).createAlarm(Mockito.anyLong(), Mockito.any(AlarmType.class));

            // when
            AccountDto.Response responseDto = accountService.createAccount(requestDto);

            // then
            assertThat(responseDto.getAccountId(), notNullValue());
        }
    }

    @DisplayName("신규 게스트 회원을 생성한다.")
    @Test
    void test() {
        //given
        List<String> roles = List.of("USER");
        Point point = Point.builder().build();

        given(passwordEncoder.encode(Mockito.anyString()))
                .willReturn("gs123!@#");
        given(authorityUtils.createRoles(Mockito.anyString()))
                .willReturn(roles);
        given(pointService.createPoint(Mockito.anyString()))
                .willReturn(point);

        Account savedAccount = createAccount(1L, "guest@gmail.com", "guest",
                "gs123!@#", "path", point, roles, AccountGrade.GRADE_BRONZE);

        given(accountRepository.save(Mockito.any(Account.class)))
                .willReturn(savedAccount);

        given(guestService.createGuestLeaf(Mockito.any(Account.class), Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .willReturn(Leaf.builder().leafId(1L).build());
        willDoNothing().given(guestService).createGuestJournal(Mockito.any(Leaf.class), Mockito.anyString(), Mockito.anyString(), Mockito.nullable(File.class));
        given(guestService.buyProduct(Mockito.any(Account.class), Mockito.anyLong()))
                .willReturn(PlantObjDto.TradeResponse.builder().plantObj(PlantObjDto.Response.builder().build()).build());

        willDoNothing().given(guestService).saveLocation(Mockito.any(PlantObjDto.Response.class), Mockito.any(PlantObjDto.Response.class));

        willDoNothing().given(guestService).updateLeafConnection(Mockito.anyLong(), Mockito.anyLong());

        //when
        List<String> response = accountService.createAccount();

        //then
        assertThat(response, hasSize(3));
        assertTrue(response.get(0).contains("Bearer "));
    }

    @DisplayName("이미지를 받아 프로필 이미지를 변경한다.")
    @Nested
    class updateProfileImage {
        // given
        String s3ImageUrl = "s3/path";

        MockMultipartFile testImage = new MockMultipartFile("profileImage",
                "testImage.jpg",
                "jpg",
                new FileInputStream("src/test/resources/images/testImage.jpg"));

        Account account = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        updateProfileImage() throws IOException {
        }

        private void uploadImage() {
            given(s3Uploader.uploadImageToS3(Mockito.any(MockMultipartFile.class), Mockito.anyString()))
                    .willReturn(s3ImageUrl);
            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(account.toBuilder().profileImageUrl(s3ImageUrl).build());
        }

        @DisplayName("기존 이미지가 존재할 때 이미지를 삭제하고 변경한다.")
        @Test
        public void updateProfileImageWithExistingImage() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account);

            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());

            uploadImage();

            // when , then
            assertDoesNotThrow(() -> accountService.updateProfileImage(testImage));
            verify(s3Uploader, times(1)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }

        @DisplayName("기존 이미지가 없을 때 새로운 이미지를 저장한다.")
        @Test
        public void updateProfileImageWithNewImage() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account.toBuilder().profileImageUrl(null).build());

            uploadImage();

            // when, then
            assertDoesNotThrow(() -> accountService.updateProfileImage(testImage));
            verify(s3Uploader, times(0)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }
    }

    @DisplayName("입력받은 닉네임으로 닉네임을 변경한다.")
    @Test
    public void updateDisplayName() {
        // given
        String updatedDisplayName = "updatedDisplayName";

        AccountDto.DisplayNamePatch displayNamePatchDto = AccountDto.DisplayNamePatch.builder().displayName(updatedDisplayName).build();

        Account account = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        given(authUserUtils.getAuthUser())
                .willReturn(account);

        // when, then
        assertDoesNotThrow(() -> accountService.updateDisplayName(displayNamePatchDto));
    }

    @DisplayName("입력받은 비밀번호로 비밀번호를 변경한다.")
    @Nested
    class updatePassword {
        // given
        String updatedPassword = "updatedPassword";
        String samePassword = "user1234";
        Account account = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        AccountDto.PasswordPatch passwordPatchDto = AccountDto.PasswordPatch.builder()
                .presentPassword(account.getPassword())
                .changedPassword(updatedPassword)
                .build();

        private void init(String updatedPassword) {
            given(authUserUtils.getAuthUser())
                    .willReturn(account);
            given(passwordEncoder.encode(Mockito.anyString()))
                    .willReturn(updatedPassword);
        }

        @DisplayName("현재 비밀번호가 일치하지 않는다면 변경할 수 없다.")
        @Test
        public void updatePasswordWithNotSameExistingPassword() {
            init(updatedPassword);
            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                    .willReturn(false);

            // when, then
            BadCredentialsException exception = assertThrows(BadCredentialsException.class,
                    () -> accountService.updatePassword(passwordPatchDto));
            assertThat(exception.getMessage(), is("현재 비밀번호가 일치하지 않습니다."));
        }

        @DisplayName("새로운 비밀번호가 현재 비밀번호와 같다면 변경할 수 없다.")
        @Test
        public void updatePasswordWithSameExistingPassword() {
            init(samePassword);
            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                    .willReturn(true);

            // when, then
            BadCredentialsException exception = assertThrows(BadCredentialsException.class,
                    () -> accountService.updatePassword(passwordPatchDto));
            assertThat(exception.getMessage(), is("새로운 비밀번호와 현재 비밀번호가 일치합니다."));
        }

        @DisplayName("현재 비밀번호 검증 성공하고 새로운 비밀번호가 현재와 다르다면 변경 가능하다.")
        @Test
        public void updatePasswordWithValidPassword() {
            init(updatedPassword);
            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                    .willReturn(true);

            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(account.toBuilder().password(updatedPassword).build());
            // when, then
            assertDoesNotThrow(() -> accountService.updatePassword(passwordPatchDto));
        }
    }

    @DisplayName("입력받은 id의 사용자를 조회한다.")
    @Nested
    class getAccount {
        // given
        Long accountId = 1L;
        Account account = createAccount(accountId, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        @DisplayName("입력받은 id의 사용자가 없으면 조회할 수 없다.")
        @Test
        public void getNotExistingAccount() {
            notExistingAccountVerification(accountId);
        }

        @DisplayName("입력받은 id의 사용자가 존재한다면 조회 가능하다.")
        @Test
        public void getExistingAccount() {
            given(accountRepository.findById(accountId))
                    .willReturn(Optional.of(account));

            // when
            AccountDto.Response responseDto = accountService.getAccount(accountId);

            // then
            assertThat(responseDto.getAccountId(), is(accountId));
        }
    }

    @DisplayName("전체 사용자를 조회한다.")
    @Test
    public void getAccounts() {
        // given
        Account account1 = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        Account account2 = createAccount(2L, "user2@gmail.com", "user2",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        Account account3 = createAccount(3L, "user3@gmail.com", "user3",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        given(accountRepository.findAll())
                .willReturn(List.of(account1, account2, account3));

        // when
        List<AccountDto.Response> responseDtos = accountService.getAccounts();

        // then
        assertThat(responseDtos, hasSize(3));
        assertThat(responseDtos.get(0).getAccountId(), is(1L));
        assertThat(responseDtos.get(1).getAccountId(), is(2L));
        assertThat(responseDtos.get(2).getAccountId(), is(3L));
    }

    @DisplayName("사용자 관련 게시글을 조회한다.")
    @Nested
    class getAccountBoards {
        // given
        int page = 1;
        int size = 12;
        Long accountId = 1L;
        Account account = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);
        BoardLike boardLike = BoardLike.builder().account(account).build();
        Comment comment1 = Comment.builder().account(account).build();
        Comment comment2 = Comment.builder().account(account).build();
        Board board1 = createBoard(1L, account, List.of(comment1), new ArrayList<>());
        Board board2 = createBoard(2L, account, List.of(comment2), List.of(boardLike));
        Board board3 = createBoard(3L, account, new ArrayList<>(), new ArrayList<>());

        @DisplayName("사용자가 작성한 게시글을 조회한다.")
        @Nested
        class getAccountBoardWritten {
            @DisplayName("입력한 사용자의 아이디가 존재하지 않으면 조회 불가이다.")
            @Test
            public void getNotExistingAccountBoardWritten() {
                notExistingAccountVerification(accountId);
            }

            @DisplayName("사용자가 존재한다면 조회 가능하다.")
            @Test
            public void getExistingAccountBoardWritten() {
                given(accountRepository.findById(accountId))
                        .willReturn(Optional.of(account.toBuilder()
                                .boards(List.of(board1, board2, board3))
                                .build()));

                // when
                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountBoardWritten(page - 1, size, accountId);

                // then
                assertThat(boardResponsePages.getContent(), hasSize(3));
                assertThat(boardResponsePages.getNumber(), is(page - 1));
            }
        }

        @DisplayName("사용자가 좋아요를 누른 게시글을 조회한다.")
        @Nested
        class getAccountBoardLiked {
            @DisplayName("입력한 사용자의 아이디가 존재하지 않으면 조회 불가이다.")
            @Test
            public void getNotExistingAccountLiked() {
                notExistingAccountVerification(accountId);
            }

            @DisplayName("사용자가 존재한다면 조회 가능하다.")
            @Test
            public void getExistingAccountLiked() {
                given(accountRepository.findById(accountId))
                        .willReturn(Optional.of(account.toBuilder()
                                .boards(List.of(board2))
                                .boardLikes(List.of(boardLike.toBuilder().board(board2).build()))
                                .build()));

                // when
                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountBoardLiked(page - 1, size, accountId);

                // then
                assertThat(boardResponsePages.getContent(), hasSize(1));
                assertThat(boardResponsePages.getNumber(), is(page - 1));
                assertThat(boardResponsePages.getContent().get(0).getLikes(), contains(1L));
            }
        }

        @DisplayName("사용자가 댓글 작성한 게시글을 조회한다.")
        @Nested
        class getAccountCommentWrittenBoard {
            @DisplayName("입력한 사용자의 아이디가 존재하지 않으면 조회 불가이다.")
            @Test
            public void getNotExistingAccountCommentWrittenBoard() {
                notExistingAccountVerification(accountId);
            }

            @DisplayName("사용자가 존재한다면 조회 가능이다.")
            @Test
            public void getExistingAccountCommentWrittenBoard() {
                given(accountRepository.findById(accountId))
                        .willReturn(Optional.of(account.toBuilder()
                                .boards(List.of(board1, board2))
                                .comments(List.of(
                                        comment1.toBuilder().board(board1).build(),
                                        comment2.toBuilder().board(board2).build()))
                                .build()));

                // when
                Page<AccountDto.BoardResponse> boardResponsePages = accountService.getAccountCommentWrittenBoard(page - 1, size, accountId);

                // then
                assertThat(boardResponsePages.getContent(), hasSize(2));
                assertThat(boardResponsePages.getNumber(), is(page - 1));
                assertThat(boardResponsePages.getContent().get(0).getCommentNums(), is(1));
                assertThat(boardResponsePages.getContent().get(1).getCommentNums(), is(1));
            }
        }
    }

    @DisplayName("회원 탈퇴를 한다.")
    @Nested
    class deleteAccount {
        // given
        Account account = createAccount(1L, "user1@gmail.com", "user1",
                "user1234", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        @DisplayName("프로필 이미지가 존재하면 이미지를 삭제하고 회원 탈퇴한다.")
        @Test
        public void deleteAccountExistingProfileImage() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account);

            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());

            // when , then
            assertDoesNotThrow(() -> accountService.deleteAccount());
            verify(s3Uploader, times(1)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }

        @DisplayName("프로필 이미지가 없다면 즉시 회원 탈퇴한다.")
        @Test
        public void deleteAccountNotExistingProfileImage() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account.toBuilder().profileImageUrl(null).build());

            // when, then
            assertDoesNotThrow(() -> accountService.deleteAccount());
            verify(s3Uploader, times(0)).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
        }
    }

    @DisplayName("게스트 회원의 회원 탈퇴를 한다.")
    @Nested
    class deleteGuestAccount {
        @DisplayName("입력된 아이디의 게스트 회원이 존재하지 않으면 탈퇴 불가이다.")
        @Test
        public void deleteNotExistingGuestAccount() {
            Long accountId = 1L;

            // when, then
            notExistingAccountVerification(accountId);
        }

        @DisplayName("게스트 회원이 존재한다면 탈퇴 가능하다.")
        @Test
        public void deleteExistingGuestAccount() {
            Long accountId = 1L;

            given(accountRepository.findById(accountId))
                    .willReturn(Optional.of(Account.builder().build()));

            // when, then
            assertDoesNotThrow(() -> accountService.deleteAccount(accountId));        }
    }

    @DisplayName("출석 체크를 한다.")
    @Nested
    class attendanceCheck {
        Account account = Account.builder().accountId(1L).attendance(false).build();
        Point point = Point.builder().score(100).account(account).build();

        @DisplayName("이미 오늘 출석 체크를 했다면 출석 불가이다.")
        @Test
        public void attendanceCheckAlreadyAttendance() {
            account = account.toBuilder().attendance(true).point(point).build();

            // when
            accountService.attendanceCheck(account);

            // then
            assertThat(account.getPoint().getScore(), is(100));
        }

        @DisplayName("오늘 출석 체크를 하지 않았다면 출석 가능이다.")
        @Test
        public void attendanceCheckNotAttendance() {
            // given
            account = account.toBuilder().point(point).build();

            given(pointService.updatePoint(Mockito.any(Point.class), Mockito.anyString()))
                    .willReturn(point.toBuilder().score(point.getScore() + 10).build());
            given(accountRepository.save(Mockito.any(Account.class)))
                    .willReturn(Account.builder().point(Point.builder().score(110).build()).build());
            willDoNothing().given(sseService).notify(Mockito.anyLong(), Mockito.any(AlarmType.class));

            // when
            accountService.attendanceCheck(account);

            // then
            assertThat(account.getAttendance(), is(true));
            assertThat(account.getPoint().getScore(), is(110));
        }
    }

    @DisplayName("모든 계정의 출석을 초기화한다.")
    @Test
    void attendanceReset() {
        //given
        List<Account> accounts = List.of();
        given(accountRepository.findAll())
                .willReturn(accounts);

        //when, then
        assertDoesNotThrow(() -> accountService.attendanceReset());
    }

    @DisplayName("비밀번호를 검증한다.")
    @Nested
    class verifyPassword {
        // given
        String password = "user1234";
        String diffPassword = "admin1234";

        AccountDto.PasswordVerify passwordVerifyDto = AccountDto.PasswordVerify
                .builder()
                .password(password)
                .build();

        Account account = createAccount(1L, "user1@gmail.com", "user1",
                password, "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        @DisplayName("입력한 비밀번호가 현재 비밀번호와 같다면 true 리턴한다.")
        @Test
        public void verifyPasswordWithSamePassword() {
            given(authUserUtils.getAuthUser())
                    .willReturn(account);

            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                    .willReturn(passwordVerifyDto.getPassword().equals(account.getPassword()));

            // when
            Boolean response = accountService.verifyPassword(passwordVerifyDto);

            // then
            assertThat(response, is(true));
        }

        @DisplayName("입력한 비밀번호가 현재 비밀번호와 다르면 false 리턴한다.")
        @Test
        public void verifyPasswordWithDifferentPassword() {
            passwordVerifyDto = passwordVerifyDto.toBuilder().password(diffPassword).build();

            given(authUserUtils.getAuthUser())
                    .willReturn(account);

            given(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                    .willReturn(passwordVerifyDto.getPassword().equals(account.getPassword()));

            // when
            Boolean response = accountService.verifyPassword(passwordVerifyDto);

            // then
            assertThat(response, is(false));}
    }

    @DisplayName("이메일을 검증한다.")
    @Nested
    class verifyExistsEmail {
        // given
        String email = "user@gmail.com";
        String diffEmail = "user2@gmail.com";

        Account account = createAccount(1L, email, "user1",
                "password", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        @DisplayName("입력한 이메일을 사용하는 계정이 존재한다면 true 리턴한다.")
        @Test
        public void verifyEmailWithExistsEmail() {
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.of(Account.builder().build()));

            // when
            Boolean response = accountService.verifyExistsEmail(email);

            // then
            assertThat(response, is(true));
        }

        @DisplayName("입력한 이메일을 사용하는 계정이 존재하지 않는다면 true 리턴한다.")
        @Test
        public void verifyEmailWithNotExistsEmail() {
            given(accountRepository.findByEmail(Mockito.anyString()))
                    .willReturn(Optional.empty());

            // when
            Boolean response = accountService.verifyExistsEmail(email);

            // then
            assertThat(response, is(false));
        }
    }

    @DisplayName("검증받은 계정을 조회한다.")
    @Nested
    class findVerifiedAccount {
        // given
        Long accountId = 1L;
        Account account = createAccount(accountId, "email@gmail.com", "user1",
                "password", "image/path", Point.builder().build(),
                List.of("USER"), AccountGrade.GRADE_BRONZE);

        @DisplayName("입력한 id와 일치하는 계정이 없으면 조회 불가하다")
        @Test
        public void findVerifiedAccountWithExistsId() {
            given(accountRepository.findById(Mockito.anyLong()))
                    .willReturn(Optional.empty());

            // when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.findVerifiedAccount(accountId));
            assertThat(exception.getExceptionCode().getStatus(), is(404));
            assertThat(exception.getExceptionCode().getMessage(), is("Account not found"));
        }

        @DisplayName("입력한 id와 일치하는 계정이 있으면 조회 가능하다")
        @Test
        public void findVerifiedAccountWithNotExistsId() {
            given(accountRepository.findById(Mockito.anyLong()))
                    .willReturn(Optional.of(Account.builder().build()));

            //when, then
            assertDoesNotThrow(() -> accountService.findVerifiedAccount(accountId));
        }
    }

    @DisplayName("id를 입력받아 사용자 계정을 검증한다.")
    @Nested
    class checkAuthIdMatching {
        // given
        Map<String, Object> claims = new HashMap<>();
        Long accountId = 1L;

        @BeforeEach
        private void securityInit() {
            SecurityContextHolder.setContext(securityContext);
            securityContext.setAuthentication(authentication);

            given(SecurityContextHolder.getContext().getAuthentication())
                    .willReturn(authentication);
        }

        @DisplayName("로그인된 사용자가 없다면 검증 실패이다.")
        @Test
        public void checkAuthIdMatchingWithLogoutAccountId() {
            given(SecurityContextHolder.getContext().getAuthentication())
                    .willReturn(null);

            //when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.checkAuthIdMatching(accountId));
            assertThat(exception.getExceptionCode().getStatus(), is(404));
            assertThat(exception.getExceptionCode().getMessage(), is("Account not found"));
        }

        @DisplayName("인증되지 않은 사용자라면 검증 실패이다.")
        @Test
        public void checkAuthIdMatchingWithUnauthorizedAccountId() {
            given(authentication.getPrincipal())
                    .willReturn(claims);

            given(authentication.getName())
                    .willReturn(null);

            //when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.checkAuthIdMatching(accountId));
            assertThat(exception.getExceptionCode().getStatus(), is(401));
            assertThat(exception.getExceptionCode().getMessage(), is("Account unauthorized"));
        }

        @DisplayName("익명 사용자라면 검증 실패이다.")
        @Test
        public void checkAuthIdMatchingWithAnonymousAccountId() {
            given(authentication.getPrincipal())
                    .willReturn(claims);

            given(authentication.getName())
                    .willReturn("anonymousUser");

            //when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.checkAuthIdMatching(accountId));
            assertThat(exception.getExceptionCode().getStatus(), is(401));
            assertThat(exception.getExceptionCode().getMessage(), is("Account unauthorized"));
        }

        @DisplayName("입력된 id와 로그인된 사용자의 id가 다르면 검증 실패이다.")
        @Test
        public void checkAuthIdMatchingWithNotMatchedAccountId() {
            given(authentication.getPrincipal())
                    .willReturn(claims);

            claims.put("accountId", "999");

            given(authentication.getName())
                    .willReturn("SeungTaeLee");

            //when, then
            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                    () -> accountService.checkAuthIdMatching(accountId));
            assertThat(exception.getExceptionCode().getStatus(), is(405));
            assertThat(exception.getExceptionCode().getMessage(), is("That Account doesn't have authority"));
        }

        @DisplayName("입력받은 id와 로그인된 사용자의 id가 동일하다면 검증 성공이다.")
        @Test
        public void checkAuthIdMatchingWithMatchedAccountId() {
            given(authentication.getPrincipal())
                    .willReturn(claims);

            claims.put("accountId", "1");

            given(authentication.getName())
                    .willReturn("SeungTaeLee");

            //when, then
            assertDoesNotThrow(() -> accountService.checkAuthIdMatching(accountId));
        }
    }

    private static Account createAccount(Long accountId, String email, String displayName, String password,
                                         String profileImageUrl, Point point, List<String> roles, AccountGrade accountGrade) {
        return Account.builder()
                .accountId(accountId)
                .email(email)
                .displayName(displayName)
                .password(password)
                .status(Status.USER)
                .profileImageUrl(profileImageUrl)
                .point(point)
                .roles(roles)
                .accountGrade(accountGrade)
                .build();
    }

    private static Board createBoard(Long boardId, Account account, List<Comment> boardComments, List<BoardLike> boardLikes) {
        return Board.builder()
                .boardId(boardId)
                .boardImages(new ArrayList<>())
                .account(account)
                .boardComments(boardComments)
                .boardLikes(boardLikes)
                .build();
    }

    private void notExistingAccountVerification(Long accountId) {
        given(accountRepository.findById(accountId))
                .willReturn(Optional.empty());

        // when, then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> accountService.getAccount(accountId));
        assertThat(exception.getExceptionCode().getStatus(), is(404));
        assertThat(exception.getExceptionCode().getMessage(), is("Account not found"));
    }
}
