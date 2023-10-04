import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const toggleState = atom
    (
        {
            key: "toggleState",
            default: false,
        }
    )