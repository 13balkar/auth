const validator = require('../../src/middlewares/auth.validator');

describe('authValidator', () => {
  describe('userValidator', () => {
    it('should call next when username and password are valid', () => {
      const mockReq = { body: { username: 'testtest', password: 'testtest' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      validator.userValidator(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
    it('should return 400 status when username or password is invalid', () => {
      const mockReq = { body: { username: 'test', password: 123 } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      validator.userValidator(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith('"password" must be a string');
    });
  });
  describe('tokenValidator', () => {
    it('should call next when token is valid', () => {
      const mockReq = { headers: { token: 'test' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      validator.tokenValidator(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();

    });
    it('should return 400 status when token is invalid', () => {
      const mockReq = { headers: { token: 123 } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockNext = jest.fn();
      validator.tokenValidator(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith('"token" must be a string');
    });
  });
});