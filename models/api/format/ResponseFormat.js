
module.exports = {
  responseFormat: function (response) {
    const data = {
      data: response,
    }
    return JSON.stringify(data)
  },
  errorFormat: function (eKey, title, detail) {
    const error = {
      errors: [
        {
          source: "pointer\":\"/data/attributes/" + eKey,
          code: eKey,
          title: title,
          detail: detail,
        },
      ],
    }
    return JSON.stringify(error)
  },
}
