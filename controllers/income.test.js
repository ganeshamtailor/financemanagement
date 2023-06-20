const { addIncome } = require('../controllers/income');
const IncomeSchema = require('../models/income');
const mongoose = require('mongoose');
describe('addIncome', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        title: 'Salary',
        amount: 5000,
        category: 'Income',
        description: 'Monthly salary',
        date: '2023-06-19',
      },
      user: {
        id: 'user-id',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add income when all fields are provided correctly', async () => {
    req.user = { id: new mongoose.Types.ObjectId('6481b324487cfa0664662204') }; // Set a valid user id
    const saveSpy = jest.spyOn(IncomeSchema.prototype, 'save').mockResolvedValue(); // Mock the save method to resolve
    await addIncome(req, res);
    expect(saveSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Income Added' });
  });

  it('should return a 400 error if any required field is missing', async () => {
    req.body.title = '';
    await addIncome(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required!' });
  });

  it('should return a 400 error if amount is not a positive number', async () => {
    req.body.amount = -500;
    await addIncome(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Amount must be a positive number!' });
  });

  it('should return a 400 error if amount is not a number', async () => {
    req.body.amount = '500';
    await addIncome(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Amount must be a positive number!' });
  });

  it('should return a 422 error if there is an error during income save', async () => {
    const errorMessage = 'Error saving income';
    jest.spyOn(IncomeSchema.prototype, 'save').mockRejectedValue(new Error(errorMessage));
    await addIncome(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
