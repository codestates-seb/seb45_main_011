//package com.growstory.domain.board.service;
//
//import com.growstory.domain.account.entity.Account;
//import com.growstory.domain.board.dto.ResponseRankingDto;
//import com.growstory.domain.board.entity.Board;
//import com.growstory.domain.board.repository.BoardRepository;
//import com.growstory.domain.stubdata.Stub;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.test.context.TestPropertySource;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.BDDMockito.given;
//
//@ExtendWith(MockitoExtension.class)
//@TestPropertySource(properties = {
//        "your.scheduled.property=cron: 0 0 0 * * ?" // 예제 크론 표현식
//})
//public class BoardRankingTest {
//
//    @InjectMocks
//    private BoardService boardService;
//
//    @Mock
//    private BoardRepository boardRepository;
//
//    @Test
//    void testFindTop3LikedBoards() {
//        // 가짜 데이터 생성
////        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
//        List<Object[]> fakeTopBoardsWithLikes = new ArrayList<>();
////        fakeTopBoardsWithLikes.add(new Object[] { Board.builder().boardId(1L).title("제목1").account(Stub.MockAccount.getStubAccount()).boardLikes(Stub.MockBoardLikes.getBoardLikes1()).build(), 3L});
//        fakeTopBoardsWithLikes.add(new Object[] { Board.builder().boardId(1L).title("제목1").account(Account.builder().displayName("빵빵스").build()).boardLikes(Stub.MockBoardLikes.getBoardLikes1()).build(), 3L});
//        fakeTopBoardsWithLikes.add(new Object[] { Board.builder().boardId(2L).boardLikes(Stub.MockBoardLikes.getBoardLikes2()).build(), 2L});
//        fakeTopBoardsWithLikes.add(new Object[] { Board.builder().boardId(3L).boardLikes(Stub.MockBoardLikes.getBoardLikes3()).build(), 1L});
//
//        // 가짜 데이터를 반환하도록 Mock 설정
////        when(boardRepository.findTop3LikedBoards(sevenDaysAgo)).thenReturn(fakeTopBoardsWithLikes);
//        given(boardRepository.findTop3LikedBoards(Mockito.any(LocalDateTime.class)))
//                .willReturn(fakeTopBoardsWithLikes);
//
//        // 테스트 대상 메서드 호출
//        List<ResponseRankingDto> response = boardService.findTop3LikedBoards();
//
//        // 결과 검증
//        assertEquals(3, response.size());
//
//        assertEquals(1L, response.get(0).getBoardId());
//        assertEquals(3, response.get(0).getLikeNum());
//
//        assertEquals(2L, response.get(1).getBoardId());
//        assertEquals(2, response.get(1).getLikeNum());
//
//        assertEquals(3L, response.get(2).getBoardId());
//        assertEquals(1, response.get(2).getLikeNum());
////        assertThat((fakeTopBoardsWithLikes.get(0)[0]), );
//    }
//}
