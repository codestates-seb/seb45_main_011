package com.growstory.global.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    ACCOUNT_UNAUTHORIZED(401, "Account unauthorized"),
    ACCOUNT_NOT_FOUND(404, "Account not found"),
    ACCOUNT_NOT_ALLOW(405, "That Account doesn't have authority"),
    ACCOUNT_ALREADY_EXISTS(409, "Account already exists"),

    BOARD_NOT_FOUND(404, "Board not found"),
    BOARD_NOT_ALLOW(405, "That Board doesn't have authority"),
    BOARD_ALREADY_EXISTS(409, "Board already exists"),

    BOARD_IMAGE_NOT_FOUND(404, "Board image not found"),
    BOARD_IMAGE_NOT_ALLOW(405, "That Board image doesn't have authority"),
    BOARD_IMAGE_ALREADY_EXISTS(409, "Board image already exists"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_NOT_ALLOW(405, "That Comment doesn't have authority"),
    COMMENT_ALREADY_EXISTS(409, "Comment already exists"),

    PLANT_OBJECT_NOT_FOUND(404, "Plant Object not found"),
    PLANT_OBJECT_NOT_ALLOW(405, "That Plant Object doesn't have authority"),
    PLANT_OBJECT_ALREADY_EXISTS(409, "Plant Object already exists"),

    LEAF_NOT_FOUND(404, "Leaf not found"),
    LEAF_NOT_ALLOW(405, "That Leaf doesn't have authority"),
    LEAF_ALREADY_EXISTS(409, "Leaf already exists"),

    JOURNAL_NOT_FOUND(404, "Journal not found"),
    JOURNAL_NOT_ALLOW(405, "Journal doesn't match the author"),
    JOURNAL_EXISTS(409, "Journal already Exists"),
    JOURNAL_IMG_NOT_FOUND(404, "Journal Image not found"),

    POINT_TYPE_NOT_FOUND(404, "Earn point type not found."),

    PRODUCT_NOT_FOUND(404, "Product not found"),
    PLANT_OBJ_NOT_FOUND(404, "PlantObj not found"),

    INVALID_LOCATION(400, "Location is invalid"),
    LOCATION_NOT_FOUND(404, "Location not found"),
    LOCATION_NOT_ALLOW(405, "Location change not allowed"),

    NOT_ENOUGH_POINTS(403, "Not Enough Points"),

    RANK_NOT_FOUND(404, "Rank not found");

    private final int status;
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
