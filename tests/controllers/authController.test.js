const httpError = require('../../errors/httpErrors');
const services = require('../../src/services/authService');
const controller = require('../../src/controllers/authController');

describe('authController', () => {
  describe('createUser', () => {
    it('should create a user and return 201 status', async () => {
      jest.spyOn(services, 'create').mockResolvedValue({ message: 'User created successfully' });
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });
    it('should return 409 status when user already exists', async () => {
      jest.spyOn(services, 'create').mockRejectedValue(new httpError('User already exists', 409));
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith('User already exists');
    });
    it('should return 500 status when internal server error', async () => {
      jest.spyOn(services, 'create').mockRejectedValue(new Error('Internal server error'));
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith('Internal server error');
    });
  });
  describe('loginUser', () => {
    it('should login a user and return 200 status', async () => {
      jest.spyOn(services, 'login').mockResolvedValue({ token: 'test' });
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ token: 'test' });
    });
    it('should return 404 status when user not found', async () => {
      jest.spyOn(services, 'login').mockRejectedValue(new httpError('User not found', 404));
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith('User not found');
    });
    it('should return 401 status when invalid password', async () => {
      jest.spyOn(services, 'login').mockRejectedValue(new httpError('Invalid password', 401));
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith('Invalid password');
    });
    it('should return 500 status when internal server error', async () => {
      jest.spyOn(services, 'login').mockRejectedValue(new Error('Internal server error'));
      const mockReq = { body: { username: 'test', password: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith('Internal server error');
    });
  });
  describe('validateHandler', () => {
    it('should validate a user and return 200 status', async () => {
      jest.spyOn(services, 'validateHandler').mockResolvedValue({
        'id': 1,
        'username': 'Balkar',
        'password': 'dbgfbgf',
        'createdAt': '2023-03-08T17:43:44.882Z',
        'updatedAt': '2023-03-08T17:43:44.882Z'
      });
      const mockReq = { headers: { token: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.validateHandler(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        'id': 1,
        'username': 'Balkar',
        'password': 'dbgfbgf',
        'createdAt': '2023-03-08T17:43:44.882Z',
        'updatedAt': '2023-03-08T17:43:44.882Z'
      });
    });
    it('should return 404 status when user not found', async () => {
      jest.spyOn(services, 'validateHandler').mockRejectedValue(new httpError('User not found', 404));
      const mockReq = { headers: { token: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.validateHandler(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith('User not found');
    });
    it('should return 401 status when invalid token', async () => {
      jest.spyOn(services, 'validateHandler').mockRejectedValue(new httpError('Invalid Token', 401));
      const mockReq = { headers: { token: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.validateHandler(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith('Invalid Token');
    });
    it('should return 500 status when internal server error', async () => {
      jest.spyOn(services, 'validateHandler').mockRejectedValue(new Error('Internal server error'));
      const mockReq = { headers: { token: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controller.validateHandler(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith('Internal server error');
    });
  });
});