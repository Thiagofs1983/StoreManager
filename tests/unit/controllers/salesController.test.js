const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon');
chai.use(require('chai-as-promised'));
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

const sales = [{
  saleId: 1,
  productId: 1,
  quantity: 35,
  date: '2022-08-16T19:21:58.000Z'
},
{
  saleId: 1,
  productId: 2,
  quantity: 30,
  date: '2022-08-16T19:21:58.000Z'
},
{
  saleId: 2,
  productId: 3,
  quantity: 35,
  date: '2022-08-16T19:21:58.000Z'
}];

describe('Lista todos as vendas na camada controller', () => {
  const req = {};
  const res = {}
  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(sales)
  });
  after(async () => {
    salesService.getAll.restore();
  });
  it('A requisição deve retornar o status 200', async () => {
    await salesController.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('A requisição deve retornar um json com a lista de vendas', async () => {
    await salesController.getAll(req, res);
    expect(res.json.calledWith(sales)).to.be.equal(true);
  });
})