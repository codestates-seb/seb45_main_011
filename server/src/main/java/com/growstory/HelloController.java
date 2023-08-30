package com.growstory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/v1")
@Tag(name = "Sample", description = "Test Controller")
@RequiredArgsConstructor
public class HelloController {
    private final Map<Long, Map<String, Object>> samples = new HashMap<>();

    @PostConstruct
    public void init() {
        Map<String, Object> sample1 = new HashMap<>();
        long sampleId = 1L;
        sample1.put("sampleId", sampleId);
        sample1.put("sample1", "홍길동");
        sample1.put("sample2", "hgd@gmail.com");
        sample1.put("sample3", "010-1234-1234");
    }

    @Operation(summary = "Request Post test", description = "Response name, email, phone")
    @PostMapping("/sample")
    public ResponseEntity<?> postTest(@RequestParam("name") String name,
                                      @RequestParam("email") String email,
                                      @RequestParam("phone") String phone){
        Map<String, String> map = new HashMap<>();
        map.put("name", name);
        map.put("email", email);
        map.put("phone", phone);

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @Operation(summary = "Request Get test", description = "Response id, name, email, phone")
    @GetMapping("/sample")
    public ResponseEntity<?> getAllTest() {
        return new ResponseEntity<>(samples, HttpStatus.OK);
    }

    @Operation(summary = "Request Delete test", description = "Empty Response")
    @DeleteMapping("/sample/{test-id}")
    public ResponseEntity<?> deleteTest(@PathVariable("test-id") Long sampleId) {
        if (!samples.containsKey(sampleId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        samples.remove(sampleId);

        return new ResponseEntity<>(samples, HttpStatus.NO_CONTENT);
    }
}
