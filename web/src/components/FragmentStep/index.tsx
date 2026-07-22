import { RouteData } from "../../../../common/route-processing/types";
import { configSelector } from "../../state/config";
import { SplitRow } from "../SplitRow";
import { Fragment } from "./Fragment";
import styles from "./styles.module.css";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { BiImage, BiInfoCircle, BiSolidImage, BiSolidInfoCircle } from "react-icons/bi";
import { useRecoilValue } from "recoil";

interface StepProps {
  step: RouteData.FragmentStep;
  isCompleted?: boolean;
}

export function FragmentStep({ step, isCompleted = false }: StepProps) {
  const config = useRecoilValue(configSelector);
  const [showSubSteps, setShowSubSteps] = useState(
    config.showSubsteps && step.subSteps.length > 0 && !isCompleted
  );

  // Collapse sub-steps when step is marked as completed, expand when toggled back
  useEffect(() => {
    if (isCompleted) {
      setShowSubSteps(false);
    } else {
      setShowSubSteps(config.showSubsteps && step.subSteps.length > 0);
    }
  }, [isCompleted, config.showSubsteps, step.subSteps.length]);

  const headNodes: React.ReactNode[] = [];
  const tailNodes: React.ReactNode[] = [];

  for (let i = 0; i < step.parts.length; i++) {
    const fragment = step.parts[i];
    const [head, tail] = Fragment(fragment);

    if (head) headNodes.push(head);
    if (tail) tailNodes.push(tail);
  }

  if (step.subSteps.length > 0) {
    headNodes.push(
      <>
        {" "}
        <button
          className={classNames(styles.subStepToggle)}
          onClick={(e) => {
            setShowSubSteps(!showSubSteps);
            e.stopPropagation();
          }}
        >
          {showSubSteps ? (
            <BiSolidInfoCircle className={classNames("inlineIcon")} />
          ) : (
            <BiInfoCircle className={classNames("inlineIcon")} />
          )}
        </button>
      </>
    );
  }

  // Check if any sub-step contains image fragments
  const hasImageInSubSteps = step.subSteps.some((subStep) =>
    subStep.parts.some((part) => typeof part !== "string" && part.type === "image")
  );

  if (hasImageInSubSteps) {
    headNodes.push(
      <>
        {" "}
        <span className={classNames(styles.imageIndicator)}>
          {isCompleted ? (
            <BiImage  className={classNames("inlineIcon")} />
          ) : (
            <BiSolidImage className={classNames("inlineIcon")} />
          )}
        </span>
      </>
    );
  }

  return (
    <>
      {headNodes.length > 0 && tailNodes.length > 0 ? (
        <SplitRow
          left={React.Children.toArray(headNodes)}
          right={React.Children.toArray(tailNodes)}
        />
      ) : (
        <span>{React.Children.toArray(headNodes)}</span>
      )}
      {showSubSteps && (
        <>
          <hr />
          {React.Children.toArray(
            step.subSteps.map((x) => {
              // Don't show bullet for image-only sub-steps
              const isImageOnly =
                //x.parts.length === 1 &&
                typeof x.parts[0] !== "string" &&
                x.parts[0].type === "image";
              return (
                <span>
                  {!isImageOnly && "• "}
                  <FragmentStep step={x} isCompleted={false} />
                </span>
              );   
            })
          )}
        </>
      )}
    </>
  );
}
