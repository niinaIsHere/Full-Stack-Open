import { create } from "zustand";
import blogService from "./services/blogs";

const getId = () => (100000 * Math.random()).toFixed(0);

const useBlogStore = create((set, get) => ({
  blogs: [],
  user: null,
  notification: null,
  actions: {
    add: async (blog) => {
      const createdBlog = await blogService.create(blog);
      set((state) => ({ blogs: state.blogs.concat(createdBlog) }));
      get().actions.setNotification({ type: "success", text: "added blog" });
    },

    like: async (id) => {
      const blog = get().blogs.find((a) => a.id === id);
      const liked = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      });

      set((state) => ({
        blogs: state.blogs.map((blog) => (blog.id === id ? liked : blog)),
      }));
      get().actions.setNotification({ type: "success", text: "Liked blog" });
    },

    remove: async (id) => {
      const blogToRemove = get().blogs.find((a) => a.id === id);
      const removed = await blogService.remove(id);

      if (removed !== null) {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
        get().actions.setNotification({
          type: "success",
          text: "Removed blog",
        });
      }
    },

    setNotification: (obj) => {
      set(() => ({ notification: obj }));
      setTimeout(() => {
        set(() => ({ notification: null }));
      }, 5000);
    },

    initialize: (blogs) => set(() => ({ blogs })),

    setUser: (obj) => {
      set(() => ({ user: obj }));
    },

    resetUser: () => {
      set(() => ({ user: null }));
    },
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
