const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon');
chai.use(require('chai-as-promised'));
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

const products = [
  { id: 1, name: 'Prod 1' },
  { id: 2, name: 'Prod 2' },
  { id: 3, name: 'Prod 3' }
]


describe('Listar todos os produtos na camada service', () => {
  before(async () => {
    const execute = [products];

    sinon.stub(productsModel, 'getAll').resolves(execute);
  })

  after(async () => {
    productsModel.getAll.restore();
  })
  it('ao fazer a requisição, retorna um array', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.a('array');
  })
  it('o array deve ter pelo menos 1 objeto com a propriedade id', async () => {
    const [response] = await productsService.getAll();
    expect(response[0]).to.be.a.property('id');
  })
});

describe('Busca produto pelo id na camada service', () => {
  describe('Caso a busca não encontre nenhum produto', () => {
    const errorMessage = []
    before(async () => {
      sinon.stub(productsModel, 'findProductById').resolves(errorMessage);
    });
    after(async () => {
      productsModel.findProductById.restore();
    })
    it('retorna um erro com a mensagem "Product not found"', async () => {
      await expect(productsService.findProductById(150)).to.be.rejectedWith('Product not found');
    });
  });

  describe('Caso a busca seja bem sucedida', () => {
    before(async () => {
      const ProductsArray = [{ id: 1, name: 'Prod 1' }]
      sinon.stub(productsModel, 'findProductById').resolves(ProductsArray);
    })
    after(async () => {
      productsModel.findProductById.restore();
    })
    it('ao fazer a requisição, retorna um array', async () => {
      const response = await productsService.findProductById(1);
      expect(response).to.be.a('array');
    })
    it('o array deve possuir 1 item', async () => {
      const response = await productsService.findProductById(1);
      expect(response).to.have.lengthOf(1);
    });
    it('o item do array deve ser um objeto', async () => {
      const [response] = await productsService.findProductById(1);
      expect(response).to.be.a('object');
    })
    it('o array deve ter pelo menos 1 objeto com a propriedade id', async () => {
      const [response] = await productsService.findProductById(1);
      expect(response).to.be.a.property('id');
    })
    it('o array deve ter pelo menos 1 objeto com a propriedade id com o valor 1', async () => {
      const [response] = await productsService.findProductById(1);
      expect(response.id).to.be.equal(1);
    })
  });
});