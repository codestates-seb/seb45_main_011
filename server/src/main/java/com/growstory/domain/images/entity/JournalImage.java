package com.growstory.domain.images.entity;

import com.growstory.domain.journal.entity.Journal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "JOURNAL_IMAGE")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JournalImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long journalImage;

    @Column(name = "ORIGIN_NAME", nullable = false)
    private String originName;

    @Column(name = "IMAGE_URL", nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "JOURNAL_ID", nullable = false)
    private Journal journal;

}
