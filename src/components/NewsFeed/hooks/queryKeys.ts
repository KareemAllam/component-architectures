const postsKeys = {
  all: ['posts'] as const,
  detail: (id: number) => [...postsKeys.all, id] as const,
};

export default postsKeys;