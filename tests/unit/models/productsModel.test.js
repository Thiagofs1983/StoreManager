const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const products = [
  { id: 1, name: 'Prod 1' },
  { id: 2, name: 'Prod 2' },
  { id: 3, name: 'Prod 3' }
]


describe('Listar os produtos', () => {
  before(async () => {
    const execute = [products];
    
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })
  it('ao fazer a requisição, retorna um array', async () => {
    const response = await productsModel.getAll();
    expect(response).to.be.a('array');
  })
  it('o array deve ter pelo menos 1 objeto com a propriedade id', async () => {
    const [response] = await productsModel.getAll();
    expect(response).to.be.a.property('id');
  })
});

describe('Busca produto pelo id', () => {
  const emptyProductsArray = []
  describe('Caso a busca não encontre nenhum produto', () => {
    before(async () => {
      const execute = [emptyProductsArray]
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    })
    it('ao fazer a requisição, retorna um array', async () => {
      const response = await productsModel.findProductById(10);
      expect(response).to.be.a('array');
    });
    it('o array deve estar vazio', async () => {
      const response = await productsModel.findProductById(10);
      expect(response).to.have.lengthOf(0);
    });
  });

  describe('Caso a busca seja bem sucedida', () => {
    const ProductsArray = [{ id: 1, name: 'Prod 1' }]
    before(async () => {
      const execute = [ProductsArray];

      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
      connection.execute.restore();
    })
    it('ao fazer a requisição, retorna um array', async () => {
      const response = await productsModel.findProductById(1);
      expect(response).to.be.a('array');
    })
    it('o array deve possuir 1 item', async () => {
      const response = await productsModel.findProductById(1);
      expect(response).to.have.lengthOf(1);
    });
    it('o item do array deve ser um objeto', async () => {
      const [response] = await productsModel.findProductById(1);
      expect(response).to.be.a('object');
    })
    it('o array deve ter pelo menos 1 objeto com a propriedade id', async () => {
      const [response] = await productsModel.findProductById(1);
      expect(response).to.be.a.property('id');
    })
    it('o array deve ter pelo menos 1 objeto com a propriedade id com o valor 1', async () => {
      const [response] = await productsModel.findProductById(100);
      expect(response.id).to.be.equal(1);
    })
  });
});

describe('Cadastrar um novo produto', () => {
  describe('Caso seja possível fazer o cadastro', () => {
    const name = 'Cadeira Dev'
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]); 
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorno deve ser do tipo número', async () => {
      const result = await productsModel.create(name);
      expect(result).to.be.a('number');
    });
    it('deve retornar o número 1', async () => {
      const result = await productsModel.create(name);
      expect(result).to.be.equal(1);
    })
  });
});