/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

const isValidNumberString = (str) =>
  /^[0-9]+(\.[0-9]+)?$/.test(str) && str.length > 2 && str.length < 10;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  Promise.resolve(value)
    .then((v) => {
      writeLog(v);
      return v;
    })
    .then((v) => {
      if (!isValidNumberString(v) || parseFloat(v) <= 0) {
        throw new Error("ValidationError");
      }
      return v;
    })
    .then((v) => {
      const rounded = Math.round(parseFloat(v));
      writeLog(rounded);
      return rounded;
    })
    .then((num) =>
      api.get("https://api.tech/numbers/base", {
        number: num,
        from: 10,
        to: 2,
      })
    )
    .then(({ result: binary }) => {
      writeLog(binary);
      return binary;
    })
    .then((binary) => {
      const len = binary.length;
      writeLog(len);
      return len;
    })
    .then((len) => {
      const sq = len * len;
      writeLog(sq);
      return sq;
    })
    .then((sq) => {
      const mod3 = sq % 3;
      writeLog(mod3);
      return mod3;
    })
    .then((id) => api.get("https://animals.tech", { id }))
    .then(({ result: animal }) => {
      handleSuccess(animal);
      console.log(animal);
    })
    .catch((err) => {
      handleError(err.message);
    });
};

export default processSequence;
