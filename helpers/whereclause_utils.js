const operators = [ '=', '>', '>=', '<', '<=', '<>', 'like' ];
const ascdes    = [ 'asc', 'desc' ];


const getWhereOrderByLimitClauses = (fields, searchConditions, orderByConditions, limit, page) => {
    let selectSentenceClauses = '';

    const whereClause   = getWhereClause(fields, searchConditions);
    if (whereClause != '') {
        selectSentenceClauses += ` where ${whereClause}`;
    }

    const orderByClause = getOrderByClause(fields, orderByConditions);
    if (orderByClause != '') {
        selectSentenceClauses += ` order by ${orderByClause}`;
    }

    if (page && limit) {
        selectSentenceClauses += getLimitClause(limit, page);
    }

    return selectSentenceClauses;
}

const getWhereClause = (fields, searchConditions) => {
    return (searchConditions == null) 
            ? ''
            : searchConditions.map(getSearchCondition(fields))
                              .reduce((acc, value) => (value === '')
                                                        ? acc
                                                        : (acc !== '') ? (acc + ' and ' + value) : value, '');
}

const getOrderByClause = (fields, orderByConditions) => {    
    return (orderByConditions == null)
            ? ''
            : orderByConditions.map(getOrderByCondition(fields))
                               .reduce((acc, value) => (value === '')
                                                         ? acc
                                                         : (acc !== '') ? (acc + ', ' + value) : value, '');
}

const getSearchCondition = (fields) => {
    return (
        ({ column, operator, value }) => {
            if (!fields.includes(column)) {
                return '';
            }
            
            if (!operators.includes(operator.toLowerCase())) {
                return '';
            }

            return column + ' ' + operator + ' \'' + value.replace('*', '%') + '\'';
        }
    );
}

const getOrderByCondition = (fields) => {    
    return (
        ({ column, order }) => {
            if (!fields.includes(column)) {
                return '';
            }

            if (!ascdes.includes(order.toLowerCase())) {
                return '';
            }

            return column + ' ' + order;
        }
    )
}

const getLimitClause = (limit, page) => {
    const iLimit  = parseInt(limit);
    const iOffset = (parseInt(page) - 1) * iLimit;
    return ` limit ${parseInt(iLimit)} offset ${iOffset}`;
}

module.exports = { getWhereOrderByLimitClauses };