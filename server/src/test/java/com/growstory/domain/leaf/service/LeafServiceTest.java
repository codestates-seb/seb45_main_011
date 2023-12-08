//package com.growstory.domain.leaf.service;
//
//import com.growstory.domain.account.entity.Account;
//import com.growstory.domain.account.service.AccountService;
//import com.growstory.domain.images.entity.JournalImage;
//import com.growstory.domain.images.service.JournalImageService;
//import com.growstory.domain.journal.entity.Journal;
//import com.growstory.domain.leaf.dto.LeafDto;
//import com.growstory.domain.leaf.entity.Leaf;
//import com.growstory.domain.leaf.repository.LeafRepository;
//import com.growstory.domain.plant_object.entity.PlantObj;
//import com.growstory.domain.point.entity.Point;
//import com.growstory.global.auth.utils.AuthUserUtils;
//import com.growstory.global.aws.service.S3Uploader;
//import com.growstory.global.exception.BusinessLogicException;
//import com.growstory.global.exception.ExceptionCode;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.contains;
//import static org.hamcrest.Matchers.is;
//import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.BDDMockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class LeafServiceTest {
//    @InjectMocks
//    private LeafService leafService;
//    @Mock
//    private LeafRepository leafRepository;
//    @Mock
//    private AccountService accountService;
//    @Mock
//    private S3Uploader s3Uploader;
//    @Mock
//    private AuthUserUtils authUserUtils;
//    @Mock
//    private JournalImageService journalImageService;
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 식물카드_생성 {
//        // given
//        String s3ImageUrl = "s3/path";
//
//        LeafDto.Post leafPostDto = LeafDto.Post.builder()
//                .leafName("식물1")
//                .content("본문1")
//                .build();
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
//        Leaf leaf = getLeaf(1L, leafPostDto.getLeafName(), leafPostDto.getContent(), s3ImageUrl);
//
//        private List<Leaf> getLeaves(int size) {
//            List<Leaf> leaves = new ArrayList<>();
//            for (int i = 0; i < size; i++) leaves.add(leaf);
//
//            return leaves;
//        }
//        private void uploadImage() {
//            given(s3Uploader.uploadImageToS3(Mockito.any(MockMultipartFile.class), Mockito.anyString()))
//                    .willReturn(s3ImageUrl);
//            given(leafRepository.save(Mockito.any(Leaf.class)))
//                    .willReturn(leaf.toBuilder().leafImageUrl(s3ImageUrl).build());
//        }
//
//        식물카드_생성() throws IOException {
//        }
//
//        @Test
//        @Order(1)
//        public void 사용자의_식물카드가_50개_미만이면() {
//            int leafSize = 1;
//            List<Leaf> leaves = getLeaves(leafSize);
//
//            // when
//            Account.AccountGrade grade = leafService.updateAccountGrade(account.toBuilder().leaves(leaves).build());
//
//            // then
//            assertThat(grade.getStepDescription(), is("브론즈 가드너"));
//        }
//
//        @Test
//        @Order(2)
//        public void 사용자의_식물카드가_50개_이상_100개_미만이면() {
//            int leafSize = 50;
//            List<Leaf> leaves = getLeaves(leafSize);
//
//            // when
//            Account.AccountGrade grade = leafService.updateAccountGrade(account.toBuilder().leaves(leaves).build());
//
//            // then
//            assertThat(grade.getStepDescription(), is("실버 가드너"));
//        }
//
//        @Test
//        @Order(3)
//        public void 사용자의_식물카드가_100개_이상이면() {
//            int leafSize = 100;
//            List<Leaf> leaves = getLeaves(leafSize);
//
//            // when
//            Account.AccountGrade grade = leafService.updateAccountGrade(account.toBuilder().leaves(leaves).build());
//
//            // then
//            assertThat(grade.getStepDescription(), is("골드 가드너"));
//        }
//
//        @Test
//        @Order(4)
//        public void 생성_성공() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account.toBuilder().leaves(new ArrayList<>()).build());
//
//            uploadImage();
//
//            // when
//            LeafDto.Response responseDto = leafService.createLeaf(leafPostDto, testImage);
//
//            // then
//            assertThat(responseDto.getLeafId(), is(leaf.getLeafId()));
//        }
//    }
//
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class 식물카드_수정 {
//        // given
//        String s3ImageUrl = "s3/path";
//
//        LeafDto.Patch leafPatchDto = LeafDto.Patch.builder()
//                .leafId(1L)
//                .leafName("식물1")
//                .content("본문1")
//                .build();
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
//        Leaf leaf = getLeaf(leafPatchDto.getLeafId(), leafPatchDto.getLeafName(), leafPatchDto.getContent(), s3ImageUrl);
//
//        식물카드_수정() throws IOException {
//        }
//
//        @Test
//        @Order(1)
//        public void 입력받은_식물카드가_존재하지_않으면_실패() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account);
//
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.empty());
//
//            // when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> leafService.updateLeaf(leafPatchDto, testImage));
//            assertThat(exception.getExceptionCode().getStatus(), is(404));
//            assertThat(exception.getExceptionCode().getMessage(), is("Leaf not found"));
//        }
//
//        @Test
//        @Order(2)
//        public void 입력받은_사용자와_식물카드의_주인이_다르면_실패() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account.toBuilder().accountId(2L).build());
//
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.of(leaf.toBuilder().account(account).build()));
//
//            // when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> leafService.updateLeaf(leafPatchDto, testImage));
//            assertThat(exception.getExceptionCode().getStatus(), is(405));
//            assertThat(exception.getExceptionCode().getMessage(), is("That Account doesn't have authority"));
//        }
//
////        @Test
////        @Order(3)
////        public void 입력받은_이미지가_없으면() {
////            given(authUserUtils.getAuthUser())
////                    .willReturn(account);
////
////            given(leafRepository.findById(Mockito.anyLong()))
////                    .willReturn(Optional.of(leaf.toBuilder().account(account).build()));
////
////            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
////
////            // when, then
////            assertDoesNotThrow(() -> leafService.updateLeaf(leafPatchDto, null));
////            verify(s3Uploader, times(0)).uploadImageToS3(Mockito.any(MultipartFile.class), Mockito.anyString());
////        }
////
////        @Test
////        @Order(4)
////        public void 입력받은_이미지가_있으면() {
////            given(authUserUtils.getAuthUser())
////                    .willReturn(account);
////
////            given(leafRepository.findById(Mockito.anyLong()))
////                    .willReturn(Optional.of(leaf.toBuilder().account(account).build()));
////
////            willDoNothing().given(s3Uploader).deleteImageFromS3(Mockito.anyString(), Mockito.anyString());
////
////            // when, then
////            assertDoesNotThrow(() -> leafService.updateLeaf(leafPatchDto, testImage));
////            verify(s3Uploader, times(1)).uploadImageToS3(Mockito.any(MultipartFile.class), Mockito.anyString());
////        }
//    }
//
//    @Nested
//    class 식물카드_단일_조회 {
//        // given
//        Long leafId = 1L;
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Leaf leaf = getLeaf(leafId, "식물1", "본문1", "s3/path");
//
//        @Test
//        public void 입력받은_식물카드가_존재할_때_성공() {
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.of(leaf.toBuilder()
//                            .account(account)
//                            .build()));
//
//            // when
//            LeafDto.Response responseDto = leafService.findLeaf(leafId);
//
//            // then
//            assertThat(responseDto.getLeafId(), is(leafId));
//            assertThat(responseDto.getLeafName(), is(leaf.getLeafName()));
//        }
//
//        @Test
//        public void 입력받은_식물카드가_존재하지_않을_때_실패() {
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.empty());
//
//            // when, then
//            BusinessLogicException exception = assertThrows(BusinessLogicException.class,
//                    () -> leafService.findLeaf(leafId));
//            assertThat(exception.getExceptionCode().getStatus(), is(404));
//            assertThat(exception.getExceptionCode().getMessage(), is("Leaf not found"));
//        }
//    }
//
//    @Test
//    public void 전체_식물카드_조회() {
//        // given
//        Long accountId = 1L;
//
//        Account account = getAccount(accountId, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Leaf leaf1 = getLeaf(1L, "식물1", "본문1", "s3ImageUrl");
//        Leaf leaf2 = getLeaf(2L, "식물2", "본문1", "s3ImageUrl2");
//
//
//        given(accountService.findVerifiedAccount(Mockito.anyLong()))
//                .willReturn(account);
//
//        given(leafRepository.findByAccount(Mockito.any(Account.class)))
//                .willReturn(List.of(
//                        leaf1.toBuilder().account(account).build(),
//                        leaf2.toBuilder().account(account).build()));
//
//        // when
//        List<LeafDto.Response> responseDtos = leafService.findLeaves(accountId);
//
//        // then
//        assertThat(responseDtos.size(), is(2));
//        assertThat(responseDtos.get(0).getLeafId(), is(1L));
//        assertThat(responseDtos.get(1).getLeafId(), is(2L));
//    }
//
//    @Test
//    public void findLeafEntityByTest() {
//        // given
//        Long leafId = 1L;
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Leaf leaf = getLeaf(leafId, "식물1", "본문1", "s3ImageUrl");
//
//        given(authUserUtils.getAuthUser())
//                .willReturn(account);
//
//        given(leafRepository.findById(leafId))
//                .willReturn(Optional.of(leaf.toBuilder().account(account).build()));
//
//        // when
//        Leaf findLeaf = leafService.findLeafEntityBy(leafId);
//
//        // then
//        assertThat(findLeaf.getLeafId(), is(leafId));
//    }
//
//    @Nested
//    class 식물카드_삭제 {
//        // given
//        Long leafId = 1L;
//
//        Account account = getAccount(1L, "user1@gmail.com", "user1",
//                "user1234", "image/path", Point.builder().build(),
//                List.of("USER"), Account.AccountGrade.GRADE_BRONZE);
//
//        Leaf leaf = getLeaf(leafId, "식물1", "본문1", "s3ImageUrl");
//
//        Journal journal1 = Journal.builder().journalImage(JournalImage.builder().build()).build();
//        Journal journal2 = Journal.builder().build();
//
//        PlantObj plantObj = PlantObj.builder().build();
//
//        @BeforeEach
//        private void init() {
//            given(authUserUtils.getAuthUser())
//                    .willReturn(account.toBuilder().leaves(new ArrayList<>(List.of(leaf))).build());
//
//            willDoNothing().given(journalImageService).deleteJournalImageWithS3(Mockito.any(JournalImage.class), Mockito.anyString());
//        }
//
//        @Test
//        public void 연결된_plantObj가_없으면(){
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.of(leaf.toBuilder()
//                            .account(account)
//                            .journals(new ArrayList<>(List.of(journal1, journal2)))
//                            .build()));
//
//            // when, then
//            assertDoesNotThrow(() -> leafService.deleteLeaf(leafId));
//        }
//
//        @Test
//        public void 연결된_plantObj가_있으면(){
//            given(leafRepository.findById(Mockito.anyLong()))
//                    .willReturn(Optional.of(leaf.toBuilder()
//                            .account(account)
//                            .journals(new ArrayList<>(List.of(journal1, journal2)))
//                            .plantObj(plantObj)
//                            .build()));
//            // when
//            leafService.deleteLeaf(leafId);
//
//            // then
//            assertThat(Optional.ofNullable(plantObj.getLeaf()), is(Optional.empty()));
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
//    private Leaf getLeaf(Long leafId, String leafName, String content, String leafImageUrl) {
//        return Leaf.builder()
//                .leafId(leafId)
//                .leafName(leafName)
//                .content(content)
//                .leafImageUrl(leafImageUrl)
//                .build();
//    }
//}
