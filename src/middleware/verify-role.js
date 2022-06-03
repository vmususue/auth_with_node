
// id_tipo_acceso  [1]     [2]        [3]        [4]
const roles = [ 'Vista', 'Minimo', 'Estandar', 'Total' ]


export const roleVerifyRead = (req, res, next) => {
    
    //roles: Estandar - Total
    const role = [roles[2], roles[3]];

    const userRole = roles[req.id_tipo_acceso - 1];    
    if ( !role.includes(userRole)) {
        return res.status(401).json({
          'Message': `The following roles are required ${ role }` 
        });
    }

    next();
};

export const roleVerifyReadSingle = (req, res, next) => {
    
    //roles: Vista - Minimo - Estandar - Total
    const role = [ roles[0], roles[1], roles[2], roles[3] ];
    const userRole = roles[req.id_tipo_acceso - 1];

    if ( !role.includes(userRole)) {
        return res.status(401).json({
            'Message': `The following roles are required ${ role } 2` 
        });
    }

    next();
};


