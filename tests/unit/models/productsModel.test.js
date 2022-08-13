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