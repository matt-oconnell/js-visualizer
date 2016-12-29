const code = `let i = 0;
function pow(base, power) {
  console.log('called', i++);
  let result = base;
  if (power > 1) {
    return result * pow(base, --power);
  }
  return result
}

function times2(val) {
  return val * 2;
}

const answer = times2(pow(2, 3));
console.log(answer);
`;
module.exports = code;
