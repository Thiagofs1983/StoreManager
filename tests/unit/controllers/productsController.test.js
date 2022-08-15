const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon');
chai.use(require('chai-as-promised'));
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

const products = [
  { id: 1, name: 'Prod 1' },
  { id: 2, name: 'Prod 2' },
  { id: 3, name: 'Prod 3' }
]


describe('Listar os produtos na camada controller', () => {
  const req = {};
  const res = {};
  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(products)
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
    expect(res.json.calledWith(products)).to.be.equal(true);
  })
});

describe('busca pelo produto com o id correspondente na camada de controller', () => {
  describe('caso a busca não seja bem sucedida', () => {
    const req = {};
    const res = {};
    before(async () => {
      req.params = {id: 150};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findProductById').rejects()
    });
    after(async () => {
      productsService.findProductById.restore();
    })
    it('é retornado um erro com o status 404', async () => {
      //await productsController.findProductById(req, res);
      await expect(productsController.findProductById(req, res)).to.be.rejectedWith(Error);
    });
  });
  describe('caso a busca seja bem sucedida', () => {

  });
});