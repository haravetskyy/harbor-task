import { Injectable } from '@nestjs/common';
import { Session } from './session.dto';

@Injectable()
export class AuthService {
  async getMagicHutSession(cookie: string): Promise<Session> {
    const response = await fetch(`${process.env.MAGIC_HUT_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data from Magic Hut. Status code: ${response.status}`);
    }

    const magicHutSession: { session: Session } = await response.json();
    return magicHutSession.session;
  }
}
