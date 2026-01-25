import type { DefaultSession } from "next-auth";

import type { UserRole } from "@/app/lib/auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      role?: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
