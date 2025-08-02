import { useDataContext } from "@/context/DataContext";
import React, { useMemo } from "react";

const Provinces = () => {
  const { paths, countryprovinces } = useDataContext();
  const Provincememo = useMemo(() => {
    return (
      <>
        {paths.map((province, index) => {
          if (!province) return;
          return province.map((path, index2) => (
            <path
              d={path}
              fill={"none"}
              stroke={
                countryprovinces
                  .map((row) => {
                    return row.flat().includes(index + 1);
                  })
                  .indexOf(true) > -1
                  ? "rgb(50,50,50)"
                  : "none"
              }
              strokeWidth={
                countryprovinces
                  .map((row) => {
                    return row.flat().includes(index + 1);
                  })
                  .indexOf(true) > -1
                  ? "0.2"
                  : "2"
              }
              key={index2}
              className="pointer-events-none"
            ></path>
          ));
        })}
        {paths[1325].map((path, index2) => (
          <path
            d={path}
            fill={"rgb(70,70,220)"}
            key={index2}
            className="pointer-events-none"
          ></path>
        ))}
      </>
    );
  }, [paths, countryprovinces]);
  return <>{Provincememo}</>;
};

export default Provinces;
