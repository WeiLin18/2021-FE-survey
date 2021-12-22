import WordCloud from "react-d3-cloud";

const SkillCloud = ({ skillData }) => {
  if (!skillData) return null;

  const renderData = skillData.map((item) => {
    const rawValue = item?.value;
    return {
      ...item,
      value: rawValue < 10 ? rawValue * 20 : rawValue * 2,
    };
  });
  return (
    <>
      <WordCloud
        width={200}
        height={60}
        data={renderData}
        font="Noto Sans TC"
        fontWeight={700}
        spiral="rectangular"
        rotate={0}
        padding={0}
      />
    </>
  );
};

export default SkillCloud;
