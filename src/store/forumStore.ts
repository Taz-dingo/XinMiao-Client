import { create } from 'zustand';

interface ForumState {
    // 需要更新评论区时更新此信号
    commentUpdateSignal: number;
    // 需要更新帖子列表时更新此信号
    postListUpdateSignal: number;
    // 需要翻页信号
    curPage: number;
    pagesize: number;
    setCommentUpdateSignal: (signal: number) => void;
    setPostListUpdateSignal: (signal: number) => void;
    setCurPage: (page: number) => void;
    setPagesize: (pagesize: number) => void;
    clearCurPage: () => void;
    clearPagesize: () => void;
}
export const useForumStore = create<ForumState>((set) => ({
    commentUpdateSignal: 0,
    postListUpdateSignal: 0,
    curPage: 1,
    pagesize: 5,
    setCommentUpdateSignal: (signal) => set(() => ({ commentUpdateSignal: signal })),
    setPostListUpdateSignal: (signal) => set(() => ({ postListUpdateSignal: signal })),
    setCurPage: (page) => set(() => ({ curPage: page })),
    setPagesize: (pagesize) => set(() => ({ pagesize })),
    clearCurPage: () => set(() => ({ curPage: 1 })),
    clearPagesize: () => set(() => ({ pagesize: 10 })),
}));