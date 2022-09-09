import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";

type UseClickOutside<T> = MutableRefObject<T | null>;
type UseClickOutsideProps<P> = {
    callback?: () => void;
    parentRef: MutableRefObject<P | null>;
};

export function useClickOutside<T extends HTMLElement, P extends HTMLElement>({
    callback = () => {},
    parentRef = { current: null },
}: UseClickOutsideProps<P>): UseClickOutside<T> {
    const elementRef = useRef<T | null>(null);

    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
			if (
                elementRef.current &&
                !elementRef.current.contains(event.target as Node)
            ) {
				callback();
			}
		};
        parentRef.current?.addEventListener("click", onClickOutside);

        return () => {
            parentRef.current?.removeEventListener("click", onClickOutside);
        };
    }, []);

    return elementRef;
}
