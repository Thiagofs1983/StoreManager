const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

const sales = [[{
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
}]];

describe('Lista todas as vendas', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(sales)
  });
  after(async () => {
    connection.execute.restore();
  });
  it('Retorna um array', async () => {
    const result = await salesModel.getAll();
    expect(result).to.be.a('array');
  });
  it('O array deve ter pelo menos 1 objeto', async () => {
    const [result] = await salesModel.getAll();
    expect(result).to.be.a('object');
  });
  it('O objeto deve ter a propriedade "sale_id"', async () => {
    const [result] = await salesModel.getAll();
    expect(result).to.be.a.property('sale_id');
  });
  it('A propriedade "sale_id" deve ter o valor 1', async () => {
    const [result] = await salesModel.getAll();
    expect(result.sale_id).to.be.equal(1);
  });
});