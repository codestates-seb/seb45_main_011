package com.growstory.domain.plant_object.location.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(name = "X_AXIS", nullable = false)
    private int x;

    @Column(name = "Y_AXIS", nullable = false)
    private int y;

    @Column(name = "IS_INSTALLED", nullable = false)
    private boolean isInstalled = false; // 구입 했을 당시에는 미설치된 상황이므로 초기값 false

    public void update(int x, int y, boolean isInstalled) {
        this.x = x;
        this.y = y;
        this.isInstalled = isInstalled;
    }
}
