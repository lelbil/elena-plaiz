import {put} from "./api";

export const shadowbanPost = postId => put(`/api/posts/${postId}/shadowban`)