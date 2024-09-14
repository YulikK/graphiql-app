import { User } from 'firebase/auth';

export const userMock: User = {
  uid: 'test-uid',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'http://example.com/photo.jpg',
  emailVerified: false,
  isAnonymous: false,
  metadata: {
    creationTime: '2024-01-01T00:00:00Z',
    lastSignInTime: '2024-01-02T00:00:00Z',
  },
  providerData: [
    {
      uid: 'test-provider-uid',
      displayName: 'Test Provider User',
      email: 'provider@example.com',
      photoURL: 'http://example.com/provider-photo.jpg',
      providerId: 'test-provider-id',
      phoneNumber: 'test',
    },
  ],
  phoneNumber: null,
  refreshToken: 'test-refresh-token',
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  tenantId: null,
  delete: vi.fn(),
  toJSON: vi.fn(),
  providerId: '',
};
