import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import {User} from '@/models/User';
import Admin from '@/models/Admin';   // 👈 make sure this exists
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';

interface UserData {
  id: string;
  name?: string | null;
  email?: string | null;
  role: 'user' | 'admin';
  image?: string | null;
  isAdmin?: boolean;
}

declare module 'next-auth' {
  interface User extends UserData {}
  interface Session extends DefaultSession {
    user: UserData;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
    isAdmin: boolean;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const { email, password } = credentials;

        await dbConnect();

        // Try finding user in normal users
        let userDoc: any = await User.findOne({ email }).select('+password').lean();

        // If not found, try admins
        let role: 'user' | 'admin' = 'user';
        if (!userDoc) {
          userDoc = await Admin.findOne({ email }).select('+password').lean();
          if (userDoc) {
            role = 'admin';
          }
        }

        if (!userDoc) {
          throw new Error('No account found with this email');
        }

        const isPasswordValid = await bcrypt.compare(password, userDoc.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: userDoc._id.toString(),
          email: userDoc.email,
          name: userDoc.name,
          role,
          image: userDoc.avatar?.url || null,
          isAdmin: role === 'admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserData }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isAdmin = user.role === 'admin';
        // Include all user data in the token
        if (user.email) token.email = user.email;
        if (user.name) token.name = user.name;
        if (user.image) token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
        // Ensure we have the user's name and email in session
        if (token.email) session.user.email = token.email;
        if (token.name) session.user.name = token.name;
        if (token.image) session.user.image = token.image;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
