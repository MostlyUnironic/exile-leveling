import { FragmentStep } from "../../components/FragmentStep";
import { GemReward } from "../../components/ItemReward";
import { SectionHolder } from "../../components/SectionHolder";
import { Sidebar } from "../../components/Sidebar";
import { TaskListProps } from "../../components/TaskList";
import { gemProgressSelectorFamily } from "../../state/gem-progress";
import { routeSelector } from "../../state/route";
import { routeProgressSelectorFamily } from "../../state/route-progress";
import { ReactNode } from "react";
import { useCallback, useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

export default function RoutesContainer() {
  const route = useRecoilValue(routeSelector);

  // Keyboard shortcut to complete next step sequentially
  const completeNextStep = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
          const section = route[sectionIndex];
          for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
            const step = section.steps[stepIndex];
            
            if (step.type === "fragment_step") {
              const completionState = routeProgressSelectorFamily(
                [sectionIndex, stepIndex].toString()
              );
              const isCompleted = await snapshot.getPromise(completionState);
              
              if (!isCompleted) {
                set(completionState, true);
                return; // Stop after completing the first incomplete step
              }
            } else if (step.type === "gem_step") {
              const completionState = gemProgressSelectorFamily(step.requiredGem.id);
              const isCompleted = await snapshot.getPromise(completionState);
              
              if (!isCompleted) {
                set(completionState, true);
                return; // Stop after completing the first incomplete step
              }
            }
          }
        }
      },
    [route]
  );

  // Keyboard event listener
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Use Space key to complete next step
      if (event.code === "Space" && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        completeNextStep();
      }
    },
    [completeNextStep]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const items: ReactNode[] = [];
  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];

    let taskItems: TaskListProps["items"] = [];
    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];

      if (step.type == "fragment_step") {
        const completionState = routeProgressSelectorFamily(
          [sectionIndex, stepIndex].toString()
        );
        const isCompleted = useRecoilValue(completionState);
        taskItems.push({
          key: stepIndex,
          isCompletedState: completionState,
          children: <FragmentStep key={stepIndex} step={step} isCompleted={isCompleted} />,
        });
      }

      if (step.type == "gem_step")
        taskItems.push({
          key: step.requiredGem.id,
          isCompletedState: gemProgressSelectorFamily(step.requiredGem.id),
          children: (
            <GemReward
              key={taskItems.length}
              requiredGem={step.requiredGem}
              count={step.count}
              rewardType={step.rewardType}
            />
          ),
        });
    }

    items.push(
      <SectionHolder key={sectionIndex} name={section.name} items={taskItems} />
    );
  }

  return (
    <>
      <Sidebar />
      {items}
    </>
  );
}
