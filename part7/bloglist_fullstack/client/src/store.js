import { create } from "zustand";
import blogService from "./services/blogs";

const getId = () => (100000 * Math.random()).toFixed(0);

const useBlogStore = create((set, get) => ({
  blogs: [],
  notification: null,
  actions: {
    setNotification: (obj) => {
      set(() => ({ notification: obj }));
      setTimeout(() => {
        set(() => ({ notification: null }));
      }, 5000);
    },
    initialize: (blogs) => set(() => ({ blogs })),
  },
}));

export default useBlogStore;

export const useBlogs = () => {
  return useBlogStore((state) => state.blogs);
};
export const useNotification = () => {
  const notification = useBlogStore((state) => state.notification);
  return notification;
};

export const useBlogActions = () => useBlogStore((state) => state.actions);
