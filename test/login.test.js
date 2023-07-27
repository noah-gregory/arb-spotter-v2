const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path accordingly
const expect = chai.expect;
const testPort = 5001;

chai.use(chaiHttp);

let server;

before(function (done) {
  server = app.listen(testPort, function () {
    console.log(`Test server is running on port ${testPort}`);
    done();
  });
});

after(function (done) {
  server.close(function () {
    console.log('Test server closed');
    done();
  });
});

describe('Login API', () => {
  it('should return a token when valid credentials are provided', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ login: 'fb777', password: '123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('accessToken');
        done();
      });
  });

  it('should return an error when invalid credentials are provided', (done) => {
    chai
      .request(app)
      .post('/api/login')
      .send({ login: 'invaliduser@example.com', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
}


);
describe('Signup API', () => {
    
    it('should create a new user when valid data is provided', (done) => {
      chai
        .request(app)
        .post('/api/signUp')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe121@example.com',
          login: 'etstingaccc21123',
          password: 'securepassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('accessToken');
          done();
        });
    });
  
    it('should return an error when invalid data is provided, like an exisiting account', (done) => {
      chai
        .request(app)
        .post('/api/signup')
        .send({        
        firstname: 'John',
        lastname: 'Doe',
        email: 'level.7.vayne@gmail.com',
        login: 'etstingacccount112123',
        password: 'securepassword', })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  }
);
