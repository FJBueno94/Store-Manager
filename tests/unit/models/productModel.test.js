const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const products = require('../../../models/products');

describe('verifica as requisições get / Models', () => {
  const allProducts = [{
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
    }
  ];

  const idProduct = {
    id: 2,
    name: "Traje de encolhimento"
  };
    
  afterEach(() => {
    sinon.restore();
  });
  
  describe('getAll', () => {
    it('deve retornar um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const arrayProduct = await products.getAll();
      expect(arrayProduct).to.be.an('array');
      expect(arrayProduct).to.have.lengthOf(3);
    });
  });

  describe('findById', () => {
    it('se o id informado existir', async () => {
      sinon.stub(connection, 'execute').resolves([idProduct]);
      const product = await products.findById('2');
      expect(product).to.be.an('object');
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
    });
  });
});
