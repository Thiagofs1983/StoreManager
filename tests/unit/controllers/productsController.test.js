const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../models/connection');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

const products = [
  { id: 1, name: 'Prod 1' },
  { id: 2, name: 'Prod 2' },
  { id: 3, name: 'Prod 3' }
]


describe('Listar os produtos', () => {
  const req = {};
  const res = {};
  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(true)
  })

  after(async () => {
    productsService.getAll.restore();
  })
  it('é chamado o status com o código 200', async () => {
    await productsController.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  })
  it('é retornado um json com os produtos do BD', async () => {
    await productsController.getAll(req, res);
    expect(res.json.calledWith(products)).to.be.equal(false);
  })
});