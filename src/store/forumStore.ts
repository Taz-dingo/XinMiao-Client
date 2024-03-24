import { create } from 'zustand';

interface ForumState {
    // 需要更新评论区时更新此信号
    commentUpdateSignal: number;
    // 需要更新帖子列表时更新此信号
    postListUpdateSignal: number;
    setCommentUpdateSignal: (signal: number) => void;
    setPostListUpdateSignal: (signal: number) => void;
}
export const useForumStore = create<ForumState>((set) => ({
    commentUpdateSignal: 0,
    postListUpdateSignal: 0,
    setCommentUpdateSignal: (signal) => set(() => ({ commentUpdateSignal: signal })),
    setPostListUpdateSignal: (signal) => set(() => ({ postListUpdateSignal: signal }))
}));