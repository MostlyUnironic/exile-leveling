import { borderListStyles, interactiveStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  selector,
} from "recoil";
import { useEffect, useRef } from "react";
import React, { useLayoutEffect } from "react";

/* ---------------------------------- */
/* TaskListItem                       */
/* ---------------------------------- */

interface TaskItemProps {
  children?: React.ReactNode;
  isCompletedState?: RecoilState<boolean>;
  itemRef?: (el: HTMLLIElement | null) => void;
}

function TaskListItem({
  children,
  isCompletedState,
  itemRef,
}: TaskItemProps) {
  const liRef = useRef<HTMLLIElement | null>(null);

  const [isCompleted, setIsCompleted] = isCompletedState
    ? useRecoilState(isCompletedState)
    : [undefined, undefined];

  // Scroll when THIS item is completed (used for direct completion)  
  useLayoutEffect(() => {
    if (!isCompleted || !liRef.current) return;

    // Wait for DOM removal + layout settle
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        liRef.current!.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      });
    });
  }, [isCompleted]);

  return (
    <li
      ref={(el) => {
        liRef.current = el;
        itemRef?.(el);
      }}
      tabIndex={0}
      className={classNames(
        borderListStyles.item,
        interactiveStyles.hoverPrimary,
        styles.listItem,
        {
          [styles.completed]: isCompleted,
        }
      )}
      onClick={() => {
        if (setIsCompleted) setIsCompleted(!isCompleted);
      }}
    >
      {children}
    </li>
  );
}

/* ---------------------------------- */
/* TaskList                           */
/* ---------------------------------- */

export interface TaskListProps {
  items?: (TaskItemProps & { key?: React.Key })[];
}

export function TaskList({ items }: TaskListProps) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  /**
   * Selector to read all completion states legally
   */
  const completionStatesSelector = selector<boolean[]>({
    key: "taskListCompletionStates",
    get: ({ get }) =>
      items?.map((item) =>
        item.isCompletedState ? get(item.isCompletedState) : false
      ) ?? [],
  });

  const completionStates = useRecoilValue(completionStatesSelector);

  // Scroll to NEXT uncompleted item
  useEffect(() => {
    const nextIndex = completionStates.findIndex(
      (completed) => !completed
    );

    if (nextIndex === -1) return;

    const el = itemRefs.current[nextIndex];
    if (!el) return;

    const NAVBAR_OFFSET = 96; // navbar + section header height

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      NAVBAR_OFFSET;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [completionStates]);

  return (
    <ol className={classNames(styles.list)}>
      {items &&
        items.map(({ key, children, ...rest }, i) => (
          <TaskListItem
            key={key || i}
            {...rest}
            itemRef={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <span
              aria-hidden
              className={classNames(styles.bullet)}
            >
              {`${i + 1}`.padStart(2, "0")}.
            </span>
            <div className={classNames(styles.task)}>
              {children}
            </div>
          </TaskListItem>
        ))}
    </ol>
  );
}