import { INDUSTRY_LIST } from "constants/survey";

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

export const getFormatIndustryGroup = (list) => {
  const industryList = INDUSTRY_LIST.map((str) => {
    const obj = list.find((item) => item._id === str);
    return (
      obj || {
        _id: str,
        count: 0,
      }
    );
  });

  const __getOtherIndustryCount = () => {
    let otherCount = 0;
    list.forEach((item) => {
      if (INDUSTRY_LIST.includes(item._id)) return;
      otherCount += item.count;
    });
    return otherCount;
  };

  return [
    ...industryList,
    {
      _id: "其他產業",
      count: __getOtherIndustryCount(),
    },
  ];
};
