import {put, _delete} from "./api";

export const shadowbanPost = (postId, unshadowban) => put(`/api/posts/${postId}/shadowban`, { unshadowban })
export const deletePost = postId => _delete(`/api/posts/${postId}`)