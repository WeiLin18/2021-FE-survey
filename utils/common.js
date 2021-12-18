export const findTargetObject = (target, prop, list) => {
  return list.find((item) => item[prop] === target);
};

export const fetcher = async (url) => fetch(url).then((res) => res.json());

export const getUnitYConfig = (unit) => ({
  ticks: {
    callback: function (value) {
      return value + unit;
    },
  },
});
