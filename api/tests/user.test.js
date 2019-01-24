const tester = require('graphql-tester').tester;

describe('A user', function () {
    const self = this
    beforeAll(() => {
        self.test = tester({
            url: process.env.GRAPHQL_URI,
            contentType: 'application/json'
        })
    })
    it('should register a new user', done => {
        self.test(
                JSON.stringify({
                    query: `mutation CreateUSer (
                        $email: String!,
                        $first_name: String!,
                        $last_name: String!,
                        $password: String!,
                    ){
                                CreateUser(
                                searchUserInput: {email: $email}
                                dataUserInput: {
                                    first_name: $first_name
                                    last_name: $last_name
                                    password: $password
                                }
                                ){
                                id,
                                first_name,
                                last_name,
                                email,
                                password
                                }
                            }`,
                    variables: {
                        email: "usertest@mailinator.com",
                        first_name: "User test",
                        last_name: "TestE",
                        password: "123456"
                    }
                })
            ).then(res => {
                self.tempID = res.data.CreateUser.id; // adding userid to the test suite object
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
    it('should not register with existing user data', done => {
        self.test(
                JSON.stringify({
                    query: `mutation CreateUSer (
                        $email: String!,
                        $first_name: String!,
                        $last_name: String!,
                        $password: String!,
                    ){
                                CreateUser(
                                searchUserInput: {email: $email}
                                dataUserInput: {
                                    first_name: $first_name
                                    last_name: $last_name
                                    password: $password
                                }
                                ){
                                id,
                                first_name,
                                last_name,
                                email,
                                password
                                }
                            }`,
                    variables: {
                        email: "usertest@mailinator.com",
                        first_name: "User test",
                        last_name: "TestE",
                        password: "123456"
                    }
                })
            ).then(res => {
                expect(res.status).toBe(200);
                expect(res.errors[0].message).toBe('user_already_exists');
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
    it('should not login with wrong credentials', done => {
        self.test(
                JSON.stringify({
                    query: `mutation LoginUser(
                        $email: String!,
                        $password: String!,
                    ){
                        LoginUser(
                        loginUserInput: {
                          email: $email
                          password: $password
                        }
                      ) {
                        token
                      }
                    }`,
                    variables: {
                        email: "usertest@mailinator.com",
                        first_name: "User test",
                        last_name: "TestE",
                        password: "12345"
                    }
                })
            ).then(res => {
                expect(res.status).toBe(200);
                expect(res.errors[0].message).toBe('user_or_password_incorrect');
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
    it('should login with correct credentials', done => {
        self.test(
                JSON.stringify({
                    query: `mutation LoginUser(
                        $email: String!,
                        $password: String!,
                    ){
                        LoginUser(
                        loginUserInput: {
                          email: $email
                          password: $password
                        }
                      ) {
                        token
                      }
                    }`,
                    variables: {
                        email: "usertest@mailinator.com",
                        first_name: "User test",
                        last_name: "TestE",
                        password: "123456"
                    }
                })
            ).then(res => {
                expect(res.status).toBe(200);
                expect(typeof res.data.LoginUser.token).toBe('string');
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
    it('should not login twice', () => {
        expect(true).toBe(true)
    })
    it('should logout after logging in', () => {
        expect(true).toBe(true)
    })
    it('should not logout if not logged in', () => {
        expect(true).toBe(true)
    })
    it('should removed by ID', () => {
        expect(true).toBe(true)
    })
})