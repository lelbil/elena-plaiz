import {put, _delete} from "./api";

export const shadowbanPost = postId => put(`/api/posts/${postId}/shadowban`)
export const deletePost = postId => _delete(`/api/posts/${postId}`)