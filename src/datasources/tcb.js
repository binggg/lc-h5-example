/**
 * tcb 模块, 负责tcb的连接和认证相关处理
 */
import tcb from '@cloudbase/js-sdk'
import { getConfig } from './utils'
let app
export let auth = undefined
export let database = undefined

if (process.env.isMiniprogram) {
  function CloudBase() {}
  for (let key in wx.cloud) {
    CloudBase.prototype[key] = wx.cloud[key]
  }

  CloudBase.prototype.database = function () {
    function Database() {}
    let database = wx.cloud.database()

    for (let key in database) {
      Database.prototype[key] = database[key]
    }

    Database.prototype.collection = function () {
      let prototype = database.collection(...arguments)

      function F() {}
      F.prototype = prototype
      function Query() {
        prototype.__proto__.__proto__.constructor.call(this, ...arguments)
      }

      Query.prototype = new F()

      Query.prototype.field = function (object) {
        return new Query(this.collectionName, {
          ...this._query.getProperties(),
          field: object,
        })
      }

      Query.prototype.where = function (condition) {
        if (this._query.where) {
          return new Query(this.collectionName, {
            ...this._query.getProperties(),
            // where: Object.assign({ ...this._query.where }, condition)
            where: commands.and(this._query.where, condition),
          })
        } else {
          return new Query(this.collectionName, {
            ...this._query.getProperties(),
            where: condition,
          })
        }
      }

      Query.prototype.orderBy = function (fieldPath, order) {
        return new Query(this.collectionName, {
          ...this._query.getProperties(),
          order: [
            ...(this._query.order || []),
            {
              fieldPath,
              order,
            },
          ],
        })
      }

      Query.prototype.limit = function (max) {
        return new Query(this.collectionName, {
          ...this._query.getProperties(),
          limit: max,
        })
      }

      Query.prototype.skip = function (offset) {
        return new Query(this.collectionName, {
          ...this._query.getProperties(),
          offset,
        })
      }

      Query.prototype.update = function (data) {
        return F.prototype.update.call(this, { data })
      }

      class Collection extends Query {
        constructor(collectionName) {
          super(collectionName)
        }
        where(condition) {
          if (this._query.where) {
            return new Query(this.collectionName, {
              ...this._query.getProperties(),
              // where: Object.assign({ ...this._query.where }, condition)
              where: commands.and(this._query.where, condition),
            })
          } else {
            return new Query(this.collectionName, {
              ...this._query.getProperties(),
              where: condition,
            })
          }
        }
        add(data) {
          return super.add.call(this, { data })
        }
        doc(docId) {
          let docInstance = super.doc.call(this, docId)
          let originUpdate = docInstance.update
          docInstance.update = function (data) {
            return originUpdate.call(this, { data })
          }

          let originSet = docInstance.set
          docInstance.set = function (data) {
            return originSet.call(this, { data })
          }
          return docInstance
        }
      }

      return new Collection(...arguments)
    }
    return new Database(...arguments)
  }
}

export async function init() {
  const env = getConfig()

  if (!app) {
    if (process.env.isMiniprogram) {
      app = new CloudBase()
      app.init({
        env: env.envID,
      })
    } else {
      app = tcb.init({
        env: env.envID,
      })
      auth = app.auth({
        persistence: 'local',
      })
      await signIn()
    }
    database = app.database()
  }

  return {
    app,
    database,
    auth,
  }
}

export async function signIn() {
  if (auth.hasLoginState()) return true
  await auth.anonymousAuthProvider().signIn()
  return true
}
