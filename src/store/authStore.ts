import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    userInfo: {
        id: number;
        username: string;
    }
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}
const useAuthStore = create<AuthState>((set) => ({
    userInfo: {
        id: 1111111111,
        username: '',
    },
    token: null,
    login: async (token) => {
        set({ token });
        await AsyncStorage.setItem('token', token);
    },
    logout: async () => {
        set({ token: null });
        await AsyncStorage.removeItem('token');
    },
}));

// 检查本地存储中是否有保存的 token，并自动登录
AsyncStorage.getItem('token').then((token) => {
    if (token) {
        useAuthStore.setState({ token });
    }
});

export default useAuthStore;