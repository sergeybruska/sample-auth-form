import { Request } from 'models/request';
import { UserTypes } from 'models/user';
import { v4 as uuidv4 } from 'uuid';

const MOCK_USER: UserTypes = {
  id: 1,
  username: "John Doe",
  email: "example@example.com",
  avatar: "https://rspgame.s3.amazonaws.com/ava/235d7b4c-280f-4dfe-8437-b5dcbe725839.svg",
}

export const mockFetch = async (url: string, config: Request) => {
  switch (url) {
    case '/api/login': {
      const body = JSON.parse(config.body);
      const { email, pass } = body as Record<string, string>;
      if (email === 'example@example.com' && pass === 'Qwerty123@') {
        const data = JSON.stringify({ error: null, data: { user: MOCK_USER, authToken: uuidv4() } });
        return new Response(data, { status: 200, headers: { 'Content-Type': 'application/json' } });
      } else {
        const error = JSON.stringify({ error: 401, message: 'Invalid credentials' });
        return new Response(error, { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}

