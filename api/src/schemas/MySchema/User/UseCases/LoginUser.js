import { ApolloError } from "apollo-server"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export default async (obj, params, ctx, resolveInfo) => {
    params.loginUserInput.password = crypto.createHmac('sha256', process.env.HASH_SECRET).update(params.loginUserInput.password).digest('hex')

    const session = ctx.driver.session();
    const cypher = "MATCH (u:User {email: $loginUserInput.email, password: $loginUserInput.password, softDeleted: false})-[p:PLAYS]->(r:Role) RETURN u,p,r"
    return session.run(cypher, params)
        .then( result => {
            if(result.records.length > 0) {
                const user = {
                    id: result.records[0].get('u').properties.id,
                    email: result.records[0].get('u').properties.email,
                    first_name: result.records[0].get('u').properties.first_name,
                    last_name: result.records[0].get('u').properties.last_name,
                    role: [result.records[0].get('r').properties.name]
                }
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_IN })
                return {token: token}
            } else {
                throw new ApolloError('user_or_password_incorrect', 405, ['User or password is incorrect']);
            }
        })
        .catch((e) => { throw new ApolloError('unkonw_error', 405, [`Error ${e.message}`]) })
}