"use client";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useMemo, useRef } from "react";
import Countries from "@/Components/Countries";
import Uncolonized from "@/Components/uncolonized";
import { useGameContext } from "@/context/GameContext";
import Provinces from "@/Components/Provinces";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import { useMapContext } from "@/context/MapContext";

export default function AnnotationWrapper() {
  const {
    paths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    regions,
  } = useDataContext();
  const { currentregion } = useGameContext();
  const { setcorrectanswer, setanswercorrectness } = useMapContext();
  const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const correctanswerref = useRef<number[]>([-1, -1]);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));
  function GetCorrectAnswer(list: number[], badlist: number[]) {
    const filteredids = list
      .filter((countryid) => !badlist.includes(countryid))
      .filter((countryid) => countryid < 802);

    const a = filteredids[Math.floor(Math.random() * filteredids.length)];
    return a ? a : -1;
  }

  useEffect(() => {
    const firstone = GetCorrectAnswer(
      regions[currentregion[0]][currentregion[1]][1],
      []
    );
    correctanswerref.current = [
      firstone,
      GetCorrectAnswer(regions[currentregion[0]][currentregion[1]][1], [
        firstone,
      ]),
    ];
    setcorrectanswer(correctanswerref.current);
    setanswercorrectness(Array(802).fill(0));
    answercorrectness.current = Array(802).fill(0);
    svgRef.current?.resetTransform();
  }, [currentregion, regions]);
  const Image = useMemo(() => {
    if (regions && correctanswerref.current) {
      return (
        <>
          {Array(802)
            .fill(0)
            .map((_, index) => (
              <Countries
                countryindex={index}
                key={index}
                countryclick={() => {
                  answercorrectness.current[index] -= 1;
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );
                  setanswercorrectness(answercorrectness.current);
                }}
                isitin={true}
              ></Countries>
            ))}
        </>
      );
    }
  }, [
    paths,
    emptylands,
    countries,
    countryprovinces,
    countryoutlines,
    regions,
    currentregion,
    correctanswerref.current,
  ]);
  return (
    <>
      <div
        style={{ width: "clamp(0px, 99vw, 977px)" }}
        className=" p-0 mt-20 h-auto  max-h-[70vh] min-h-[50vh] flex object-contain object-center  bg-[rgb(50,50,50)] "
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={svgRef}
          maxScale={20}
        >
          {() => {
            return (
              <>
                <TransformComponent>
                  <svg
                    className="  h-auto max-h-[70vh] min-h-[50vh] bg-[rgb(0,0,200)]"
                    style={{ width: "clamp(0px, 99vw, 977px)" }}
                    // viewBox={`${thisregion[0][0]} ${thisregion[0][1]} ${thisregion[0][2]} ${thisregion[0][3]}`}
                    viewBox="0 0 5632 2048"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    {Array.from({ length: 25 }, (_, i) => i + 802).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={true}
                      ></Uncolonized>
                    ))}
                    {Image ? Image : ""}
                    <Provinces></Provinces>
                  </svg>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </div>
      <button
        className=" w-20 rounded-2xl mt-2 h-11 font-semibold text-md to-[rgb(132,3,168)]
             from-[rgb(150,10,175)] shadow-md shadow-[rgba(150,10,175,0.3)] flex justify-center items-center
             bg-gradient-to-b cursor-pointer transition-all hover:bg-gradient-to-t hover:scale-105 active:scale-90"
        onClick={() => {
          setanswercorrectness(Array(802).fill(0));
          answercorrectness.current = Array(802).fill(0);
          console.log("---------------------------");
        }}
      >
        RESET
      </button>
    </>
  );
}
