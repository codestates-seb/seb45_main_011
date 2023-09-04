package com.growstory.domain.journal.entity;

import com.growstory.domain.images.entity.JournalImage;
import com.growstory.domain.leaf.entity.Leaf;
import com.growstory.global.audit.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Journal extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long journalId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private boolean isConnectedToBoard;

    @OneToOne(mappedBy = "journal", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private JournalImage journalImage;

    @ManyToOne
    @JoinColumn(name = "LEAF_ID")
    private Leaf leaf;

    public void updateImg(JournalImage journalImage) {
        this.journalImage=journalImage;
        if(journalImage.getJournal()!=this) {
            journalImage.updateJournal(this);
        }
    }
}
