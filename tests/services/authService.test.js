const services = require('../../src/services/authService');
const db = require('../../database/models');
const authUtils = require('../../src/utils/authUtil');
jest.mock('../../src/utils/authUtil');
describe('authService', () => {
  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(db.Users, 'findOne').mockResolvedValue(null);
      jest.spyOn(authUtils, 'encryptPassword').mockResolvedValue('test');
      jest.spyOn(db.Users, 'create').mockResolvedValue({ username: 'test', password: 'test' });
      const mockReq = { username: 'test', password: 'test' };
      const result = await services.create(mockReq);
      expect(result).toEqual({ 'message': 'User created successfully' });
    });
  });
  describe('login', () => {
    it('should login a user', async () => {
      jest.spyOn(db.Users, 'findOne').mockResolvedValue({ username: 'test', password: 'test' });
      jest.spyOn(authUtils, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(authUtils, 'generateToken').mockResolvedValue('test');
      jest.spyOn(authUtils, 'storeToken').mockResolvedValue();
      const mockReq = { username: 'test', password: 'test' };
      const result = await services.login(mockReq);
      expect(result).toEqual({ 'token': 'test' });
    });
  });
  describe('verify', () => {
    it('should verify a user', async () => {
      jest.spyOn(authUtils, 'validateToken').mockResolvedValue({ username: 'test' });
      jest.spyOn(db.Users, 'findOne').mockResolvedValue({ username: 'test' });
      const mockReq = { token: 'test' };
      const result = await services.validateHandler(mockReq);
      expect(result).toEqual({ username: 'test' });
    });
  });

});