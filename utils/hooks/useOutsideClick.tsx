import { useEffect, RefObject } from "react";

const MOUSEDOWN = "mousedown";
const TOUCHSTART = "touchstart";

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: any) => void;

export const useOnClickOutside = (
  /** реф элемента, клик вне которого отслеживается */
  ref: RefObject<HTMLElement>,
  /** коллбэк при клике вне компонента */
  handler?: Handler | null,
  /** исключения - рефы элементов, которые не должны тригеррить коллбэк */
  exceptions?: RefObject<HTMLElement>[]
): void => {
  useEffect(() => {
    if (!handler) return;

    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      if (
        exceptions &&
        exceptions.find((findableRef) =>
          findableRef.current?.contains(event.target as Node)
        )
      )
        return;

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, exceptions]);
};
