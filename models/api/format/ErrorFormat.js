exports.errorFormat = (errors) => {
  var o = {} // empty Object
  var errorData = {}
  var newErrorData=[];
  errors.forEach((error, index) => {
      newError = {
          source:"pointer\":\"/data/attributes/"+error.param,
          code:error.param,
          title: error.msg,
          detail:  error.msg,
      }
      newErrorData.push(newError);
  });

  o.errors = newErrorData;
  return JSON.stringify(o);
};