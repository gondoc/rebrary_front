export const QueryKeys = {
  member: {
    all: ["member"] as const,
    // info: () => [...QueryKeys.member.all, "info"] as const,
    info: ["member", "info"] as const,
    idCheck: (id: string) => [...QueryKeys.member.all, "id", id] as const,
    nick: ["member", "nick"] as const,
    nickCheck: (nick: string) =>
      [...QueryKeys.member.all, "nick", nick] as const,
    email: {
      codeSend: (email: string) =>
        [...QueryKeys.member.all, "code-send", email] as const,
      verifyCode: (code: string) =>
        [...QueryKeys.member.all, "verify-code", code] as const,
    },
  },

  book: {
    all: ["book"] as const,
  },
};
