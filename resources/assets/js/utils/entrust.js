export const hasRole = (user, name, requireAll = false) => {
  if (!user) {
    return false;
  }
  if (name === 'company' && user['company_count'] === 0) {
    return false;
  }
  if (name instanceof Array) {
    for (let roleName of name) {
      const isHasRole = hasRole(user, roleName);

      if (isHasRole && !requireAll) {
        return true;
      } else if (!isHasRole && requireAll) {
        return false;
      }
    }

    return requireAll;
  } else {
    for (let role of user.roles) {
      if (role.name === name) {
        return true;
      }
    }
  }

  return false;
}

export const hasPermission = (user, permission, requireAll = false) => {
  if (!user) {
    return false;
  }
  if (permission instanceof Array) {
    for (let permName of permission) {
      const isHasPerm = hasPermission(user, permName);

      if (isHasPerm && !requireAll) {
        return true;
      } else if (!isHasPerm && requireAll) {
        return false;
      }
    }

    return requireAll;
  } else {
    for (let role of user.roles) {
      for (let perm of role.perms) {
        if(permission === perm.name) {
          return true;
        }
      }
    }
  }

  return false;
}
