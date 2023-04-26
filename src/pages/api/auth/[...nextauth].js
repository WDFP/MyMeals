import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default function Auth(req, res) {
  return NextAuth(req, res, options);
}