/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  values,
  filter,
  equals,
  compose,
  length,
  juxt,
  allPass,
  propEq,
  reject,
  countBy,
  any,
  pipe,
  identity,
  whereEq,
  complement,
  anyPass,
  propSatisfies,
  eqProps,
} from "ramda";
import { COLORS, SHAPES } from "../constants";

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== "white" || circle !== "white") {
    return false;
  }

  return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  (count) => count >= 2,
  length,
  filter(equals("green")),
  values
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
  ([redCount, blueCount]) => redCount === blueCount,
  // собираем два значения — длину отфильтрованных списков
  juxt([
    compose(length, filter(equals("red")), values),
    compose(length, filter(equals("blue")), values),
  ])
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  propEq(SHAPES.CIRCLE, COLORS.BLUE),
  propEq(SHAPES.STAR, COLORS.RED),
  propEq(SHAPES.SQUARE, COLORS.ORANGE),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(
  values,
  reject(equals("white")),
  countBy(identity),
  values,
  any((n) => n >= 3) // true, если есть значение ≥ 3
);
// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  // ровно 2 зелёных
  (obj) => pipe(values, filter(equals("green")), length)(obj) === 2,

  // треугольник — одна из зелёных
  propEq("triangle", "green"),

  // как минимум 1 красная
  (obj) => pipe(values, filter(equals("red")), length)(obj) >= 1,
]);
// 7. Все фигуры оранжевые.
export const validateFieldN7 = whereEq({
  star: "orange",
  square: "orange",
  triangle: "orange",
  circle: "orange",
});
// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = complement(
  anyPass([propEq("star", "red"), propEq("star", "white")])
);
// 9. Все фигуры зеленые.
export const validateFieldN9 = whereEq({
  star: "green",
  square: "green",
  triangle: "green",
  circle: "green",
});

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ star, square, triangle, circle }) => {
  // остальные фигуры (star, circle) могут быть любого цвета, проверяем только square и triangle
  return triangle === square && triangle !== "white";
};
