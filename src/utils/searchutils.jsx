const createQueryObj = (queryList) => {
    const queryObj = {};
    for (const [key, val] of queryList) {
      if (!(key in queryObj)) {
        queryObj[key] = [];
      }
      queryObj[key].push(val);
    }
    return queryObj;
}

export {createQueryObj};