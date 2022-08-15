const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');

describe('verifica as requisições get / Controller', () => {
  describe('getAll', () => {
    describe('quando exitem pessoas criadas', () => {
      const response = {};
      const request = {};
      
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
      }];
      
      beforeEach(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').resolves(allProducts);
      });
      
      afterEach(function () {
        productsService.getAll.restore();
      });
      
      it('o status seja 200', async function () {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      
      it('o array com os dados', async function () {
        await productsController.getAll(request, response);
        expect(response.json.calledWith(allProducts)).to.be.equal(true);
      });
    });
  });
  
  describe('findById', () => {
    describe('se o id informado não existir', () => {
      const response = {};
      const request = {};
      let next = null;
  
      beforeEach(() => {
        request.params = {
          id: '2',
        };
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        next = sinon.stub();
      
        sinon.stub(productsService, 'findById').resolves({error: true});
      });
      
      afterEach(() => {
        productsService.findById.restore();
      });
  
      it('é chamado o método "next" passando para o middleware de erro', async () => {
        const conection = await productsController.findById(request, response, next);
        expect(next.calledOnce).to.be.equal(true);
      });

      it('é passado um objeto como parametro para next', async () => {
        await productsController.findById(request, response, next);
        expect(next.calledWith(true)).to.be.equal(true);
      });
    });
    describe('se o id informado existir', () => {
      const response = {};
      const request = {};

      const product = [{
        id: 2,
        name: 'Traje de encolhimento',
      }];

      beforeEach(() => {
        request.params = {
          id: 2,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(productsService, 'findById').resolves(product);
      });
      
      afterEach(() => {
        productsService.findById.restore();
      });

      it('é chamado o método "status" passando 200', async () => {
        await productsController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando o objeto de produto', async () => {
        await productsController.findById(request, response);
        expect(response.json.calledWith(product[0])).to.be.equal(true);
      });
    });
  });
});
