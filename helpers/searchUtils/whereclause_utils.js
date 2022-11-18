const operators = [ '=', '>', '>=', '<', '<=', '<>', 'like' ];
const ascdes    = [ 'asc', 'desc' ];

const getWhereClause = (fields, searchConditions, idPrefix) => {
    const whereClause = (searchConditions == null) 
                        ? ''
                        : searchConditions.map(getSearchCondition(fields, idPrefix))
                                          .reduce((acc, value) => (value === '')
                                                                    ? acc
                                                                    : (acc !== '') ? (acc + ' and ' + value) : value, '');

    if (whereClause === '') {
        return '';
    }

    return ` where ${whereClause}`;
}

const getOrderByClause = (fields, orderByConditions, idPrefix) => {    
    const orderByClause = (orderByConditions == null)
                        ? ''
                        : orderByConditions.map(getOrderByCondition(fields, idPrefix))
                                           .reduce((acc, value) => (value === '')
                                                                     ? acc
                                                                     : (acc !== '') ? (acc + ', ' + value) : value, '');
    if (orderByClause === '') {
        return '';        
    }

    return ` order by ${orderByClause}`;
}

const getSearchCondition = (fields, idPrefix) => {
    return (
        ({ column, operator, value }) => {
            if (!fields.includes(column)) {
                return '';
            }
            
            if (!operators.includes(operator.toLowerCase())) {
                return '';
            }

            return '(' + getColumnName(column, idPrefix) + ' ' + operator + ' \'' + value.replace('*', '%') + '\'' + ')';
        }
    );
}

const getOrderByCondition = (fields, idPrefix) => {    
    return (
        ({ column, order }) => {
            if (!fields.includes(column)) {
                return '';
            }

            if (!ascdes.includes(order.toLowerCase())) {
                return '';
            }

            return getColumnName(column, idPrefix) + ' ' + order;
        }
    )
}

const getColumnName = (column, idPrefix) => {
    return (column == 'id') ? (idPrefix + column) : column;
}

const getLimitClause = (limit, page) => {
    if (!page || !limit) {
        return '';
    }

    const iLimit  = parseInt(limit);
    const iOffset = (parseInt(page) - 1) * iLimit;
    return ` limit ${parseInt(iLimit)} offset ${iOffset}`;
}

module.exports = { getWhereClause, getOrderByClause, getLimitClause };