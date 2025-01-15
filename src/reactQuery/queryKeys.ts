export const QueryKeys = {
  member: {
    all: ["member"] as const,
    info: () => [...QueryKeys.member.all, "info"] as const,
    id: (id: string) => [...QueryKeys.member.all, "id", id] as const,
  },

  book: {
    all: ["book"] as const,
  },
};
