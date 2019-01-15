import {driver} from '../infra/databases/database'
import crypto from 'crypto'

const adminEmail = process.env.ADMIN_EMAIL
const adminPassw = crypto.createHmac('sha256', process.env.JWT_SECRET).update(process.env.ADMIN_PASSWORD).digest('hex')

const createAdmin = driver.session().run(
  `MERGE (u:User {email: "${adminEmail}"})
  ON CREATE SET
    u.id = apoc.create.uuid(),
    u.first_name = "Admin",
    u.last_name = "Mycompany",
    u.email = "${adminEmail}",
    u.password = "${adminPassw}",
    u.created = datetime(),
    u.softDeleted = false
  ON MATCH SET
    u.first_name = "Admin",
    u.last_name = "Mycompany",
    u.password = "${adminPassw}",
    u.updated = datetime()
  MERGE (r:Role {name: 'ADMIN'})
  MERGE (u)-[p:PLAYS]->(r)
  RETURN u`
).then( result => { console.log('\x1b[32m',`Admin user was Successfully created! ${adminEmail} : ${process.env.ADMIN_PASSWORD}`); process.exit();})
.catch((e) => { console.log('\x1b[31m','Something went wrong!',e); process.exit();})