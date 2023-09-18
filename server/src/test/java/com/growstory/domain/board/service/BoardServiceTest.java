package com.growstory.domain.board.service;

import com.growstory.domain.board.repository.BoardHashTagRepository;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.comment.service.CommentService;
import com.growstory.domain.hashTag.repository.HashTagRepository;
import com.growstory.domain.hashTag.service.HashTagService;
import com.growstory.domain.images.service.BoardImageService;
import com.growstory.domain.rank.board_likes.entity.BoardLikesRank;
import com.growstory.domain.stubdata.Stub;
import com.growstory.global.auth.utils.AuthUserUtils;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class BoardServiceTest {

    @InjectMocks
    private BoardService boardService;
    @Mock
    private BoardRepository boardRepository;
    @Mock
    private HashTagService hashTagService;
    @Mock
    private BoardImageService boardImageService;
    @Mock
    private AuthUserUtils authUserUtils;
    @Mock
    private HashTagRepository hashTagRepository;
    @Mock
    private BoardHashTagRepository boardHashtagRepository;
    @Mock
    private CommentService commentService;


    @DisplayName("좋아요 기준 상위 3개의 게시글 랭킹과 함께 반환")
    @Nested
    @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
    class FindTop3LikedBoardRanksTest {

        //given
        List<Object[]> mockTopBoardsWithLikes = new ArrayList<>();
        Object[] mockObjects1 = {Stub.MockBoard.getMockBoard1(), 3L};
        Object[] mockObjects2 = {Stub.MockBoard.getMockBoard2(), 2L};
        Object[] mockObjects3 = {Stub.MockBoard.getMockBoard3(), 1L};
        Object[] mockObjects4 = {Stub.MockBoard.getMockBoard4(), 2L};
        Object[] mockObjects5 = {Stub.MockBoard.getMockBoard5(), 1L};
        @BeforeEach
        public void setUp() {
            mockTopBoardsWithLikes.add(mockObjects1);
            mockTopBoardsWithLikes.add(mockObjects2);
            mockTopBoardsWithLikes.add(mockObjects3);
        }

//        @AfterEach
//        public void tearDown() {
//            mockTopBoardsWithLikes.clear();
//        }

        @Test
        @Order(1)
        void 동점자_없는_상위_3개_게시글() {
            //given
            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
                    .willReturn(mockTopBoardsWithLikes);

            //when
            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();

            //then
            assertThat(responses.get(0).getLikeNum(), is(3L));
            assertThat(responses.get(2).getLikeNum(), is(1L));
            assertThat(responses.get(responses.size()-1).getRankStatus().getRank(), is(3));
            assertThat(responses.size(), is(3));
        }

        @Test
        @Order(2)
        void 일등1_이등2_삼등1() {
            mockTopBoardsWithLikes.add(mockObjects4);
            //given
            given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
                    .willReturn(mockTopBoardsWithLikes);

            //when
            List<BoardLikesRank> responses = boardService.findTop3LikedBoardRanks();

            //then
            assertThat(responses.get(0).getLikeNum(), is(3L));
            assertThat(responses.get(2).getLikeNum(), is(1L));
            assertThat(responses.get(responses.size()-1).getRankStatus().getRank(), is(3));
            assertThat(responses.size(), is(4));
        }
    }
}
