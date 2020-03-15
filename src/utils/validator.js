// 校验回购期限区间
function validatorDate(start, end, message) {
  return (rule, value, callback) => {
      let val = parseFloat(value);
      if (val < start || val > end) {
        callback(new Error(message));
      }
      if (!val) {
        callback(new Error('必填项'));
      }
      callback();
  }
}
function validatorMin(num, message) {
  return (rule, value, callback) => {
    let val = parseFloat(value);
    if (val < num) {
      callback(new Error(message));
    }
    if (!val) {
      callback(new Error('必填项'));
    }
    callback();
  }
}
// 整数num位的校验，例如：三位整数，num为3
function validatorIntLength(num, message) {
  return (rule, value, callback) => {
  	let val = parseInt(value);
    if (!(/(^[0-9]\d*$)/.test(value)) || value.length !== num || val === 0) {
      callback(new Error(message));
    }else {
      callback();
    }
  }
}
// 大于等于0的校验
function validatorMoreThanOrEqual(num, message) {
  return (rule, value, callback) => {
    if (value < num) {
      callback(new Error(message));
    }else {
      callback();
    }
  }
}
// 大于0的校验
function validatorMoreThan(num, message) {
  return (rule, value, callback) => {
    if (value <= num) {
      callback(new Error(message));
    }else {
      callback();
    }
  }
}
// 只能输入n位数字包括小数
function validatorNumberLength(num, message) {
  return (rule, value, callback) => {
    var pattern =  /^([0]|[1-9][0-9]{0,7})(\.\d{1,4})?$/;
    if (!pattern.test(value) || value.length !== num) {
      callback(new Error(message));
    }else {
      callback();
    }
  }
}
// 只能输入N为字符串
function validatorStringLength(num, message) {
  return (rule, value, callback) => {
    if (value.length > num) {
      callback(new Error(message));
    }else {
      callback();
    }
  }
}
// 返回绝对价格 返回利率价格
function validatorAbsoluteRange(startNum, endNum, message) {
    return (rule, value, callback) => {
        let start = Number(startNum)
        let end = Number(endNum)
        let val = Number(value)
        if (val <=start) {
            callback(new Error("值应大于0"));
        } else if(val>end){
            callback(new Error("请输入(0,1000]的数字"));
        }else{
            callback();
        }
    }
}

// 只能输入[starNum, endNum]内的数字
function validatorRange(startNum, endNum, message) {
    return (rule, value, callback) => {
      let start = Number(startNum)
      let end = Number(endNum)
      let val = Number(value)
      if (val < start || val > end) {
        callback(new Error(message));
      } else {
        callback();
      }
    }
}



export {
  validatorDate,
  validatorMin,
  validatorIntLength,
  validatorMoreThan,
  validatorMoreThanOrEqual,
  validatorNumberLength,
  validatorStringLength,
  validatorAbsoluteRange,
  validatorRange,
}
