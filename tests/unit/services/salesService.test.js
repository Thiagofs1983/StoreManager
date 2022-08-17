const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon');
chai.use(require('chai-as-promised'));
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

const sales = [{
  sale_id: 1,
  product_id: 1,
  quantity: 35,
  date: '2022-08-16T19:21:58.000Z'
},
{
  sale_id: 1,
  product_id: 2,
  quantity: 30,
  date: '2022-08-16T19:21:58.000Z'
},
{
  sale_id: 2,
  product_id: 3,
  quantity: 35,
  date: '2022-08-16T19:21:58.000Z'
  }];

describe('Retorna todas as vendas', () => {
  before(async () => {
    sinon.stub(salesModel, 'getAll').resolves(sales);
  });
  after(async () => {
    salesModel.getAll.restore();
  });
  it('Retorna um array', async () => {
    const response = await salesService.getAll();
    expect(response).to.be.a('array');
  });
  it('O array deve ter pelo menos 1 objeto', async () => {
    const [response] = await salesService.getAll();
    expect(response).to.be.a('object');
  });
  it('O objeto deve ter uma chave "saleId"', async () => {
    const [response] = await salesService.getAll();
    expect(response).to.be.a.property('saleId');
  });
  it('A chave "saleId" deve ter o valor 1', async () => {
    const [response] = await salesService.getAll();
    expect(response.saleId).to.be.equal(1);
  });
})