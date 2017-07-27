const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) throwError(401, 'Unauthorized')
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) throwError(403, `You can only ${action} yourself.`)
  next()
}

const selfOrAdmin = action => (req, res, next) => {
  if (!req.user.admin) {
    if (req.params.id !== req.user.id) throwError(403, `You can only ${action} yourself or as admin.`)
  }
  next()
}

const assertAdmin = (req, res, next) => {
  if (!req.user) throwError(401, 'Unauthorized')
  if (!req.user.admin) throwError(403, 'Forbidden')
  next()
}

const throwError = (status, message) => {
  const err = new Error(message)
  err.status = status
  throw err
}

module.exports = { mustBeLoggedIn, selfOnly, assertAdmin, selfOrAdmin }
