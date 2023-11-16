//package com.growstory.domain.board.service;
//
//import com.growstory.domain.board.repository.BoardHashTagRepository;
//import com.growstory.domain.board.repository.BoardRepository;
//import com.growstory.domain.comment.service.CommentService;
//import com.growstory.domain.hashTag.repository.HashTagRepository;
//import com.growstory.domain.hashTag.service.HashTagService;
//import com.growstory.domain.images.service.BoardImageService;
//import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
//import com.growstory.domain.stubdata.Stub;
//import com.growstory.global.auth.utils.AuthUserUtils;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.is;
//import static org.mockito.BDDMockito.given;
//
//@ExtendWith(MockitoExtension.class)
//public class BoardRankingTest {
//
//    @InjectMocks
//    private BoardService boardService;
//    @Mock
//    private BoardRepository boardRepository;
//    @Mock
//    private HashTagService hashTagService;
//    @Mock
//    private BoardImageService boardImageService;
//    @Mock
//    private AuthUserUtils authUserUtils;
//    @Mock
//    private HashTagRepository hashTagRepository;
//    @Mock
//    private BoardHashTagRepository boardHashtagRepository;
//    @Mock
//    private CommentService commentService;
//
//
//    @DisplayName("좋아요 기준 상위 3개의 게시글 랭킹과 함께 반환")
//    @Nested
//    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//    class FindTop3LikedBoardRanksTest {
//
//        //given
//        List<Object[]> mockTopBoardsWithLikes = new ArrayList<>();
//        Object[] mockObjectsLike3_1 = {Stub.MockBoard.getMockBoard1(), 3L};
//        Object[] mockObjectsLike3_2 = {Stub.MockBoard.getMockBoard2(), 3L};
//        Object[] mockObjectsLike3_3 = {Stub.MockBoard.getMockBoard3(), 3L};
//        Object[] mockObjectsLike3_4 = {Stub.MockBoard.getMockBoard4(), 3L};
//        Object[] mockObjectsLike3_5 = {Stub.MockBoard.getMockBoard5(), 3L};
//        Object[] mockObjectsLike2_1 = {Stub.MockBoard.getMockBoard2(), 2L};
//        Object[] mockObjectsLike2_2 = {Stub.MockBoard.getMockBoard4(), 2L};
//        Object[] mockObjectsLike2_3 = {Stub.MockBoard.getMockBoard3(), 2L};
//        Object[] mockObjectsLike2_4 = {Stub.MockBoard.getMockBoard5(), 2L};
//        Object[] mockObjectsLike2_5 = {Stub.MockBoard.getMockBoard1(), 2L};
//        Object[] mockObjectsLike1_1 = {Stub.MockBoard.getMockBoard3(), 1L};
//        Object[] mockObjectsLike1_2 = {Stub.MockBoard.getMockBoard5(), 1L};
//        @BeforeEach
//        public void setUp() {
//            mockTopBoardsWithLikes.add(mockObjectsLike3_1);
//        }
//
////        @AfterEach
////        public void tearDown() {
////            mockTopBoardsWithLikes.clear();
////        }
//
//        @Test
//        @Order(1)
//        void 동점자_없는_상위_3개_게시글() {
//            //given
//                // 좋아요 3, 2, 1
//            mockTopBoardsWithLikes.add(mockObjectsLike2_1);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_1);
//            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                    .willReturn(mockTopBoardsWithLikes);
//
//            //when
//            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();
//
//            //then
//            assertThat(responses.get(0).getLikeNum(), is(3L));
//            assertThat(responses.get(2).getLikeNum(), is(1L));
//            assertThat(responses.get(responses.size()-1).getRankOrders().getPosition(), is(3));
//            assertThat(responses.size(), is(3));
//        }
//
//        @Test
//        @Order(2)
//        void 일등1_이등2_삼등1() {
//            //given
//                // 좋아요 3, 2, 2, 1
//            mockTopBoardsWithLikes.add(mockObjectsLike2_1);
//            mockTopBoardsWithLikes.add(mockObjectsLike2_2);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_2);
//            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                    .willReturn(mockTopBoardsWithLikes);
//
//            //when
//            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();
//
//            //then
//            assertThat(responses.get(0).getLikeNum(), is(3L));
//            assertThat(responses.get(2).getLikeNum(), is(2L));
//            assertThat(responses.get(responses.size()-1).getRankOrders().getPosition(), is(2));
//            assertThat(responses.size(), is(3));
//        }
//
//        @Test
//        @Order(3)
//        void 일등3_이등1() {
//            //given
//            // 좋아요 3, 3, 3, 1
//            mockTopBoardsWithLikes.add(mockObjectsLike3_2);
//            mockTopBoardsWithLikes.add(mockObjectsLike3_3);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_1);
//            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                    .willReturn(mockTopBoardsWithLikes);
//
//            //when
//            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();
//
//            //then
//            assertThat(responses.get(0).getLikeNum(), is(3L));
//            assertThat(responses.get(2).getLikeNum(), is(3L));
//            assertThat(responses.get(0).getRankOrders().getPosition(), is(1));
//            assertThat(responses.get(responses.size()-1).getRankOrders().getPosition(), is(1));
//            assertThat(responses.size(), is(3));
//        }
//        @Test
//        @Order(4)
//        void 일등5_이등2() {
//            //given
//            // 좋아요 3, 3, 3, 3, 3, 1, 1
//            mockTopBoardsWithLikes.add(mockObjectsLike3_2);
//            mockTopBoardsWithLikes.add(mockObjectsLike3_3);
//            mockTopBoardsWithLikes.add(mockObjectsLike3_4);
//            mockTopBoardsWithLikes.add(mockObjectsLike3_5);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_1);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_2);
//            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                    .willReturn(mockTopBoardsWithLikes);
//
//            //when
//            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();
//
//            //then
//            assertThat(responses.get(0).getLikeNum(), is(3L));
//            assertThat(responses.get(responses.size()-1).getLikeNum(), is(3L));
//            assertThat(responses.get(0).getRankOrders().getPosition(), is(1));
//            assertThat(responses.get(responses.size()-1).getRankOrders().getPosition(), is(1));
//            assertThat(responses.size(), is(5));
//        }
//        @Test
//        @Order(5)
//        void 일등1_이등5_삼등1() {
//            //given
//            // 좋아요 3, 2, 2, 2, 2, 2, 1
//            mockTopBoardsWithLikes.add(mockObjectsLike2_1);
//            mockTopBoardsWithLikes.add(mockObjectsLike2_2);
//            mockTopBoardsWithLikes.add(mockObjectsLike2_3);
//            mockTopBoardsWithLikes.add(mockObjectsLike2_4);
//            mockTopBoardsWithLikes.add(mockObjectsLike2_5);
//            mockTopBoardsWithLikes.add(mockObjectsLike1_1);
//            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                    .willReturn(mockTopBoardsWithLikes);
//
//            //when
//            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();
//
//            //then
//            assertThat(responses.get(0).getLikeNum(), is(3L));
//            assertThat(responses.get(responses.size()-1).getLikeNum(), is(2L));
//            assertThat(responses.get(0).getRankOrders().getPosition(), is(1));
//            assertThat(responses.get(responses.size()-1).getRankOrders().getPosition(), is(2));
//            assertThat(responses.size(), is(6));
//        }
//
//
//
//
//    }
//}
