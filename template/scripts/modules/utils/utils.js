function getUrlParams(keys) {
    let values = {}
    const params = new URLSearchParams(window.location.search);
    keys.forEach((key) => {
      values[key] = params.get(key)
    })
    return values
  }

  export {getUrlParams}