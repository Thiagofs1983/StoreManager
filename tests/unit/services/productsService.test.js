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

describe('Cadastro de um novo produto no BD na camada service', () => {
  describe('Caso o cadastro seja realizado com sucesso', () => {
    const name = 'Cadeira Dev';
    const resolve = 1;
    before(async () => {
      sinon.stub(productsModel, 'create').resolves(resolve);
    });
    after(async () => {
      productsModel.create.restore();
    });
    it('Deve retornar um número', async () => {
      const result = await productsService.create(name);
      expect(result).to.be.a('number');
    });
    it('Deve retornar o número 1', async () => {
      const result = await productsService.create(name);
      expect(result).to.be.equal(1);
    });
  });
});

describe('Atualiza um produto existente', () => {
  describe('Caso a atualização não tenha sucesso', () => {
    before(async () => {
      sinon.stub(productsModel, 'updatePruductById').resolves({ affectedRows: 0 });
    });
    after(async () => {
      productsModel.updatePruductById.restore();
    });
    it('Deve retornar uma mensagem com o erro ocorrido', async () => {
      await expect(productsService.updatePruductById('Cadeira', 150)).to.be.rejectedWith('Product not found');
    });
  });
  describe('Caso seja atualizado com sucesso', () => {
    const name = 'Raio do Thor'
    before(async () => {
      sinon.stub(productsModel, 'updatePruductById').resolves({ affectedRows: 1 });
    });
    after(async () => {
      productsModel.updatePruductById.restore();
    });
    it('Retorna um objeto', async () => {
      const response = await productsModel.updatePruductById(name, 1);
      expect(response).to.be.a('object');
    });
    it('O objeto deve ter a chave "affectedRows"', async () => {
      const response = await productsModel.updatePruductById(name, 1);
      expect(response).to.be.a.property('affectedRows');
    });
    it('A chave "affectedRows" deve ter o valor 1', async () => {
      const { affectedRows } = await productsModel.updatePruductById(name, 1);
      expect(affectedRows).to.be.equal(1);
    });
  });
});