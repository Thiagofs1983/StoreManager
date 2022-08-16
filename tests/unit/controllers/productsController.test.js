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
  const req = {};
  const res = {};
  describe('caso a busca não seja bem sucedida', () => {
    before(async () => {
      req.params = {id: 150};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findProductById').rejects()
    });
    after(async () => {
      productsService.findProductById.restore();
    })
    it('é retornado um erro', async () => {
      await expect(productsController.findProductById(req, res)).to.be.rejectedWith(Error);
    });
  });
  describe('caso a busca seja bem sucedida', () => {
    before(async () => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findProductById').resolves([{ id: 1, name: 'prod 1' }]);
    });
    after(async () => {
      productsService.findProductById.restore();
    });
    it('é chamado com o status 200', async () => {
      await productsController.findProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('é retornado um json com o produto do id chamado', async () => {
      await productsController.findProductById(req, res);
      expect(res.json.calledWith({ id: 1, name: 'prod 1' })).to.be.equal(true);
    });
  });
});

describe('Cadastro de um novo produto no BD na camada controllers', () => {
  const req = {};
  const res = {};
  describe('Caso o cadastro não seja bem sucedido', () => {
    before(async () => {
      req.body = { name: 'Cad' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'create').rejects()
    });
    after(async () => {
      productsService.create.restore();
    });
    it.only('retorna a mensagem de erro', async () => {
      await expect(productsController.create(req, res)).to.be.rejectedWith(Error);
    });
  });
  describe('Caso o cadastro seja bem sucedido', () => {

  });
});