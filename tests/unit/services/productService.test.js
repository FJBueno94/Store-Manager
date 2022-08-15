const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsService = require('../../../services/products');
const productsModel = require('../../../models/products');

describe('verifica as requisições get / Services', () => {

  const mock = [[]];

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(mock);
  }),
    
    afterEach(() => {
      connection.execute.restore();
    });

  describe('getAll', () => {

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll').resolves(
        [{
          id: 1,
          name: "Martelo do Thor"
        },
        {
          id: 2,
          name: "Traje de encolhimento"
        },
        {
          id: 3,
          name: "Escudo do Capitão América"
        }]
      );
    });

    afterEach(() => {
      productsModel.getAll.restore();
    }),
    
      it('deve retornar um array de produtos', async () => {
        const arrayProduct = await productsService.getAll();
        expect(arrayProduct).to.be.an('array');
        expect(arrayProduct).to.have.lengthOf(3);
      });
  });
  describe('findById', () => {
    describe('se o id informado não existir', () => {
      it('deve retornar um objeto de erro', async () => {
        const product = await productsService.findById('5');
        expect(product).to.be.an('object');
        expect(product).to.have.property('error');
        expect(product).to.have.property('error').property('code');
        expect(product).to.have.property('error').property('message');
      });
    });
      
    describe('se o id informado existir', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'findById').resolves(
          {
            id: 2,
            name: "Traje de encolhimento"
          }
        );
      });

      afterEach(() => {
        productsModel.findById.restore();
      });

      it('deve retornar um objeto com o produto', async () => {
        const product = await productsModel.findById('2');
        expect(product).to.be.an('object');
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
      });
    });
  });
});  